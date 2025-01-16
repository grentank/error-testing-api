const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(morgan('dev'));
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin);
    },
    credentials: true,
  }),
);
app.use(express.json());

/** *******************
 * The only endpoint **
 ********************* */
app.options(
  '*',
  cors({
    origin: (origin, callback) => {
      callback(null, origin);
    },
    credentials: true,
  }),
);
app.route('/status/:statusCode').all((req, res) => {
  const { statusCode } = req.params;
  if (!statusCode) return res.status(400).send('Wrong status code');
  const numStatusCode = parseInt(statusCode, 10);
  if (Number.isNaN(numStatusCode))
    return res.status(400).send('Status code is not an integer');
  if (numStatusCode < 400 || numStatusCode >= 600)
    return res.status(400).send('Status code must be 4xx or 5xx');

  const body = req.method === 'GET' ? req.query : req.body;
  if (!body || typeof body !== 'object' || !Object.keys(body).length)
    return res.sendStatus(numStatusCode);
  return res.status(numStatusCode).json(body);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
