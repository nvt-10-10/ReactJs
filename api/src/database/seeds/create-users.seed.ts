import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

export default class CreateUsers implements Seeder {
  public async run(connection: Connection): Promise<any> {
    const user = {
      email: 'admin@gmail.com',
      password: '12345678',
      name: 'Nguyễn Văn Tuyên',
    };
    await connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values(user)
      .execute();
    const data = Array.from({ length: 20 }).map(() => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      roleId: faker.number.int({ min: 1, max: 3 }),
      password: bcrypt.hashSync('12345678', 10),
      status: faker.number.int({ min: 0, max: 1 }),
      avatar: faker.image.avatar(),
    }));

    for (const itemObj of data) {
      await connection
        .createQueryBuilder()
        .insert()
        .into('users')
        .values(itemObj)
        .execute();
    }
  }
}
