import express from "express";
import dotenv from 'dotenv'; 

import holidayRoutes from './routes/holidayRoutes.js'; 

dotenv.config(); 

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send('Welcome to the Holiday API! Use /holidays?year=...&month=... to get data.');
});


app.use('/holidays', holidayRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});