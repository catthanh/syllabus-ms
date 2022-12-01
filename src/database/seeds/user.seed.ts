import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { DepartmentEntity } from '../../modules/departments/department.entity';
import { RoleDepartmentUser } from '../../modules/users/entities/role-department-user.entity';
import { hashSync } from 'bcrypt';
import { RoleEnum } from '../../modules/users/role.enum';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(UserEntity);
    const departmentRepository = dataSource.getRepository(DepartmentEntity);
    await departmentRepository.insert([
      {
        name: 'Khoa Công nghệ thông tin',
      },
    ]);
    await departmentRepository.insert([
      {
        name: 'Khoa Điện tử viễn thông',
      },
    ]);
    await departmentRepository.insert([
      {
        name: 'Phòng Đào tạo',
      },
    ]);

    const userFactory = await factoryManager.get(UserEntity);
    // save 50 factory generated entities, to the database
    const students = await userFactory.saveMany(50);

    const roleDepartmentUserRepository =
      dataSource.getRepository(RoleDepartmentUser);
    const cntt = await departmentRepository.findOne({
      where: {
        name: 'Khoa Công nghệ thông tin',
      },
    });

    const roleDepartment1 = students.map((student) =>
      roleDepartmentUserRepository.create({
        department: cntt,
        role: RoleEnum.STUDENT,
        user: student,
      }),
    );

    const lecturers = await userRepository.save([
      {
        name: 'Ma Thị',
        username: 'chau.mt',
        password: hashSync('123456', 10),
      },
      {
        name: 'Hồ Đắc',
        username: 'phuong.hd',
        password: hashSync('123456', 10),
      },

      {
        name: 'Cấn Duy',
        username: 'cat.cd',
        password: hashSync('123456', 10),
      },
    ]);
    const roleDepartment2 = lecturers.map((lecturer) =>
      roleDepartmentUserRepository.create({
        department: cntt,
        role: RoleEnum.LECTURER,
        user: lecturer,
      }),
    );
    await roleDepartmentUserRepository.insert([
      ...roleDepartment1,
      ...roleDepartment2,
    ]);
  }
}
