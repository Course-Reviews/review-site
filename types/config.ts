export enum Uni {
  UOA = 'uoa',
  MUA = 'mua',
  VIC = 'vic',
  OTAGO = 'otago'
}

export interface ReviewData {
  id: string;
  rating: number;
  relaxedRating: number;
  enjoymentRating: number;
  deliveryRating: number;
  content: string;
  timeTaken: string;
  dateCreated: Date;
  votes: number;
  username?: string;
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

export const FACULTYS  = [
  'Arts',
  'Business and Economics',
  'Creative Arts and Industries',
  'Education and Social Work',
  'Engineering',
  'Law',
  'Medical and Health Sciences',
  'Science'
]

export const UNI_NAMES: {[key: string]: string} = {
  'uoa': 'The University of Auckland'
}

export const UNI_NAMES_SHORT: {[key: string]: string} = {
  'uoa': 'UoA'
}


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
  relaxedRating: number;
  enjoymentRating: number;
  deliveryRating: number;
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