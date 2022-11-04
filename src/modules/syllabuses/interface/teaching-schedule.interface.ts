import {
  TeachingLocationEnum,
  TeachingMethodEnum,
} from '../syllabuses.constants';

export interface TeachingSchedule {
  teachingMethod: TeachingMethodEnum;
  lessonPerWeek: number;
  scope: string;
  location: TeachingLocationEnum;
}
