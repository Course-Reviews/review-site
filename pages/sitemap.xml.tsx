import { GetServerSideProps } from 'next';
import courseList from '../util/courseList.json';

const Sitemap: React.FC = () => <></>;

export const getServerSideProps: GetServerSideProps  = async ({ res }) => {
  const baseUrl = 'https://coursereview.co.nz/courses';
  const staticPages = courseList.map((staticPagePath) => `${baseUrl}/${staticPagePath}`);

  console.log(staticPages);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map(
          (url) => `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    `
        )
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
};

export default Sitemap;
