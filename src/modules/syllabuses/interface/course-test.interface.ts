import { AssessmentMethod } from '../syllabuses.constants';

export interface CourseTestSchedule {
  assessmentMethod: AssessmentMethod;
  week: number;
}
