import classNames from 'classnames';
import mixpanel from 'mixpanel-browser';
import Head from 'next/head';
import React from 'react';
import {
  FiBook,
  FiExternalLink, FiFileText, FiInbox, FiMessageSquare, FiStar
} from 'react-icons/fi';
import Accordian from '../../components/atom/Accordian';
import BreadCrumbs from '../../components/atom/BreadCrumbs';
import Button from '../../components/atom/Button';
import Card from '../../components/atom/Card';
import Col from '../../components/atom/Col';
import Container from '../../components/atom/Container';
import Row from '../../components/atom/Row';
import StarRating from '../../components/atom/StarRating';
import Review from '../../components/Review';
import { UNI_NAMES } from '../../types/config';
import { codeToURL } from '../../util/util';

const Course: React.FC = () => (
  <Container
    as={'main'}
    className={'pb-24 flex-grow'}
    itemScope={true}
    itemType={'https://schema.org/UserReview'}
  >
    <Head>
      <title>Account - CourseReview</title>
      <meta name='description' content={'View you profile and account.'} />
      <meta name='robots' content='index,follow' />
    </Head>
    <Row className={'my-2'}>
      <Col>
        <BreadCrumbs>
          <BreadCrumbs.Home />
          <BreadCrumbs.Item href='/account'>Account</BreadCrumbs.Item>
        </BreadCrumbs>
      </Col>
    </Row>
        <h1 className={'text-2xl font-bold text-gray-800'}>
          Account Details
        </h1>
  </Container>
);

export default Course;
