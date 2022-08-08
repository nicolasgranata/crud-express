import { Router } from 'express';
import articlesApi from './article';
import commentsApi from './comment';

const routes = (router: Router) => {
    router.use('/articles', articlesApi(Router()));
    router.use('/comments', commentsApi(Router()));

    return router;
};

export default routes;