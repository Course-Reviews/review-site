import Head from 'next/head';
import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Col from '../../components/Col';
import Container from '../../components/Container';
import CourseCard from '../../components/CourseCard';
import Row from '../../components/Row';
import StarRating from '../../components/StarRating';

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
