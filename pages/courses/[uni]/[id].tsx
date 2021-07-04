import { useModal } from 'async-modals';
import classNames from 'classnames';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiBook, FiExternalLink, FiInbox, FiMessageSquare, FiStar } from 'react-icons/fi';
import { MixpanelConsumer } from 'react-mixpanel';
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
import fetchCourse from '../../../functions/fetchCourse';
import fetchReviews from '../../../functions/fetchReviews';
import { CourseDetails, ReviewData, TERMS, UNI_NAMES, UNI_NAMES_SHORT } from '../../../types/config';
import { codeToURL } from '../../../util/util';
import courseList from '../../../util/courseList.json';

const Course: React.FC<CourseDetails> = ({
  id,
  code,
  title,
  overview,
  url,
  rating,
  contentRating,
  workloadRating,
  deliveryRating,
  numRatings,
  assessments,
  requirements,
  university,
  faculty,
  term,
}) => {
  const [reviewData, setReviewData] = useState({
    rating,
    numRatings,
    contentRating,
    workloadRating,
    deliveryRating
  });

  const messageModal = useModal(PostReviewModal);

  const [reviews, setReviews] = useState<ReviewData[]>();

  useEffect(() => {
    const hydrate = async () => {
      const data = await fetchReviews(id);
      const processed = data.reviews.map((e) => ({
        id: e._id,
        rating: e.course_rating,
        content: e.content,
        timeTaken: e.taken_date,
        dateCreated: new Date(e.createdAt),
        votes: e.upvote - e.downvote,
        contentRating: e.content_rating,
        workloadRating: e.workload_rating,
        deliveryRating: e.delivery_rating,
      }));
      setReviews(processed);
      setReviewData({
        rating: data.overall_rating,
        numRatings: data.num_ratings,
        contentRating: data.content_rating,
        workloadRating: data.workload_rating,
        deliveryRating: data.delivery_rating,
      })
    };
    hydrate();
  }, []);

  const showModal = async () => {
    const review = await messageModal.show({
      data: {
        terms: term,
        code,
        courseId: id,
      },
      canClose: false,
    });
    if (review) {
      const processedReview = {
        id: review._id,
        rating: review.course_rating,
        content: review.content,
        timeTaken: review.taken_date,
        dateCreated: new Date(review.createdAt),
        votes: 0,
        contentRating: review.content_rating,
        workloadRating: review.workload_rating,
        deliveryRating: review.delivery_rating,
      };
      setReviews((r) => [...(r || []), processedReview]);
      setReviewData((d) => ({
        rating: (d.rating * d.numRatings + review.course_rating) / (d.numRatings + 1),
        contentRating: (d.contentRating * d.numRatings + review.content_rating) / (d.numRatings + 1),
        workloadRating: (d.workloadRating * d.numRatings + review.workload_rating) / (d.numRatings + 1),
        deliveryRating: (d.deliveryRating * d.numRatings + review.delivery_rating) / (d.numRatings + 1),
        numRatings: d.numRatings + 1,
      }));
    }
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

        const newCode = `${course}${str.replace(/[^0-9]*/g, '')}`;

        const link = `/courses/${university.toLowerCase()}/${codeToURL(newCode)}`;

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
    <MixpanelConsumer>
      {(mixpanel: any) => (
        <Container
          as={'main'}
          className={'pb-24 flex-grow'}
          itemScope={true}
          itemType={'https://schema.org/UserReview'}
        >
          <Head>
            <title>
              {code} at {UNI_NAMES_SHORT[university]} - Course info and reviews
            </title>
            <meta
              name='description'
              content={`Check out what other students have to say about ${code} - ${title} and related course reviews for ${UNI_NAMES[university]}.`}
            />
            <meta
              name='keywords'
              content={`${
                UNI_NAMES[university]
              }, ${university}, ${faculty} courses, ${code}, ${code} review, ${title} review, course review, ${code} course reviews, ${code} assignment, ${code} exam, ${code} - ${university} course, ${title} review, ${term
                .map((t) => TERMS[t])
                .join(', ')}`}
            />
            <meta name='robots' content='index,follow' />
            {/* og tags */}
            <meta property='og:title' content={`${code} at ${UNI_NAMES_SHORT[university]} - Course info and reviews`} />
            <meta property='og:description' content={`Check out what students have to say about ${code} - ${title}, and related courses at ${UNI_NAMES[university]}.`} />
            <meta property='og:type' content='website'/>
            <meta property='og:url' content={`https://coursereview.co.nz/courses/${university}/${codeToURL(code)}`} />
            <meta property='og:image' content='https://coursereview.co.nz/course_cover.jpg' />
            <meta property='og:site_name' content='CourseReview' />
          </Head>
          <Row className={'my-2'}>
            <Col>
              <BreadCrumbs>
                <BreadCrumbs.Home />
                <BreadCrumbs.Item href='/courses'>Courses</BreadCrumbs.Item>
                <BreadCrumbs.Item href={'/courses'}>{university.toUpperCase()}</BreadCrumbs.Item>
                <BreadCrumbs.Item href={`/courses/${university}/${codeToURL(code)}`}>{code}</BreadCrumbs.Item>
              </BreadCrumbs>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className={'text-2xl font-bold text-gray-800'}>
                {code} - {title}
              </h1>
              <h2 className={'text-sm text-gray-400 font-semibold'}>{UNI_NAMES[university]}</h2>
              <div className={'flex items-center my-4'}>
                <StarRating
                  className={classNames(
                    reviewData.rating ? 'text-secondary-500' : 'text-gray-500',
                    'mr-4'
                  )}
                  rating={reviewData.rating || 0}
                  size={30}
                />{' '}
                <div className={'text-gray-600 max-h-min'}>
                  {reviewData.rating ? (
                    <div
                      itemScope
                      itemType='https://schema.org/AggregateRating'
                      itemProp='aggregateRating'
                    >
                      <span itemProp='ratingValue'>{Math.round(reviewData.rating * 10) / 10}</span>/
                      <span>5</span>{' '}
                      <span itemProp='reviewCount'>
                        ({reviewData.numRatings} rating{reviewData.numRatings === 1 ? '' : 's'})
                      </span>
                    </div>
                  ) : (
                    'No ratings yet'
                  )}
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
              <h2 className={'text-xl font-bold text-gray-800 flex items-center my-2'}>
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
                    {(url || overview) && (
                      <Accordian.Item expanded>
                        <Accordian.Header>
                          <h3 className={'text-lg font-semibold text-gray-700'}>Course Overview</h3>
                        </Accordian.Header>
                        <Accordian.Body>
                          <p className={'text-gray-700'}>{overview}</p>
                          {url && (
                            <div className={'flex'}>
                              <a
                                className={
                                  'text-primary-400 text-sm font-semibold hover:text-primary-500 flex p-2 underline'
                                }
                                href={url}
                                target={'uoa_site'}
                              >
                                <FiExternalLink size={20} className={'mr-1'} />
                                Official site for {code}
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
              reviews
                .sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime())
                .map((r, i) => <Review key={i} review={r} />)
            ) : (
              <div
                className={
                  'w-2/3 mx-auto text-center flex flex-col items-center text-lg font-semibold text-gray-400 mt-6'
                }
              >
                <FiInbox className={'my-2'} size={30} />
                <div>Nobody has written a reivew for this course yet</div>
                <Button
                  outline
                  className={'mt-4'}
                  onClick={() => {
                    showModal();
                    mixpanel.track(`'['${code}']' Click review  `);
                  }}
                >
                  Be the first
                </Button>
              </div>
            )
          ) : (
            [0, 1].map((v, i) => (
              <div
                key={i}
                className={'bg-gray-100 animate-pulse my-4 rounded-xl p-4 flex flex-col'}
              >
                <StarRating rating={5} className={'text-gray-200'} />
                <div className={'h-3 mt-3 bg-gray-200 w-1/2 rounded-full'} />
                <div className={'h-3 mt-3 bg-gray-200 w-1/3 rounded-full'} />
              </div>
            ))
          )}
        </Container>
      )}
    </MixpanelConsumer>
  );
};

export default Course;

/**
 * Disabling this for now since we dont want to make 3000+ db calls to build our app,
 * so easiest solution is to just render when the page is requested
 */
export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: 'blocking' });

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id, uni } = params as { [k: string]: string };
  // check if exists

  if (courseList.indexOf(`${uni}/${id}`) === -1) {
    return {
      notFound: true,
    };
  }

  const data = await fetchCourse(uni, id);

  return {
    props: data,
    revalidate: 60,
  };
};
