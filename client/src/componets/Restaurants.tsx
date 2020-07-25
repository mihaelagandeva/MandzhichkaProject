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
  restaurants: Restaurant[];
  totalItems: number;
  selectedFilter: string;
}

interface RestaurantProps {
  search: string;
  updated: boolean;
  setUpdated: Function;
}

class Restaurants extends Component<WithSnackbarProps&RestaurantProps, RestaurantsState> {

  constructor(props: WithSnackbarProps&RestaurantProps) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 12,
      restaurants: [],
      totalItems: 0,
      selectedFilter: ''
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentDidMount() {
    this.setPage(1);
  }

  componentDidUpdate() {
    if (this.props.updated) {
      this.setPage(1);
      this.props.setUpdated(false);
    }
  }

  handlePageChange(event: any, value: number) {
    this.setPage(value);
  }

  setPage(page: number) {
    const {pageSize, selectedFilter} = this.state;
    const {search} = this.props;

    const mandatoryUrl = `${environment.apiUrl}/api/restaurants/${page}/${pageSize}`;
    const searchParam = search ? `/${search}` : '/ ';
    const filterParam = selectedFilter ? `/${selectedFilter}` : '';
    const finalUrl = mandatoryUrl + searchParam + filterParam;

    axios.get(finalUrl, {headers: {'content-type': 'application/json'}}).then((result: AxiosResponse<RestaurantReport>) => {
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

  onFilterChange(event: any) {
    this.setState({
      selectedFilter: event.target.value
    }, () => this.setPage(1));
  }

  render() {
    const {restaurants, page, pageSize, totalItems, selectedFilter} = this.state;
    const filterOptions = ['Китайски', 'Мексикански', 'Арабски', 'Италиански', 'Друг'];

    return (
      <CardContainer
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={this.handlePageChange}
        selected={selectedFilter}
        selectOptions={filterOptions}
        onSelected={this.onFilterChange}
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
