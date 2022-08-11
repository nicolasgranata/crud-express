import { NextFunction, Request, Response } from 'express';
import { Article } from '../models';
import { ArticleService, CommentService } from '../services';

export default class ArticleController {
    constructor(private readonly articleService: ArticleService,
        private readonly commentService: CommentService) { }

    public async fetch(_req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await this.articleService.fetch());
        } catch (error) {
            next(error);
        }
    }

    public async find(req: Request, res: Response, next: NextFunction)  {
        try {
            const article = await this.articleService.find(req.params.id);
            if (!article) {
                return res.status(404).send('Article not found');
            }
            res.status(200).send(article);
        } catch (error) {
            next(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        if (Object.keys(req.body).length === 0 || !req.body) {
            return res.status(400).send('Article is empty');
        }
        try {
            const article = req.body;
            await this.articleService.create(article);
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.articleService.update(req.params.id, req.body);
            if (!result) {
                return res.status(404).send('Article not found');
            }
            res.send(result);
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const articleId = req.params.id;
            await this.articleService.remove(articleId);
            await this.commentService.removeCommentsByArticle(articleId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}