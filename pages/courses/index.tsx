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
import fetchCourses from '../../functions/fetchCourses';
import { CourseSummary, Pagination } from '../../types/config';
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
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    totalCount: 0,
    pageSize: 0,
  });

  const [results, setResults] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Wait for the page to be ready
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchCourses({});
      setResults(res.courses);
      setPagination(res.pagination);
      setLoading(false);
    }
    if (router.isReady) {
      fetch();
    }
  }, [router.isReady]);

  // useEffect(() => {
  //   console.log('test?');

  //   const queryString = Object.entries(filter)
  //     .filter(([k, v]) => v !== undefined)
  //     .map(([k, v]) => `${k}=${v}`)
  //     .join('&');
  //   if (queryString.length > 0) {
  //     router.push(`?${queryString}`, undefined, { shallow: true });
  //   } else {
  //     router.push('', undefined, { shallow: true });
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filter]);

  // const clearFilter = () => {
  //   setFilter({});
  // };

  useEffect(() => {
    const getCourses = async () => {
      // fetch results here
      const res = await fetchCourses({});
      setResults(res.courses);
      setPagination(res.pagination);
    };
    getCourses();
  }, []);

  const getCourses = async () => {
    // fetch results here
    const res = await fetchCourses({});
    setResults(res.courses);
    setPagination(res.pagination);
  };

  return (
    <Container as={'main'} className={'flex-grow'}>
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
      {/* {showFilter && (
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
      )} */}
      <div className={'my-2 text-gray-600 h-5'}>
      {loading ? <div className={'rounded-full animate-pulse mt-1 h-4 w-48 bg-gray-200'}/> : <>Showing results{' '}
        <span className={'font-semibold'}>
          {pagination.page * pagination.pageSize + 1} -{' '}
          {(pagination.page + 1) * pagination.pageSize}
        </span>{' '}
        of <span className={'font-semibold'}>{pagination.totalCount}</span></>}
      </div>
      {results.map((c, i) => (
        <CourseCard key={i} course={c} />
      ))}
    </Container>
  );
};

export default CourseIndex;
