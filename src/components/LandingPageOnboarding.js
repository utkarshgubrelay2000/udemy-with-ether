import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Col,
  Row,
  Card, 
  Form,
  Input,
  Label,
  FormGroup,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap';
import onboardingInterestsJSON from '../data/onboarding-interests.json';
import onboardingUserTypesJSON from '../data/onboarding-user-type.json';
import onboardingObjectivesJSON from '../data/onboarding-objectives.json';
import HTMLParser from 'html-react-parser';
import CourseManagerService from '../services/CourseManagerService';
import AuthenticationService from '../services/AuthenticationService';
import AnalyticsService from "../services/AnalyticsService";
import { Cookies } from 'react-cookie';
import MediaQuery from 'react-responsive';

const interests = [];
const objectives = [];

export default function LandingPageOnboarding() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();

  const [password, setPassword] = useState("");
  const [ card1, setCard1 ] = useState(false);
  const [ card2, setCard2 ] = useState(false);
  const [ card3, setCard3 ] = useState(false);
  const [ card4, setCard4 ] = useState(false);
  const [ card5, setCard5 ] = useState(false);
  const [ card6, setCard6 ] = useState(false);


  const [ userTypeCard1, setUserTypeCard1 ] = useState(false);
  const [ userTypeCard2, setUserTypeCard2 ] = useState(false);
  const [ userTypeCard3, setUserTypeCard3 ] = useState(false);

  const [ userType, setUserType ] = useState("");

  const [ objCard1, setObjCard1 ] = useState(false);
  const [ objCard2, setObjCard2 ] = useState(false);
  const [ objCard3, setObjCard3 ] = useState(false);

  const [ clickedObjCard1, setClickedObjCard1 ] = useState(false);
  const [ clickedObjCard2, setClickedObjCard2 ] = useState(false);
  const [ clickedObjCard3, setClickedObjCard3 ] = useState(false);

  const [ clickedUserTypeCard1, setClickedUserTypeCard1 ] = useState(false);
  const [ clickedUserTypeCard2, setClickedUserTypeCard2 ] = useState(false);
  const [ clickedUserTypeCard3, setClickedUserTypeCard3 ] = useState(false);

  const [clickedCard1, setClickedCard1] = useState(false);
  const [clickedCard2, setClickedCard2] = useState(false);
  const [clickedCard3, setClickedCard3] = useState(false);
  const [clickedCard4, setClickedCard4] = useState(false);
  const [clickedCard5, setClickedCard5] = useState(false);
  const [clickedCard6, setClickedCard6] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [countOfCardsClicked, setCountOfCardsClicked] = useState(0);
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [step, setStep] = useState(1);

  const [ coursesResultsFound, setCoursesResultsFound ] = useState(0);
  const [ courseList, setCourseListFound ] = useState();
 
  const objCards = [
    { 
      setCard: setObjCard1,
      setClickedCard: setClickedObjCard1,
      card: objCard1,
      clickedCard: clickedObjCard1,
      color: '#EC368D',
    },
    {
      setCard: setObjCard2,
      setClickedCard: setClickedObjCard2,
      card: objCard2,
      clickedCard: clickedObjCard2,
      color: '#FDB833',
    },
    {
      setCard: setObjCard3,
      setClickedCard: setClickedObjCard3,
      card: objCard3,
      clickedCard: clickedObjCard3,
      color: '#FDB833',
    },
  ]

  const userCards = [
    { 
      setCard: setUserTypeCard1,
      setClickedCard: setClickedUserTypeCard1,
      card: userTypeCard1,
      clickedCard: clickedUserTypeCard1,
      color: '#EC368D',
    },
    {
      setCard: setUserTypeCard2,
      setClickedCard: setClickedUserTypeCard2,
      card: userTypeCard2,
      clickedCard: clickedUserTypeCard2,
      color: '#FDB833',
    },
    {
      setCard: setUserTypeCard3,
      setClickedCard: setClickedUserTypeCard3,
      card: userTypeCard3,
      clickedCard: clickedUserTypeCard3,
      color: '#17BEBB',
    },
  ]

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {};

    if (name) userData["name"] = name;
    if (email) userData["email"] = email;
    const resp = await AuthenticationService.saveUnregisteredUser(userData);

    let costStructure = "";
    if (objectives.findIndex(obj => obj === "certificate") > -1) {
      costStructure = "certificate";
    }

    if (resp) {
      router.push({
        pathname: "/catalog",
        query: {
          interests,
          costStructure,
        },
      });
      AnalyticsService.setEvent(
        "User",
        "Successful Unregistered Signup", 
        "Unregistered Signup"
      );
    } else {
      AnalyticsService.setEvent(
        "User",
        "Failed Unregistered Signup",
        "Unregistered Signup Error"
      );
    }
  };

  const handleCardClick = (clickedCard, setClickedCard, label, index) => {
    setClickedCard(!clickedCard);
    if (!clickedCard) {
      interests.push(label);
      setCountOfCardsClicked(countOfCardsClicked => countOfCardsClicked + 1);
    }

    if (clickedCard) {
      interests.splice(index, 1);
      setCountOfCardsClicked(countOfCardsClicked => countOfCardsClicked - 1);
    }
  }

  const handleObjectiveCardClick = (clickedCard, setClickedCard, label, index) => {
    setClickedCard(!clickedCard);
    if (!clickedCard) {
      objectives.push(label);
      setCountOfCardsClicked(countOfCardsClicked => countOfCardsClicked + 1);
    }

    if (clickedCard) {
      objectives.splice(index, 1);
      setCountOfCardsClicked(countOfCardsClicked => countOfCardsClicked - 1);
    }
  }

  const handleUserTypeCardClick = (clickedCard, setClickedCard, cardLabel) => {
    setClickedCard(!clickedCard);
    if (!clickedCard) {
      setUserType(cardLabel);
      userCards.forEach(card => {
        if (card.clickedCard !== clickedCard) {
          card.setClickedCard(false);
        }
      });
    }
  }

  const getCourses = async () => {
    try {
      let params = {};
      let coursesFound = [];

      params["limit"] = 10;

      if (objectives.findIndex(obj => obj === "certificate") > -1) {
        params["costStructure"] = "certificate";
      }

      for (let i = 0; i < interests.length; i++) {
        params["searchKey"] = interests[i];
        const courses = await CourseManagerService.getCourses(params);
        if (courses.length > 0) {
          coursesFound = coursesFound.concat(courses);
        }
      }

      if (coursesFound.length > 0) {
        setCoursesResultsFound(coursesFound.length);
        setIsLoading(false);
        return;
      } else {
        setCoursesResultsFound(0);
        setIsLoading(false);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleMouseEnterCard = (setCard) => {
    setCard(true);
  }

  const handleMouseLeaveCard = (setCard) => {
    setCard(false)
  }

  const handleContinueButtonClick = async () => {
    if (step === 1 && interests.length >= 1) {
      setStep(step => step + 1);
    } else if (step === 1 && interests.length < 1) {
      return;
    } else if (step === 2 && userCards.findIndex(card => card.clickedCard == true) > -1) {
      setStep(step => step + 1);
    } else if (step === 3 && objectives.length >= 1) {
      setStep(step => step + 1);
    } else if (step === 3 && objectives.length < 1) {
      return;
    } else if (step > 3) {
      setStep(step => step + 1);
    }

    if (step + 1 === 4) {
      await getCourses();
    }
  }

  const handleSignupClick = async () => {
    setStep(6);
  }

  let prev = 0;
  let secondPrev = 0;

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const userData = { email, password, name };
    const resp = await AuthenticationService.registerUser(userData);

    if (resp) {
      cookies.set("hasOnboarded", true);
      router.push({
        pathname: '/',
        query: {
          onboarded: true,
        }
      });
      AnalyticsService.setEvent("User", "Successful Signup", "Signup");
    } else {
      AnalyticsService.setEvent("User", "Failed Signup", "Signup Error");
    }
  }

  const renderContinueButton = () => {
    if (step === 1 || step === 2 || step === 3) {
      return (
        <Button class="btn btn-secondary" onClick={handleContinueButtonClick}>
          Continue
        </Button> 
      );
    }
  }

  return (
    <div class="text-center">
      <div class="card-body">
        {
          step === 1 &&
            <h2 class="card-text" style={{ marginTop: '5%', }}>
              WorkSchool curates course recommendations for you from a catalog of over <text className="text-secondary">15,000+</text> courses to help you find a job or advance your career.
            </h2>
        }
        {
          step === 1 && 
            <div>
              <h1 className="card-title mt-5">
                What are you interested in?
              </h1>
              <p class="card-text" style={{ marginTop: '1%' }}>
                Select <text className="text-secondary">one or more</text>
              </p>
            </div>
        }
        {
          step === 2 && 
            <div>
              <h1 class="card-title mt-5">
                What type of learner are you?
              </h1>
              <p className="mx-auto mt-3 mb-5 text-center">
                <text className="text-secondary">Select 1 option</text>
              </p>
            </div>
        }
        {
          step === 3 &&
            <div>
              <h1 class="card-title mt-5">
                What are your objectives?
              </h1>
              <p className="mx-auto mt-3 mb-5 text-center">
              <text className="text-secondary">Select 1 option</text>
              </p>
            </div>
        }
        <br></br>
        <br></br>
        <Row lg="12" style={{ justifyContent: 'center', }}>
          <Col lg="3">
            {
              step === 1 && onboardingInterestsJSON.interests[0]["landing-page-1"].map((item, index) => {
                prev++;
                cards[index]["label"] = item.label
                return (
                  <Card
                    onClick={() => handleCardClick(
                      cards[index].clickedCard,
                      cards[index].setClickedCard, 
                      item.label,
                      index
                    )}
                    onMouseEnter={() => handleMouseEnterCard(cards[index].setCard)}
                    onMouseLeave={() => handleMouseLeaveCard(cards[index].setCard)}
                    className="mx-2 mb-5"
                    style={{
                      transition: 'border 0.2s',
                      ...((cards[index].card || cards[index].clickedCard) ? {
                        borderColor: '#4E66F8',
                        borderWidth: 1,
                        cursor: 'pointer',
                      } : {
                        border: '1px solid lightgrey'
                      }),
                      height: 103.11,
                    }}
                  >
                    <CardBody>
                      <div style={{ marginTop: '-4%' }}>
                        <div style={{ fontSize: 35, color: cards[index].color }}>
                          {
                            HTMLParser(item.html)
                          }
                        </div>
                      <CardTitle tag="h5">{item.title}</CardTitle>
                      </div>
                    </CardBody>
                  </Card>
                );
              })     
            }
          </Col>
          <Col lg="3">
            {
              step === 1 && onboardingInterestsJSON.interests[0]["landing-page-2"].map((item, index) => {
                secondPrev++;
                cards[prev + index]["label"] = item.label;
                return (
                  <Card
                    onClick={() => handleCardClick(
                      cards[prev + index].clickedCard,
                      cards[prev + index].setClickedCard,
                      item.label,
                      prev + index
                    )}
                    onMouseEnter={() => handleMouseEnterCard(cards[prev + index].setCard)}
                    onMouseLeave={() => handleMouseLeaveCard(cards[prev + index].setCard)}
                    className="mx-2 mb-5"
                    style={{
                      transition: 'border 0.2s',
                      ...((cards[prev + index].card || cards[prev + index].clickedCard) ? {
                        borderColor: '#4E66F8',
                        borderWidth: 1,
                        cursor: 'pointer',
                      } : {
                        border: '1px solid lightgrey'
                      }),
                      height: 103.11,
                    }}
                  >
                    <CardBody>
                      <div style={{ marginTop: '-4%' }}>
                        <div style={{ fontSize: 35, color: cards[prev + index].color }}>
                          {
                            HTMLParser(item.html)
                          }
                        </div>
                        <CardTitle tag="h5">{item.title}</CardTitle>
                      </div>
                    </CardBody>
                  </Card>
                );
              })     
            }
          </Col>
          <Col lg="3">
            {
              step === 1 && onboardingInterestsJSON.interests[0]["landing-page-3"].map((item, index) => {
                cards[secondPrev + index]["label"] = item.label;
                return (
                  <Card
                    onClick={() => handleCardClick(
                      cards[secondPrev + prev + index].clickedCard,
                      cards[secondPrev + prev + index].setClickedCard,
                      item.label,
                      secondPrev + prev + index
                    )}
                    onMouseEnter={() => handleMouseEnterCard(cards[secondPrev + prev + index].setCard)}
                    onMouseLeave={() => handleMouseLeaveCard(cards[secondPrev + prev + index].setCard)}
                    className="mx-2 mb-5"
                    style={{
                      transition: 'border 0.2s',
                      ...((cards[secondPrev + prev + index].card || cards[secondPrev + prev + index].clickedCard) ? {
                        borderColor: '#4E66F8',
                        borderWidth: 1,
                        cursor: 'pointer',
                      } : {
                        border: '1px solid lightgrey'
                      }),
                      height: 103.11,
                    }}
                  >
                    <CardBody>
                      <div style={{ marginTop: '-4%' }}>
                        <div style={{ fontSize: 35, color: cards[secondPrev + prev + index].color }}>
                          {
                            HTMLParser(item.html)
                          }
                        </div>
                        <CardTitle tag="h5">{item.title}</CardTitle>
                      </div>
                    </CardBody>
                  </Card>
                );
              })     
            }
          </Col>
          {
            step === 2 && onboardingUserTypesJSON.types.map((item, index) => {
              return (
                <Col lg="10" sm="12">
                  <MediaQuery minDeviceWidth={200} maxDeviceWidth={700}>
                    <Card
                      onClick={() => handleUserTypeCardClick(userCards[index].clickedCard, userCards[index].setClickedCard)}
                      onMouseEnter={() => handleMouseEnterCard(userCards[index].setCard)}
                      onMouseLeave={() => handleMouseLeaveCard(userCards[index].setCard)}
                      // className="mx-2 mb-5"
                      className="mx-auto"
                      style={{
                        transition: 'border 0.2s',
                        ...((userCards[index].card || userCards[index].clickedCard) ? {
                          borderColor: '#4E66F8',
                          borderWidth: 1,
                          cursor: 'pointer',
                        } : {
                          border: '1px solid lightgrey'
                        }),
                        height: 103.11,
                        maxWidth: '80%',
                        marginBottom: '5%'
                      }}
                    >
                      <CardBody className="mx-auto align-items-center" style={{ justifyContent: 'center' }}>
                        <div style={{ marginTop: index === 2 ? '-5%' : '-10%'}}>
                          <div style={{ fontSize: 35, color: userCards[index].color }}>
                            {
                              HTMLParser(item.html)
                            }
                          </div>
                          <CardTitle tag="h5">{item.alt}</CardTitle>
                        </div>
                      </CardBody>
                    </Card>
                  </MediaQuery>
                  <MediaQuery minDeviceWidth={701}>
                    <Card
                      onClick={() => handleUserTypeCardClick(userCards[index].clickedCard, userCards[index].setClickedCard)}
                      onMouseEnter={() => handleMouseEnterCard(userCards[index].setCard)}
                      onMouseLeave={() => handleMouseLeaveCard(userCards[index].setCard)}
                      className="mx-auto"
                      style={{
                        transition: 'border 0.2s',
                        ...((userCards[index].card || userCards[index].clickedCard) ? {
                          borderColor: '#4E66F8',
                          borderWidth: 1,
                          cursor: 'pointer',
                        } : {
                          border: '1px solid lightgrey'
                        }),
                        height: 103.11,
                        width: 651.33,
                        marginBottom: '2%'
                      }}
                    >
                      <CardBody className="mx-auto align-items-center" style={{ justifyContent: 'center' }}>
                        <div style={{ marginTop: index === 2 ? '-5%' : '-10%'}}>
                          <div style={{ fontSize: 35, color: userCards[index].color }}>
                            {
                              HTMLParser(item.html)
                            }
                          </div>
                          <CardTitle tag="h5">{item.alt}</CardTitle>
                        </div>
                      </CardBody>
                    </Card>
                  </MediaQuery>
                </Col>
              );
            })
          }
          {
            step === 3 && onboardingObjectivesJSON.objectives.map((item, index) => {
              objCards[index]["label"] = item.label;
              return (
                  <Col lg="7">
                    <MediaQuery minDeviceWidth={200} maxDeviceWidth={700}>
                      <Card
                        onClick={() => handleObjectiveCardClick(
                          objCards[index].clickedCard,
                          objCards[index].setClickedCard,
                          objCards[index].label,
                          index
                        )}
                        onMouseEnter={() => handleMouseEnterCard(objCards[index].setCard)}
                        onMouseLeave={() => handleMouseLeaveCard(objCards[index].setCard)}
                        className="mx-auto"
                        style={{
                          transition: 'border 0.2s',
                          ...((objCards[index].card || objCards[index].clickedCard) ? {
                            borderColor: '#4E66F8',
                            borderWidth: 1,
                            cursor: 'pointer',
                          } : {
                            border: '1px solid lightgrey'
                          }),
                          maxWidth: '80%',
                          height: 103.11,
                          marginBottom: '5%'
                        }}
                      >
                        <CardBody className="mx-auto align-items-center">
                          <div style={{ marginTop: '-5%' }}>
                            <div style={{ fontSize: 35, color: objCards[index].color }}>
                              {
                                HTMLParser(item.html)
                              }
                            </div>
                            <CardTitle tag="h5" className="my-auto">{item.alt}</CardTitle>
                          </div>
                        </CardBody>
                      </Card>
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={701}>
                      <Card
                        onClick={() => handleObjectiveCardClick(
                          objCards[index].clickedCard,
                          objCards[index].setClickedCard,
                          objCards[index].label,
                          index
                        )}
                        onMouseEnter={() => handleMouseEnterCard(objCards[index].setCard)}
                        onMouseLeave={() => handleMouseLeaveCard(objCards[index].setCard)}
                        className="mx-auto"
                        style={{
                          transition: 'border 0.2s',
                          ...((objCards[index].card || objCards[index].clickedCard) ? {
                            borderColor: '#4E66F8',
                            borderWidth: 1,
                            cursor: 'pointer',
                          } : {
                            border: '1px solid lightgrey'
                          }),
                          width: 651.33,
                          height: 103.11,
                          marginBottom: '2%'
                        }}
                      >
                        <CardBody className="mx-auto align-items-center">
                          <div style={{ marginTop: '-5%' }}>
                            <div style={{ fontSize: 35, color: objCards[index].color }}>
                              {
                                HTMLParser(item.html)
                              }
                            </div>
                            <CardTitle tag="h5" className="my-auto">{item.alt}</CardTitle>
                          </div>
                        </CardBody>
                      </Card>
                    </MediaQuery>
                  </Col>
              )
            })
          }
          {/* {
            step === 4 && isLoading &&
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          } */}
        </Row>
        {
          step === 1 &&
            <div>
              <br></br>
            </div>
        }
        {
          step === 2 &&
            <div>
              <br></br>
              <br></br>
            </div>
        }
        {
          step === 3 &&
            <div>
              <br></br>
              <br></br>
            </div>
        }
        {
          step === 4 &&
            <Row style={{ justifyContent: 'center'}}>
              <Col>
                <h3 className="mx-auto text-secondary">
                  Found <h1 style={{ display: 'inline' }} className="mx-auto text-primary">
                    {coursesResultsFound}+
                    </h1> courses that match your profile
                </h3>
                <h5>
                  To view your curated courses, skip to results or signup
                </h5>
                <br></br>
                <br></br>
                <MediaQuery minDeviceWidth={200} maxDeviceWidth={700}>
                  <div style={{
                    cursor: 'pointer',
                    width: '50%',
                    height: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                  }} className="mx-auto"
                  >
                    <text onClick={handleContinueButtonClick} style={{ marginRight: '5%', marginBottom: '4%' }}>
                      Skip to results
                    </text>
                    <Button class="btn btn-primary" onClick={handleSignupClick}>
                      Signup
                    </Button> 
                  </div>
                </MediaQuery>
                <MediaQuery minDeviceWidth={701}>
                  <div style={{ cursor: 'pointer', width: '40%' }} className="mx-auto">
                    <text onClick={handleContinueButtonClick} style={{ marginRight: '5%' }}>
                      Skip to results
                    </text>
                    <Button class="btn btn-primary" onClick={handleSignupClick}>
                      Signup
                    </Button> 
                  </div>
                </MediaQuery>
                <br></br>
                <br></br>
              </Col>
            </Row>
        }
        {
          step === 5 &&
            <Col lg="3" className="mx-auto">
              <h3 className="mx-auto">
                Please enter name and email
              </h3>
              <br></br>
              <Form className="form-validate" onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="name" className="form-label">
                    Name
                  </Label>
                  <Input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="your name"
                    autoComplete="off"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email" className="form-label">
                    Email Address
                  </Label>
                  <Input
                    name="username"
                    id="email"
                    type="email"
                    placeholder="name@address.com"
                    autoComplete="off"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <br></br>
                <Button class="btn btn-primary">
                  Enter
                </Button> 
              </Form>
            </Col>
        }
        {
          step === 6 &&
            <Col lg="3" className="mx-auto">
              <h3 className="mx-auto">
                Please enter a name, email, and password
              </h3>
              <br></br>
              <Form className="form-validate" onSubmit={handleSignupSubmit}>
                <FormGroup>
                  <Label for="name" className="form-label">
                    Name
                  </Label>
                  <Input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="your name"
                    autoComplete="off"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email" className="form-label">
                    Email Address
                  </Label>
                  <Input
                    name="username"
                    id="email"
                    type="email"
                    placeholder="name@address.com"
                    autoComplete="off"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                <Label for="password" className="form-label">
                  Password
                </Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
                <br></br>
                <Button class="btn btn-primary">
                  Enter
                </Button> 
              </Form>
            </Col>
        }
        {renderContinueButton()}
      </div>
    </div>
  );
}
