import React, {Component} from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {environment} from 'environments/environment.json';
import {Restaurant, RestaurantReport} from 'model/restaurant';
import {withSnackbar, WithSnackbarProps} from 'notistack';
import If from './If';
import RestaurantCard from './RestaurantCard';
import Pagination from '@material-ui/lab/Pagination';

interface RestaurantsState {
  page: number;
  pageSize: number;
  search: string;
  restaurants: Restaurant[];
  totalItems: number;
}

const mocupPicturePath = 'https://media-cdn.tripadvisor.com/media/photo-s/13/5b/fb/06/ta-img-20180620-163753.jpg';

const styles = () => createStyles({
  root: {
    backgroundColor: '#FFEEDF',
  },

  restaurantContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },

  restaurant: {
    margin: 50,
  },

  paginationContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

class Restaurants extends Component<WithSnackbarProps&WithStyles, RestaurantsState> {

  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 12,
      search: '',
      restaurants: [],
      totalItems: 0
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.setPage(1); 
  }

  handlePageChange(event: any, value: number) {
    this.setPage(value);
  }

  setPage(page: number) {
    const {pageSize, search} = this.state;
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
    const {totalItems, pageSize, page, restaurants} = this.state;
    const {classes} = this.props;

    return (
      <div>
        <div className={classes.restaurantContainer}>
          {
            restaurants.map((restaurant) => {
              return <RestaurantCard restaurant={restaurant}></RestaurantCard>
            })
          }
        </div>
        <div className={classes.paginationContainer}>
          <If condition={totalItems > pageSize}>
            <Pagination
              count={totalItems / pageSize}
              page={page}
              color="primary"
              onChange={this.handlePageChange}
            />
          </If>
        </div>
      </div>
    );
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
