import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

export default class CreateAttributes implements Seeder {
  public async run(connection: Connection): Promise<any> {
    const data = Array.from({ length: 100 }).map(() => ({
      name: faker.commerce.productMaterial(),
      product_id: faker.number.int({ min: 1, max: 10 }),
    }));
    for (const itemObj of data) {
      await connection
        .createQueryBuilder()
        .insert()
        .into('attributes')
        .values(itemObj)
        .execute();
    }
  }
}
