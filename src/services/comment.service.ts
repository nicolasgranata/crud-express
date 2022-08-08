import { Comment, CommentModel } from '../models';

class CommentService {
    fetch(articleId: string) {
        return CommentModel.find({'articleId': articleId}).lean().exec();
    }

    create(comment: Comment) {
        return CommentModel.create(comment);
    }

    update(id: string, comment: Comment) {
        return CommentModel.findByIdAndUpdate(id, comment, {new: true}).lean().exec();
    }

    remove(id: string) {
        return CommentModel.findByIdAndRemove(id).lean().exec();
    }
}

export default CommentService;