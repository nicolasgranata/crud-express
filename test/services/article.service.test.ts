import { Article } from '../../src/models';
import { ArticleService } from '../../src/services';
import { setUp, dropDatabase } from '../setup';
import mongoose from 'mongoose';

beforeAll(async () => {
    await setUp();
});
  
afterAll(async () => {
    await dropDatabase();
});

const notCreateCases: Article[] = [
    {
        _id: '62f13a3a8707a6da6ff47350',
        author: '',
        title: 'Title',
        body: 'Body'
    },
    {
        _id: '62f13a3a8707a6da6ff47350',
        author: 'Me',
        title: '',
        body: 'Body'
    },
    {
        _id: '62f13a3a8707a6da6ff47350',
        author: 'Me',
        title: 'Title',
        body: ''
    },
];

describe('article service test suite', () => {
    it('should create an article', async () => {
        const article: Article = {
            _id: new mongoose.Types.ObjectId().toString(),
            author: 'Me',
            title: 'Title',
            body: 'Body'
        };

        const articleService = new ArticleService();
        const result = await articleService.create(article);

        expect(result).not.toBe(null);
        expect(result).not.toBe(undefined);
        expect(result.title).toBe(article.title);
        expect(result.author).toBe(article.author);
        expect(result.body).toBe(article.body);
        expect(result._id.toString()).toBe(article._id);
    });

    test.each(notCreateCases)('should not create an article', async (article) => {
        const articleService = new ArticleService();
        
        try {
            await articleService.create(article);
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        }
    });

    it('should fetch articles', async () => {
        const article: Article = {
            _id: new mongoose.Types.ObjectId().toString(),
            author: 'Me',
            title: 'Title',
            body: 'Body'
        };

        const articleService = new ArticleService();
        await articleService.create(article);
        const result = await articleService.fetch();
        
        expect(result).not.toBe(null);
        expect(result).not.toBe(undefined);
        expect(result.length).toBeGreaterThan(0);
    });

    it('should find article by id', async() => {
        const articleService = new ArticleService();
        const article: Article = {
            _id: new mongoose.Types.ObjectId().toString(),
            author: 'Me',
            title: 'Title',
            body: 'Body'
        };
        await articleService.create(article);
        const result = await articleService.find(article._id);

        expect(result?.title).toBe('Title');
        expect(result?.author).toBe('Me');
        expect(result?.body).toBe('Body');
    });

    it('should not find article by id', async() => {
        const articleService = new ArticleService();
        const result = await articleService.find(new mongoose.Types.ObjectId().toString());

        expect(result).toBe(null);
    });

    it('should update an article', async () => {
        const article: Article = {
            _id: new mongoose.Types.ObjectId().toString(),
            author: 'Me',
            title: 'Title',
            body: 'Body'
        };

        const articleUpdated: Article = {
            _id: article._id,
            author: 'Me',
            title: 'Title Updated',
            body: 'Body Updated'
        };

        const articleService = new ArticleService();
        const articleCreated = await articleService.create(article);
        const result  = await articleService.update(articleCreated._id, articleUpdated);

        expect(result?.title).toBe(articleUpdated.title);
        expect(result?.author).toBe(articleUpdated.author);
        expect(result?.body).toBe(articleUpdated.body);
        expect(result?._id.toString()).toBe(article._id);
    });

    it('should not update article not found', async () => {
        const article: Article = {
            _id: new mongoose.Types.ObjectId().toString(),
            author: 'author',
            title: 'Title',
            body: 'Body'
        };

        const articleService = new ArticleService();
        const result  = await articleService.update(article._id, article);

        expect(result).toBe(null);
    });

    it('should delete an article', async () => {
        const article: Article = {
            _id: new mongoose.Types.ObjectId().toString(),
            author: 'Me',
            title: 'Title',
            body: 'Body'
        };

        const articleService = new ArticleService();
        await articleService.create(article);
        const result  = await articleService.remove(article._id);

        expect(result?.title).toBe(article.title);
        expect(result?.author).toBe(article.author);
        expect(result?.body).toBe(article.body);
        expect(result?._id.toString()).toBe(article._id);
    });
});