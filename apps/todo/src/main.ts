import * as express from 'express';
import bodyParser = require('body-parser');
import dotenv = require('dotenv');
import mongoose = require('mongoose');
import cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const ToleranceSchema = new mongoose.Schema({ name: String, value: Number });
const MultipliersSchema = new mongoose.Schema({ name: String, value: Number });

const Tolerance = mongoose.model('Tolerance', ToleranceSchema);
const Multipliers = mongoose.model('Multipliers', MultipliersSchema);

// GET data of the resistance color
app.get('/api/data', function (req, res) {
  try {
    Tolerance.find({}, function (err, todo) {
      const dataResponseMultipliers = [];
      const dataResponseTolerance = [];
      todo.forEach(function (toDo) {
        dataResponseTolerance.push(toDo);
      });
      Multipliers.find({}, function (err, todo) {
        todo.forEach(function (toDo) {
          dataResponseMultipliers.push(toDo);
        });
        res.status(200).send({
          success: true,
          dataResponseMultipliers,
          dataResponseTolerance,
        });
      });
    });
  } catch (error) {
    res.statusMessage = 'Denied access with the server';
    res.status(500).send({ success: false, msg: error });
  }
});

//conexion a la base de datos
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log('Connected to db!');
  app.listen(3333, () => console.log('Server Up and running'));
});
