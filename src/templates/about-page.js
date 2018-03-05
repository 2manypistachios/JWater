import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';

import pic11 from '../assets/images/pic11.jpg'

export const AboutPageTemplate = ({ title, content, image, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <div>
        <div id="main" className="alt">
          <section id="one">
            <div className="inner">
              <header className="major">
                <h1>{title}</h1>
              </header>
              <span className="image main"><img src={image} alt="" /></span>
              <PageContent className="content" content={content} />
            </div>
          </section>
        </div>
    </div>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;

  return (<AboutPageTemplate
    contentComponent={HTMLContent}
    title={post.frontmatter.title}
    image={post.frontmatter.image}
    content={post.html}
  />);
};

export const aboutPageQuery = graphql`
  query aboutPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        image
      }
    }
  }
`;
