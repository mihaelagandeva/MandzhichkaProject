import React from 'react';
import { PrivateRoute } from  './helper/privateRoute'
import Login from './componets/Login';
import Register from './componets/Register';
import Interceptor from './interceptor/interceptor';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import NavigationBar from './componets/NavigationBar';
import SingleRecipe from './componets/SingleRecipe';
import CreateRecipe from './componets/CreateRecipe'
import DisplayUserRecipes from './componets/DisplayUserRecipes'
import UserProfile from './componets/UserProfile'
import ShoppingList from './componets/ShoppingList'


//delete later pls 
const hardcodedRecipe = {
  id: 1, title: 'Musakichka', author: 'Musakichka Master', date: '06/12/2020', prepTime: 60, picturePath: 'https://amiraspantry.com/wp-content/uploads/2019/11/moussaka-I.jpg', rating: 4, tags: [{ id: 1, value: 'musaka' }, { id: 2, value: 'good' }], summary: 'A very simple recipe to make delicious musaka',
  products: [{ name: "potatoes", quantity: 500, metric: "grams" }, { name: "minced meat", quantity: 500, metric: "grams" }],
  steps: ['Wash potatoes', 'Peel and cut potatoes, put them to boil in hot water till they are almost ready', 'Put minced meat in a pan and fry it alongside some onion', 'Mix everything and put in oven'],
  comments: [{ text: "very good recipe", date: "6/3/2020", author: "someUser" }, { text: "very wonderful recipe", date: "6/3/2020", author: "someUser" }]
}


function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Route path="/" exact component={() => <NavigationBar tabNumber={0} />} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/restaurants" exact component={() => <NavigationBar tabNumber={1} />} />
        <Route path="/shops" component={() => <NavigationBar tabNumber={2} />} />
        <Route path="/events" component={() => <NavigationBar tabNumber={3} />} />
        <Route path="/recipe/:id" exact component={() => <SingleRecipe/>} />
        <Route path="/recipes/my/add" exact component={CreateRecipe} />
        <Route path="/recipes/favorites" exact component={() => <DisplayUserRecipes load="recipes/favorites" />} />
        <Route path="/recipes/my" exact component={() => <DisplayUserRecipes load="recipes/myRecipes" />} />
        <PrivateRoute path="/profile" exact component={UserProfile} />
        <Route path="/shopping-list" exact component ={ShoppingList} />
      </Router>
      <Interceptor />
    </SnackbarProvider>
  );
}

export default App;
