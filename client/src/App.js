import React from 'react';
import Login from './componets/Login';
import Register from './componets/Register';
import Interceptor from './interceptor/interceptor';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import NavigationBar from './componets/NavigationBar';
import SingleRecipe from './componets/SingleRecipe';

//delete later pls 
const hardcodedRecipe = {
  id: 1, title: 'Musakichka', author: 'Musakichka Master', date: '06/12/2020', picturePath: 'https://amiraspantry.com/wp-content/uploads/2019/11/moussaka-I.jpg', rating: 4, tags: [{ id: 1, value: 'musaka' }, { id: 2, value: 'good' }], summary: 'A very simple recipe to make delicious musaka', products: ['500g potatoes', '500g minced meat'],
  steps: ['Wash potatoes', 'Peel and cut potatoes, put them to boil in hot water till they are almost ready', 'Put minced meat in a pan and fry it alongside some onion', 'Mix everything and put in oven']
}


function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/main/recipes" exact component={() => <NavigationBar tabNumber={0} />} />
        <Route path="/main/restaurants" exact component={() => <NavigationBar tabNumber={1} />} />
        <Route path="/singleRecipe" exact component={() => <SingleRecipe recipe={hardcodedRecipe} />} />
      </Router>
      <Interceptor />
    </SnackbarProvider>
  );
}

export default App;
