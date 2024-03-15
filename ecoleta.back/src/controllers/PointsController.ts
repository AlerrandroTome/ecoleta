import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('point')
                                    .join('point_items', 'points.id', '=', 'point_items.point_id')
                                    .whereIn('point_items.item_id', parsedItems)
                                    .where('city', String(city))
                                    .where('uf', String(uf))
                                    .distinct()
                                    .select('points.*');

        return response.json(points);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({ message: 'Point not found.' });
        }

        const items = await knex('items')
                                    .join('point_items', 'items.id', '=', 'point_items.item_id')
                                    .where('point_items.point_id', id)
                                    .select('items.title');

        return response.json({ point, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1581264669997-3f222f331aaa?q=60&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
        const pointItems = items.map((item_id: Number) => {
            return {
                item_id,
                point_id
            };
        });
    
        await trx('point_items').insert(pointItems);
        await trx.commit();
        return response.json({ id: point_id, ...point });
    }
}

export default PointsController;