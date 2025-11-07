import { graphql, navigate } from 'gatsby';
import React from 'react';
import GalleryLayout from '../components/layouts/GalleryLayout';
import LayoutWrapper from '../components/layouts/LayoutWrapper';
import { getImagesMappedByName } from '../utils/queryFunctions';
import { SEO } from '../components/SEO';
import metadata from '../data/metadata';
import Pagination from '../components/pagination/Pagination';

const Gallery = ({ data, pageContext }) => {
  const images = getImagesMappedByName(data.allImageSharp.edges);
  const { current, total } = pageContext;

  const handleChangePage = page => {
    if (page === 1) {
      navigate(`/gallery`);
    } else {
      navigate(`/gallery/${page}`);
    }
  };

  return (
    <>
      <SEO
        title={metadata.gallery.title}
        description={metadata.gallery.description}
        pathname="gallery"
        fullImageUrl={
          data.allContentfulGalleryPhoto.edges[0].node.photo.gatsbyImageData
            ?.images?.fallback?.src
        }
      />
      <LayoutWrapper color="red">
        <GalleryLayout
          photos={data.allContentfulGalleryPhoto.edges}
          images={images}
        />
        <Pagination
          numPages={total}
          handleChangePage={handleChangePage}
          currentPage={current}
        />
      </LayoutWrapper>
    </>
  );
};

export default Gallery;

export const query = graphql`
  query GalleryQuery($limit: Int!, $skip: Int!) {
    allContentfulGalleryPhoto(
      sort: { photo: { createdAt: DESC } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          photo {
            contentful_id
            gatsbyImageData(layout: CONSTRAINED)
            description
            id
          }
          author
          authorsProfileLink
        }
      }
    }
    allImageSharp {
      edges {
        node {
          id
          gatsbyImageData
        }
      }
    }
  }
`;
