import React from 'react';
import Login from './componets/Login';
import Register from './componets/Register'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import NavigationBar from './componets/NavigationBar';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/main/recipes" exact component={() => <NavigationBar tabNumber={0} />} />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
