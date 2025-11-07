import { graphql, navigate } from 'gatsby';
import * as React from 'react';
import LayoutWrapper from '../../components/layouts/LayoutWrapper';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import { SEO } from '../../components/SEO';
import PreviousNextLinks from '../../components/previousAndNext/PreviousNextLinks';
import { withTrans } from '../../i18n/withTrans';

const getSEOData = project => {
  let description = project.description;

  if (typeof description === 'object') {
    description = description.description;
  }
  return {
    title: project.title,
    description: description,
    url: `projects/${project.linkTitle}`,
    imageUrl: project?.backgroundImage?.gatsbyImageData?.images.fallback?.src,
  };
};

const Project = ({ t, data }) => {
  const seo = getSEOData(data.contentfulPortfolioProject);

  const project = React.useMemo(() => {
    return data.contentfulPortfolioProject;
  }, [data.contentfulPortfolioProject]);

  if (!data.contentfulPortfolioProject) {
    return navigate('/404');
  }

  const jumpTo = linkTitle => {
    return navigate(`/projects/${linkTitle}`);
  };

  // Extract projectGallery from the current project
  const projectGallery = project.projectGallery || [];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        pathname={seo.url}
        fullImageUrl={seo.imageUrl}
      />
      <LayoutWrapper color="red">
        <ProjectLayout
          project={project}
          assets={data.allContentfulAsset}
          projectGallery={projectGallery}
        />
        <PreviousNextLinks
          data={data.allContentfulPortfolioProject.edges}
          currentDataItemId={data.contentfulPortfolioProject.id}
          jumpTo={jumpTo}
          next={t('portfolio.links.next')}
          previous={t('portfolio.links.previous')}
        />
      </LayoutWrapper>
    </>
  );
};

export default withTrans(Project);

export const query = graphql`
  query PortfolioProject($linkTitle: String!) {
    contentfulPortfolioProject(linkTitle: { eq: $linkTitle }) {
      id
      createdAt
      linkTitle
      title
      description {
        raw
      }
      backgroundImage {
        description
        gatsbyImageData(layout: CONSTRAINED)
        publicUrl
      }
      projectGallery {
        contentful_id
        gatsbyImageData(layout: CONSTRAINED)
        description
        id
      }
      year
      customer
      service
    }
    allContentfulAsset {
      edges {
        node {
          url
          file {
            contentType
            details {
              image {
                height
                width
              }
            }
          }
          contentful_id
          description
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
    }
    allContentfulPortfolioProject(sort: { createdAt: DESC }) {
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
          projectGallery {
            contentful_id
            gatsbyImageData(layout: CONSTRAINED)
            description
            id
          }
        }
      }
    }
  }
`;
