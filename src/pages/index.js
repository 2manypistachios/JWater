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
                
                {posts
                .filter(post => post.node.frontmatter.templateKey === "about-page")
                .map(({ node: post },index) => (
                    <Banner post={post} />
                ))}

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
                        {posts
                        .filter(post => post.node.frontmatter.templateKey === "environmental-page")
                        .map(({ node: post },index) => (       
                            <div className="inner">
                                <header className="major">
                                    <h2>{post.frontmatter.title}</h2>
                                </header>
                                <p>{post.frontmatter.description}</p>
                                <ul className="actions">
                                    <li><Link to={post.frontmatter.path} className="button next">Read More</Link></li>
                                </ul>
                            </div>
                        ))}
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