import { Router } from 'express';
import { ArticleController } from '../../controllers';
import { ArticleService, CommentService } from '../../services';

const articlesApi = (router: Router) => {
    const ac = new ArticleController(new ArticleService(), new CommentService());
    router.get('/', ac.fetch.bind(ac));
    router.post('/', ac.create.bind(ac));
    router.get('/:id', ac.find.bind(ac));
    router.put('/:id', ac.update.bind(ac));
    router.delete('/:id', ac.delete.bind(ac));

    return router;
};

export default articlesApi;