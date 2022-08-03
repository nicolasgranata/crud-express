import { Types } from 'mongoose';
import { Article } from '../models/article';
import { Comment } from '../models/comment';

const { ObjectId } = Types;

export const articles: Article [] = [{
    id: new ObjectId().toString(),
    title: 'Article 1',
    author: 'John Doe',
    body: 'This is the body of article 1',
}];

export const comments: Comment[] = [];