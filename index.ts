import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

Routes.configure(app);

// app.get('/', (req, res) => {
//     res.send("BOKEE");
// });

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});