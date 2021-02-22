import React, { useState } from 'react';
import { Registration } from '../Registration/Registration';
import Authorization from '../Authorization/Authorization';
import { OpenWindows } from '../../constants';
import { setClassNameOnLogin } from '../../utlis';

const Login = () => {
  const [openWindow, setOpenWindow] = useState(OpenWindows.AUTH);
  return (
    <div className="login">
      <div className="logo" />
      <h2 className="login__title">Команда разработки</h2>
      <div className={`login-window ${setClassNameOnLogin(openWindow)}`}>
        <div className="place-for-form">
          <Authorization
            openWindow={openWindow}
            setOpenWindow={setOpenWindow}
          />
          <Registration openWindow={openWindow} setOpenWindow={setOpenWindow} />
        </div>
      </div>
    </div>
  );
};

export default Login;
