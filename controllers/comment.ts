import { Request, Response } from 'express';
import { articles, comments} from '../services/storage';

class CommentController {
    static fetch(req: Request, res) {
        res.send();
    }


    static create(req: Request, res: Response) {
        if (!req.body.comment) {
            res.status(400).send('No comment provided');
            return;
        }

        const article = articles.find(article => article.id === req.body.comment.articleId);

        if (!article) {
            res.status(400).send('Article does not exist');
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {articleId, ...comment} = req.body.comment;
        comment.article = article.id;
        comments.push(req.body.comment);
        res.status(201).send();
    }
}

export default CommentController;