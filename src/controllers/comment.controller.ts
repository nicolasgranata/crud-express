import { NextFunction, Request, Response } from 'express';
import { CommentService } from '../services';

export default class CommentController {
    constructor(private readonly commentService: CommentService) { }

    public async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            const { article } = req.query; 
            res.send(await this.commentService.fetch(article?.toString() ?? ''));
        } catch (error) {
            next(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        if (!req) {
            return res.status(400).send('Comment is empty');

        }
        try {
            const comment = req.body;
            await this.commentService.create(comment);
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.commentService.update(req.params.id, req.body);
            if (!result) {
                return res.status(404).send('Comment not found');
            }
            res.send(result);
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await this.commentService.remove(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}