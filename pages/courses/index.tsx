import Head from 'next/head';
import React from 'react';
import Container from '../../components/atom/Container';
import BreadCrumbs from '../../components/atom/BreadCrumbs';
import Col from '../../components/atom/Col';
import CourseCard from '../../components/CourseCard';
import Row from '../../components/atom/Row';

interface indexProps {}

const index: React.FC<indexProps> = ({}) => (
  <Container as={'main'}>
    <Head>
      <title>Please Work</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Row>
      <Col>
        <BreadCrumbs>
          <BreadCrumbs.Item href='/'>Home</BreadCrumbs.Item>
          <BreadCrumbs.Item href='/courses'>Courses</BreadCrumbs.Item>
        </BreadCrumbs>
      </Col>
    </Row>
    <Row>
      <Col>
        <h1 className={'text-2xl font-bold text-gray-800'}>All Courses</h1>
      </Col>
    </Row>
    <Row>
      <Col>
    <CourseCard name='SOFTENG 351' rating={4.4} uni='UoA' ratingCount={12} />
    </Col>
    </Row>
  </Container>
);

export default index;
