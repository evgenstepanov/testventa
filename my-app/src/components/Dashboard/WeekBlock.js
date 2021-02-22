/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Report from './Report';
import { projectStartDateAndWeek } from '../../utlis';

function WeekBlock({ week, visibilityFilter }) {
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    console.log(window.scrollY);
    if (window.scrollY > 3) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateForFormat) => {
    const date = new Date(dateForFormat);

    const start = date.toLocaleDateString();
    const endOfWeek = new Date(
      Date.parse(date) + 518400000
    ).toLocaleDateString();
    return `(${start.slice(0, 5)}-${endOfWeek.slice(
      0,
      5
    )} | ${date.getFullYear()})`;
  };
  const dateStartWeek = formatDate(
    projectStartDateAndWeek(week[0].numberOfWeek).startWeek
  );

  const sortedWeek = visibilityFilter.reverse ? [...week].reverse() : [...week];
  return (
    <div className="week-block">
      <div className={`week-header${scroll ? ' week-header_narrow' : ''}`}>
        <h3 className="week-number-title week-block__title">
          Отчеты по <span className="week-number">{week[0].numberOfWeek}</span>{' '}
          неделе
        </h3>
        <div className="week-date">{dateStartWeek}</div>
      </div>
      <div className="week-block__posts">
        {sortedWeek.map((item) => (
          <Report
            date={item.date}
            person={item.person}
            position={item.position}
            report={item.report}
            plans={item.plans}
            key={item._id}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    visibilityFilter: state.visibilityFilter,
  };
};

export default connect(mapStateToProps)(WeekBlock);
