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
import knowledge from "../../data/knowledge-base2.json";
import Link from 'next/link';

export function getAllPostIds() {
  return knowledge.topics.map((topic) => ({
    params: {
      slug: topic.slug,
    },
  }));
}
export function getPostData(slug) {
  for (var i = 0; i < knowledge.topics.length; i++) {
    if (knowledge.topics[i].slug == slug) {
      return knowledge.topics[i];
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
      title: "Knowledge base - Topic",
      postData,
    },
  };
}

const KnowledgeBaseTopic = ({ postData }) => {
  return (
    <React.Fragment>
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
                    <Button color="primary" className="mr-1">
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
