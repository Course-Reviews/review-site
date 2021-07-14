import Head from 'next/head';
import router from 'next/router';
import React, { useContext } from 'react';
import { FiTool } from 'react-icons/fi';
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
      itemScope={true}
      itemType={'https://schema.org/UserReview'}
    >
      <Head>
        <title>Account Settings - CourseReview</title>
        <meta name='description' content={'View you profile and account.'} />
        <meta name='robots' content='index,follow' />
      </Head>
      <Row className={'my-2'}>
        <Col>
          <BreadCrumbs>
            <BreadCrumbs.Home />
            <BreadCrumbs.Item href='/account/settings'>Account Settings</BreadCrumbs.Item>
          </BreadCrumbs>
        </Col>
      </Row>
      <h1 className={'text-2xl font-bold text-gray-800'}>Settings</h1>
      <FiTool className={'text-primary-500 mx-auto my-2'} size={64}/>
      <p className={'mt-2 text-gray-700 mx-8 md:w-96 md:mx-auto text-center'}>We are still working on this! In the meantime please get in touch with us via instagram or send us an email at coursereview.nz@gmail.com</p>
    </Container>
  );
};

export default Course;
