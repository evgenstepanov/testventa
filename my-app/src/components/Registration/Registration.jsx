import React, { useState } from 'react';
import { OpenWindows, Positions } from '../../constants';
import { useHttp } from '../../hooks/http.hook';
import { setTypeError, checkForValidationEmail } from '../../utlis';

export function Registration(props) {
  // eslint-disable-next-line react/prop-types
  const { openWindow, setOpenWindow } = props;

  const { request } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
    position: Positions.SPECTATOR,
  });
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const [error, setError] = useState({});
  const [checkMarkEmail, setCheckMarkEmail] = useState(false);
  const [checkMarkPassword, setCheckMarkPassword] = useState(false);

  const changeHandler = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const clickBackHandler = () => {
    setCheckMarkEmail(false);
    setCheckMarkPassword(false);
    setError({});
    setForm({
      email: '',
      password: '',
    });
    setOpenWindow(OpenWindows.AUTH);
  };

  const registrationClickHandler = async (evt) => {
    evt.preventDefault();
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      console.log(`"Вы успешно зарегистрировались1 " ${data}`);
      setOpenWindow(OpenWindows.AUTH);
    } catch (e) {
      setError(setTypeError(e.message));
    }
  };

  const onBlurEmailHandler = (evt) => {
    if (!evt.target.value) {
      setValidEmail(true);
      setCheckMarkEmail(false);
      setError({});
      return;
    }
    const emailValid = checkForValidationEmail(evt.target.value);
    setValidEmail(emailValid);

    if (emailValid) {
      setError({});
      setCheckMarkEmail(true);
    } else {
      setError({ type: 'email', message: 'Введите корректный Email' });
      setCheckMarkEmail(false);
    }
  };

  const onBlurPasswordHandler = (evt) => {
    if (!evt.target.value) {
      setValidPassword(true);
      setCheckMarkPassword(false);
      setError({});
      return;
    }
    if (evt.target.value.length < 6) {
      setValidPassword(false);
      setCheckMarkPassword(false);
      setError({
        type: 'password',
        message: 'Минимальная длина пароля 6 символов',
      });
    } else {
      setValidPassword(true);
      setCheckMarkPassword(true);
      setError({});
    }
  };

  const keyDownHandler = (evt) => {
    if (evt.keyCode === 13) {
      evt.target.blur();
    }
  };

  return (
    <div
      className={`registration ${
        openWindow === 'Registration' && 'registration--open'
      }`}
    >
      <h3 className="registration__title login__form-title">Регистрация</h3>
      <div className="login__input-form input-form__login">
        <div className="input-container">
          <input
            className={`input registration-input-email ${
              (!validEmail || error.type === 'password') &&
              'error-validation__input'
            }`}
            type="email "
            id="reg-input-email"
            autoComplete="off"
            placeholder="Введите email"
            name="email"
            required
            value={form.email}
            onChange={changeHandler}
            onBlur={onBlurEmailHandler}
            onKeyDown={keyDownHandler}
          />
          <label className="label" htmlFor="reg-input-email">
            <span className="label__name">Email*</span>
          </label>
        </div>
        <div className={checkMarkEmail ? 'check-mark' : ''} />
        {error.type === 'email' && (
          <span className="error-validation__message">{error.message}</span>
        )}
      </div>
      <div className="login__input-form input-form__password">
        <div className="input-container">
          <input
            className={`input registration-input-password ${
              (!validPassword || error.type === 'password') &&
              'error-validation__input'
            }`}
            type="password"
            id="reg-input-password"
            autoComplete="off"
            placeholder="Введите пароль"
            name="password"
            required
            value={form.password}
            onChange={changeHandler}
            onBlur={onBlurPasswordHandler}
            onKeyDown={keyDownHandler}
          />
          <label className="label" htmlFor="reg-input-password">
            <span className="label__name">Пароль*</span>
          </label>
        </div>
        <div className={checkMarkPassword ? 'check-mark' : ''} />
        {error.type === 'password' && (
          <span className="error-validation__message">{error.message}</span>
        )}
      </div>
      <div className="registration__choice">
        <button
          className="choice__back choice__btn"
          onClick={clickBackHandler}
          type="button"
        >
          Назад
        </button>
        <button
          className="registration__choise-entry choice__entry choice__btn"
          type="submit"
          onClick={registrationClickHandler}
          disabled={!validEmail || !checkMarkEmail}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
}
