import { AssessmentMethod } from '../syllabuses.constants';

export interface AssessmentForm {
  assessmentMethod: AssessmentMethod;
  goal: string;
  weight: number;
}
