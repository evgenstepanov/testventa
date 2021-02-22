/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { setUserAccess, setUsersAccessOnServer } from '../../../redux/actions';

export const UserRow = (props) => {
  const { user, setUserAccess, setUsersAccessOnServer, accessUsers } = props;

  const handleCheckChanges = (evt) => {
    setUserAccess(evt.target.checked, user._id);
    const index = accessUsers.findIndex((item) => item.id === user._id);

    if (index >= 0) {
      accessUsers.splice(index, 1);
    } else {
      accessUsers.push({
        id: user._id,
        access: evt.target.checked,
      });
    }
    setUsersAccessOnServer(accessUsers);
  };

  return (
    <div className="container-user-row">
      <div className="user-row">
        <div className="user-row__user">
          <div className="user__avatar" />
          <div className="user__info">
            <p className="user__email">{user.email} </p>
            <p className="user__name">
              {user.surname} {user.name} {user.patronymic}
            </p>
          </div>
        </div>
        <div className="user-row__date">
          {new Date(user.date).toLocaleDateString()}
        </div>
        <div className="user-row__checkbox">
          <input
            type="checkbox"
            className="filter-by-developer__item user-row__checkbox-input"
            id={`user-admin ${user.email}`}
            name="user-admin"
            checked={user.access}
            onChange={handleCheckChanges}
          />
          <label
            className="filter-by-developer__checkbox-label user-row__checkbox-label"
            htmlFor={`user-admin ${user.email}`}
          />
        </div>
      </div>
      <span className="line-after-users-row" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessUsers: state.user.accessUsers,
});

export default connect(mapStateToProps, {
  setUserAccess,
  setUsersAccessOnServer,
})(UserRow);
