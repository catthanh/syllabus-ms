import { hashSync } from 'bcrypt';
import { setSeederFactory } from 'typeorm-extension';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { faker } from '@faker-js/faker/locale/vi';

export default setSeederFactory(UserEntity, () => {
  const user = new UserEntity();
  user.name = faker.name.fullName();
  user.username = '1902' + faker.random.numeric(4);
  user.password = hashSync('123456', 10);
  return user;
});
