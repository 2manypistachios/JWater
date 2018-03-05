import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';

import pic11 from '../assets/images/pic11.jpg'

export const ProductPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <div>
        <div id="main" className="alt">
          <section id="one">
            <div className="inner">
              <header className="major">
                <h1>{title}</h1>
              </header>
              <span className="image main"><img src={pic11} alt="" /></span>
              <PageContent className="content" content={content} />
            </div>
          </section>
        </div>
    </div>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;

  return (<ProductPageTemplate
    contentComponent={HTMLContent}
    title={post.frontmatter.title}
    content={post.html}
  />);
};

export const productPageQuery = graphql`
  query productPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
