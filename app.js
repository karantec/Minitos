const express = require('express');
const UserRoutes=require('./routes/User.route');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
connectDB()

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});
 
app.use('/data', UserRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
