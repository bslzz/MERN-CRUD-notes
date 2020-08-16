const express = require('express');
require('dotenv').config();
const cors = require('cors');
require('./helpers/initMongoose');

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use('/users', require('./routes/userRouter'));
app.use('/notes', require('./routes/noteRouter'));

//Listen server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
