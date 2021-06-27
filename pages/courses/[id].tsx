import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import BreadCrumbs from '../../components/atom/BreadCrumbs';
import Col from '../../components/atom/Col';
import Container from '../../components/atom/Container';
import CourseCard from '../../components/CourseCard';
import Row from '../../components/atom/Row';
import { useModal } from 'async-modals';
import MessageModal from '../../components/MessageModal';
import Button from '../../components/atom/Button';

interface CourseProps {
  id: string;
}

interface CourseParams {
  params: {
    id: string;
  }
}

const Course: React.FC<CourseProps> = ({id}) => {

  const messageModal = useModal(MessageModal);

  const showModal = async () => {
    await messageModal.show();
  }

  return(
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
          <BreadCrumbs.Item href={`/courses/${id}`}>{id}</BreadCrumbs.Item>
        </BreadCrumbs>
      </Col>
    </Row>
    <Row>
      <Col>
        <h1 className={'text-2xl font-bold text-gray-800'}>{id}</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <Button onClick={showModal}>Click me!</Button>
      </Col>
    </Row>
  </Container>
)
};

// export const getStaticPaths = async (): Promise<{
//   paths: CourseParams[];
//   fallback: boolean;
// }> => ({
//   paths: [1, 2, 3, 4, 5, 6].map((v) => ({
//     params: {
//       id: `${v}`,
//     },
//   })),
//   fallback: false,
// });

// export const getStaticProps = async ({ params }: CourseParams): Promise<{ props: CourseProps; }> =>
//    ({
//     props: {
//       id: params.id
//     }
//   })
// ;

export const getServerSideProps: GetServerSideProps<CourseProps> = async (context) => {

  const id = context.params?.id as string;

  return {
    props: {
      id,
    }, // will be passed to the page component as props
  }
}


export default Course;
