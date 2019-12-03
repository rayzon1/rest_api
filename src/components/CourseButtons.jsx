import React from "react";
import { Link } from "react-router-dom";

export default function CourseButtons({ data }) {
  return (
    <>
      {data &&
        data.map(data => {
          console.log(data.id);
          return (
            <div class="grid-33">
              <Link to="/course_details">
                <div class="course--module course--link">
                  <h4 class="course--label">Course</h4>
                  <h3 class="course--title">{data.title}</h3>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
}
