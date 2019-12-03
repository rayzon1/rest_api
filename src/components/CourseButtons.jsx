import React from "react";

const data = [
  { title: "Build a Basic Bookcase" },
  { title: "Learn How to Program" },
  { title: "Learn How to Test JS" }
];

export default function CourseButtons() {
  return (
    <>
      {data.map(data => (
        <div class="grid-33">
          <a class="course--module course--link" href="course-detail.html">
            <h4 class="course--label">Course</h4>
            <h3 class="course--title">{data.title}</h3>
          </a>
        </div>
      ))}
    </>
  );
}
