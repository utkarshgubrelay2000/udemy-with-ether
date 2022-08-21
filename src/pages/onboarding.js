import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import ProgressBar from '../components/ProgressBar';
import onboardingInterestsJSON from '../data/onboarding-interests.json';
import UserManagerService from '../services/UserManagerService';
import HTMLParser from 'html-react-parser';
import AnalyticsService from '../services/AnalyticsService';

export async function getStaticProps() {
    return {
        props: {
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            loggedUser: true,
            title: "Course Guide - step one",
            listingForm: true
        },
    }
}

export default () => {
    const router = useRouter();
    const [ progress, setProgress] = useState(0);
    const [ card1, setCard1 ] = useState(false);
    const [ card2, setCard2 ] = useState(false);
    const [ card3, setCard3 ] = useState(false);
    const [ card4, setCard4 ] = useState(false);
    const [ card5, setCard5 ] = useState(false);
    const [ card6, setCard6 ] = useState(false);

    const [clickedCard1, setClickedCard1] = useState(false);
    const [clickedCard2, setClickedCard2] = useState(false);
    const [clickedCard3, setClickedCard3] = useState(false);
    const [clickedCard4, setClickedCard4] = useState(false);
    const [clickedCard5, setClickedCard5] = useState(false);
    const [clickedCard6, setClickedCard6] = useState(false);

    const [countOfCardsClicked, setCountOfCardsClicked] = useState(0);
    const [error, setError] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { email } = user;

    const dismissError = () => {
      setError("");
      setErrorVisible(false);
    };

    useEffect(() => {
      (async () => {
        if (isAuthenticated) {
          const onboardingStatus = await UserManagerService.getUserOnboardingStatus(email);
          if (onboardingStatus) {
            router.push("/");
          }
        } else {
          router.push("/");
        }
      })();
    }, []);

    useEffect(() => {
      AnalyticsService.logPageView(window.location.pathname + window.location.search);
    });

    const cards = [ 
      { 
        setCard: setCard1,
        setClickedCard: setClickedCard1,
        card: card1,
        clickedCard: clickedCard1,
        color: '#EC368D',
      },
      {
        setCard: setCard2,
        setClickedCard: setClickedCard2,
        card: card2,
        clickedCard: clickedCard2,
        color: '#FDB833',
      },
      {
        setCard: setCard3,
        setClickedCard: setClickedCard3,
        card: card3,
        clickedCard: clickedCard3,
        color: '#17BEBB',
      },
      {
        setCard: setCard4,
        setClickedCard: setClickedCard4,
        card: card4,
        clickedCard: clickedCard4,
        color: '#E4572E',
      },
      {
        setCard: setCard5,
        setClickedCard: setClickedCard5,
        card: card5,
        clickedCard: clickedCard5,
        color: '#76B041',
      },
      {
        setCard: setCard6,
        setClickedCard: setClickedCard6,
        card: card6,
        clickedCard: clickedCard6,
        color: '#77BA99',
      },
    ];

    const handleCardClick = (clickedCard, setClickedCard) => {
      setClickedCard(!clickedCard);
      if (!clickedCard) {
        setCountOfCardsClicked(countOfCardsClicked => countOfCardsClicked + 1);
        if (countOfCardsClicked <= 2) {
          setProgress(progress + 10);
        }
      }

      if (clickedCard) {
        setCountOfCardsClicked(countOfCardsClicked => countOfCardsClicked - 1);
        if (countOfCardsClicked <= 3) {
          setProgress(progress - 10);
        }
      }
    }

    const handleMouseEnterCard = (setCard) => {
      setCard(true);
    }

    const handleMouseLeaveCard = (setCard) => {
      setCard(false)
    }

    const handleSubmitClick = () => {
      let j = 0;
      let interests = [];
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].clickedCard) {
          interests.push(cards[i].label);
          j++;
        }
      }

      if (j >= 3) {
        router.push({
          pathname: '/onboarding-step-two',
          query: {
            interests,
            progress,
          },
        })
      } else {
        // console.log('submit more');
        setError("Select at least 3 courses to continue!");
        setErrorVisible(true);
      }
    }

    let prev = 0;
    let secondPrev = 0;
    return (
      <React.Fragment>
        <ProgressBar progress={progress} />
        <section className="py-5">
          <Container>
            <Row lg="12">
              <h3 className="h1 mx-auto text-secondary">What are your interests?</h3>
            </Row>
            <Row>
              <p className="mx-auto mt-3 mb-5 text-center">
                Select <text className="text-secondary">at least 3 or more</text> subjects that interest you so that we can curate personalized course recommendations in your dashboard.
              </p>
            </Row>
            <Row lg="7">
              <Col>
                {onboardingInterestsJSON.interests[0]["landing-page-1"].map((item, index) => {
                  prev++;
                  cards[index]["label"] = item.label;
                  return (
                    <Card
                      onClick={() => handleCardClick(cards[index].clickedCard, cards[index].setClickedCard)}
                      onMouseEnter={() => handleMouseEnterCard(cards[index].setCard)}
                      onMouseLeave={() => handleMouseLeaveCard(cards[index].setCard)}
                      className="mx-2 mb-5"
                      style={{
                        transition: 'border 0.2s',
                        ...((cards[index].card || cards[index].clickedCard) ? {
                          borderColor: '#4E66F8',
                          borderWidth: 3,
                          cursor: 'pointer',
                        } : {
                          border: '3px solid lightgrey'
                        }),
                        height: 103.11,
                      }}
                    >
                    <CardBody>
                      <div style={{ marginTop: '-4%', display: 'flex', flexDirection: 'column' }}>
                          <div style={{ fontSize: 35, color: cards[secondPrev + prev + index].color, }} className="mx-auto">
                            {
                              HTMLParser(item.html)
                            }
                          </div>
                          <CardTitle tag="h5" style={{ textAlign: 'center' }}>
                            {item.title}
                          </CardTitle>
                      </div>
                    </CardBody>
                    </Card>
                  )
                })
              }
              </Col>
              <Col>
                {onboardingInterestsJSON.interests[0]["landing-page-2"].map((item, index) => {
                  secondPrev++;
                  cards[prev + index]["label"] = item.label;
                  return (
                    <Card
                      className="mx-2 mb-5"
                      onClick={() => handleCardClick(cards[prev + index].clickedCard, cards[prev + index].setClickedCard)}
                      onMouseEnter={() => handleMouseEnterCard(cards[prev + index].setCard)}
                      onMouseLeave={() => handleMouseLeaveCard(cards[prev + index].setCard)}
                      style={{
                        transition: 'border 0.2s',
                        ...((cards[prev + index].card || cards[prev + index].clickedCard) ? {
                          borderColor: '#4E66F8',
                          borderWidth: 3,
                          cursor: 'pointer',
                        } :  {
                          border: '3px solid lightgrey'
                        }),
                        height: 103.11,
                      }}
                    >
                    <CardBody>
                      <div style={{ marginTop: '-4%', display: 'flex', flexDirection: 'column' }}>
                          <div style={{ fontSize: 35, color: cards[secondPrev + prev + index].color, }} className="mx-auto">
                            {
                              HTMLParser(item.html)
                            }
                          </div>
                          <CardTitle tag="h5" style={{ textAlign: 'center' }}>
                            {item.title}
                          </CardTitle>
                      </div>
                    </CardBody>
                  </Card>
                  )
                })
              }
              </Col>
              <Col>
                {onboardingInterestsJSON.interests[0]["landing-page-3"].map((item, index) => {
                  cards[secondPrev + prev + index]["label"] = item.label;
                  return (
                    <Card
                      className="mx-2 mb-5"
                      onClick={() => handleCardClick(cards[secondPrev + prev + index].clickedCard, cards[secondPrev + prev + index].setClickedCard)}
                      onMouseEnter={() => handleMouseEnterCard(cards[secondPrev + prev + index].setCard)}
                      onMouseLeave={() => handleMouseLeaveCard(cards[secondPrev + prev + index].setCard)}
                      style={{
                        transition: 'border 0.2s',
                        ...((cards[secondPrev + prev + index].card || cards[secondPrev + prev + index].clickedCard)? {
                          borderColor: '#4E66F8',
                          borderWidth: 3,
                          cursor: 'pointer',
                        } : {
                          border: '3px solid lightgrey'
                        }),
                        height: 103.11,
                      }}
                    >
                    <CardBody>
                      <div style={{ marginTop: '-4%', display: 'flex', flexDirection: 'column' }}>
                          <div style={{ fontSize: 35, color: cards[secondPrev + prev + index].color, }} className="mx-auto">
                            {
                              HTMLParser(item.html)
                            }
                          </div>
                          <CardTitle tag="h5" style={{ textAlign: 'center' }}>
                            {item.title}
                          </CardTitle>
                      </div>
                    </CardBody>
                  </Card>
                  )
                })
              }
              </Col>
            </Row>
          </Container>
          <br></br>
          <br></br>
          <Container>
            <Modal
              isOpen={errorVisible}
              toggle={dismissError}
              className="text-center"
            >
              <ModalHeader
                className="border-0"
                toggle={dismissError}
              >
              </ModalHeader>
              <ModalBody className="border-0">{error}</ModalBody>
              <ModalFooter className="border-0">
                <Button color="primary" onClick={dismissError}>
                  Ok
                </Button>
              </ModalFooter>
            </Modal>
            <Row lg="12">
              <Button
                className="mx-auto"
                onClick={handleSubmitClick}
                style={{ height: 50, width: 200 }}
              >
                Next step
              </Button>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
}
