import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';

import pic11 from '../assets/images/pic11.jpg'

export const ProductPageTemplate = ({ title, content, image, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <div>
        <div id="main" className="alt">
          <section id="one" className="spotlights">
            <section>
                <img src={image} alt="" width={{width:'40%'}}/>
                <div className="content">
                    <div className="inner">
                        <header className="major">
                            <h1>{title}</h1>
                        </header>
                        <PageContent className="content" content={content} />
                    </div>
                </div>
            </section>
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
    image={post.frontmatter.image}
  />);
};

export const productPageQuery = graphql`
  query productPage($path: String!) {
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
