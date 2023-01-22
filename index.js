const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const listRoute = require('./routes/lists');
const cors = require('cors');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection successful'))
  .catch(() => console.log('Db not connected!'));

app.use(express.json());
app.use(express.static('public'));
app.use(
  cors({
    origin: ['https://revoxfilm-client.onrender.com/api'],
  })
);

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/lists', listRoute);

app.listen(process.env.PORT || 1234, () => {
  console.log('Backend server is running!');
});
