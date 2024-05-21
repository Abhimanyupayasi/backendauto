import  {config } from 'dotenv';
config();
const port = process.env.PORT || 4000;
import app from './app.js';
import connectDB from './config/db.js';
import cors from 'cors';

app.use(cors({
  origin : [process.env.CLIENT_URL, 'http://127.0.0.1:5500/client', 'http://127.0.0.1:5500/client/signup/'],
  mathods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' , 'PATCH', 'HEAD' ,],
  credentials: true

}));



app.listen(port, async() => {

    await connectDB();


  console.log(`Server is running on port ${port}`);
}); 
