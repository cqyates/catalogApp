const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect database
connectDB();

//initialize Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/API/users'));
app.use('/api/upload', require('./routes/API/upload'));
app.use('/api/search', require('./routes/API/search'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))