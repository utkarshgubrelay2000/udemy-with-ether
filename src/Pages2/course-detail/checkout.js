import Axios from "axios";
import React, { useState, useEffect } from "react";

import API_URL from "../../utils/API_URL";

function checkout() {
  const [code, setCode] = useState("");
  const [billingAddress, setBillingAddress] = useState({
    fname: "",
    lname: "",
    addressLine1: "",
    addressLine2: "",
    mobile: "",
    email: "",
    state: "",
    country: "",
    zipcode: "",
  });
  const [course, setCourse] = useState(null);

  useEffect(async () => {

  }, []);
  // console.log(course);

  const handleOnChange = (e) => {
    e.persist();
    setBillingAddress((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    // console.log(billingAddress);
  };

  const checkCouponCode = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
      const res = await Axios.get(
        `${API_URL}/isCouponApplicable?code=${code}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(res.data);
      res.data.applicable
        ? alert("Coupon is applicable")
        : alert("Coupon is invalid");

      // alert(res.data);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className="new-course-detail">
      <div className="py-lg-6 py-4 bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div>
                <h1 className="text-white display-4 mb-0">Checkout Page</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="py-6">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-12 col-12">
              {/* Card */}
              <div className="card  mb-4">
                {/* Card header */}
                <div className="card-header">
                  <h3 className="mb-0">Billing Address</h3>
                </div>
                {/* Card body */}
                <div className="card-body">
                  {/* Form */}
                  <form className="row">
                    {/* First name  */}
                    <div className="mb-3 col-12 col-md-6">
                      <label className="form-label" htmlFor="fname">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="fname"
                        className="form-control"
                        placeholder="First Name"
                        required
                        onChange={handleOnChange}
                        value={billingAddress.fname}
                      />
                    </div>
                    {/* Last name  */}
                    <div className="mb-3 col-12 col-md-6">
                      <label className="form-label" htmlFor="lname">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lname"
                        className="form-control"
                        placeholder="Last Name"
                        required
                        onChange={handleOnChange}
                        value={billingAddress.lname}
                      />
                    </div>
                    {/* Phone number  */}
                    <div className="mb-3 col-12 col-md-12">
                      <label className="form-label" htmlFor="phone">
                        Phone Number{" "}
                        <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="mobile"
                        className="form-control"
                        placeholder="Phone"
                        required
                        onChange={handleOnChange}
                        value={billingAddress.mobile}
                      />
                    </div>
                    {/* Address  */}
                    <div className="mb-3 col-12 col-md-12">
                      <label className="form-label" htmlFor="address">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        id="addressLine1"
                        className="form-control"
                        placeholder="Address"
                        required
                        onChange={handleOnChange}
                        value={billingAddress.addressLine1}
                      />
                    </div>
                    {/* Address  */}
                    <div className="mb-3 col-12 col-md-12">
                      <label className="form-label" htmlFor="address2">
                        Address Line 2{" "}
                        <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="addressLine2"
                        className="form-control"
                        placeholder="Address"
                        required
                        onChange={handleOnChange}
                        value={billingAddress.addressLine2}
                      />
                    </div>
                    {/* State */}
                    <div className="mb-3 col-12 col-md-4">
                      <label className="form-label" htmlFor="zipCode">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        className="form-control"
                        placeholder="State"
                        required
                        onChange={handleOnChange}
                        value={billingAddress.state}
                      />
                    </div>
                    {/* <div className="mb-3 col-12 col-md-4">
                      <label className="form-label">State</label>
                      <select className="selectpicker" data-width="100%">
                        <option value>Select State</option>
                        <option value={1}>Gujarat</option>
                        <option value={2}>Rajasthan</option>
                        <option value={3}>Maharashtra</option>
                      </select>
                    </div> */}
                    {/* Country  */}
                    <div className="mb-3 col-12 col-md-4">
                      <label className="form-label" htmlFor="zipCode">
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        className="form-control"
                        placeholder="Country"
                        required
                        onChange={handleOnChange}
                        value={billingAddress.country}
                      />
                    </div>
                    {/* <div className="mb-3 col-12 col-md-4">
                      <label className="form-label">Country</label>
                      <select className="selectpicker" data-width="100%">
                        <option value>Select Country</option>
                        <option value={1}>India</option>
                        <option value={2}>UK</option>
                        <option value={3}>USA</option>
                      </select>
                    </div> */}
                    {/* Zip code  */}
                    <div className="mb-3 col-12 col-md-4">
                      <label className="form-label" htmlFor="zipCode">
                        Zip/Postal Code
                      </label>
                      <input
                        type="text"
                        id="zipcode"
                        className="form-control"
                        placeholder="Zip"
                        required
                        onChange={handleOnChange}
                        value={billingAddress.zipcode}
                      />
                    </div>
                    <div className="col-12">
                      {/* Checkbox  */}
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="shippingAddress"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="shippingAddress"
                        >
                          Shipping address is the same as my billing address
                        </label>
                      </div>
                      {/* Checkbox  */}
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="saveCard"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="saveCard">
                          Save this information for next time
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* Card */}
              <div className="card  mb-3 mb-lg-0">
                {/* Card header */}
                <div className="card-header">
                  <h3 className="mb-0">Payment Method</h3>
                </div>
                {/* Card body */}
                <div className="card-body">
                  <div className="d-inline-flex ">
                    <div className="form-check me-3  ">
                      <input
                        type="radio"
                        id="cardRadioone"
                        name="cardRadioone"
                        className="form-check-input"
                        defaultChecked
                      />
                      <label
                        className="form-check-label "
                        htmlFor="cardRadioone"
                      >
                        Credit or Debit card
                      </label>
                    </div>
                    {/* Radio */}
                    <div className="form-check">
                      <input
                        type="radio"
                        id="cardRadioTwo"
                        name="cardRadioone"
                        className="form-check-input"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cardRadioTwo"
                      >
                        PayPal
                      </label>
                    </div>
                  </div>
                  {/* Form */}
                  <form className="row " id="cardpayment">
                    {/* Card number */}
                    <div className="mb-3 mt-4 col-12">
                      {/* Card Number */}
                      <label
                        className="d-flex justify-content-between align-items-center form-label"
                        htmlFor="cc-mask"
                      >
                        Card Number{" "}
                        <span>
                          <i className="fab fa-cc-amex me-1  text-primary" />
                          <i className="fab fa-cc-mastercard me-1  text-primary" />{" "}
                          <i className="fab fa-cc-discover me-1  text-primary" />{" "}
                          <i className="fab fa-cc-visa  text-primary" />
                        </span>
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="cc-mask"
                          data-inputmask="'mask': '9999 9999 9999 9999'"
                          inputMode="numeric"
                          placeholder="xxxx-xxxx-xxxx-xxxx"
                          required
                        />
                        <span className="input-group-text" id="basic-addon2">
                          <i className="fe fe-lock " />
                        </span>
                      </div>
                      <small className="text-muted">
                        Full name as displayed on card.
                      </small>
                    </div>
                    {/* Month */}
                    <div className="mb-3 col-12 col-md-4">
                      <label className="form-label">Month</label>
                      <select className="selectpicker" data-width="100%">
                        <option value>Month</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="Sep">Sep</option>
                        <option value="Oct">Oct</option>
                      </select>
                    </div>
                    {/* Year */}
                    <div className="mb-3 col-12 col-md-4">
                      <label className="form-label">Year</label>
                      <select className="selectpicker" data-width="100%">
                        <option value>Year</option>
                        <option value="June">2018</option>
                        <option value="July">2019</option>
                        <option value="August">2020</option>
                        <option value="Sep">2021</option>
                        <option value="Oct">2022</option>
                      </select>
                    </div>
                    {/* CVV Code */}
                    <div className="mb-3 col-12 col-md-4">
                      <label htmlFor="cvv" className="form-label">
                        CVV Code{" "}
                        <i
                          className="fe fe-help-circle ms-1 fs-6"
                          data-bs-toggle="tooltip"
                          data-placement="right"
                          title
                          data-original-title="A 3 - digit number, typically printed on the back of a card."
                        />
                      </label>
                      <input
                        type="password"
                        className="cc-inputmask form-control"
                        name="cvv"
                        id="cvv"
                        placeholder="xxx"
                        maxLength={3}
                      />
                    </div>
                    {/* Name on card */}
                    <div className="mb-3 col-12">
                      <label htmlFor="nameoncard" className="form-label">
                        Name on Card
                      </label>
                      <input
                        id="nameoncard"
                        type="text"
                        className="form-control"
                        name="nameoncard"
                        placeholder="Name"
                        required
                      />
                    </div>
                    {/* Country */}
                    <div className="mb-3 col-6">
                      <label className="form-label">Country</label>
                      <select className="selectpicker" data-width="100%">
                        <option value>India</option>
                        <option value="uk">UK</option>
                        <option value="usa">USA</option>
                      </select>
                    </div>
                    {/* Zip Code */}
                    <div className="mb-3 col-6">
                      <label htmlFor="postalcode" className="form-label">
                        Zip/Postal Code
                      </label>
                      <input
                        id="postalcode"
                        type="text"
                        className="form-control"
                        name="postalcode"
                        placeholder="Zipcode"
                        required
                      />
                    </div>
                    {/* CheckBox */}
                    <div className="col-12 mb-5">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheck1"
                        />
                        <label
                          className="form-check-label "
                          htmlFor="customCheck1"
                        >
                          Remember this card
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      {/* Button */}
                      <div>
                        <button
                          type="submit"
                          className="btn btn-primary mb-3 mb-lg-0 me-4"
                        >
                          Make a Payment
                        </button>
                      </div>
                    </div>
                    {/* Text */}
                    <div className="col-md-8 col-12 d-flex align-items-center justify-content-end">
                      <small className="mb-0">
                        By click start learning, you agree to our{" "}
                        <a href="#">Terms of Service and Privacy Policy.</a>
                      </small>
                    </div>
                  </form>
                  {/* Paypal */}
                  <form id="internetpayment">
                    <div className="mb-3 mt-4 ">
                      <label htmlFor="paypalemail" className="form-label">
                        PayPal
                      </label>
                      <input
                        type="email"
                        id="paypalemail"
                        name="paypalemail"
                        placeholder="Enter your PayPal email"
                        className="form-control"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      PayPal Checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-12">
              {/* Card */}
              <div className="card  border-0 mb-3">
                {/* Card body */}
                <div className="p-5 text-center">
                  <span className="badge bg-warning">Selected Plan</span>
                  <div className="mb-5 mt-3">
                    <h1 className="fw-bold">Individual</h1>
                    <p className="mb-0 ">
                      Access all{" "}
                      <span className="text-dark fw-medium">
                        premium courses, workshops, and mobile apps.
                      </span>{" "}
                      Renewed monthly.
                    </p>
                  </div>
                  <div className="d-flex justify-content-center">
                    <span className="h3 mb-0 fw-bold text-primary">$</span>
                    <div className="display-4 fw-bold text-primary">39</div>
                    <span className=" align-self-end mb-1">/Monthly</span>
                  </div>
                </div>
                <hr className="m-0" />
                <div className="p-5">
                  <h4 className="fw-bold mb-4">Everything in Starter, plus:</h4>
                  {/* List */}
                  <ul className="list-unstyled mb-0">
                    <li className="mb-1">
                      <span className="text-success me-1">
                        <i className="far fa-check-circle" />
                      </span>
                      <span>Offline viewing </span>
                    </li>
                    <li className="mb-1">
                      <span className="text-success me-1">
                        <i className="far fa-check-circle" />
                      </span>
                      <span>
                        <span className="fw-bold text-dark">Offline </span>
                        projects{" "}
                      </span>
                    </li>
                    <li className="mb-1">
                      <span className="text-success me-1">
                        <i className="far fa-check-circle" />
                      </span>
                      <span>
                        <span className="fw-bold text-dark">Unlimited </span>
                        storage
                      </span>
                    </li>
                    <li className="mb-1">
                      <span className="text-success me-1">
                        <i className="far fa-check-circle" />
                      </span>
                      <span>Custom domain support </span>
                    </li>
                    <li className="mb-1">
                      <span className="text-success me-1">
                        <i className="far fa-check-circle" />
                      </span>
                      <span>Bulk editing </span>
                    </li>
                    <li className="mb-1">
                      <span className="text-success me-1">
                        <i className="far fa-check-circle" />
                      </span>
                      <span>12 / 5 support</span>
                    </li>
                  </ul>
                </div>
                {/* hr */}
                <hr className="m-0" />
                <div className="p-4">
                  <a href="#" className="btn btn-outline-primary">
                    Change the Plan
                  </a>
                </div>
              </div>
              {/* Card */}
              <div className="card border-0 mb-3 mb-lg-0">
                {/* Card body */}
                <div className="card-body">
                  <h3 className="mb-2">Discount Codes</h3>
                  <form onSubmit={checkCouponCode}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your code"
                        aria-describedby="couponCode"
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <button
                        className="btn btn-secondary"
                        id="couponCode"
                        onClick={checkCouponCode}
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkout;
