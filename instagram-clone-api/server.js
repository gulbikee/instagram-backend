const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Db connected');
  })
  .catch((e) => {
    console.log(e, 'Failed to connect Db');
  });

const server = app.listen(process.env.PORT || 3001, () => {
  console.log('Server started');
});