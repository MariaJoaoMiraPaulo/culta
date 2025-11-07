import * as React from 'react';
import LayoutWrapper from '../components/layouts/LayoutWrapper';
import ContactLayout from '../components/layouts/ContactLayout';
import { getImagesMappedByName } from '../utils/queryFunctions';
import { graphql } from 'gatsby';
import { SEO } from '../components/SEO';
import metadata from '../data/metadata';

const ContactPage = ({ data }) => {
  console.log(data);

  const images = getImagesMappedByName(data.allFile.edges);

  return (
    <>
      <SEO
        title={metadata.contacts.title}
        description={metadata.contacts.description}
        pathname="contacts"
        imagePath={images['pilares.jpg']}
      />
      <LayoutWrapper color="red">
        <ContactLayout images={images} />
      </LayoutWrapper>
    </>
  );
};

export default ContactPage;

export const query = graphql`
  query ContactPageQuery {
    allFile(filter: { name: { in: ["pilares"] } }) {
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
