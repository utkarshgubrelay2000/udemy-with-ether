import React, { useState } from "react";
import { Row, Col, Form, Input, Button  } from "reactstrap";
import { useRouter } from "next/router";
import AnalyticsService from "../services/AnalyticsService";
import Select from 'react-select';

export default (props) => {
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderStyle: "transparent",
    }),
    indicatorSeparator: (provided, state) => ({
      display: "none",
    }),
    menu: (provided, state) => ({
      ...provided,
      color: "red",
      border: "0 solid #fff",
      boxShadow: "0 0 1.2rem rgba(0, 0, 0, .15)",
    }),
  };

  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");
  const [option, setOption] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let query = {};
    query["all"] = false;

    if (searchKey === "") {
      query["all"] = true;
    } else {
      query["searchKey"] = searchKey;
    }

    AnalyticsService.setEvent("Search Bar", "Submitted Search Bar");
    if (option === "Jobs") {
      router.push({
        pathname: "/jobs",
        query,
      });
      return;
    }

    router.push({
      pathname: "/catalog",
      query,
    });
  };

  const handleChange = selectedOption => {
    // console.log(selectedOption);
    // console.log(`Option selected:`, selectedOption);
    setOption(selectedOption.label);
  };

  const selectorText = {
    "Jobs": "What are you looking for?",
    "Courses": "What do you want to learn?",
  }

  return (
    <div className={`search-bar ${props.className}`} style={{ width: '78%', maxWidth: 800, margin: '0 auto' }}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg="5" className="d-flex align-items-center form-group">
            <Input
              type="text"
              name="search"
              placeholder={option ? selectorText[option] : "How can we help you?"}
              className="border-0 shadow-0"
              onChange={(e) => setSearchKey(e.target.value)}
              onFocus={() =>
                AnalyticsService.setEvent("Search Bar", "Clicked Search Bar")
              }
            />
          </Col>
          <Col
            lg="4"
            md={props.halfInputs ? "6" : "12"}
            className="d-flex align-items-center form-group no-divider"
          >
            <Select
              id="reactselect"
              options={props.options}
              placeholder="Categories"
              className="selectpicker"
              classNamePrefix="selectpicker"
              styles={customSelectStyles}
              onChange={handleChange}
            />
          </Col>
          <Col lg="3" className={props.btnMb ? `mb-${props.btnMb}` : ``}>
            <Button
              type="submit"
              color="secondary"
              className={`btn-block h-100 ${
                props.btnClassName ? props.btnClassName : ""
              }`}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
