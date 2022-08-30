import { Router } from 'express';
import articlesApi from './article.routes';
import commentsApi from './comment.routes';

const routes = (router: Router) => {
    router.use('/articles', articlesApi(Router()));
    router.use('/comments', commentsApi(Router()));

    return router;
};

export default routes;