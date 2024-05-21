import mongoose from "mongoose";

const slot = ['10-11','11-12','12-1','1-2','2-3','3-4','4-5','5-6'];



const appointSchema = new mongoose.Schema({
    user : {
        type: String,
        ref: 'User',
        required: true,
    },
    slot: {
        type: String,
        default: '10-11',
        enum: slot,
    },

    name: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        
    },
    disease :{
        type: String,
        required: true,
    },
    adress: {
        type: String,
        
    },
    date: {
        type: Date,
        required: true,
    },
    
    
}, {    
    timestamps: true,
});

const Appoint = mongoose.model('Appoint', appointSchema);

export default Appoint;
