/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { hideMenu, toggleUserInfo, toogleUsersList } from '../../redux/actions';

// eslint-disable-next-line react/prop-types
function Menu({
  logout,
  hideMenu,
  toogleUsersList,
  menuIsHidden,
  toggleUserInfo,
  admin,
}) {
  const logoutHandler = () => {
    logout();
  };

  return (
    <div
      className={`container-menu${
        !menuIsHidden ? '' : ' menu-settings-rolled'
      }`}
    >
      <div className="menu">
        <div className="menu__avatar" />
        <input
          type="button"
          className="button menu__button"
          onClick={() => hideMenu()}
        />
      </div>
      <div className="menu__roll-settings">
        <input
          type="button"
          className="menu-block menu__settings menu__item_transition"
          onClick={() => toggleUserInfo()}
        />
        <input
          type="button"
          className="menu-block menu__users menu__item_transition"
          disabled={!admin}
          onClick={() => toogleUsersList()}
        />
        <input
          type="button"
          className="menu-block menu__logout menu__item_transition"
          onClick={logoutHandler}
        />
        <input
          type="button"
          className="menu-close"
          onClick={() => hideMenu()}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  logout: state.user.logout,
  menuIsHidden: state.menuIsHidden,
  admin: state.user.admin,
});

export default connect(mapStateToProps, {
  hideMenu,
  toggleUserInfo,
  toogleUsersList,
})(Menu);
