import { ArticleController } from '../../src/controllers';
import { Article } from '../../src/models';
import { ArticleService, CommentService } from '../../src/services';
import { createRequest, createResponse } from 'node-mocks-http';
import { NextFunction } from 'express';
import EventEmitter from 'events';

beforeEach(() => 
    jest.clearAllMocks()
);

const articleServiceMock = jest.mocked<ArticleService>(new ArticleService());

const nextFn: NextFunction = jest.fn();

const getArticles = () => {
    return new Array<Article>(
        {
            _id: '1',
            author: 'Me',
            title: 'Title',
            body: 'Body'
        },
        {
            _id: '2',
            author: 'Me',
            title: 'Title',
            body: 'Body'
        }
    );
};

describe('article controller test suite', () => {
    it('should fetch articles', async () => {
        const article : Article = {
            _id: '1',
            author: 'Me',
            title: 'Title',
            body: 'Body'
        };

        articleServiceMock.fetch = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve(new Array<Article>(article));
        });

        const articleController = new ArticleController(articleServiceMock, new CommentService());
        const response = createResponse();
        await articleController.fetch(createRequest(), response, nextFn);
        expect(articleServiceMock.fetch).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });

    it('should find article by id', async() => {

        const request = createRequest({
            params : { id : '2' }
        });

        articleServiceMock.find = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve(getArticles().find(a => a._id === request.params.id));
        });

        const articleController = new ArticleController(articleServiceMock, new CommentService());
        const response = createResponse({
            eventEmitter: EventEmitter,
        });

        let result = '';
        
        response.on('send', () => {
            result = response._getData();
        });

        await articleController.find(request, response, nextFn);

        expect(response.statusCode).toBe(200);
        expect(articleServiceMock.find).toBeCalledTimes(1);
        expect(result).toBeTruthy();
    });

    it('should not find article by id', async() => {
        const request = createRequest({
            params : { id : '8' }
        });

        articleServiceMock.find = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve(getArticles().find(a => a._id === request.params.id));
        });

        const articleController = new ArticleController(articleServiceMock, new CommentService());
        const response = createResponse({
            eventEmitter: EventEmitter,
        });

        let result = '';
        
        response.on('send', () => {
            result = response._getData();
        });

        await articleController.find(request, response, nextFn);

        expect(response.statusCode).toBe(404);
        expect(articleServiceMock.find).toBeCalledTimes(1);
        expect(result).toBe('Article not found');
    });

    it('should create an article', async () => {
        const request = createRequest({
            body: {
                _id: '2',
                author: 'Me',
                title: 'Title',
                body: 'Body'
            }
        });

        articleServiceMock.create = jest.fn().mockImplementationOnce(() => { return Promise.resolve(request.body);});

        const articleController = new ArticleController(articleServiceMock, new CommentService());
        const response = createResponse({
            eventEmitter: EventEmitter,
        });

        await articleController.create(request, response, nextFn);

        expect(response.statusCode).toBe(201);
        expect(articleServiceMock.create).toBeCalledTimes(1);
    });

    it('should not create an article', async () => {
        const articleController = new ArticleController(articleServiceMock, new CommentService());
        const response = createResponse({
            eventEmitter: EventEmitter,
        });

        const request = createRequest();

        let result = '';
        
        response.on('send', () => {
            result = response._getData();
        });

        await articleController.create(request, response, nextFn);

        expect(response.statusCode).toBe(400);
        expect(result).toBe('Article is empty');
    });

    it('should update an article', async () => {
        const articleController = new ArticleController(articleServiceMock, new CommentService());
        const response = createResponse({
            eventEmitter: EventEmitter,
        });

        const request = createRequest({
            params : { id: '1'},
            body: {
                _id: '1',
                author: 'Me',
                title: 'Title Updated',
                body: 'Body Updated'
            },
        });

        let result = {} as Article;

        response.on('send', () => {
            result = response._getData();
        });

        articleServiceMock.update = jest.fn().mockImplementationOnce(() => { return Promise.resolve(request);});

        await articleController.update(request, response, nextFn);

        expect(result.title).toBe('Title Updated');
        expect(response.statusCode).toBe(200);
    });

    it('should not update article not found', async () => {
        const articleController = new ArticleController(articleServiceMock, new CommentService());
        const response = createResponse({
            eventEmitter: EventEmitter,
        });

        const request = createRequest({
            params : { id: '6'},
            body: {
                _id: '6',
                author: 'Me',
                title: 'Title Updated',
                body: 'Body Updated'
            },
        });

        let result = {} as Article;

        response.on('send', () => {
            result = response._getData();
        });

        articleServiceMock.update = jest.fn().mockImplementationOnce(() => { return Promise.resolve(null);});

        await articleController.update(request, response, nextFn);

        expect(result).toBe('Article not found');
        expect(response.statusCode).toBe(404);
    });

    it('should delete an article', async () => {
        const commentServiceMock = jest.mocked<CommentService>(new CommentService());
        const articleController = new ArticleController(articleServiceMock, commentServiceMock);
        const response = createResponse({
            eventEmitter: EventEmitter,
        });

        const request = createRequest({
            params : { id: '1'}
        });

        articleServiceMock.remove = jest.fn().mockImplementationOnce(() => { return Promise.resolve();});
        commentServiceMock.removeCommentsByArticle = jest.fn().mockImplementationOnce(() => { return Promise.resolve();});

        await articleController.delete(request, response, nextFn);

        expect(response.statusCode).toBe(204);
    });
});