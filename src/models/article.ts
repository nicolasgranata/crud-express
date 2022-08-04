import * as mongoose from 'mongoose';

interface Article {
    title: string,
    body: string,
    author: string
}

const schema = new mongoose.Schema<Article>({
    title: {type: String, required: true},
    author: {type: String, required: true},
    body: {type: String, required: true}
}, {timestamps: true});

const ArticleModel = mongoose.model<Article>('Article', schema);

export { Article };
export { ArticleModel };