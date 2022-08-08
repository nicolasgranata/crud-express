import { NextFunction, Request, Response } from 'express';
import { ArticleService } from '../services';

export default class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

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
        if (!req) {
            return res.status(400).send('Article is empty');

        }
        const article = req.body;

        try {
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
            await this.articleService.remove(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}