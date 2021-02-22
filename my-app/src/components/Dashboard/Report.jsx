/* eslint-disable react/prop-types */
import React from 'react';

export default function Report({ date, person, position, report, plans }) {
  return (
    <>
      <article className="report-article">
        <div className="report-container">
          <article className="person report-container__person report">
            <div className="person__avatar" />
            {/* <img src="/" className="person__avatar" alt="Аватар" /> */}
            <div className="person__info">
              <div className="person__name report__name">{person}</div>
              <div className="person__position person__position_design">
                {position}
              </div>
            </div>
            <div className="person__date-report">
              {new Date(date).toLocaleDateString()}
            </div>
          </article>
          <article className="report report_first">
            <h3 className="report__title report__title_done">
              Отчет о проделанной работе:
            </h3>
            <p className="report__text">{report}</p>
          </article>
          <article className="report">
            <h3 className="report__title report__title_plans">
              План на следующую неделю:
            </h3>
            <p className="report__text">{plans}</p>
          </article>
        </div>
      </article>
    </>
  );
}
