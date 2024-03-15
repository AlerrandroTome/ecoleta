import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const _pointsController = new PointsController();
const _itemsController = new ItemsController();

// ITEMS
routes.get('/items', _itemsController.index);


// POINTS
routes.post('/points', _pointsController.create);
routes.get('/points', _pointsController.index);
routes.get('/points/:id', _pointsController.show);

export default routes;