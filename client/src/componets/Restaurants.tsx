import React, {Component} from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {environment} from '../environments/environment.json';
import {Restaurant, RestaurantReport} from 'model/restaurant';
import {withSnackbar, WithSnackbarProps} from 'notistack';
import RestaurantCard from './RestaurantCard';
import CardContainer from './CardContainer';

interface RestaurantsState {
  page: number;
  pageSize: number;
  search: string;
  restaurants: Restaurant[];
  totalItems: number;
}

class Restaurants extends Component<WithSnackbarProps, RestaurantsState> {

  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 5,
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

  render() {
    const {restaurants, page, pageSize, totalItems} = this.state;

    return (
      <CardContainer
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={this.handlePageChange}
      >
        {
          restaurants.map((restaurant, index) => {
            return <RestaurantCard key={restaurant.name + index} restaurant={restaurant}></RestaurantCard>
          })
        }
      </CardContainer>
    );
  }
}

export default withSnackbar(Restaurants);
