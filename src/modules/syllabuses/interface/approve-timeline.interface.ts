import { UserEntity } from '../../users/entities/user.entity';

export interface ApproveTimeline {
  requestedAt: Date;
  requestedBy: UserEntity;
  approvedAt: Date;
  approvedBy: UserEntity;
  rejectedAt: Date;
  rejectedBy: UserEntity;
}
