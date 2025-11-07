import { graphql, navigate } from 'gatsby';
import * as React from 'react';
import LayoutWrapper from '../../components/layouts/LayoutWrapper';
import PostLayout from '../../components/layouts/PostLayout';
import { SEO } from '../../components/SEO';
import PreviousNextLinks from '../../components/previousAndNext/PreviousNextLinks';
import { withTrans } from '../../i18n/withTrans';

const getSEOData = post => {
  let description = post.description;

  if (typeof description === 'object') {
    description = description.description;
  }
  return {
    title: post.title,
    description: description,
    url: `blog/${post.linkTitle}`,
    imageUrl: post?.backgroundImage?.gatsbyImageData?.images.fallback?.src,
  };
};

const Post = ({ t, data }) => {
  const post = data.contentfulBlogPost;
  const seo = getSEOData(post);

  if (!data.contentfulBlogPost) {
    return navigate('/404');
  }

  const jumpTo = linkTitle => {
    return navigate(`/blog/${linkTitle}`);
  };

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        pathname={seo.url}
        fullImageUrl={seo.imageUrl}
      />
      <LayoutWrapper color="red">
        <PostLayout post={post} assets={data.allContentfulAsset} />
        <PreviousNextLinks
          data={data.allContentfulBlogPost.edges}
          currentDataItemId={data.contentfulBlogPost.id}
          jumpTo={jumpTo}
          next={t('blog.links.next')}
          previous={t('blog.links.previous')}
        />
      </LayoutWrapper>
    </>
  );
};

export default withTrans(Post);

export const query = graphql`
  query BlogPost($linkTitle: String!) {
    contentfulBlogPost(linkTitle: { eq: $linkTitle }) {
      id
      createdAt
      tags {
        name
      }
      linkTitle
      title
      description {
        description
      }
      article {
        raw
      }
      backgroundImage {
        description
        gatsbyImageData(layout: CONSTRAINED)
        publicUrl
      }
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
    allContentfulBlogPost(sort: { createdAt: DESC }) {
      edges {
        node {
          id
          linkTitle
          title
          backgroundImage {
            description
            gatsbyImageData(layout: CONSTRAINED)
            publicUrl
          }
        }
      }
    }
  }
`;
