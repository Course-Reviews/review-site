import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import BreadCrumbs from '../../components/atom/BreadCrumbs';
import Button from '../../components/atom/Button';
import Col from '../../components/atom/Col';
import Container from '../../components/atom/Container';
import Dropdown, { Option } from '../../components/atom/Dropdown';
import FormGroup from '../../components/atom/FormGroup';
import IconButton from '../../components/atom/IconButton';
import Row from '../../components/atom/Row';
import CourseCard, { CourseCardProps } from '../../components/CourseCard';
import fetchAllCourses from '../../functions/fetchAllCourses';
import courses from '../../util/courseDetails.json';

const stages: Option[] = [
  { label: 'Any', value: '0' },
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
  const router = useRouter();

  const query = router.query as Filter;

  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [filter, setFilter] = useState<Filter>({});

  const [results, setResults] = useState<CourseCardProps[]>([]);

  useEffect(() => {
    console.log(query);
    if (router.isReady) {
      setFilter(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    console.log('test?');

    const queryString = Object.entries(filter)
      .filter(([k, v]) => v !== undefined)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    if (queryString.length > 0) {
      router.push(`?${queryString}`, undefined, { shallow: true });
    } else {
      router.push('', undefined, { shallow: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const clearFilter = () => {
    setFilter({});
  };

  const applyFilter = () => {
    // fetch results here
    fetchAllCourses();
  };

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
          <Row className={'border-b pb-4 pt-2 items-end flex-wrap'}>
            <Col className={'w-full md:w-64'}>
              <FormGroup label='University'>
                <Dropdown
                  options={[
                    { label: 'Any', value: -1 },
                    { label: 'Summer School', value: 0 },
                    { label: 'Semester 1', value: 1 },
                  ]}
                  onChange={(v) => {
                    if (v.value !== -1) {
                      setFilter((f) => ({ ...f, uni: v.value }));
                    } else {
                      setFilter((f) => ({ ...f, uni: undefined }));
                    }
                  }}
                >
                  Semester
                </Dropdown>
              </FormGroup>
            </Col>
            <Col className={'w-full md:w-32'}>
              <FormGroup label='Stage'>
                <Dropdown
                  options={stages}
                  selectedIndex={stages.findIndex((s) => s.value === filter.stage)}
                  onChange={(v) => {
                    if (v.value !== '0') {
                      setFilter((f) => ({ ...f, stage: v.value }));
                    } else {
                      setFilter((f) => ({ ...f, stage: undefined }));
                    }
                  }}
                >
                  Stage
                </Dropdown>
              </FormGroup>
            </Col>
            <Col className={'w-full md:w-auto'}>
              <FormGroup>
                <Row>
                  <Col>
                    <Button outline onClick={clearFilter} block>
                      Clear Filters
                    </Button>
                  </Col>
                  <Col>
                  <Button block onClick={applyFilter}>Apply Filter</Button>
                  </Col>
                </Row>
              </FormGroup>
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
