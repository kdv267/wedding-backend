import express from 'express';
import mongoose from 'mongoose';
import Guest from './models/Guest.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const PORT = 5002;
const DB_URL = process.env.MONGO_URL;

const app = express();

console.log(DB_URL);

app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.status(200).json('Happy Wedding');
});

app.get('/:link', async (req, res) => {
  try {
    const guest = await Guest.findOne({ link: req.params.link });
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json('Ошибка чтения из БД');
  }
});

app.put('/:link', async (req, res) => {
  try {
    const { drink, food, music, comment,is_confirmed } = req.body;
    const guest = await Guest.findOneAndUpdate(
      { link: req.params.link },
      { drink, food, music, comment, is_confirmed },
      { new: true }
    );
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json('Ошибка записи в БД');
  }
});
app.post('/new_guest', async (req, res) => {
  try {
    const { link, name } = req.body;

    const guestData = { link, ...defaultValues, ...req.body };
    const guest = await Guest.create(guestData);
    res.status(201).json(guest);
  } catch (error) {
    res.status(500).json('Ошибка создания записи в БД');
  }
});

async function startApp(params) {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
  } catch (error) {
    console.log(error);
  }
}

startApp();
