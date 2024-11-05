import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

export default class CreateCarts implements Seeder {
  public async run(connection: Connection): Promise<any> {
    const data = Array.from({ length: 30 }).map(() => ({
      quantity: faker.number.int({ min: 1, max: 10 }),
      user_id: faker.number.int({ min: 1, max: 10 }),
    }));

    for (const item of data)
      await connection
        .createQueryBuilder()
        .insert()
        .into('carts')
        .values(item)
        .execute();
  }
}
