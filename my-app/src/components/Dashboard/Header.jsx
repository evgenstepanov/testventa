/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../../redux/actions';
import { projectStartDateAndWeek } from '../../utlis';

// eslint-disable-next-line react/prop-types
function Header({ visibilityFilter, setFilter }) {
  const convertDate = (postDate) => {
    const days = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ];
    return `${postDate.toLocaleDateString()}, ${days[postDate.getDay()]}`;
  };

  const handleCheckChanges = (e) => {
    const { name, checked } = e.target;
    setFilter({ ...visibilityFilter, [name]: checked });
  };

  const handleSearchInput = (e) => {
    const { name, value } = e.target;
    setFilter({ ...visibilityFilter, [name]: value });
  };

  const handleReverse = () => {
    setFilter({ ...visibilityFilter, reverse: !visibilityFilter.reverse });
  };

  return (
    <div className="header">
      <div className="date-block">
        <div className="date-block__week">
          {projectStartDateAndWeek().numberOfWeek}
        </div>
        <div className="date-block__wrapper">
          <h3 className="date-block__title">Неделя разработки</h3>
          <div className="date-block__current-date">
            {convertDate(new Date())}
          </div>
        </div>
      </div>
      <div className="search">
        <input
          className="search__input"
          type="text"
          name="search"
          id="search"
          autoComplete="off"
          onChange={handleSearchInput}
        />
      </div>
      <button
        type="button"
        className={`button filter-by-date${
          visibilityFilter.reverse ? ' filter-by-date_reversed' : ''
        }`}
        onClick={handleReverse}
      >
        <span className="filter-by-date__text">По датe</span>
      </button>
      <div className="filter-by-developer">
        <input
          type="checkbox"
          className="filter-by-developer__item"
          id="design"
          name="design"
          checked={visibilityFilter.design}
          onChange={handleCheckChanges}
        />
        <label className="filter-by-developer__checkbox-label" htmlFor="design">
          Дизайн
        </label>
        <input
          type="checkbox"
          className="filter-by-developer__item"
          id="development"
          name="development"
          checked={visibilityFilter.development}
          onChange={handleCheckChanges}
        />
        <label
          className="filter-by-developer__checkbox-label filter-by-developer__checkbox-label_last"
          htmlFor="development"
        >
          Разработка
        </label>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    visibilityFilter: state.visibilityFilter,
  };
};

export default connect(mapStateToProps, { setFilter })(Header);
