import Head from 'next/head';
import React from 'react';
import Container from '../../components/atom/Container';
import BreadCrumbs from '../../components/atom/BreadCrumbs';
import Col from '../../components/atom/Col';
import CourseCard from '../../components/CourseCard';
import Row from '../../components/atom/Row';
import Badge from '../../components/atom/Badge';
import { BiSortAZ } from 'react-icons/bi';
import IconButton from '../../components/atom/IconButton';
interface indexProps {}

const index: React.FC<indexProps> = ({}) => (
  <Container as={'main'}>
    <Head>
      <title>Browse Courses</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Row>
      <Col>
        <BreadCrumbs>
          <BreadCrumbs.Home />
          <BreadCrumbs.Item href='/courses'>Courses</BreadCrumbs.Item>
        </BreadCrumbs>
      </Col>
    </Row>
    <Row>
      <Col>
        <div className={'flex justify-between items-center'}>
          {' '}
          <h1 className={'text-2xl font-bold text-gray-800'}>Browse Courses</h1>{' '}
          <IconButton variant='none' icon={BiSortAZ} />
        </div>
      </Col>
    </Row>
    <CourseCard name='SOFTENG 351' rating={4.4} uni='UoA' ratingCount={12} />
    <CourseCard name='SOFTENG 351' rating={4.4} uni='UoA' ratingCount={12} />
    <CourseCard name='SOFTENG 351' rating={4.4} uni='UoA' ratingCount={12} />
    <CourseCard name='SOFTENG 351' rating={4.4} uni='UoA' ratingCount={12} />
  </Container>
);

export default index;
