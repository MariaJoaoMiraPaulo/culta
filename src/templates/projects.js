import { graphql, navigate } from 'gatsby';
import React from 'react';
import PortfolioLayout from '../components/layouts/PortfolioLayout';
import LayoutWrapper from '../components/layouts/LayoutWrapper';
import { SEO } from '../components/SEO';
import metadata from '../data/metadata';
import Pagination from '../components/pagination/Pagination';

const PortfolioPage = ({ data, pageContext, color }) => {
  const { current, total } = pageContext;

  const handleChangePage = page => {
    if (page === 1) {
      navigate(`/projects`);
    } else navigate(`/projects/${page}`);
  };

  const getFirstPortfolioProjectImage = () => {
    const projectsArray = data.allContentfulPortfolioProject.edges;
    if (projectsArray.length === 0) return null;

    const gatsbyImage =
      data.allContentfulPortfolioProject.edges[0].node.backgroundImage
        .gatsbyImageData;

    return (
      gatsbyImage.images.sources[0].srcSet || gatsbyImage.images.fallback.src
    );
  };

  return (
    <>
      <SEO
        title={metadata.portfolio.title}
        description={metadata.portfolio.description}
        pathname="portfolio"
        fullImageUrl={getFirstPortfolioProjectImage()}
      />
      <LayoutWrapper color="red">
        <PortfolioLayout data={data.allContentfulPortfolioProject.edges} />
        <Pagination
          color="blue"
          numPages={total}
          handleChangePage={handleChangePage}
          currentPage={current}
        />
      </LayoutWrapper>
    </>
  );
};

export default PortfolioPage;

export const query = graphql`
  query PortfolioProjectsQuery($limit: Int!, $skip: Int!) {
    allContentfulPortfolioProject(
      sort: { createdAt: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          linkTitle
          createdAt
          backgroundImage {
            gatsbyImageData(layout: CONSTRAINED)
          }
          description {
            raw
          }
        }
      }
    }
  }
`;
