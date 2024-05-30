import cors from 'cors';
import express from 'express';
import moment from 'moment-timezone';
import morgan from 'morgan';
import mongoose from "mongoose";
import rootRouter from './api/routes/index.js';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';


const app = new express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser('cookie'));
// Use the body-parser middleware to parse JSON data
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// set view engine
// app.set("views", "./views");
// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

moment.tz.setDefault('Asia/Dhaka');
const currentDate = moment();
console.log(currentDate.format('YYYY-MM-DD HH:mm:ss'));

// app.use(`/api${config.uploadPath}`, express.static(config.uploadFolder));
app.use('/api', rootRouter);
app.get('/api', (req, res, next) => {
  res.send('welcome to dbcom');
});

app.get('/time', (req, res, next) => {
  res.send(currentDate.format('YYYY-MM-DD HH:mm:ss'));
});


// app.use(globalErrorHandler);

// app.listen(config.port, config.host || '127.0.0.1', () => {
//   console.log(`server running on port ${config.port}`);
//   sequelize
//     .authenticate()
//     .then(async () => {
//       await sequelize.query(`SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`);
//       console.log(' Database Connected Successfully '.underline.white.bgMagenta.bold);
//     })
//     .catch((err) => {
//       console.log('unable to connect the database', err);
//     });
//   sequelize.sync({
//     alter: false,
//     // force: true,
//     // logging: false,
//   });
// });

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful! ------------------------------------------------------------------------------"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`app listening to port `, process.env.PORT);
});