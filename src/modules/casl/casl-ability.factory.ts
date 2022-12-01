import {
  AbilityBuilder,
  AbilityTuple,
  MatchConditions,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { RoleEnum } from '../users/role.enum';
import { ActionEnum } from './action.enum';

export type AppAbility = PureAbility<AbilityTuple, MatchConditions>;
const lambdaMatcher = (matchConditions: MatchConditions) => matchConditions;

@Injectable()
export class CaslAbilityFactory {
  defineAbilityFor(user: UserEntity): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(PureAbility);

    if (user.userToDepartments.some((role) => role.role === RoleEnum.ADMIN)) {
      can(ActionEnum.Manage, 'all');
    } else if (
      user.userToDepartments.some((role) => role.role === RoleEnum.SPECIALIST)
    ) {
      can(ActionEnum.Read, 'all');
      can(ActionEnum.Create, 'all');
      can(ActionEnum.Update, 'all');
      can(ActionEnum.Delete, 'all');
      can(ActionEnum.Hidden, 'all');
    } else {
      can(ActionEnum.Read, 'all');
    }

    return build({ conditionsMatcher: lambdaMatcher });
  }
}
