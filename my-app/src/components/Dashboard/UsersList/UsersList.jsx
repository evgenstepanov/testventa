/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserRow from './UserRow';
import { useHttp } from '../../../hooks/http.hook';
import { CloseButtonOnHeader } from './CloseButtonOnHeader';
import {
  getUsers,
  toogleUsersList,
  setUsersAccessOnServer,
} from '../../../redux/actions';
import './UsersList.css';

function UsersList({
  getUsers,
  users,
  toogleUsersList,
  accessUsers,
  setUsersAccessOnServer,
}) {
  const { request } = useHttp();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const submitAccessUsersHandle = async () => {
    try {
      await request(`/api/auth/users`, 'PUT', accessUsers);
    } catch (e) {
      console.log(e);
    }
    setUsersAccessOnServer([]);
    toogleUsersList();
  };

  return (
    <div className="user-pop-up">
      <div className="users-list">
        <div className="users-list__header">
          <h3 className="users-list__title">
            Зарегистрированные пользователи |{' '}
            <span className="user-list__number-users">
              Всего: {users.length}
            </span>
          </h3>
          <CloseButtonOnHeader func={toogleUsersList} />
        </div>
        <div className="users-list__table">
          <div className="users-list__titles-cols">
            <span className="users-list__title-col">Пользователь</span>
            <span className="users-list__title-col">Дата</span>
            <span className="users-list__title-col">Разработчик</span>
          </div>
          <div className="users-list__container-row">
            {users.map((user) => (
              <UserRow user={user} key={user.email} />
            ))}
          </div>
          <div className="users-list__line-after-table" />
          <section className="user-list-submit">
            <input
              className="button user-submit-btn user-account__submit user-list__button-submit"
              type="submit"
              value="Сохранить"
              onClick={submitAccessUsersHandle}
            />
          </section>{' '}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  accessUsers: state.user.accessUsers,
});

export default connect(mapStateToProps, {
  getUsers,
  toogleUsersList,
  setUsersAccessOnServer,
})(UsersList);
