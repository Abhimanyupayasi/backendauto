import { Mongoose } from 'mongoose';
import Appoint from '../models/appoint.model.js';


const createAppoint = async (req, res) => {
  try {
    const { user, name, age, phone, email, disease, address, date } = req.body;

    // Function to check if a slot is available for a given date
    async function isSlotAvailable(date, slot) {
      return (await Appoint.find({ date, slot })).length === 0;
    }

    // Available slots to check
    const slotsToCheck = ['10-11', '11-12', '12-1', '1-2'];

    // Iterate over available slots to find an available slot
    for (const slot of slotsToCheck) {
      if (await isSlotAvailable(date, slot)) {
        // Book the slot if available
        const newAppoint = new Appoint({
          user, name, age, phone, email, disease, address, date, slot
        });
        await newAppoint.save();
        //  return res.status(201).json({ message: `Appointment booked successfully on ${date} (${slot} slot)` });
         return res.redirect(`/booked?name=${encodeURIComponent(name)}&user=${encodeURIComponent(user)}&date=${encodeURIComponent(date)}&slot=${encodeURIComponent(slot)}&disease=${encodeURIComponent(disease)}&message=${encodeURIComponent(`Appointment booked successfully on ${date} time : ${slot}`)}&status=success`); 
         
      }
    }

    // If no slot is available for the requested date, find the next available date
    let nextDate = new Date(date);
    while (true) {
      nextDate.setDate(nextDate.getDate() + 1); // Move to the next day
      const nextDateString = nextDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD

      // Check if any slot is available for the next date
      for (const slot of slotsToCheck) {
        if (await isSlotAvailable(nextDateString, slot)) {
          // Book the slot if available
          const newAppoint = new Appoint({
            user, name, age, phone, email, disease, address, date: nextDateString, slot
          });
          await newAppoint.save();
          // return res.status(201).json({ message: `Appointment booked successfully on ${nextDateString} (${slot} slot)` });
          return res.redirect(`/booked?name=${encodeURIComponent(name)}&user=${encodeURIComponent(user)}&date=${encodeURIComponent(nextDateString)}&slot=${encodeURIComponent(slot)}&disease=${encodeURIComponent(disease)}&message=${encodeURIComponent(`Appointment booked successfully on ${nextDateString} time : ${slot}`)}&status=success`); 
        }
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};









// Example usage:
// const chosenDate = '2024-04-06'; // Example date, you can replace it with the user's chosen date
// findNextAvailableSlot(chosenDate)
//     .then(slot => {
//         console.log(`The next available slot for ${chosenDate} is ${slot}`);
//     })
//     .catch(err => console.error(err));


        
// }




const getAppoints = async (req, res) => {
    try {
        const appoints = await Appoint.find();
        
        
        res.status(200).json({
            result: 'success',
            appoints
            
        });
        // appoints.forEach(appoint => {
        //     console.log(appoint);
        //     res.render('appoints', { appoint });
        // });
        // res.render('appoints', { appoints });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


export { createAppoint, getAppoints };