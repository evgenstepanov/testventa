import React from 'react';

// eslint-disable-next-line react/prop-types
export default function CheckBox({ id, label }) {
  return (
    <>
      <input type="checkbox" className="filter-by-developer__item" id={id} />
      <label className="filter-by-developer__checkbox-label" htmlFor={id}>
        {label}
      </label>
    </>
  );
}
