import { useModal } from 'async-modals';
import classNames from 'classnames';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiBook, FiExternalLink, FiInbox, FiMessageSquare, FiStar } from 'react-icons/fi';
import Accordian from '../../../components/atom/Accordian';
import BreadCrumbs from '../../../components/atom/BreadCrumbs';
import Button from '../../../components/atom/Button';
import Card from '../../../components/atom/Card';
import Col from '../../../components/atom/Col';
import Container from '../../../components/atom/Container';
import Row from '../../../components/atom/Row';
import StarRating from '../../../components/atom/StarRating';
import PostReviewModal from '../../../components/PostReviewModal';
import Review from '../../../components/Review';
import { ReviewData } from '../../../types/config';
import courses from '../../../util/courseDetails.json';
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
  rating?: number;
  numRatings: number;
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

const Course: React.FC<CourseProps> = ({
  id,
  code,
  title,
  pageId,
  description,
  url,
  rating,
  numRatings,
  assessments,
  requirements,
  university,
  term,
}) => {
  const messageModal = useModal(PostReviewModal);

  const [reviews, setReviews] = useState<ReviewData[]>();

  useEffect(() => {
    // fetch reviews from the server on load
    window.setTimeout(() => {
      setReviews([]);
    }, 5000);
  }, []);

  const showModal = async () => {
    await messageModal.show({
      data: {
        terms: term,
        code,
      },
      canClose: false,
    });
  };

  // Detects course codes in text and replaces them with links
  const renderLinkedCourses = (r: string) => {
    const res: JSX.Element[] = [];

    const regex = /[A-Z]+\s[0-9](?:[0-9]|\s|,|or|and)+[0-9]/gm;
    const matches = r.match(regex);

    if (!matches) return r;

    let i = 0;

    for (const m of matches) {
      // push all text up to the start of the match group
      const startLoc = r.indexOf(m);
      res.push(<span key={i}>{r.substring(i, startLoc)}</span>);
      i = startLoc;
      const course = (m.match(/[A-Z]+/) as any)[0];
      const strings = m.match(/(?:[A-Z]+\s)?[0-9]{3}/g) as string[];
      for (const str of strings) {
        // find the absolute position from the start of the string
        const absStrPos = m.indexOf(str) + startLoc;
        if (i < absStrPos) {
          // push any text before the link not yet included
          res.push(<span key={i}>{r.substring(i, absStrPos)}</span>);
          i = absStrPos;
        }

        const link = `/courses/${university.toLowerCase()}/${`${course}${str.replace(
          /[^0-9]*/g,
          ''
        )}`.toLowerCase()}`;

        res.push(
          <Link href={link} key={i}>
            <a className={'text-primary-500 underline'}>{str}</a>
          </Link>
        );
        i += str.length;
      }
    }

    return res;
  };

  return (
    <Container as={'main'} className={'pb-24 flex-grow'}>
      <Head>
        <title>{code} Course Reviews - Discors</title>
        <meta name='keywords' content={`${code} review, ${title} review, course review`} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Row className={'mb-2 py-2'}>
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
          <h1 className={'text-2xl font-bold text-gray-800 py-2'}>
            {code} - {title}
          </h1>
          <h2 className={'text-sm text-gray-400 font-semibold py-2'}>The University of Auckland</h2>

          <div className={'flex items-center my-4'}>
            <StarRating
              className={classNames(rating ? 'text-secondary-500' : 'text-gray-500', 'mr-4')}
              rating={rating || 0}
              size={30}
            />{' '}
            <div className={'text-gray-600 max-h-min'}>
              {rating ? `${rating}/5 (${numRatings} ratings)` : 'No ratings yet'}
            </div>
          </div>
        </Col>
        <Col className={'items-end fixed md:static bottom-0 left-0 p-6 md:p-0 z-10'}>
          <Button onClick={showModal}>
            <FiStar size={24} className={'-m-2 mr-2'} />
            Leave a review
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className={'text-xl font-bold text-gray-800 flex items-center my-4'}>
            <FiBook className={'mr-2'} />
            Course Info
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Accordian>
                {(url || description) && (
                  <Accordian.Item expanded>
                    <Accordian.Header>
                      <h3 className={'text-lg font-semibold text-gray-700'}>Course Overview</h3>
                    </Accordian.Header>
                    <Accordian.Body>
                      <p className={'text-gray-700'}>{description}</p>
                      {url && (
                        <div className={'flex'}>
                          <a
                            className={
                              'text-primary-400 text-sm font-semibold hover:text-primary-500 flex p-2 underline'
                            }
                            href={url}
                          >
                            <FiExternalLink size={20} className={'mr-1'} />
                            Official UoA site for {code}
                          </a>
                        </div>
                      )}
                    </Accordian.Body>
                  </Accordian.Item>
                )}
                {requirements && (
                  <Accordian.Item>
                    <Accordian.Header>
                      <h3 className={'text-lg font-semibold text-gray-700'}>Prerequisites</h3>
                    </Accordian.Header>
                    <Accordian.Body>
                      <p className={'text-gray-700'}>{renderLinkedCourses(requirements)}</p>
                    </Accordian.Body>
                  </Accordian.Item>
                )}
                {assessments && (
                  <Accordian.Item>
                    <Accordian.Header>
                      <h3 className={'text-lg font-semibold text-gray-700'}>Assessments</h3>
                    </Accordian.Header>
                    <Accordian.Body>
                      <table className={'text-gray-600 mx-auto w-full md:w-1/2'}>
                        <thead>
                          <tr>
                            <th className={'text-left'}>Assessment</th>
                            <th>Weighting</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assessments.map((v, i) => (
                            <tr key={i} className={classNames(i % 2 && ' rounded-xl')}>
                              <td
                                className={classNames(
                                  i % 2 && 'rounded-l-xl bg-gray-100',
                                  'px-4 py-2 '
                                )}
                              >
                                {v.name}
                              </td>
                              <td
                                className={classNames(
                                  i % 2 && 'rounded-r-xl bg-gray-100',
                                  'px-4 py-2 text-center '
                                )}
                              >
                                {v.percentage}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Accordian.Body>
                  </Accordian.Item>
                )}
              </Accordian>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className={'text-xl font-bold text-gray-800 flex items-center my-4'}>
            <FiMessageSquare />
            <div className={'mx-2'}>Reviews</div>
          </h2>
        </Col>
      </Row>
      {reviews ? (
        reviews.length > 0 ? (
          reviews.map((r, i) => <Review key={i} rating={3} content='' dateTaken='sem 2' />)
        ) : (
          <div
            className={
              'w-2/3 mx-auto text-center flex flex-col items-center text-lg font-semibold text-gray-400 mt-6'
            }
          >
            <FiInbox className={'my-2'} size={30} />
            <div>Nobody has written a reivew for this course yet</div>
            <Button className={'mt-4'} onClick={() => showModal()}>
              Be the first
            </Button>
          </div>
        )
      ) : (
        [0, 1].map((v, i) => (
          <div key={i} className={'bg-gray-100 animate-pulse my-4 rounded-xl p-4 flex flex-col'}>
            <StarRating rating={5} className={'text-gray-200'} />
            <div className={'h-3 mt-3 bg-gray-200 w-1/2 rounded-full'} />
            <div className={'h-3 mt-3 bg-gray-200 w-1/3 rounded-full'} />
          </div>
        ))
      )}
    </Container>
  );
};

export default Course;

interface data {
  params: {
    id: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (courses as any).map((v: any) => ({
    params: {
      uni: v.university,
      id: v.code.replace(' ', '').toLowerCase(),
    },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<{ props: CourseProps }> => ({
  props: (courses as any).find((c: any) => c.pageId === params?.id),
});
