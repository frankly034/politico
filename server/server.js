import express from 'express';
import bodyParser from 'body-parser';
import partyRoute from './routes/partyRoutes';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiUrlVersion1 = '/api/v1';

app.use(apiUrlVersion1, partyRoute);

if (!module.parent) {
  app.listen(port);
}

export default app;
