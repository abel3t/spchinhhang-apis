import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(async (_req, res, next) => {
  res.header('Local-Time', new Date().getTime().toString());
  next();
});

app.get('/', (_req, res) => {
  return res.json({ data: 'Hello World!'})
})

app.listen(8080, () => console.log(''))