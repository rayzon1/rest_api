import React from "react";
import { Link } from "react-router-dom";

export default function CourseButtons({ data }) {
  return (
    <>
      {data &&
        data.map(data => {
          return (
            <div className="grid-33" key={data.id} onClick={() => console.log(data.id)}>
              <Link to="/course_details">
                <div className="course--module course--link">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{data.title}</h3>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
}
