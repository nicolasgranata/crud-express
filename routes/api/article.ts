import { Router } from 'express';
import { ArticleController } from '../../controllers';

const articleRouter = Router();

articleRouter.get('/', ArticleController.fetch);
articleRouter.post('/', ArticleController.create);
articleRouter.get('/:id', ArticleController.find);
articleRouter.put('/:id', ArticleController.update);
articleRouter.delete('/:id', ArticleController.delete);

export default articleRouter;