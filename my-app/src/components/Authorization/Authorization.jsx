import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { OpenWindows } from '../../constants';
import { setTypeError, checkForValidationEmail } from '../../utlis';

const Authorization = (props) => {
  // eslint-disable-next-line react/prop-types
  const { openWindow, setOpenWindow, login } = props;
  const { loading, request } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({});
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [checkMarkEmail, setCheckMarkEmail] = useState(false);
  const [checkMarkPassword, setCheckMarkPassword] = useState(false);

  const changeHandler = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
    if (form.password.length >= 5) {
      setValidPassword(true);
      setCheckMarkPassword(true);
      setError({});
    }
  };

  const registerHandler = (evt) => {
    evt.preventDefault();
    setCheckMarkEmail(false);
    setCheckMarkPassword(false);
    setError({});
    setForm({
      email: '',
      password: '',
    });
    setOpenWindow(OpenWindows.REGISTRATION);
  };

  const loginHandler = async (evt) => {
    evt.preventDefault();
    if (checkMarkEmail && checkMarkPassword) {
      try {
        const data = await request('/api/auth/login', 'POST', { ...form });
        setOpenWindow(OpenWindows.DASHBOARD);
        setTimeout(() => {
          login(data.token, data.userId, data.password);
        }, 500);
      } catch (e) {
        setError(setTypeError(e.message));
      }
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
      className={`login-details 
      ${openWindow === 'Auth' && 'login-details--open'}
      `}
    >
      <h3 className="login-details__title login__form-title">ВХОД</h3>
      <form action="#" autoComplete="off">
        <div className="login__input-form input-form__login">
          <div className="input-container">
            <input
              className={`input login-input-email ${
                (!validEmail || error.type === 'email') &&
                'error-validation__input'
              }`}
              type="email "
              id="auth-input-email"
              autoComplete="off"
              placeholder="Введите email"
              name="email"
              required
              value={form.email}
              onChange={changeHandler}
              onBlur={onBlurEmailHandler}
              onKeyDown={keyDownHandler}
            />
            <label className="label" htmlFor="auth-input-email">
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
              className={`input login-input-password ${
                (!validPassword || error.type === 'password') &&
                'error-validation__input'
              }`}
              type="password"
              id="auth-input-password"
              autoComplete="off"
              placeholder="Введите пароль"
              name="password"
              required
              value={form.password}
              onChange={changeHandler}
              onBlur={onBlurPasswordHandler}
              onKeyDown={keyDownHandler}
            />
            <label className="label" htmlFor="auth-input-password">
              <span className="label__name">Пароль*</span>
            </label>
          </div>
          <div className={checkMarkPassword ? 'check-mark' : ''} />
          {error.type === 'password' && (
            <span className="error-validation__message">{error.message}</span>
          )}
        </div>
        <div className="login__choice">
          <button
            className="choice__entry choice__btn"
            type="submit"
            onClick={loginHandler}
            disabled={!checkMarkEmail || !form.password || loading}
          >
            <div>Войти в систему</div>
            <div className="arrow" />
          </button>
          <button
            className="choice__registration choice__btn"
            type="submit"
            onClick={registerHandler}
            disabled={loading}
          >
            Регистрация
          </button>
        </div>
      </form>
      <div className="line-result">
        <div
          className={`line-result__color-line ${
            (checkMarkEmail || checkMarkPassword) &&
            'line-result__color-line_half'
          } ${
            checkMarkEmail &&
            checkMarkPassword &&
            'line-result__color-line_full'
          }`}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  login: state.user.login,
});

export { Authorization };
export default connect(mapStateToProps)(Authorization);
