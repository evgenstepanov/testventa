import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { requireAuthorization } from '../../redux/actions';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import { useAuth } from '../../hooks/auth.hook';

// eslint-disable-next-line react/prop-types
const App = ({ requireAuthorization }) => {
  const { token, login, logout, userId } = useAuth();

  useEffect(() => {
    requireAuthorization({
      login,
      logout,
      userId,
      token,
    });
  }, [userId, token]);

  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return (
      <div className="App">
        <Login exact path="/" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Redirect to="/dashboard" />
      </Switch>
    </BrowserRouter>
  );
};

export default connect(null, { requireAuthorization })(App);
