import { Express } from 'express';
import router from './api';

class Routes {
    static configure(app: Express) {
        app.use('/api', router);
    }
}

export default Routes;