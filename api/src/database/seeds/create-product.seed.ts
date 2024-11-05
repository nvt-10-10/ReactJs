import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

export default class CreateProducts implements Seeder {
  public async run(connection: Connection): Promise<void> {
    // Ensure you have valid user IDs if needed
    // const userIds = await connection.getRepository(User).find({ select: ['id'] });
    // const cartIds = await connection.getRepository(Cart).find({ select: ['id'] });

    const data = Array.from({ length: 50 }).map(() => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 1, max: 1000, dec: 2 })),
      user_id: faker.datatype.number({ min: 1, max: 10 }), // Adjusted to `faker.datatype.number`
      // cart_id: null, // Ensure cart_id column accepts null or adjust as necessary
    }));

    try {
      for (const itemObj of data) {
        await connection
          .createQueryBuilder()
          .insert()
          .into('products')
          .values(itemObj)
          .execute();
      }
    } catch (error) {
      console.error('Error inserting data into products:', error);
    }
  }
}
