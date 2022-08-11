import { Article, ArticleModel } from '../models';

class ArticleService {
    fetch(): Promise<Article[]> {
        return ArticleModel.find().lean().exec();
    }

    find(id: string): Promise<Article | null> {
        return ArticleModel.findById(id).lean().exec();
    }

    create(article: Article): Promise<Article> {
        return ArticleModel.create(article);
    }

    update(id: string, article: Article): Promise<Article | null> {
        return ArticleModel.findByIdAndUpdate(id, article, {new: true}).lean().exec();
    }

    remove(id: string): Promise<Article | null> {
        return ArticleModel.findByIdAndRemove(id).lean().exec();
    }
}

export default ArticleService;