const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect database
connectDB();

//initialize Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/user', require('./routes/API/user'));
app.use('/api/upload', require('./routes/API/upload'));
app.use('/api/search', require('./routes/API/search'));
app.use('/api/auth', require('./routes/API/auth'));
app.use('/api/profile', require('./routes/API/profile'));
app.use('/api/post', require('./routes/API/post'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))