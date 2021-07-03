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
import PaginationControls from '../../components/atom/PaginationControls';
import Row from '../../components/atom/Row';
import CourseCard from '../../components/CourseCard';
import fetchCourses from '../../functions/fetchCourses';
import { CourseSummary, FACULTYS, Pagination, TERMS } from '../../types/config';

const stages: Option[] = [
  { label: 'Any', value: undefined },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
];

const terms: Option[] = [
  { label: 'Any', value: undefined },
  ...TERMS.map((t, i) => ({
    label: t,
    value: i,
  })).sort((a, b) => `${a.label}`.localeCompare(b.label)),
];

const faculties: Option[] = [
  { label: 'Any', value: undefined },
  ...FACULTYS.map((f, i) => ({
    label: f,
    value: i,
  })),
];

interface Filter {
  stage?: number;
  term?: number;
  faculty?: number;
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

  // Fetches results for the given page and filter
  const fetch = async (f: Filter, p: number) => {
    setLoading(true);
    const res = await fetchCourses({ ...f, page: p });
    setResults(res.courses);
    setPagination(res.pagination);
    setLoading(false);
    setQueryString(res.pagination.page);
  };

  // Wait for the page to be ready
  useEffect(() => {
    if (router.isReady) {
      const parsed: { [key: string]: number } = {};

      for (const key in router.query) {
        parsed[key] = parseInt(router.query[key] as string);
      }

      const f: Filter = {
        stage: parsed.stage,
        term: parsed.term,
        faculty: parsed.faculty,
      };

      const page = parsed.page || 0;
      fetch(f, page);
    }
  }, [router.isReady]);

  const setQueryString = (page: number) => {
    const filterQuery = Object.entries(filter)
      .filter(([k, v]) => v !== undefined)
      .map(([k, v]) => `${k}=${v}`)
    const paginationQuery = page === 0 ? [] : [`page=${page}`]

    const queryString = [...filterQuery, ...paginationQuery].join('&');

    if (queryString.length > 0) {
      router.push(`?${queryString}`, undefined, { shallow: true });
    } else {
      router.push('', undefined, { shallow: true });
    }
  }

  // Fetches results for the filter and also updates the query string to match
  const applyFilter = async () => {
    fetch(filter, 0);
  };

  const clearFilter = () => {
    setFilter({});
    router.push('', undefined, { shallow: true });
    fetch({}, 0);
  };

  const fetchPage = async (p: number) => {
    await fetch(filter, p);
    window.scrollTo({top: 0})
  }

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
      {showFilter && (
        <div>
          <Row className={'border-b pb-4 pt-2 items-end flex-wrap'}>
            <Col className={'w-full md:w-32'}>
              <FormGroup label='Stage'>
                <Dropdown
                  options={stages}
                  selectedIndex={stages.findIndex((s) => s.value === filter.stage)}
                  onChange={(v) => setFilter((f) => ({ ...f, stage: v.value }))}
                >
                  Stage
                </Dropdown>
              </FormGroup>
            </Col>
            <Col className={'w-full md:w-56'}>
              <FormGroup label='Term'>
                <Dropdown
                  options={terms}
                  selectedIndex={terms.findIndex((s) => s.value === filter.term)}
                  onChange={(v) => setFilter((f) => ({ ...f, term: v.value }))}
                >
                  Term
                </Dropdown>
              </FormGroup>
            </Col>
            <Col className={'w-full md:w-64'}>
              <FormGroup label='Faculty'>
                <Dropdown
                  options={faculties}
                  selectedIndex={faculties.findIndex((s) => s.value === filter.faculty)}
                  onChange={(v) => setFilter((f) => ({ ...f, faculty: v.value }))}
                >
                  Term
                </Dropdown>
              </FormGroup>
            </Col>
            <Col className={'w-full md:w-auto'}>
              <FormGroup>
                <Row>
                  <Col>
                    <Button outline block onClick={clearFilter}>
                      Clear Filters
                    </Button>
                  </Col>
                  <Col>
                    <Button block onClick={applyFilter}>
                      Apply Filter
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>
        </div>
      )}
      <div className={'my-2 text-gray-600 h-5'}>
        {loading ? (
          <div className={'rounded-full animate-pulse mt-1 h-4 w-48 bg-gray-200'} />
        ) : (
          <>
            Showing results{' '}
            <span className={'font-semibold'}>
              {Math.min(pagination.page * pagination.pageSize + 1, pagination.totalCount)} -{' '}
              {Math.min((pagination.page + 1) * pagination.pageSize, pagination.totalCount)}
            </span>{' '}
            of <span className={'font-semibold'}>{pagination.totalCount}</span>
          </>
        )}
      </div>
      {loading ? <p>loading...</p> : results.length > 0 ? results.map((c, i) => (
        <CourseCard key={i} course={c} />
      )) : <div className={'text-xl text-center my-16 font-semibold text-gray-700'}>No courses found</div>}
      {!loading && <PaginationControls className={'justify-center'} pagination={pagination} setPage={fetchPage}/>}
    </Container>
  );
};

export default CourseIndex;
