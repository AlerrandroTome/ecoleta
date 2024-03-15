import { Knex } from 'knex';

export async function seed(knex: Knex) 
{
    await knex('items').insert([
        { title: 'Lamps', Image: 'lamps.svg' },
        { title: 'Batteries', Image: 'batteries.svg' },
        { title: 'Papers and Cardboards', Image: 'papers-cardboards.svg' },
        { title: 'Electronic Waste', Image: 'electronics.svg' },
        { title: 'Organic Waste', Image: 'organic.svg' },
        { title: 'Kitchen Oil', Image: 'oil.svg' },
    ]);
}