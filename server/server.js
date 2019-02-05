import express from 'express';
import bodyParser from 'body-parser';
import officeRoute from './routes/officeRoutes';
import partyRoute from './routes/partyRoutes';
import userRoute from './routes/userRoutes';

const port = process.env.PORT || 3000;
const app = express();
const apiUrlVersion1 = '/api/v1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(apiUrlVersion1, partyRoute);
app.use(apiUrlVersion1, officeRoute);
app.use(apiUrlVersion1, userRoute);

if (!module.parent) {
  app.listen(port);
}

export default app;
