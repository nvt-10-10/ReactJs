import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class CreateRolePermissions implements Seeder {
  public async run(connection: Connection): Promise<any> {
    const data = [
      {
        roleId: 1,
        permissionId: 1,
      },
      {
        roleId: 1,
        permissionId: 2,
      },
      {
        roleId: 2,
        permissionId: 3,
      },
      {
        roleId: 2,
        permissionId: 4,
      },
      {
        roleId: 3,
        permissionId: 5,
      },
      {
        roleId: 3,
        permissionId: 6,
      },
      // Thêm các role-permission khác nếu cần
    ];

    for (const itemObj of data) {
      await connection
        .createQueryBuilder()
        .insert()
        .into('role_permissions')
        .values(itemObj)
        .execute();
    }
  }
}
