import { graphql, navigate } from 'gatsby';
import React from 'react';
import BlogLayout from '../components/layouts/BlogLayout';
import LayoutWrapper from '../components/layouts/LayoutWrapper';
import { SEO } from '../components/SEO';
import metadata from '../data/metadata';
import Pagination from '../components/pagination/Pagination';

const BlogPage = ({ data, pageContext }) => {
  const { current, total } = pageContext;

  const handleChangePage = page => {
    if (page === 1) {
      navigate(`/blog`);
    } else navigate(`/blog/${page}`);
  };

  const getFirstBlogPostImage = () => {
    const postsArray = data.allContentfulBlogPost.edges;
    if (postsArray.length === 0) return null;

    const gatsbyImage =
      data.allContentfulBlogPost.edges[0].node.backgroundImage.gatsbyImageData;

    return (
      gatsbyImage.images.sources[0].srcSet || gatsbyImage.images.fallback.src
    );
  };

  return (
    <>
      <SEO
        title={metadata.blog.title}
        description={metadata.blog.description}
        pathname="blog"
        fullImageUrl={getFirstBlogPostImage()}
      />
      <LayoutWrapper color="red">
        <BlogLayout data={data.allContentfulBlogPost.edges} />
        <Pagination
          numPages={total}
          handleChangePage={handleChangePage}
          currentPage={current}
        />
      </LayoutWrapper>
    </>
  );
};

export default BlogPage;

export const query = graphql`
  query BlogPostsQuery($limit: Int!, $skip: Int!) {
    allContentfulBlogPost(
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
          article {
            raw
          }
          tags {
            name
          }
          backgroundImage {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;
