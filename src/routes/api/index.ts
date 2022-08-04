import { Router } from 'express';
import articlesApi from './article';

const routes = (router: Router) => {
    router.use('/articles', articlesApi(Router()));

    return router;
};

export default routes;