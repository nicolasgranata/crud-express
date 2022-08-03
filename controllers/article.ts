import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { articles } from '../services/storage';

const { ObjectId } = Types;

class ArticleController {
    static fetch(_req: Request, res: Response) {
        res.send(articles);
    }

    static find(req: Request, res: Response) {
        const article = articles.find(article => article.id === req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        res.status(200).send(article);
    }

    static create(req: Request, res: Response) {
        if (!req.body.article) {
            return res.status(400).send('Article is empty');

        }
        const article = req.body.article;
        article.id = new ObjectId().toString();
        articles.push(article);
        res.status(201).send();
    }

    static update(req: Request, res: Response ) {
        const article = articles.find(article => article.id === req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        const updatedArticle = {...article, ...req.body.article};
        articles[articles.indexOf(article)] = updatedArticle;
        res.send(updatedArticle);
    }

    static delete(req: Request, res: Response) {
        const article = articles.find(article => article.id === req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        articles.splice(articles.indexOf(article), 1);
        res.status(204).send();
    }
}

export default ArticleController;