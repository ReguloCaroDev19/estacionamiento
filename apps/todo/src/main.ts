import * as express from 'express';
import bodyParser = require('body-parser');
import dotenv = require('dotenv');
import mongoose = require('mongoose');
import cors = require('cors');
import { type } from 'os';

dotenv.config();
const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const VehiculoSchema = new mongoose.Schema({
  placa: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 120,
    unique: true,
  },
  residente: {
    type: String,
    required: true,
    enum: ['Oficial', 'Residente', 'No residente'],
    default: 'Oficial',
  },
  entrada: [{ type: Date }],
  salida: [{ type: Date }],
  cobro: [
    {
      type: Number,
      default: 0,
    },
  ],
});

const Vehiculo = mongoose.model('Vehiculo', VehiculoSchema);
const jsonParser = bodyParser.json();

// GET todos los vehiculos
app.get('/api/datos', function (req, res) {
  try {
    Vehiculo.find({}, function (err, todo) {
      const todoMap = [];

      todo.forEach(function (toDo) {
        todoMap.push(toDo);
      });
      res.statusMessage = 'Acceso a datos correcto';
      res.status(200).send(todoMap);
    });
  } catch (error) {
    res.statusMessage = 'No hay acceso al servidor';
    res.status(500).send(error);
  }
});
// POST ingresa vehiculos por json
app.post('/api/datos', jsonParser, async function (req, res) {
  const { placa, residente } = req.body;

  const item = new Vehiculo({
    placa,
    residente,
  });
  try {
    await item.save();
    res.statusMessage = 'Se ingreso al usuario correctamente';
    res.status(200);
  } catch (err) {
    res.statusMessage = 'No se ingreso el vehiculo';
    res.status(500).send(err);
  }
});
//DELETE elimina por id
app.delete('/api/datos/:id', (req, res) => {
  Vehiculo.findByIdAndDelete(req.params.id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.statusMessage = 'Se dio salida correctamente';
      res.status(200).send(todo);
    })
    .catch((error) => {
      res.statusMessage = 'No se elimino el vehiculo';
      res.status(500).send(error);
    });
});
//PATCH update por id
app.patch('/api/datos/:id', jsonParser, async function (req, res) {
  const { entrada, salida, cobro } = req.body;
  try {
    Vehiculo.findByIdAndUpdate(req.params.id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).send();
        }

        todo.entrada.push(entrada);
        todo.salida.push(salida);
        todo.cobro.push(cobro);
        todo.save();
        console.log(todo);
        res.statusMessage = 'Se actualizo correctamente';
        res.status(200).send(todo);
      })
      .catch((error) => {
        res.statusMessage = 'Internal Error server';
        res.status(500).send(error);
      });
  } catch (error) {
    console.log(error);
  }
});
//conexion a la base de datos
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log('Connected to db!');
  app.listen(3333, () => console.log('Server Up and running'));
});
