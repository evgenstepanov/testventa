/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';

function UserInfoPasswordForm({ user, logout, toggleUserInfo }) {
  const { request } = useHttp();
  const [inputPass, setInputPass] = useState({
    password: '',
    'confirm-password': '',
  });

  const [correctPass, setCorrectPass] = useState(true);

  const handleSubmit = async () => {
    try {
      const res = await request(`/api/auth/${user.userId}`, 'PUT', {
        password: inputPass.password,
      });
      if (res.ok) {
        toggleUserInfo();
        logout();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const checkPasswordsAndSend = (e) => {
    e.preventDefault();
    if (
      inputPass.password === inputPass['confirm-password'] &&
      inputPass.password.length > 5
    ) {
      setCorrectPass(true);
      handleSubmit();
    } else {
      setCorrectPass(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputPass({ ...inputPass, [name]: value });
  };

  return (
    <form className="form" onSubmit={checkPasswordsAndSend}>
      <div className="user-account">
        <h4 className="user-account__title">Изменение пароля</h4>
        <div className="user__password-container">
          <div className="input-container user-account__password">
            <input
              className={`input${
                correctPass ? '' : ' error-validation__input'
              }`}
              type="password"
              name="password"
              id="password"
              placeholder=""
              autoComplete="off"
              required
              value={user.password}
              onChange={handleInput}
            />
            <label className="label" htmlFor="password">
              <span className="label__name">Новый пароль*</span>
            </label>
            {!correctPass ? (
              <span className="error-validation__message">
                Пароли не равны или менее 6 знаков
              </span>
            ) : null}
          </div>
          <div className="input-container user-account__confirm-password">
            <input
              className={`input${
                correctPass ? '' : ' error-validation__input'
              }`}
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder=""
              autoComplete="off"
              required
              value={user.password}
              onChange={handleInput}
            />
            <label className="label" htmlFor="confirm-password">
              <span className="label__name">Новый пароль еще раз*</span>
            </label>
          </div>
        </div>
      </div>
      <section className="user-submit">
        <input
          className="button user-submit-btn user-account__submit"
          type="submit"
          value="Сохранить"
        />
      </section>
    </form>
  );
}

const mapStateToProps = (state) => ({
  logout: state.user.logout,
});

export default connect(mapStateToProps, null)(UserInfoPasswordForm);
