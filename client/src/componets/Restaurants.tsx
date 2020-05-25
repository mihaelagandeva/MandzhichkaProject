import React, {Component} from 'react';
import { withStyles, StyleRules, WithStyles, createStyles } from '@material-ui/core';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {environment} from 'environments/environment.json';
import {Restaurant, RestaurantReport} from 'model/restaurant';
import {withSnackbar, WithSnackbarProps} from 'notistack';
import If from './If';

interface RestaurantsState {
  page: number;
  pageSize: number;
  search: string;
  restaurants: Restaurant[];
  totalItems: number;
}

const styles = () => createStyles({
  root: {
    backgroundColor: '#FFEEDF',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyItems: 'center'
  },

  restaurant: {
    margin: 50,
  }
});

class Restaurants extends Component<WithSnackbarProps&WithStyles, RestaurantsState> {

  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 15,
      search: '',
      restaurants: [],
      totalItems: 0
    };
  }

  componentDidMount() {
    const {page, pageSize, search} = this.state;
    const mandatoryUrl = `${environment.apiUrl}/api/restaurants/${page}/${pageSize}`;
    const optionalUrl = search ? `/${search}` : '';
    const finalUrl = mandatoryUrl + optionalUrl;

    axios.get(finalUrl).then((result: AxiosResponse<RestaurantReport>) => {
      const response = result.data;

      this.setState({
        page: response.page,
        pageSize: response.size,
        restaurants: response.resultSet,
        totalItems: response.totalItems
      });
    }).catch((error: AxiosError<string>) => {
      const message = error.message;
    });
  }

  renderRestaurants() {
    return this.state.restaurants.map((restaurant) => {
      return <div>{restaurant.name}</div>
    });
  }

  renderNoRestaurantsMessage() {
    return (
      <div>Няма намерени ресторанти</div>
    );
  }

  render() {
    const {classes} = this.props;
    const {restaurants} = this.state;

    return (
      <div className={classes.root}>
        <If condition={restaurants.length > 0} els={this.renderNoRestaurantsMessage}>
          {this.renderRestaurants()}
        </If>
      </div>
    );
  }
}

export default withStyles(styles)(withSnackbar(Restaurants));
