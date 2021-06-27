import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import BreadCrumbs from '../../components/atom/BreadCrumbs';
import Col from '../../components/atom/Col';
import Container from '../../components/atom/Container';
import CourseCard from '../../components/CourseCard';
import Row from '../../components/atom/Row';
import { useModal } from 'async-modals';
import Button from '../../components/atom/Button';
import MessageModal from '../../components/MessageModal';
import Card from '../../components/atom/Card';
import {
  FiBook,
  FiChevronDown,
  FiChevronRight,
  FiChevronUp,
  FiMessageSquare,
  FiStar,
} from 'react-icons/fi';
import { useState } from 'react';
import Expand from '../../components/atom/Expand';
import classNames from 'classnames';

interface CourseProps {
  id: string;
}

interface CourseParams {
  params: {
    id: string;
  };
}

const Course: React.FC<CourseProps> = ({ id }) => {
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
            <BreadCrumbs.Item href={`/courses/${id}`}>{id}</BreadCrumbs.Item>
          </BreadCrumbs>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className={'text-2xl font-bold text-gray-800'}>{id}</h1>
          <h1 className={'text-sm font-semibold text-gray-500'}>The University of Auckland</h1>
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
          <Card>
            <Card.Body>
              <Card.Text>wow</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className={'fixed bottom-0 right-0 p-6'}>
        <Button onClick={showModal}>
          <FiStar size={24} className={'-m-2 mr-2'} />
          Leave a review
        </Button>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<CourseProps> = async (context) => {
  const id = context.params?.id as string;

  return {
    props: {
      id,
    }, // will be passed to the page component as props
  };
};

export default Course;
