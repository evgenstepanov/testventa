/* eslint-disable react/prop-types */
import React from 'react';

export default function UserInfoAccountForm({
  user,
  handleInput,
  handleSubmit,
}) {
  return (
    <form className="form">
      <div className="user-account">
        <h4 className="user-account__title">Анкета пользователя</h4>
        <div className="user__input-container">
          <div className="user-account-avatar grid-avatar" />
          <div className="input-container grid-phone">
            <input
              className="input user-phone-number"
              type="text"
              name="phone"
              id="phone"
              placeholder=""
              autoComplete="off"
              required
              value={!user.phone ? '' : user.phone}
              onChange={handleInput}
            />
            <label className="label" htmlFor="phone">
              <span className="label__name">Телефон*</span>
            </label>
          </div>
          <div className="input-container grid-surname">
            <input
              className="input user-surname"
              type="text"
              name="surname"
              id="surname"
              placeholder=""
              autoComplete="off"
              required
              value={user.surname}
              onChange={handleInput}
            />
            <label className="label" htmlFor="surname">
              <span className="label__name">Фамилия*</span>
            </label>
          </div>
          <div className="input-container grid-name">
            <input
              className="input user-name"
              type="text"
              name="name"
              id="name"
              placeholder=""
              autoComplete="off"
              required
              value={user.name}
              onChange={handleInput}
            />
            <label className="label" htmlFor="name">
              <span className="label__name">Имя*</span>
            </label>
          </div>
          <div className="input-container grid-middlename">
            <input
              className="input user-middlename"
              type="text"
              name="patronymic"
              id="patronymic"
              placeholder=""
              autoComplete="off"
              required
              value={user.patronymic}
              onChange={handleInput}
            />
            <label className="label" htmlFor="patronymic">
              <span className="label__name">Отчество*</span>
            </label>
          </div>
          <div className="input-container grid-position">
            <select
              className="input input-select user-position"
              name="position"
              id="position"
              placeholder=""
              autoComplete="off"
              required
              value={user.position}
              onChange={handleInput}
            >
              <option>Наблюдатель</option>
              <option disabled={!user.access}>Full-Stack Разработчик</option>
              <option disabled={!user.access}>UI/UX Дизайнер</option>
            </select>
            <label className="label" htmlFor="position">
              <span className="label__name">Должность*</span>
            </label>
          </div>
        </div>
      </div>
      <section className="user-submit">
        <input
          className="button user-submit-btn user-account__submit"
          type="submit"
          value="Сохранить"
          onClick={handleSubmit}
        />
      </section>
    </form>
  );
}
