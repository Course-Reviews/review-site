export enum Uni {
  UOA = 'uoa',
  MUA = 'mua',
  VIC = 'vic',
  OTAGO = 'otago'
}


export interface ReviewData {
  id: string;
  rating: number;
  workloadRating: number;
  contentRating: number;
  deliveryRating: number;
  content: string;
  timeTaken: string;
  dateCreated: Date;
  votes: number;
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

export interface CourseSummary {
    rating: number;
    code: string;
    title: string;
    numRatings: number;
    university: string;
    pageId: string;
}

export interface CourseDetails {
  id: string;
  code: string;
  title: string;
  university: string;
  faculty: string;
  rating: number;
  numRatings: number;
  term: number[];
  // optional stuff
  overview?: string;
  url?: string;
  requirements?: string;
  assessments?: {
    name: string;
    percentage: number;
  }[];
}

export interface Pagination {
  page: number;
  totalCount: number;
  pageSize: number;
}