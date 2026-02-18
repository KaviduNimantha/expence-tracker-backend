const express = require('express')
require('dotenv').config();
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000; 

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);


const userRoutes = require('./routes/auth.routes');
const expenseRoutes = require('./routes/expense.routes');

app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
