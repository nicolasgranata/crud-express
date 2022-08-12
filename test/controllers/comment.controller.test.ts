import { CommentController } from '../../src/controllers';
import { Comment } from '../../src/models';
import { CommentService } from '../../src/services';
import { createRequest, createResponse } from 'node-mocks-http';
import { NextFunction } from 'express';
import EventEmitter from 'events';

beforeEach(() => 
    jest.clearAllMocks()
);

const commentServiceMock = jest.mocked<CommentService>(new CommentService());

const nextFn: NextFunction = jest.fn();

describe('comment controller test suite', () => {
    it('should fetch comments', async () => {
        const comment : Comment = {
            _id: '2',
            articleId: '2',
            author: 'Me',
            body: 'Body',
        };

        commentServiceMock.fetch = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve(new Array<Comment>(comment));
        });

        const commentController = new CommentController(commentServiceMock);
        const response = createResponse();
        await commentController.fetch(createRequest(), response, nextFn);
        expect(commentServiceMock.fetch).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });

    it('should create a comment', async () => {
        const request = createRequest({
            body: {
                _id: '3',
                articleId: '2',
                author: 'Me',
                body: 'Body',
            }
        });

        commentServiceMock.create = jest.fn().mockImplementationOnce(() => { return Promise.resolve(request.body);});

        const commentController = new CommentController(commentServiceMock);
        const response = createResponse({
            eventEmitter: EventEmitter,
        });

        await commentController.create(request, response, nextFn);

        expect(response.statusCode).toBe(201);
        expect(commentServiceMock.create).toBeCalledTimes(1);
    });

    it('should not create a comment', async () => {
        const commentController = new CommentController(commentServiceMock);
        const response = createResponse({
            eventEmitter: EventEmitter,
        });

        const request = createRequest();

        let result = '';
        
        response.on('send', () => {
            result = response._getData();
        });

        await commentController.create(request, response, nextFn);

        expect(response.statusCode).toBe(400);
        expect(result).toBe('Comment is empty');
    });

    it('should update a comment', async () => {
        const commentController = new CommentController(commentServiceMock);
        const response = createResponse({
            eventEmitter: EventEmitter,
        });

        const request = createRequest({
            params : { id: '3'},
            body: {
                _id: '3',
                articleId: '2',
                author: 'Me',
                body: 'Body Updated',
            }
        });

        let result = {} as Comment;

        response.on('send', () => {
            result = response._getData();
        });

        commentServiceMock.update = jest.fn().mockImplementationOnce(() => { return Promise.resolve(request);});

        await commentController.update(request, response, nextFn);

        expect(result.body).toBe('Body Updated');
        expect(response.statusCode).toBe(200);
    });

    it('should not update comment not found', async () => {
        const commentController = new CommentController(commentServiceMock);
        const response = createResponse({
            eventEmitter: EventEmitter,
        });

        const request = createRequest({
            params : { id: '100'},
            body: {
                _id: '100',
                articleId: '2',
                author: 'Me',
                body: 'Body Updated',
            }
        });

        let result = {} as Comment;

        response.on('send', () => {
            result = response._getData();
        });

        commentServiceMock.update = jest.fn().mockImplementationOnce(() => { return Promise.resolve(null);});

        await commentController.update(request, response, nextFn);

        expect(result).toBe('Comment not found');
        expect(response.statusCode).toBe(404);
    });

    it('should delete a comment', async () => {
        const commentServiceMock = jest.mocked<CommentService>(new CommentService());
        const commentController = new CommentController(commentServiceMock);
        const response = createResponse({
            eventEmitter: EventEmitter,
        });

        const request = createRequest({
            params : { id: '1'}
        });

        commentServiceMock.remove = jest.fn().mockImplementationOnce(() => { return Promise.resolve();});

        await commentController.delete(request, response, nextFn);

        expect(response.statusCode).toBe(204);
    });
});