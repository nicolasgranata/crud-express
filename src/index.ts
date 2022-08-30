import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Routes from './routes';
import errorHandler from './middlewares/error.handler';
import { seedDatabase } from './helpers';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

Routes.configure(app);

app.use(errorHandler);

const isArticleCollectionEmpty = async () : Promise<boolean> => {
    const articlesCount = await mongoose.connection.db.collection('articles').countDocuments();
    return articlesCount <= 0;
};

const start = async () => {
    await mongoose.connect('mongodb://localhost');

    if (await isArticleCollectionEmpty()) {
        await seedDatabase();
    }

    app.listen(3001, () => {        
        console.log('Server is listening on port 3001');
    });
};

start();