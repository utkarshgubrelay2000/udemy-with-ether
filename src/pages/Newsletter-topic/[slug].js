import React from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Button,
} from "reactstrap";
import knowledge from "../../data/knowledge-base.json";
import Link from "next/link"
import Head from "next/head"

export function getAllPostIds() {
  return knowledge.blocks.map((block) => ({
    params: {
      slug: block.slug,
    },
  }));
}
export function getPostData(slug) {
  for (var i = 0; i < knowledge.blocks.length; i++) {
    if (knowledge.blocks[i].slug == slug) {
      return knowledge.blocks[i];
    }
  }
}
export async function getStaticPaths() {
  return {
    paths: getAllPostIds(),
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const postData = getPostData(params.slug);
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: postData.title + ' | ' + "Newsletter",
      postData,
    },
  };
}

const KnowledgeBaseTopic = ({ postData }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{postData.title + " | " + "Newsletter"}</title>
        <meta name="description" content={postData.subname}></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.subname} />
        <meta property="og:image" content={postData.img} />
      </Head>
      <section className="slug-topic">
        <Container>
          <div className="text-content">
            <h2 style={{textAlign: "center", color: "#E84791"}}>{postData.name}</h2>
            <Container >
            {postData.img && <img src={`${postData.img}`} className="slug-img" alt={postData.title} />}
            </Container>
            <Container>
                <div dangerouslySetInnerHTML={{ __html: postData.subname }} />
              </Container>
            <section>
              <Container>
                <div dangerouslySetInnerHTML={{ __html: postData.content }} />
              </Container>
            </section>
          </div>
          <Row className="my-5">
            <Col lg="6" className="mx-auto">
              <Card className="shadow border-0 text-center">
                <CardHeader className="bg-gray-100 border-0">
                  <CardText tag="h4" className="h5 card-text">
                    Subscribe for more weekly newsletters
                  </CardText>
                </CardHeader>
                <CardBody className="py-4">
                  <Link href="https://www.workschool.co/newsletter">
                    <Button color="secondary" className="mr-1">
                      <i className="fa fa-thumbs-up mr-2" />
                      Subscribe
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default KnowledgeBaseTopic;
