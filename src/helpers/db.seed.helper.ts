import { Article, ArticleModel, Comment, CommentModel } from '../models';
import mongoose from 'mongoose';

const articles: Article[] = [
    {
        _id: new mongoose.Types.ObjectId().toString(),
        author: 'John Doe',
        title: 'Article #1',
        body: 'This is the body of the article #1'
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        author: 'Jane Doe',
        title: 'Article #2',
        body: 'This is the body of the article #2'
    }
];

const comments: Comment[] = [
    {
        _id: new mongoose.Types.ObjectId().toString(),
        articleId: articles[0]._id,
        author: 'Jane Doe',
        body: 'This is comment #1'
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        articleId: articles[0]._id,
        author: 'John Doe',
        body: 'This is comment #2'
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        articleId: articles[1]._id,
        author: 'Jane Doe',
        body: 'This is comment #1'
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        articleId: articles[1]._id,
        author: 'John Doe',
        body: 'This is comment #2'
    }
];

export const seedDatabase = async () => {
    try {

        if (mongoose.connection.readyState === 1) {
            await mongoose.connect('mongodb://localhost');
        }

        await mongoose.connection.db.collection('articles').drop();
    
        await mongoose.connection.db.collection('comments').drop();

        const articleTasks: Promise<unknown>[] = [];
        articles.forEach((article) => articleTasks.push(ArticleModel.create(article)));
        await Promise.all(articleTasks);
        console.log(await Promise.all(articleTasks));
    
        const commentTask: Promise<unknown>[] = [];
        comments.forEach((comment) => commentTask.push(CommentModel.create(comment)));
        console.log(await Promise.all(commentTask));

    } catch (error) {
        console.log(error);
    }
};