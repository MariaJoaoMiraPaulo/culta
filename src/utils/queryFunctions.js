// Map images by their original file name
export const getImagesMappedByName = data => {
  const images = {};

  data.forEach(({ node }) => {
    if (!node.childImageSharp) return;
    images[`${node.name}.jpg`] = node.childImageSharp.gatsbyImageData;
  });

  return images;
};

// Get an array of gatsbyImageData objects
export const getArrayOfBannerImages = data =>
  data.map(({ node: { childImageSharp } }) => childImageSharp.gatsbyImageData);
