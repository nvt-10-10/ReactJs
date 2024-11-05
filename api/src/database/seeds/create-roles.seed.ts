import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class CreateRoles implements Seeder {
  public async run(connection: Connection): Promise<any> {
    const data = [
      {
        name: 'HR',
        codeName: 'HR',
        status: true,
      },
      {
        name: 'Manager',
        codeName: 'Manager',
        status: true,
      },
      {
        name: 'Staff',
        codeName: 'Staff',
        status: true,
      },
    ];
    for (const itemObj of data) {
      await connection
        .createQueryBuilder()
        .insert()
        .into('roles')
        .values(itemObj)
        .execute();
    }
  }
}
