import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import BreadCrumbs from '../../../components/atom/BreadCrumbs';
import Col from '../../../components/atom/Col';
import Container from '../../../components/atom/Container';
import CourseCard from '../../../components/CourseCard';
import Row from '../../../components/atom/Row';
import { useModal } from 'async-modals';
import Button from '../../../components/atom/Button';
import MessageModal from '../../../components/MessageModal';
import Card from '../../../components/atom/Card';
import {
  FiBook,
  FiChevronUp,
  FiMessageSquare,
  FiStar,
} from 'react-icons/fi';
import { useState } from 'react';
import Expand from '../../../components/atom/Expand';
import classNames from 'classnames';
import Review from '../../../components/Review';

export interface CourseProps {
  id: number;
  pageId: string;
  description?: string;
  term: number[];
  title: string;
  code: string;
  faculty: string;
  requirements?: string;
  url?: string;
  university: string;
  assessments?: Array<{
    name: string;
    percentage: number;
  }>;
}

interface CourseParams {
  params: {
    id: string;
  };
}

const Course: React.FC<CourseProps> = ({id, code, title, pageId}) => {

  const messageModal = useModal(MessageModal);

  const [courseInfo, setCourseInfo] = useState<boolean>(false);

  const showModal = async () => {
    await messageModal.show();
  };

  return (
    <Container as={'main'}>
      <Head>
        <title>{id}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Row>
        <Col>
          <BreadCrumbs>
            <BreadCrumbs.Home />
            <BreadCrumbs.Item href='/courses'>Courses</BreadCrumbs.Item>
            <BreadCrumbs.Item href={'/courses/uoa'}>UoA</BreadCrumbs.Item>
            <BreadCrumbs.Item href={`/courses/uoa/${pageId}`}>{code}</BreadCrumbs.Item>
          </BreadCrumbs>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className={'text-2xl font-bold text-gray-800'}>{code} - {title}</h1>
          <h2 className={'text-sm font-semibold text-gray-500'}>The University of Auckland</h2>
        </Col>
        <Col className={'items-end fixed md:static bottom-0 left-0 p-6 md:p-0'}>
          <Button onClick={showModal}>
            <FiStar size={24} className={'-m-2 mr-2'} />
            Leave a review
          </Button>
        </Col>
      </Row>
      <Row onClick={() => setCourseInfo((v) => !v)}>
        <Col>
          <h2 className={'text-xl font-semibold text-gray-800 flex items-center justify-between'}>
            <div className={'flex items-center'}>
              <FiBook className={'mr-2'} />
              Course Info
            </div>
            <button>
              <FiChevronUp
                size={30}
                className={classNames('transform transition-transform', courseInfo && 'rotate-180')}
              />
            </button>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Expand expanded={courseInfo} className={'rounded-xl shadow-lg'}>
            <Card>
              <Card.Body>
                <Card.Text>wow</Card.Text>
              </Card.Body>
            </Card>
          </Expand>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className={'text-xl font-semibold text-gray-800 flex items-center'}>
            <FiMessageSquare />
            <div className={'mx-2'}>Reviews</div>
            <div className={'text-secondary-700 font-bold text-sm'}>(13)</div>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Review content='Was a pretty cool course' rating={3} dateTaken='Sem 2, 2021' />
        </Col>
      </Row>
    </Container>
  );
};

// export const getServerSideProps: GetServerSideProps<CourseProps> = async (context) => {
//   const id = context.params?.id as string;

//   return {
//     props: {
//       id,
//     }, // will be passed to the page component as props
//   };
// };

export default Course;

interface data {
  params: {
    id: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    {
      params: {
        uni: 'uoa',
        id: 'acctg101',
      },
    },
    {
      params: {
        uni: 'uoa',
        id: 'SOFTENG350',
      },
    },
    {
      params: {
        uni: 'uoa',
        id: 'SOFTENG350',
      },
    },
  ],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: CourseProps; }> => ({
  props:   {
    'id': 21563,
    'term': [
      0,
      3,
      5
    ],
    'code': 'ACCTG 101',
    'pageId': 'acctg101',
    'title': 'Accounting Information',
    'description': 'This course focuses on understanding the reason why as well as how economic events affect a firm’s financial statements. Rather than simply rote learning the impact of financial transactions on a companies’ financial statements, this course teaches you why accountants record the transactions the way they do and this will help you to explain financial statements in layman terms to other users.',
    'university': 'uoa',
    'faculty': 'Business and Economics',
    'url': 'https://courseoutline.auckland.ac.nz/dco/course/ACCTG/101/1200',
    'assessments': [
      {
        'name': 'Quizzes',
        'percentage': 10
      },
      {
        'name': 'Assignment (1-3)',
        'percentage': 20
      },
      {
        'name': 'Test',
        'percentage': 20
      },
      {
        'name': 'Final Exam',
        'percentage': 50
      }
    ]
  },
});
