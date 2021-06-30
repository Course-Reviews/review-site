export enum Uni {
  UOA = 'uoa',
  MUA = 'mua',
  VIC = 'vic',
  OTAGO = 'otago'
}


export interface ReviewData {
  rating: number;
  message?: string;
  name?: string;
  timeTaken: string;
}

export const TERMS = [
  'Summer School',
  'Academic Year Term',
  'Quarter 1',
  'Semester 1',
  'Quarter 2',
  'Semester 2',
  'Quarter 3',
  'Later Year Term',
  'Quarter 4',
  'Doctoral Academic Year'

]