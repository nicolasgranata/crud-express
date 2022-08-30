import { Comment } from '../../src/models';
import { CommentService } from '../../src/services';
import { setUp, dropDatabase } from '../setup';
import mongoose from 'mongoose';

beforeAll(async () => {
    await setUp();
});
  
afterAll(async () => {
    await dropDatabase();
});

const notCreateCases: Comment[] = [
    {
        _id: '62f13a3a8707a6da6ff47350',
        articleId: '62f13a3a8707a6da6ff47352',
        author: '',
        body: 'Body'
    },
    {
        _id: '62f13a3a8707a6da6ff47350',
        articleId: '62f13a3a8707a6da6ff47352',
        author: 'Me',
        body: ''
    }
];

describe('comment service test suite', () => {
    it('should create a comment', async () => {
        const comment: Comment = {
            _id: new mongoose.Types.ObjectId().toString(),
            articleId: new mongoose.Types.ObjectId().toString(),
            author: 'Me',
            body: 'Body'
        };

        const commentService = new CommentService();
        const result = await commentService.create(comment);

        expect(result).not.toBe(null);
        expect(result).not.toBe(undefined);
        expect(result.author).toBe(comment.author);
        expect(result.body).toBe(comment.body);
        expect(result._id.toString()).toBe(comment._id);
        expect(result.articleId.toString()).toBe(comment.articleId);
    });

    test.each(notCreateCases)('should not create a comment', async (comment) => {
        const commentService = new CommentService();
        
        try {
            await commentService.create(comment);
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        }
    });

    it('should fetch comments', async () => {
        const articleId = new mongoose.Types.ObjectId().toString();
        const comments: Comment[] = [
            {
                _id: new mongoose.Types.ObjectId().toString(),
                articleId: articleId,
                author: 'Me',
                body: 'Body'
            },
            {
                _id: new mongoose.Types.ObjectId().toString(),
                articleId: articleId,
                author: 'Me',
                body: 'Body'
            }
        ];

        const commentService = new CommentService();
        const commentTask: Promise<Comment>[] = [];
        comments.forEach((comment)  => commentTask.push(commentService.create(comment)));
        await Promise.all(commentTask);
        const result = await commentService.fetch(articleId);
        
        expect(result).not.toBe(null);
        expect(result).not.toBe(undefined);
        expect(result.length).toBe(2);
    });

    it('should update a comment', async () => {
        const articleId = new mongoose.Types.ObjectId().toString();
        const comment: Comment = {
            _id: new mongoose.Types.ObjectId().toString(),
            articleId: articleId,
            author: 'Me',
            body: 'Body'
        };

        const commentUpdated: Comment = {
            _id: comment._id,
            articleId: articleId,
            author: 'Me',
            body: 'Body Updated'
        };

        const commentService = new CommentService();
        await commentService.create(comment);
        const result  = await commentService.update(comment._id, commentUpdated);

        expect(result?.author).toBe(commentUpdated.author);
        expect(result?.body).toBe(commentUpdated.body);
        expect(result?._id.toString()).toBe(commentUpdated._id);
        expect(result?.articleId.toString()).toBe(commentUpdated.articleId);
    });

    it('should not update comment not found', async () => {
        const comment: Comment = {
            _id: new mongoose.Types.ObjectId().toString(),
            articleId: new mongoose.Types.ObjectId().toString(),
            author: 'author',
            body: 'Body'
        };

        const commentService = new CommentService();
        const result  = await commentService.update(comment._id,comment);

        expect(result).toBe(null);
    });

    it('should delete a comment', async () => {
        const comment: Comment = {
            _id: new mongoose.Types.ObjectId().toString(),
            articleId: new mongoose.Types.ObjectId().toString(),
            author: 'author',
            body: 'Body'
        };

        const commentService = new CommentService();
        await commentService.create(comment);
        const result  = await commentService.remove(comment._id);

        expect(result?.author).toBe(comment.author);
        expect(result?.body).toBe(comment.body);
        expect(result?._id.toString()).toBe(comment._id);
        expect(result?.articleId.toString()).toBe(comment.articleId);
    });
});