import React, {Component} from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {environment} from '../environments/environment.json';
import {Shop, ShopReport} from 'model/shop';
import {withSnackbar, WithSnackbarProps} from 'notistack';
import RestaurantCard from './RestaurantCard';
import CardContainer from './CardContainer';

interface ShopsState {
  page: number;
  pageSize: number;
  search: string;
  shops: Shop[];
  totalItems: number;
}

class Shops extends Component<WithSnackbarProps, ShopsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 12,
      search: '',
      shops: [],
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
    const mandatoryUrl = `${environment.apiUrl}/api/shops/${page}/${pageSize}`;
    const optionalUrl = search ? `/${search}` : '';
    const finalUrl = mandatoryUrl + optionalUrl;

    axios.get(finalUrl).then((result: AxiosResponse<ShopReport>) => {
      const response = result.data;

      this.setState({
        page: response.page,
        pageSize: response.size,
        shops: response.resultSet,
        totalItems: response.totalItems
      });
    }).catch((error: AxiosError<string>) => {
      const message = error.message;
    });
  }

  render() {
    const {shops, page, pageSize, totalItems} = this.state;

    return (
      <CardContainer
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={this.handlePageChange}
      >
        {
          shops.map((shop) => {
            return <RestaurantCard restaurant={shop}></RestaurantCard>
          })
        }
      </CardContainer>
    );
  }
}

export default withSnackbar(Shops);
