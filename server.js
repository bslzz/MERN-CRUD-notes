const express = require('express');
require('dotenv').config();
const cors = require('cors');
require('./helpers/initMongoose');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello from express');
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
