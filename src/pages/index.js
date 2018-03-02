import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Script from 'react-load-script';
import graphql from 'graphql';
import Banner from '../components/Banner';

import pic01 from '../assets/images/pic01.jpg';
import pic02 from '../assets/images/pic02.jpg';
import pic03 from '../assets/images/pic03.jpg';
import pic04 from '../assets/images/pic04.jpg';
import pic05 from '../assets/images/pic05.jpg';
import pic06 from '../assets/images/pic06.jpg';

class HomeIndex extends React.Component {
    handleScriptLoad() {
        if (typeof window !== `undefined` && window.netlifyIdentity) {
          window.netlifyIdentity.on("init", user => {
            if (!user) {
              window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
              });
            }
          });
        }
        window.netlifyIdentity.init();
    }
    /*render() {
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;
        console.log(data);
        console.log(posts);
        return (
          <section className="section">
            <Script
              url="https://identity.netlify.com/v1/netlify-identity-widget.js"
              onLoad={() => this.handleScriptLoad()}
            />
            <div className="container">
              <div className="content">
                <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
              </div>
              {posts
                .filter(post => post.node.frontmatter.templateKey === "product-page")
                .map(({ node: post }) => (
                  <div
                    className="content"
                    style={{ border: "1px solid #eaecee", padding: "2em 4em" }}
                    key={post.id}
                  >
                    <p>
                      <Link className="has-text-primary" to={post.frontmatter.path}>
                        {post.frontmatter.title}
                      </Link>
                      <span> &bull; </span>
                      <small>{post.frontmatter.date}</small>
                    </p>
                    <p>
                      {post.excerpt}
                      <br />
                      <br />
                      <Link className="button is-small" to={post.frontmatter.path}>
                        Keep Reading →
                      </Link>
                    </p>
                  </div>
                ))}
            </div>
          </section>
        );
      }*/
     render() {
        const { data } = this.props;
        console.log(data);
        const { edges: posts } = data.allMarkdownRemark;
        console.log(posts);
        //const posts = data.allMarkdownRemark.edges;
        const siteTitle = data.site.siteMetadata.title;
        const siteDescription = data.site.siteMetadata.description;
        return (
            <div>
                <Script
                    url="https://identity.netlify.com/v1/netlify-identity-widget.js"
                    onLoad={() => this.handleScriptLoad()}
                />
                <Helmet>
                    <title>{siteTitle}</title>
                    <meta name="description" content={siteDescription} />
                </Helmet>

                <Banner />

                <div id="main">
                    <section id="one" className="tiles">
                        {posts
                        .filter(post => post.node.frontmatter.templateKey === "product-page")
                        .map(({ node: post },index) => (
                            <article style={{backgroundImage: `url(${pic01})`}}>
                                <header className="major">
                                    <h3>{post.frontmatter.title}</h3>
                                    <p>{post.frontmatter.description}</p>
                                </header>
                                <Link className="link primary" to={post.frontmatter.path}></Link>
                            </article>
                        ))}
                    </section>
                    <section id="two">
                        <div className="inner">
                            <header className="major">
                                <h2>Section two</h2>
                            </header>
                            <p>Section two is completely insane. Its so insane I can't even explain it. That's how insane it is. It is so insane that you can't even explain it. How insane.</p>
                            <ul className="actions">
                                <li><Link to="/landing" className="button next">Get Started</Link></li>
                            </ul>
                        </div>
                    </section>
                </div>

            </div>
        )
    }
}

export default HomeIndex

export const pageQuery = graphql`
    query PageQuery {
        site {
            siteMetadata {
                title
                description
            }
        }
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                frontmatter {
                  title
                  templateKey
                  path
                  description
                }
              }
            }
        }
    }
`