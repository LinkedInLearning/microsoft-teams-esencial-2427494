import React from "react";

const courses = [
  { name: '.NET 6 esencial'},
  { name: 'Dapr para desarrollo .NET esencial'},
  { name: 'Azure: Fundamentos de seguridad'}
];

export default function Tab(){
 return (
  <div>
    <ul>
      {
        courses.map(c => (
          <li>
            { c.name }
          </li>
        ))
      }
    </ul>
  </div>
 );
}