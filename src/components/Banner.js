import React from 'react'
import Link from 'gatsby-link';

const Banner = ({post}) => (
    <section id="banner" className="major">
        <div className="inner">
            <header className="major">
                <h1>{post.frontmatter.title}</h1>
            </header>
            <div className="content">
                <p>{post.frontmatter.description}<br />
                by JWater</p>
                <ul className="actions">
                    <li><Link className="button next scrolly" to={post.frontmatter.path}>Learn About</Link></li>
                </ul>
            </div>
        </div>
    </section>
)

export default Banner
