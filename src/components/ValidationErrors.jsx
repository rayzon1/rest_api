import React from 'react';

export default function validationErrors({ data }) {
    return (
      <div >
        <h2 class="validation--errors--label">Validation errors</h2>
        <div class="validation-errors">
          <ul>
            {data.map((data, index) => (
              <li style={{ color: "red" }} key={index}>
                { data}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };