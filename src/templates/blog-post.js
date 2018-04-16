import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    return (
      <div>
        <Helmet title={`${posts.frontmatter.title} | ${siteTitle}`} />
        <div id="main" className="alt">
            <section id="one">
              <div className="inner">
                <header>
                  <h1>{post.frontmatter.title}</h1>
                </header>
                <span className="image main"><img src={image} alt="" /></span>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <hr/>
              </div>
            </section>
        </div>
    </div>
    )
  }
}

export default BlogPostTemplate
