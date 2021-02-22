/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toggleUserInfo, setUserData } from '../../redux/actions';
import { useHttp } from '../../hooks/http.hook';
import { CloseButtonOnHeader } from './UsersList/CloseButtonOnHeader';
import UserInfoAccountForm from './UserInfoAccountForm';
import UserInfoPasswordForm from './UserInfoPasswordForm';

// eslint-disable-next-line react/prop-types
function UserInfo({ toggleUserInfo, currentUser, setUserData }) {
  const { request } = useHttp();
  const [user, setUser] = useState(currentUser);
  const [showPass, setShowPass] = useState(false);
  const [changePassMode, setChangePassMode] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await request(`/api/auth/${user.userId}`, 'PUT', {
        ...user,
      });
      setUserData(user);
    } catch (e) {
      console.log(e.message);
    }
    toggleUserInfo();
  };

  const getPassword = () => {
    console.log('даю');
    const pass = JSON.parse(localStorage.getItem('userData')).password;
    return pass;
  };

  return (
    <div className="user-pop-up">
      <div className="user">
        <div className="pop-up-header user__pop-up-header">
          <h3 className="pop-up-header__title">Данные профиля</h3>
          <CloseButtonOnHeader func={toggleUserInfo} />
        </div>
        <article className="user-info">
          <section className="user-account">
            <h4 className="user-account__title">Аккаунт</h4>
            <div className="user-account__wrapper">
              <div className="user-account__block">
                <h5 className="user-account__subtitle">Логин</h5>
                <p className="user-account__login">{user.email}</p>
              </div>
              <div className="user-account__block">
                <h5 className="user-account__subtitle">Пароль</h5>
                <div className="user-account__password-container">
                  <p className="user-account__login">
                    {showPass ? getPassword() : '************'}
                  </p>
                  <div
                    className={`eye user-account__eye user-account__eye_${
                      showPass ? 'opened' : 'closed'
                    }`}
                    onClick={() => setShowPass(!showPass)}
                  />
                </div>
              </div>
              <button
                className="button user-account__change-password"
                type="button"
                onClick={() => setChangePassMode(!changePassMode)}
              >
                {changePassMode ? 'Назад' : 'Изменить пароль'}
              </button>
            </div>
          </section>
          {changePassMode ? (
            <UserInfoPasswordForm user={user} toggleUserInfo={toggleUserInfo} />
          ) : (
            <UserInfoAccountForm
              user={user}
              handleInput={handleInput}
              handleSubmit={handleSubmit}
            />
          )}
        </article>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user,
});

export default connect(mapStateToProps, { toggleUserInfo, setUserData })(
  UserInfo
);
