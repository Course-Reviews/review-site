import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import BreadCrumbs from '../../components/atom/BreadCrumbs';
import Col from '../../components/atom/Col';
import Container from '../../components/atom/Container';
import Dropdown, { Option } from '../../components/atom/Dropdown';
import IconButton from '../../components/atom/IconButton';
import Row from '../../components/atom/Row';
import CourseCard, { CourseCardProps } from '../../components/CourseCard';
import courses from '../../util/courseDetails.json';

const stages: Option[] = [
  { label: 'All', value: '0'},
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
];
interface Filter {
  uni?: string;
  stage?: number;
}

const CourseIndex: React.FC = () => {
  const query = (useRouter().query as Filter);

  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [filter, setFilter] = useState<Filter>({});

  const [results, setResults] = useState<CourseCardProps[]>([]);

  useEffect(() => {
    setFilter(query);
  }, [query])

  return (
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
          <h1 className={'text-2xl font-bold text-gray-800'}>Browse Courses</h1>
        </Col>
        <Col className={'max-w-min'}>
          <IconButton icon={FiFilter} variant='none' onClick={() => setShowFilter((v) => !v)} />
        </Col>
      </Row>
      {showFilter && (
        <div>
          <Row className={'border-b pb-4 pt-2'}>
            <Col className={'w-2/3 md:w-64'}>
              <div className={'flex flex-col'}>
                <div className={'ml-2 text-sm text-gray-600 font-semibold'} role=''>University</div>
                <Dropdown
                  options={[
                    { label: 'Summer School', value: 0 },
                    { label: 'Semester 1', value: 1 },
                  ]}
                >
                  Semester
                </Dropdown>
              </div>
            </Col>
            <Col className={'w-1/3 md:w-32'}>
              <div className={'flex flex-col'}>
                <label className={'ml-2 text-sm'}>Stage</label>
                <Dropdown options={stages} selectedIndex={stages.findIndex(s => s.value === filter.stage)}>Stage</Dropdown>
              </div>
            </Col>
          </Row>
        </div>
      )}
      {(courses as any[]).slice(0, 10).map((c, i) => (
        <CourseCard
          key={i}
          course={{
            link: `/courses/${c.university}/${c.code.replace(' ', '').toLowerCase()}`,
            name: c.code,
            uni: c.university,
            rating: 3,
            ratingCount: 5,
            stage: 1,
          }}
        />
      ))}
    </Container>
  );
};

export default CourseIndex;
