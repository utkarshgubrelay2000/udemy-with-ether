import React from "react";
import Link from "next/link";
import { Container, Row, Col, Form, Input, Button, Badge } from "reactstrap";

import footerContent from "../data/footer.json";

export default () => {
  return (
    <footer className="position-relative z-index-10 d-print-none">
      <div className="py-6 bg-gray-200 text-muted">
        <Container>
          <Row>
            {footerContent &&
              footerContent.map((item) => (
                <Col
                  key={item.title}
                  lg={item.lg && item.lg}
                  md={item.md && item.md}
                  className="mb-5 mb-lg-0">
                  <div className="font-weight-bold text-uppercase text-dark mb-3">
                    {item.title}
                  </div>
                  {item.content && (
                    <p
                      className={
                        item.contentBottomMargin
                          ? `mb-${item.contentBottomMargin}`
                          : ""
                      }>
                      {item.content}
                    </p>
                  )}
                  {item.social && (
                    <ul className="list-inline">
                      {item.social.map((socialIcon) => (
                        <li key={socialIcon.title} className="list-inline-item">
                          <a
                            href={socialIcon.link}
                            target="_blank"
                            title={socialIcon.title}
                            className="text-muted text-hover-primary">
                            <i className={`fab fa-${socialIcon.title}`} />
                          </a>
                        </li>
                      ))}
                      <br />
                    </ul>

                  )}

                  {item.links && (
                    <ul className="list-unstyled">
                      {item.links.map((link) => (
                        <li key={link.title}>
                          <Link href={link.link}>
                            <a className="text-muted">
                              {link.title}
                              {link.new && (
                                <Badge color="info-light" className="ml-1">
                                  New
                                </Badge>
                              )}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.form && (
                    <Form id="newsletter-form">
                      <div className="input-group mb-3">
                        <Input
                          type="email"
                          placeholder={item.form.placeholder}
                          aria-label={item.form.placeholder}
                          className="bg-transparent border-dark border-right-0"
                        />
                        <div className="input-group-append">
                          <Button
                            className="btn-outline-dark border-left-0"
                            color="deoco">
                            <i className="fa fa-paper-plane text-lg" />
                          </Button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Col>
              ))}
            <Col>
              <a href='https://play.google.com/store/apps/details?id=co.workschool&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                <img
                  width="150"
                  alt='Get it on Google Play'
                  src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
                />
              </a>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <Container  style={{ textAlign: "center" }} >
          <a href='https://play.google.com/store/apps/details?id=co.workschool&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
            <img
              width="200"
              alt='Get it on Google Play'
              src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
            />
          </a>
        </Container> */}
      <div className="py-4 font-weight-light bg-gray-800 text-gray-300">
        <Container>
          <Row className="align-items-center">
            <Col md="6" className="text-center text-md-left">
              <p className="text-sm mb-md-0">
                © 2020, WorkSchool. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};
