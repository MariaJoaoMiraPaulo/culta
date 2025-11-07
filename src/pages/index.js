import React from 'react';
import LayoutWrapper from '../components/layouts/LayoutWrapper';
import HomeLayout from '../components/layouts/HomeLayout';
import { graphql } from 'gatsby';
import {
  getImagesMappedByName,
  getArrayOfBannerImages,
} from '../utils/queryFunctions';
import { SEO } from '../components/SEO';
import metadata from '../data/metadata';

const HomePage = React.memo(({ data }) => {
  const images = getImagesMappedByName(data.images.edges);
  const bannerImagesArray = getArrayOfBannerImages(data.bannerImages.edges);
  const currentBannerImage =
    bannerImagesArray[Math.floor(Math.random() * bannerImagesArray.length)];

  return (
    currentBannerImage && (
      <>
        <SEO
          description={metadata.home.description}
          imagePath={currentBannerImage.images.fallback.src}
        />
        <LayoutWrapper
          shortenedVersion={false}
          isHomepage
          color="marble"
          bannerImage={currentBannerImage}
          noPadding
        >
          <HomeLayout images={images} />
        </LayoutWrapper>
      </>
    )
  );
});

export default HomePage;

export const query = graphql`
  query MyQuery {
    images: allFile(filter: { name: { in: ["proud", "bannerAbout", "1"] } }) {
      edges {
        node {
          id
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
          }
          name
        }
      }
    }

    bannerImages: allFile(
      filter: { sourceInstanceName: { eq: "bannerImages" } }
    ) {
      edges {
        node {
          id
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
          }
        }
      }
    }
  }
`;
