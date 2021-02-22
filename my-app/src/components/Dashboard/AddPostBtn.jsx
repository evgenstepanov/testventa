/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toogleNewPostForm } from '../../redux/actions';
import { projectStartDateAndWeek } from '../../utlis';
import { Positions } from '../../constants';

export function AddPostBtn({ newPostForm, toogleNewPostForm, user }) {
  const [messageError, setErrorMessage] = useState('');

  const clickOnAddBtton = () => {
    if (!user.access) {
      setErrorMessage('Нет доступа');
      setTimeout(() => {
        setErrorMessage(false);
      }, 1000);
      return;
    }
    if (!user.name || !user.surname || !user.patronymic) {
      setErrorMessage('Заполните свою анкету в настройках');
      setTimeout(() => {
        setErrorMessage(false);
      }, 1000);
      return;
    }
    if (user.position === Positions.SPECTATOR) {
      setErrorMessage('Выберете должность');
      setTimeout(() => {
        setErrorMessage(false);
      }, 1000);
      return;
    }

    if (user.userPosts.length >= projectStartDateAndWeek().numberOfWeek) {
      setErrorMessage('Неделя еще не началась');
      setTimeout(() => {
        setErrorMessage(false);
      }, 1000);
    } else {
      toogleNewPostForm();
    }
  };

  return (
    <div className="add-button-container">
      <button type="button" className="add-post" onClick={clickOnAddBtton}>
        <div
          className={`add-post__cirle add-post__cirle_${
            newPostForm ? 'opened' : 'closed'
          }`}
        >
          {messageError && (
            <span className="add-post__message-error">{messageError}</span>
          )}
        </div>
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, { toogleNewPostForm })(AddPostBtn);
