import React from 'react';
import Login from './componets/Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Route path="/" exact component={Login} />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
