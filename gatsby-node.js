const path = require('path');
const BLOG_POSTS_PER_PAGE = 6;
const PORTFOLIO_PROJECTS_PER_PAGE = 6;
const GALLERY_PHOTOS_PER_PAGE = 6;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // BLOG POSTS
  const blogQueryResult = await graphql(`
    query BlogPostsQuery {
      allContentfulBlogPost(sort: { createdAt: DESC }) {
        edges {
          node {
            id
          }
        }
      }
    }
  `);

  const blogPosts = blogQueryResult.data.allContentfulBlogPost.edges;
  const postsPerPage = BLOG_POSTS_PER_PAGE;
  const numBlogPostsPages = Math.ceil(blogPosts.length / postsPerPage);
  const blogTemplate = path.resolve(`./src/templates/blog.js`);

  Array.from({ length: numBlogPostsPages }).forEach((_, i) => {
    const withPrefix = pageNumber =>
      pageNumber === 1 ? `/blog` : `/blog/${pageNumber}`;
    const pageNumber = i + 1;
    createPage({
      path: withPrefix(pageNumber),
      component: blogTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        current: pageNumber,
        total: numBlogPostsPages,
        hasNext: pageNumber < numBlogPostsPages,
        nextPath: withPrefix(pageNumber + 1),
        hasPrev: i > 0,
        prevPath: withPrefix(pageNumber - 1),
      },
    });
  });

  // GALLERY
  const galleryQueryResult = await graphql(`
    query MyQuery {
      allContentfulGalleryPhoto(sort: { photo: { createdAt: DESC } }) {
        edges {
          node {
            id
          }
        }
      }
    }
  `);

  const galleryPhotos = galleryQueryResult.data.allContentfulGalleryPhoto.edges;
  const galleryPhotosPerPage = GALLERY_PHOTOS_PER_PAGE;
  const numGalleryPhotoPages = Math.ceil(
    galleryPhotos.length / galleryPhotosPerPage,
  );
  const galleryTemplate = path.resolve(`./src/templates/gallery.js`);

  Array.from({ length: numGalleryPhotoPages }).forEach((_, i) => {
    const withPrefix = pageNumber =>
      pageNumber === 1 ? `/gallery` : `/gallery/${pageNumber}`;
    const pageNumber = i + 1;
    createPage({
      path: withPrefix(pageNumber),
      component: galleryTemplate,
      context: {
        limit: galleryPhotosPerPage,
        skip: i * galleryPhotosPerPage,
        current: pageNumber,
        total: numGalleryPhotoPages,
        hasNext: pageNumber < numGalleryPhotoPages,
        nextPath: withPrefix(pageNumber + 1),
        hasPrev: i > 0,
        prevPath: withPrefix(pageNumber - 1),
      },
    });
  });

  // PORTFOLIO PROJECTS
  const portfolioQueryResult = await graphql(`
    query PortfolioProjectsQuery {
      allContentfulPortfolioProject(sort: { createdAt: DESC }) {
        edges {
          node {
            id
          }
        }
      }
    }
  `);

  const portfolioProjects =
    portfolioQueryResult.data.allContentfulPortfolioProject.edges;
  const projectsPerPage = PORTFOLIO_PROJECTS_PER_PAGE;
  const numPortfolioProjectsPages = Math.ceil(
    portfolioProjects.length / projectsPerPage,
  );
  const projectsTemplate = path.resolve(`./src/templates/projects.js`);

  Array.from({ length: numPortfolioProjectsPages }).forEach((_, i) => {
    const withPrefix = pageNumber =>
      pageNumber === 1 ? `/projects` : `/projects/${pageNumber}`;
    const pageNumber = i + 1;
    createPage({
      path: withPrefix(pageNumber),
      component: projectsTemplate,
      context: {
        limit: projectsPerPage,
        skip: i * projectsPerPage,
        current: pageNumber,
        total: numPortfolioProjectsPages,
        hasNext: pageNumber < numPortfolioProjectsPages,
        nextPath: withPrefix(pageNumber + 1),
        hasPrev: i > 0,
        prevPath: withPrefix(pageNumber - 1),
      },
    });
  });
};
