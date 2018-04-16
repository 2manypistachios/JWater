import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';

import pic11 from '../assets/images/pic11.jpg'

export const EnvironmentalPageTemplate = ({ title, content, image, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <div>
        <div id="main" className="alt">
          <section id="one">
            <div className="inner">
              <header className="major">
                <h1>{title}</h1>
              </header>
              <span className="image main"><img src={image} alt="" style={{'max-height':'300px',overflow:'hidden'}}/></span>
              <PageContent className="content" content={content} />
            </div>
          </section>
        </div>
    </div>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;

  return (<EnvironmentalPageTemplate
    contentComponent={HTMLContent}
    title={post.frontmatter.title}
    content={post.html}
    image={post.frontmatter.image}
  />);
};

export const environmentalPageQuery = graphql`
  query environmentalPage($path: String!) {
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
