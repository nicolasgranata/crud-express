import * as mongoose from 'mongoose';

interface Comment {
    _id: string,
    articleId: string,
    author: string,
    body: string,
}

const schema = new mongoose.Schema<Comment>({
    author: {type: String, required: true},
    body: {type: String, required: true},
    articleId: {type: String, required: true}
}, {timestamps: true});

const CommentModel = mongoose.model<Comment>('Comment', schema);

export { Comment };
export { CommentModel };