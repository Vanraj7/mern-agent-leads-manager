const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('MERN assignment backend is running'));

const PORT = process.env.PORT || 5000;
app.use('/api/auth', require('./routes/auth'));
app.use('/api/agents', require('./routes/agents'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/leads', require('./routes/leads'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
