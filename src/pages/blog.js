import React, { useEffect } from 'react'

import Link from 'next/link'

import {
    Container,
    Row,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap'

import CardPost from '../components/CardPost'

import TextTruncate from 'react-text-truncate'
import AnalyticsService from '../services/AnalyticsService';
import data from '../data/blog.json'
import Head from 'next/head';

export async function getStaticProps() {
    return {
        props: {
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            title: "WorkSchool | Blog"
        },
    }
}

export default () => {
    const featuredPost = data.posts[0]
    useEffect(() => {
      AnalyticsService.logPageView(window.location.pathname + window.location.search);
    });

    return (
        <React.Fragment>
             <Head>
              <title>WorkSchool | Blog</title>
              <meta name="description" content="Browse our latest articles regarding news and updates amongst the education industry"></meta>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
              <meta property="og:title" content="WorkSchool | Blog" />
              <meta property="og:description" content="Browse our latest articles regarding news and updates amongst the education industry" />
              <meta property="og:image" content={"https://miro.medium.com/max/1400/1*-2cJ9uNUXBYnfbSVx5osDg.png"} />
            </Head>
            {featuredPost && <section className="position-relative py-6">
                {featuredPost.img && <img src={`/content/${featuredPost.img}`} className="bg-image" alt={featuredPost.title} />}
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className="bg-white rounded-lg shadow p-5">
                                <strong className="text-uppercase text-secondary d-inline-block mb-2 text-sm">
                                    {featuredPost.subtitle}
                                </strong>
                                <h2 className="mb-3">{featuredPost.title}</h2>
                                <p className="text-muted">
                                <TextTruncate
                                    line={3}
                                    element="span"
                                    truncateText="..."
                                    text={JSON.stringify(featuredPost.description)}>
                                </TextTruncate>  
                                    </p>
                                <Link
                                    href="/blog/[slug]"
                                    as={`/blog/${featuredPost.slug}`}>
                                    <a className="p-0 btn btn-link">
                                        Continue reading <i className="fa fa-long-arrow-alt-right" />
                                    </a>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            }
            <section className="py-6">
                <Container>
                    <Row className="mb-5">
                        {data.posts && data.posts.map((post, index) => {
                            // the first post is featured
                            if (index >= 1)
                                return <Col
                                    key={index}
                                    sm="6"
                                    lg="4"
                                    className="mb-4 hover-animate"
                                >
                                    <CardPost data={post} index={index} />
                                </Col>
                        }
                        )}

                    </Row>
                    <Pagination aria-label="Page navigation example" listClassName="d-flex justify-content-between mb-5">
                        <PaginationItem>
                            <PaginationLink href="/blog" className="page-link text-sm rounded">
                                <i className="fa fa-chevron-left mr-1" />Older posts
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                            <PaginationLink href="/blog" className="page-link text-sm rounded">
                                Newer posts<i className="fa fa-chevron-right ml-1" />
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </Container>
            </section>
        </React.Fragment>
    )
}
