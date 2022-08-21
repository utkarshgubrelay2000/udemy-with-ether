import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/router";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Badge,
} from "reactstrap";
import MediaQuery from "react-responsive";

import UseWindowSize from "../hooks/UseWindowSize";
import ActiveLink from "./ActiveLink";
import Logo from "../../public/content/svg/workschool-logo-large.svg";
import menu from "../data/menu.json";
import userMenu from "../data/user-menu.json";
import AuthenticationService from "../services/AuthenticationService";
import AnalyticsService from "../services/AnalyticsService";
import CourseMenu from "./CourseMenu";
import CourseData from "./CourseData";
import { isBrowser } from "react-device-detect";
import Axios from "axios";
import API_URL from "../utils/API_URL";

export default (props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState({});
  const [searchFocus, setSearchFocus] = React.useState(false);
  const [dropdownAnimate, setDropdownAnimate] = React.useState(false);
  const [parentName, setParentName] = React.useState(false);
  const [coursedropdownOpen, setcourseDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const size = UseWindowSize();
  const onFocus = () => setSearchFocus(!searchFocus);
  const toggleDropdown = (name) => {
    setDropdownOpen({ ...dropdownOpen, [name]: !dropdownOpen[name] });
  };

  const toggle = () => setcourseDropdownOpen((prevState) => !prevState);

  const onLinkClick = async (parent) => {
    size.width < 991 && setCollapsed(!collapsed);
    setParentName(parent);
    if (parent === "Sign out") {
      await AuthenticationService.logoutUser();
      AnalyticsService.setEvent("User", "Successful Logout", "Logout");
    }
  };

  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let query = {};
    query["all"] = false;

    if (searchKey === "") {
      query["all"] = true;
    } else {
      query["searchKey"] = searchKey;
    }

    AnalyticsService.setEvent("Search Bar", "Submitted Search Bar");
    query["all"] = true;
    router.push({
      pathname: "/catalog",
      query,
    });
  };

  useEffect(async () => {
    if (JSON.parse(localStorage.getItem("userInfo")) !== null) {
      setUserName(JSON.parse(localStorage.getItem("userInfo")).name);

      // console.log(JSON.parse(localStorage.getItem("userInfo")));
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      try {
        const res = await Axios.get(`${API_URL}/getMyProfile`, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "json" },
        });
        setProfileImg(res?.data?.profileImg);
        // setName(res.data.name);
        // setUserProfile(res.data);
        // alert(res.data);
      } catch (e) {
        alert(e);
      }
    }
  }, []);

  // highlight not only active dropdown item, but also its parent, i.e. dropdown toggle
  const highlightDropdownParent = () => {
    menu.map((item) => {
      item.dropdown &&
        item.dropdown.map((dropdownLink) => {
          dropdownLink.link &&
            dropdownLink.link === Router.route &&
            setParentName(item.title);
          dropdownLink.links &&
            dropdownLink.links.map(
              (link) => link.link === Router.route && setParentName(item.title)
            );
        });
      item.megamenu &&
        item.megamenu.map((megamenuColumn) =>
          megamenuColumn.map((megamenuBlock) =>
            megamenuBlock.links.map((dropdownLink) => {
              if (dropdownLink.link === Router.route) {
                dropdownLink.parent
                  ? setParentName(dropdownLink.parent)
                  : setParentName(item.title);
              }
            })
          )
        );
      item.link === Router.route && setParentName(item.title);
    });
  };

  React.useEffect(highlightDropdownParent, []);
  return (
    <header
      className={`header ${props.headerClasses ? props.headerClasses : ""}`}
    >
      <Navbar
        color={props.nav?.color ? props.nav.color : "white"}
        light={props.nav?.light && true}
        dark={props.nav?.dark && true}
        fixed={props.nav?.fixed ? props.nav.fixed : "top"}
        expand="md"
        className={props.nav?.classes ? props.nav.classes : ""}
      >
        <MediaQuery maxDeviceWidth={240} maxDeviceHeight={320}>
          <Container fluid={true}>
            <div className="d-flex align-items-center mx-auto">
              <Link href="/" passHref>
                <a className="py-1 navbar-brand">
                  <img src={Logo} alt="Directory logo" />
                </a>
              </Link>
              {/* <div class="p-2"> */}
            </div>
          </Container>
        </MediaQuery>
        <MediaQuery minDeviceWidth={241} minDeviceHeight={321}>
          <Container fluid={true}>
            <div className="d-flex align-items-center">
              <Link href="/" passHref>
                <a className="py-1 navbar-brand">
                  <img src={Logo} alt="Directory logo" />
                </a>
              </Link>
              <div class="p-2">
                {isBrowser ? (
                  <Nav className="mr-auto" navbar>
                    <Dropdown
                      isOpen={coursedropdownOpen}
                      toggle={toggle}
                      nav
                      inNavbar
                    >
                      <DropdownToggle
                        color="primary"
                        caret
                        nav
                        size="lg"
                        onClick={() =>
                          AnalyticsService.setEvent(
                            "Navigation Item",
                            "Browse Button Clicked",
                            "Link"
                          )
                        }
                      >
                        Browse
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-course-menu">
                        <div class="menucontainer" id="main">
                          <CourseMenu
                            menuData={CourseData}
                            submenuDirection="right"
                          />
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  </Nav>
                ) : (
                  ""
                )}
              </div>
              <Form
                id="search"
                className="form-inline d-none d-sm-flex"
                onSubmit={handleSubmit}
              >
                <div
                  className={`input-label-absolute input-label-absolute-left input-reset input-expand ml-lg-2 ml-xl-3 ${
                    searchFocus ? "focus" : ""
                  }`}
                >
                  <Label for="search_search" className="label-absolute">
                    <i className="fa fa-search"></i>
                    <span className="sr-only">What are you looking for?</span>
                  </Label>
                  <Input
                    id="search_search"
                    placeholder="Search for courses"
                    aria-label="Search"
                    className="border-0 shadow-0 bg-gray-200"
                    onFocus={onFocus}
                    onBlur={() => setTimeout(() => onFocus(), 333)}
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    size="sm"
                  />
                  <button type="reset" className="btn btn-sm btn-reset">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </Form>
            </div>
            <NavbarToggler
              onClick={() => setCollapsed(!collapsed)}
              className="navbar-toggler-right"
            >
              <i className="fa fa-bars"></i>
            </NavbarToggler>
            <Collapse isOpen={collapsed} navbar>
              {/* mobile search form */}
              <Form
                id="searchcollapsed"
                className="form-inline mt-4 mb-2 d-sm-none"
                onSubmit={handleSubmit}
              >
                <div
                  className={`input-label-absolute input-label-absolute-left input-reset w-100 ${
                    searchFocus ? "focus" : ""
                  }`}
                >
                  <Label
                    for="searchcollapsed_search"
                    className="label-absolute"
                  >
                    <i className="fa fa-search"></i>

                    <span className="sr-only">What are you looking for?</span>
                  </Label>
                  <Input
                    id="searchcollapsed_search"
                    placeholder="Search"
                    aria-label="Search"
                    bsSize="sm"
                    className="border-0 shadow-0 bg-gray-200"
                    onFocus={onFocus}
                    onBlur={() => setTimeout(() => onFocus(), 333)}
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <Button
                    type="reset"
                    size="sm"
                    color="deoco"
                    className="btn-reset"
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
              </Form>
              <Nav navbar className="ml-auto" style={{ marginRight: "7%" }}>
                {menu &&
                  menu.map((item) =>
                    item.dropdown || item.megamenu ? (
                      // show entire menu to unlogged user or hide items that have hideToLoggedUser set to true
                      !props.loggedUser ||
                      (props.loggedUser && !item.hideToLoggedUser) ? (
                        <Dropdown
                          nav
                          inNavbar
                          key={item.title}
                          className={
                            item.position ? `position-${item.position}` : ``
                          }
                          isOpen={dropdownOpen[item.title]}
                          toggle={() => {
                            AnalyticsService.setEvent(
                              "Navigation Item",
                              `${item.title} Dropdown Clicked`,
                              "Dropdown"
                            );
                            toggleDropdown(item.title);
                          }}
                        >
                          {isBrowser && item.title === "Browse" ? (
                            ""
                          ) : (
                            <DropdownToggle
                              nav
                              caret
                              onClick={() =>
                                setDropdownAnimate({
                                  ...dropdownAnimate,
                                  [item.title]: !dropdownOpen[item.title],
                                })
                              }
                              className={
                                parentName === item.title ? "active" : ""
                              }
                            >
                              {item.title}
                            </DropdownToggle>
                          )}
                          <DropdownMenu
                            className={`${
                              dropdownAnimate[item.title] === false
                                ? "hide"
                                : ""
                            } ${item.megamenu ? "megamenu py-lg-0" : ""}`}
                            style={{ padding: 10 }}
                          >
                            {item.dropdown &&
                              item.dropdown.map((dropdownItem) =>
                                dropdownItem.links ? (
                                  <React.Fragment key={dropdownItem.title}>
                                    <h6 className="dropdown-header font-weight-normal">
                                      {dropdownItem.title}
                                    </h6>
                                    {dropdownItem.links.map((link) => (
                                      <ActiveLink
                                        key={link.title}
                                        activeClassName="active"
                                        href={link.link}
                                        passHref
                                      >
                                        <DropdownItem
                                          onClick={() =>
                                            onLinkClick(item.title)
                                          }
                                        >
                                          {link.title}
                                          {link.new && (
                                            <Badge
                                              color="info-light"
                                              className="ml-1 mt-n1"
                                            >
                                              New
                                            </Badge>
                                          )}
                                        </DropdownItem>
                                      </ActiveLink>
                                    ))}
                                  </React.Fragment>
                                ) : (
                                  <ActiveLink
                                    key={dropdownItem.title}
                                    activeClassName="active"
                                    href={dropdownItem.link}
                                    passHref
                                  >
                                    <DropdownItem
                                      onClick={() => onLinkClick(item.title)}
                                    >
                                      {dropdownItem.title}
                                      {dropdownItem.new && (
                                        <Badge
                                          color="info-light"
                                          className="ml-1 mt-n1"
                                        >
                                          New
                                        </Badge>
                                      )}
                                    </DropdownItem>
                                  </ActiveLink>
                                )
                              )}
                            {item.megamenu && (
                              <Row>
                                <Col
                                  lg="9"
                                  style={{ flex: "0 0 100%", maxWidth: "100%" }}
                                >
                                  <Row className="p-3 pr-lg-0 pl-lg-5 pt-lg-5">
                                    {item.megamenu.map(
                                      (megamenuItem, index) => (
                                        <Col key={index} lg="3">
                                          {megamenuItem.map((block, index) => (
                                            <React.Fragment key={index}>
                                              <h6 className="text-uppercase">
                                                {block.title}
                                              </h6>
                                              <ul className="megamenu-list list-unstyled">
                                                {block.links.map((link) => (
                                                  <li
                                                    key={link.title}
                                                    className="megamenu-list-item"
                                                    onClick={() =>
                                                      AnalyticsService.setEvent(
                                                        "Navigation Item",
                                                        `${link.title} Course Link Clicked`,
                                                        "Link"
                                                      )
                                                    }
                                                  >
                                                    <ActiveLink
                                                      activeClassName="active"
                                                      href={link.link}
                                                      as={link.as}
                                                      passHref
                                                    >
                                                      <DropdownItem
                                                        className={`megamenu-list-link ${
                                                          link.title ==
                                                          "See all courses"
                                                            ? "h6"
                                                            : ""
                                                        }`}
                                                        onClick={() =>
                                                          link.parent
                                                            ? onLinkClick(
                                                                link.parent
                                                              )
                                                            : onLinkClick(
                                                                item.title
                                                              )
                                                        }
                                                      >
                                                        {link.title}
                                                        {link.title ==
                                                          "See all courses" && (
                                                          <i className="fas fa-angle-double-right ml-2" />
                                                        )}
                                                        {link.new && (
                                                          <Badge
                                                            color="info-light"
                                                            className="ml-1 mt-n1"
                                                          >
                                                            New
                                                          </Badge>
                                                        )}
                                                        {link.title ==
                                                          "See All" && (
                                                          <i className="fas fa-angle-double-right ml-2" />
                                                        )}
                                                      </DropdownItem>
                                                    </ActiveLink>
                                                  </li>
                                                ))}
                                              </ul>
                                            </React.Fragment>
                                          ))}
                                        </Col>
                                      )
                                    )}
                                  </Row>
                                </Col>
                                {item.image && (
                                  <Col lg="3" className="d-none d-lg-block">
                                    <img
                                      src={item.image}
                                      alt=""
                                      className="bg-image"
                                    />
                                  </Col>
                                )}
                              </Row>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      ) : (
                        ""
                      )
                    ) : (props.loggedUser && !item.hideToLoggedUser) ||
                      !props.loggedUser ? (
                      <NavItem
                        key={item.title}
                        className={
                          item.button
                            ? "mt-3 mt-lg-0 ml-lg-3 d-lg-none d-xl-inline-block"
                            : ""
                        }
                        onClick={() =>
                          AnalyticsService.setEvent(
                            "Navigation Item",
                            `${item.title} Link Clicked`,
                            "Link"
                          )
                        }
                      >
                        {item.button ? (
                          item.showToLoggedUser !== false && (
                            <ActiveLink
                              activeClassName="active"
                              href={item.link}
                            >
                              <a
                                className={
                                  item.link === "/login"
                                    ? "btn btn-outline-primary"
                                    : "btn btn-secondary"
                                }
                                onClick={() => onLinkClick(item.title)}
                              >
                                {item.title}
                              </a>
                            </ActiveLink>
                          )
                        ) : item.target ? (
                          <a href={item.link} target="_blank">
                            <NavLink onClick={() => onLinkClick(item.title)}>
                              {item.title}
                            </NavLink>
                          </a>
                        ) : (
                          <ActiveLink
                            activeClassName="active"
                            href={item.link}
                            passHref
                          >
                            <NavLink onClick={() => onLinkClick(item.title)}>
                              {item.title}
                            </NavLink>
                          </ActiveLink>
                        )}
                      </NavItem>
                    ) : (
                      ""
                    )
                  )}
                {props.loggedUser &&
                  userMenu &&
                  userMenu.map((item) => (
                    <Dropdown
                      nav
                      inNavbar
                      key={item.title}
                      className={item.type === "avatar" ? "ml-lg-3" : ""}
                      isOpen={dropdownOpen[item.title]}
                      toggle={() => {
                        AnalyticsService.setEvent(
                          "Navigation Item",
                          "User Avatar Dropdown Clicked",
                          "Dropdown"
                        );
                        toggleDropdown(item.title);
                      }}
                    >
                      <DropdownToggle
                        nav
                        style={item.type === "avatar" && { padding: 0 }}
                        onClick={() =>
                          setDropdownAnimate({
                            ...dropdownAnimate,
                            [item.title]: !dropdownOpen[item.img],
                          })
                        }
                      >
                        {item.type === "avatar" ? (
                          <img
                            src={
                              JSON.parse(localStorage.getItem("userInfo")) !==
                              null
                                ? profileImg
                                : `/content${item.img}`
                            }
                            alt={""}
                            className="avatar avatar-sm avatar-border-white mr-2"
                          />
                        ) : (
                          item.title
                        )}
                      </DropdownToggle>
                      <span style={{ right: "10px" }}>{userName}</span>
                      <DropdownMenu
                        className={
                          dropdownAnimate[item.title] === false ? "hide" : ""
                        }
                        right
                      >
                        {item.dropdown &&
                          dropdownAnimate[item.title] &&
                          item.dropdown.map((dropdownItem) =>
                            dropdownItem.target ? (
                              <a href={dropdownItem.link} target="_blank">
                                <DropdownItem
                                  onClick={() =>
                                    onLinkClick(dropdownItem.title)
                                  }
                                  className="dropdown-user-item"
                                >
                                  {dropdownItem.title}
                                </DropdownItem>
                              </a>
                            ) : (
                              <ActiveLink
                                key={dropdownItem.title}
                                activeClassName="active"
                                href={dropdownItem.link}
                                passHref
                              >
                                <DropdownItem
                                  onClick={() =>
                                    onLinkClick(dropdownItem.title)
                                  }
                                  className="dropdown-user-item"
                                >
                                  {dropdownItem.title}
                                </DropdownItem>
                              </ActiveLink>
                            )
                          )}
                      </DropdownMenu>
                    </Dropdown>
                  ))}
              </Nav>
            </Collapse>
          </Container>
        </MediaQuery>
      </Navbar>
    </header>
  );
};
