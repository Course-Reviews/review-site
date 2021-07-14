import Head from 'next/head';
import router from 'next/router';
import React, { useContext } from 'react';
import BreadCrumbs from '../../components/atom/BreadCrumbs';
import Col from '../../components/atom/Col';
import Container from '../../components/atom/Container';
import Row from '../../components/atom/Row';
import { AuthContext } from '../../components/general/CognitoAuthProvider';

const Course: React.FC = () => {
  const { user, hasResolved } = useContext(AuthContext);

  if (!user && hasResolved) {
    router.push('/account/signin');
  }

  if (!hasResolved) {
    return <></>;
  }

  return (
    <Container
      as={'main'}
      className={'pb-24 flex-grow'}
    >
      <Head>
        <title>My Reviews - CourseReview</title>
        <meta name='description' content={'View you profile and account.'} />
        <meta name='robots' content='index,follow' />
      </Head>
      <Row className={'my-2'}>
        <Col>
          <BreadCrumbs>
            <BreadCrumbs.Home />
            <BreadCrumbs.Item href='/account/reviews'>My Reviews</BreadCrumbs.Item>
          </BreadCrumbs>
        </Col>
      </Row>
      <h1 className={'text-2xl font-bold text-gray-800'}>My Reviews</h1>
    </Container>
  );
};

export default Course;
