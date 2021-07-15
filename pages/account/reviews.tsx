import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { FiInbox } from 'react-icons/fi';
import BreadCrumbs from '../../components/atom/BreadCrumbs';
import Button from '../../components/atom/Button';
import Col from '../../components/atom/Col';
import Container from '../../components/atom/Container';
import Row from '../../components/atom/Row';
import { AuthContext } from '../../components/general/CognitoAuthProvider';
import Review from '../../components/Review';
import { FetchUserReviewsResponse, toReviewData } from '../../dtos/FetchUserReviews';
import fetchUserReviews from '../../functions/fetchUserReviews';
import useEffectAsync from '../../hooks/useAsyncEffect';
import formatTime from '../../util/formatTime';
import { codeToURL } from '../../util/util';

const Course: React.FC = () => {
  const { user, hasResolved } = useContext(AuthContext);

  const router = useRouter();

  const [reviews, setReviews] = useState<FetchUserReviewsResponse>();

  useEffectAsync(async () => {
    const reviews = await fetchUserReviews();
    setReviews(reviews);
  }, []);

  if (!user && hasResolved) {
    router.push('/account/signin');
  }

  if (!hasResolved) {
    return <></>;
  }

  return (
    <Container as={'main'} className={'pb-24 flex-grow'}>
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

      {reviews ? (
        reviews.length > 0 ? (
          reviews
            .sort(
              (r1, r2) => toMilliseconds(r2.review.createdAt) - toMilliseconds(r1.review.createdAt)
            )
            .map((r, i) => (
              <div className={'my-4 flex flex-col'} key={i}>
                <h2
                  className={'text-xl font-semibold text-gray-700'}
                >{`Review for ${r.code} - ${r.title}`}</h2>
                <div className={'mb-6 text-gray-500 font-semibold'}>
                  You posted {formatTime(new Date(r.review.createdAt))}
                </div>
                <Review
                  review={toReviewData(r.review)}
                  onEdit={() => {
                    router.push(`/courses/${r.university}/${codeToURL(r.code)}?post=true`);
                  }}
                  isOwner={true}
                />
              </div>
            ))
        ) : (
          <div
            className={
              'w-2/3 mx-auto text-center flex flex-col items-center text-lg font-semibold text-gray-400 mt-6'
            }
          >
            <FiInbox className={'my-2'} size={30} />
            <div>It looks like you havent written any reviews yet</div>
            <Button outline className={'mt-4'}>
              Search courses to review
            </Button>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default Course;

// function to convert string date to milliseconds
function toMilliseconds(dateString: string) {
  const date = new Date(dateString);
  return date.getTime();
}
