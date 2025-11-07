import React from 'react';
import LayoutWrapper from '../components/layouts/LayoutWrapper';
import ServicesLayout from '../components/layouts/ServicesLayout';
import { getImagesMappedByName } from '../utils/queryFunctions';
import { graphql } from 'gatsby';
import { SEO } from '../components/SEO';
import metadata from '../data/metadata';

const ServicesPage = ({ data }) => {
  const images = getImagesMappedByName(data.allFile.edges);

  return (
    <>
      <SEO
        title={metadata.services.title}
        description={metadata.services.description}
        pathname="services"
      />
      <LayoutWrapper color="marble" backgroundColor="blue">
        <ServicesLayout images={images} />
      </LayoutWrapper>
    </>
  );
};

export default ServicesPage;

export const query = graphql`
  query ServicesPageQuery {
    allFile(filter: { name: { in: ["natureza", "services"] } }) {
      edges {
        node {
          id
          name
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
          }
        }
      }
    }
  }
`;
