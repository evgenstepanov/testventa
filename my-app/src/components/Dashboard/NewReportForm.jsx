/* eslint-disable react/prop-types */
/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { projectStartDateAndWeek } from '../../utlis';
import { addPost, toogleNewPostForm } from '../../redux/actions';
import { useHttp } from '../../hooks/http.hook';

function NewReportForm({ toogleNewPostForm, addPost, user }) {
  const textAreaSize = { minRows: 1, maxRows: 100 };
  const [textareaReport, setTextareaReport] = useState({
    rows: 1,
  });
  const [textareaPlans, setTextareaPlans] = useState({
    rows: 1,
  });

  const { request } = useHttp();
  const startDayAndWeek = projectStartDateAndWeek();
  const currentUser = {
    numberOfWeek: String(user.userPosts.length + 1),
    firstDayOfWeek: startDayAndWeek.startWeek,
    date: new Date(),
    person: `${user.name} ${user.surname} ${user.patronymic}`,
    position: user.position,
    userId: user.userId,
    report: '',
    plans: '',
  };

  const [post, setPost] = useState(currentUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPost({ ...post, report: '', plans: '' });

    try {
      const response = await request('/api/posts/add', 'POST', {
        ...post,
      });
      addPost({
        ...response,
        date: new Date(response.date),
        firstDayOfWeek: new Date(response.firstDayOfWeek),
      });
      toogleNewPostForm();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleValue = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleTextArea = (event) => {
    const { name } = event.target;
    const textareaLineHeight = 16;
    const { minRows, maxRows } = textAreaSize;
    const previousRows = event.target.rows;

    event.target.rows = minRows; // reset number of rows in textarea
    const currentRows = ~~(
      (event.target.scrollHeight - 28) /
      textareaLineHeight
    );

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    if (name === 'report') {
      setTextareaReport({
        ...textareaReport,
        rows: currentRows < maxRows ? currentRows : maxRows,
      });
    }
    if (name === 'plans') {
      setTextareaPlans({
        ...textareaPlans,
        rows: currentRows < maxRows ? currentRows : maxRows,
      });
    }
  };

  return (
    <div className="new-report">
      <h3 className="new-report__title shadow">Добавление нового отчета</h3>
      <div className="report-container">
        <article className="person report-container__person">
          <div className="person__avatar" />
          {/* <img src="/" className="person__avatar" alt="Аватар" /> */}
          <div className="person__info">
            <div className="person__name">{currentUser.person}</div>
            <div className="person__position">{currentUser.position}</div>
          </div>
          <h3 className="week-number-title week-block__new-report">
            <span className="week-number">{user.userPosts.length + 1}</span>{' '}
            неделя
          </h3>
        </article>
        <form className="form new-report__form" onSubmit={handleSubmit}>
          <div className="input-container input-container_textarea input-container_first">
            <textarea
              className="input input-textarea"
              name="report"
              id="report"
              placeholder=""
              rows={textareaReport.rows}
              autoComplete="off"
              required
              onChange={(e) => {
                handleValue(e);
                handleTextArea(e);
              }}
              value={post.report}
            />
            <label className="label" htmlFor="report">
              <span className="label__name">Отчет о проделанной работе*</span>
            </label>
          </div>
          <div className="input-container input-container_textarea">
            <textarea
              className="input input-textarea"
              name="plans"
              id="plans"
              placeholder=""
              rows={textareaPlans.rows}
              autoComplete="off"
              required
              onChange={(e) => {
                handleValue(e);
                handleTextArea(e);
              }}
              value={post.plans}
            />
            <label className="label" htmlFor="report">
              <span className="label__name">Планы на следующую неделю*</span>
            </label>
          </div>
          <div className="button-container form__button-container">
            <input
              className="form__btn form__cancel"
              type="button"
              value="Отмена"
              onClick={() => {
                toogleNewPostForm();
              }}
            />
            <input
              className="form__btn form__submit"
              type="submit"
              value="Опубликовать"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts,
});

export default connect(mapStateToProps, { addPost, toogleNewPostForm })(
  NewReportForm
);
