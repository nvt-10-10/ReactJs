import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class CreatePermissions implements Seeder {
  public async run(connection: Connection): Promise<any> {
    const data = [
      {
        id: 1,
        name: 'Bank code',
        codeName: 'Bank code',
      },
      {
        id: 2,
        name: 'Payroll List',
        codeName: 'PAYROLL',
      },
      {
        id: 3,
        name: 'Bank upload specs',
        codeName: 'PAYROLL',
      },
      {
        id: 4,
        name: 'Checking No Pay Leave',
        codeName: 'Time Management',
      },
      {
        id: 5,
        name: 'Create no payment schedule',
        codeName: 'Time Management',
      },
      {
        id: 6,
        name: 'Adjust actual working days',
        codeName: 'Time Management',
      },
      {
        id: 7,
        name: 'Adjust annual leave fund',
        codeName: 'Time Management',
      },
      {
        id: 8,
        name: 'Checking No Pay Leave',
        codeName: 'COMPANY',
      },
      {
        id: 9,
        name: 'Create no payment schedule',
        codeName: 'COMPANY',
      },
      {
        id: 10,
        name: 'Compulsory Insurance',
        codeName: 'COMPANY',
      },
      {
        id: 11,
        name: 'Tax',
        codeName: 'COMPANY',
      },
      {
        id: 12,
        name: 'Setup working calendar in a year',
        codeName: 'SETTING',
      },
      {
        id: 13,
        name: 'Notification',
        codeName: 'SETTING',
      },
    ];
    for (const itemObj of data) {
      await connection
        .createQueryBuilder()
        .insert()
        .into('permissions')
        .values(itemObj)
        .execute();
    }
  }
}
