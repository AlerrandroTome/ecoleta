import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import { celebrate, Joi } from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig);

const _pointsController = new PointsController();
const _itemsController = new ItemsController();

// ITEMS
routes.get('/items', _itemsController.index);


// POINTS
routes.post('/points', 
    upload.single('image'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required(),
            items: Joi.string().required(),
        })
    },
    {
        abortEarly: false
    }), 
    _pointsController.create
);
routes.get('/points', _pointsController.index);
routes.get('/points/:id', _pointsController.show);

export default routes;