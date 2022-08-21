import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="course__card__">
      <img src={course?.thumbnailImage} alt="Image" className="card_image" />
      <div className="card_right">
        <h2 className="card_title">{course?.title}</h2>
        <span style={{ color: "gray" }}>
          {course?.instructor?.firstName + " "}
          {course?.instructor?.lastName}
        </span>
        <div className="card__description">
          <span style={{ width: "80%", marginTop: "10px" }}>
            {course?.short_description}
          </span>
        </div>
        <div className="card_details">
          <div className="card_details_left">
            {" "}
            {/**   <span style={{ color: "gray" }}>{course?.projectTime}</span><span style={{ marginLeft: "5px", color: "gray" }}>
               {course?.language}
             </span> */}
          </div>
        </div>
        <span style={{ color: "gray", fontSize: "12px" }}>{course?.level}</span>
      </div>
    </div>
  );
};

export default CourseCard;
