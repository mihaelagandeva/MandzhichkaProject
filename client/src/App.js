import React from 'react';
import Login from './componets/Login';
import Register from './componets/Register'
import MainPage from './componets/MainPage'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/main" exact component={MainPage} />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
