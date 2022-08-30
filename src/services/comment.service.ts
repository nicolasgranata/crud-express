import { Comment, CommentModel } from '../models';

class CommentService {
    fetch(articleId: string): Promise<Comment[]> {
        return CommentModel.find({'articleId': articleId}).lean().exec();
    }

    create(comment: Comment): Promise<Comment> {
        return CommentModel.create(comment);
    }

    update(id: string, comment: Comment): Promise<Comment | null> {
        return CommentModel.findByIdAndUpdate(id, comment, {new: true}).lean().exec();
    }

    remove(id: string): Promise<Comment | null> {
        return CommentModel.findByIdAndRemove(id).lean().exec();
    }

    removeCommentsByArticle(articleId: string): Promise<Comment[] | null> {
        return CommentModel.remove({'articleId': articleId}).lean().exec();
    }
}

export default CommentService;