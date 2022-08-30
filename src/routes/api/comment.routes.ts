import { Router } from 'express';
import { CommentController } from '../../controllers';
import { CommentService } from '../../services';

const commentsApi = (router: Router) => {
    const commentCtrl = new CommentController(new CommentService());
    router.get('/', commentCtrl.fetch.bind(commentCtrl));
    router.post('/', commentCtrl.create.bind(commentCtrl));
    router.put('/:id', commentCtrl.update.bind(commentCtrl));
    router.delete('/:id', commentCtrl.delete.bind(commentCtrl));

    return router;
};

export default commentsApi;