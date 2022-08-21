import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle, 
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import ProgressBar from '../components/ProgressBar';
import onboardingObjectivesJSON from '../data/onboarding-objectives.json';
import UserManagerService from '../services/UserManagerService';
import { Cookies } from 'react-cookie';
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
    const cookies = new Cookies();
    const [ progress, setProgress ] = useState(0);
    const [ card1, setCard1 ] = useState(false);
    const [ card2, setCard2 ] = useState(false);
    const [ card3, setCard3 ] = useState(false);
    const [ card4, setCard4 ] = useState(false);
    const [ card5, setCard5 ] = useState(false);
    const [clickedCard1, setClickedCard1] = useState(false);
    const [clickedCard2, setClickedCard2] = useState(false);
    const [clickedCard3, setClickedCard3] = useState(false);
    const [clickedCard4, setClickedCard4] = useState(false);
    const [clickedCard5, setClickedCard5] = useState(false);
    const [error, setError] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [userType, setUserType] = useState("");
    const [interests, setInterests] = useState([]);
    const [countOfCardsClicked, setCountOfCardsClicked] = useState(0);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { email } = user;

    const dismissError = () => {
      setError("");
      setErrorVisible(false);
    };  

    useEffect(() => {
      setProgress(router.query.progress);
      setInterests(router.query.interests);
      setUserType(router.query.userType);
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
      },
      {
        setCard: setCard2,
        setClickedCard: setClickedCard2,
        card: card2,
        clickedCard: clickedCard2,
      },
      {
        setCard: setCard3,
        setClickedCard: setClickedCard3,
        card: card3,
        clickedCard: clickedCard3,
      },
      {
        setCard: setCard4,
        setClickedCard: setClickedCard4,
        card: card4,
        clickedCard: clickedCard4,
      },
      {
        setCard: setCard5,
        setClickedCard: setClickedCard5,
        card: card5,
        clickedCard: clickedCard5,
      },
    ];

    const handleCardClick = (clickedCard, setClickedCard, cardLabel) => {
      setClickedCard(!clickedCard);
      if (!clickedCard) {
        setCountOfCardsClicked(countOfCardsClicked => countOfCardsClicked + 1);
        let clicked = countOfCardsClicked;
        if (++clicked === 1) {
          setProgress(100);
        }
      }

      if (clickedCard) {
        setCountOfCardsClicked(countOfCardsClicked => countOfCardsClicked - 1);
        let clicked = countOfCardsClicked;
        if (--clicked === 0) {
          setProgress(75);
        }
      }
    }

    const handleMouseEnterCard = (setCard) => {
      setCard(true);
    }

    const handleMouseLeaveCard = (setCard) => {
      setCard(false)
    }

    const handleSubmitClick = async () => {
      let j = 0;
      let objectives = [];
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].clickedCard) {
          objectives.push(cards[i].label);
          j++;
        }
      }
      if (isAuthenticated && j > 0) {
        const isOnboarded = await UserManagerService.onboardUser(
          email,
          userType,
          interests,
          objectives
        );

        if (isOnboarded) {
          cookies.set("hasOnboarded", true);
          router.push({
            pathname: '/',
          });
        }
      } else {
        setError("Select at least one option to get started!");
        setErrorVisible(true);
      }
    }

    return (
      <React.Fragment>
        <ProgressBar progress={progress} />
        <section className="py-5">
          <Container>
            <Row lg="12">
              <h3 className="h1 mx-auto text-secondary">What are your current objectives?</h3>
            </Row>
            <Row>
              <p className="mx-auto mt-3 mb-5 text-center">
                <text className="text-secondary">Select 1 option</text> so that we know how to build your profile.
              </p>
            </Row>
            {onboardingObjectivesJSON.objectives.map((item, index) => {
              cards[index]["label"] = item.label;
              return (
                <Row>
                  <Col lg="7" className="mx-auto">
                  <Card
                    onClick={() => handleCardClick(cards[index].clickedCard, cards[index].setClickedCard, cards[index].label)}
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
                      })
                    }}
                  >
                    <CardBody className="mx-auto align-items-center">
                      <CardTitle tag="h5" className="my-auto">{item.value}</CardTitle>
                    </CardBody>
                  </Card>
                  </Col>
                </Row>
                )
              })
            }
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
              ></ModalHeader>
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
