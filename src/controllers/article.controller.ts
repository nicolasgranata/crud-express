import { NextFunction, Request, Response } from 'express';
import { Article } from '../models';
import { ArticleService } from '../services';

export default class ArticleController {
    private articleService: ArticleService;

    constructor(_articleService: ArticleService) {
        this.articleService = _articleService;
    }

    public async fetch(_req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await this.articleService.fetch());
        } catch (err) {
            next(err);
        }
    }

    public async find(req: Request, res: Response)  {
        const article = await this.articleService.find(req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        res.status(200).send(article);
    }

    public async create(req: Request<unknown, unknown, Article>, res: Response) {
        if (!req.body) {
            return res.status(400).send('Article is empty');

        }
        const article = req.body;
        await this.articleService.create(article);
        res.status(201).send();
    }

    public async update(req: Request, res: Response ) {
        const result = await this.articleService.update(req.params.id, req.body);
        if (!result) {
            return res.status(404).send('Article not found');
        }
        res.send(result);
    }

    public async delete(req: Request, res: Response) {
        await this.articleService.remove(req.params.id);
        res.status(204).send();
    }
}