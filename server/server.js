import express from 'express';
import bodyParser from 'body-parser';
import PartyRoutes from './routes/partyRoutes';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(PartyRoutes);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
