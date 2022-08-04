import { Article, ArticleModel } from '../models';

class ArticleService {
    fetch() {
        return ArticleModel.find().lean().exec();
    }

    find(id: string) {
        return ArticleModel.findById(id).lean().exec();
    }

    create(article: Article) {
        return ArticleModel.create(article);
    }

    update(id: string, article: Article) {
        return ArticleModel.findByIdAndUpdate(id, article, {new: true}).lean().exec();
    }

    remove(id: string) {
        return ArticleModel.findByIdAndRemove(id).lean().exec();
    }
}

export default ArticleService;