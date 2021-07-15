import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import BreadCrumbs from '../../components/atom/BreadCrumbs';
import Col from '../../components/atom/Col';
import Container from '../../components/atom/Container';
import IconButton from '../../components/atom/IconButton';
import PaginationControls from '../../components/atom/PaginationControls';
import Row from '../../components/atom/Row';
import CourseCard from '../../components/browse/CourseCard';
import CourseFilter from '../../components/browse/CourseFilter';
import fetchCourses from '../../functions/fetchCourses';
import { CourseSummary, Pagination } from '../../types/config';

interface Filter {
  query?: string;
  stage?: number;
  term?: number;
  faculty?: number;
}

const CourseIndex: React.FC = () => {
  const router = useRouter();

  const [showFilter, setShowFilter] = useState<boolean>(true);

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
    setQueryString(f, res.pagination.page);
  };

  const getFilterFromQuery = (): {filter: Filter, page: number} => {
    const parsed: { [key: string]: number | string } = {};

    for (const key in router.query) {
      parsed[key] = parseInt(router.query[key] as string)
        ? parseInt(router.query[key] as string)
        : (router.query[key] as string);
    }

    const f: Filter = {
      query: parsed.query as string,
      stage: parsed.stage as number,
      term: parsed.term as number,
      faculty: parsed.faculty as number,
    };

    return {filter: f, page: parsed.page as number || 0};
  }

  // Wait for the page to be ready
  useEffect(() => {
    if (router.isReady) {

      const {filter, page} = getFilterFromQuery();

      fetch(filter, page as number);
    }
  }, [router.isReady]);

  const setQueryString = (filter: Filter ,page: number) => {
    const filterQuery = Object.entries(filter)
      .filter(([k, v]) => v !== undefined)
      .map(([k, v]) => `${k}=${v}`);
    const paginationQuery = page === 0 ? [] : [`page=${page}`];

    const queryString = [...filterQuery, ...paginationQuery].join('&');

    if (queryString.length > 0) {
      router.push(`?${queryString}`, undefined, { shallow: true });
    } else {
      router.push('', undefined, { shallow: true });
    }
  };

  // Fetches results for the filter and also updates the query string to match
  const applyFilter = async (filter: Filter) => {
    fetch(filter, 0);
  };

  const fetchPage = async (p: number) => {
    const {filter} = getFilterFromQuery();

    await fetch(filter, p);
    window.scrollTo({ top: 0 });
  };

  return (
    <Container as={'main'} className={'flex-grow'}>
      <Head>
        <title>Browse Courses</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content={'Browse over 3000 courses from New Zealand Universities'}
        />
        <meta
          name='keywords'
          content={'University courses, search courses, list of university courses'}
        />
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
        <CourseFilter onSubmit={applyFilter}/>
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
      <section>
        {loading ? (
          <p>loading...</p>
        ) : results.length > 0 ? (
          results.map((c, i) => <CourseCard key={i} course={c} />)
        ) : (
          <div className={'text-xl text-center my-16 font-semibold text-gray-700'}>
            No courses found
          </div>
        )}
      </section>
      {!loading && (
        <PaginationControls
          className={'justify-center'}
          pagination={pagination}
          setPage={fetchPage}
        />
      )}
    </Container>
  );
};

export default CourseIndex;
