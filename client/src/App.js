import React from 'react';
import Login from './componets/Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
    </Router>
  );
}

export default App;
