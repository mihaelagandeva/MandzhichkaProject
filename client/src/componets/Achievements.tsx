import React, {Component} from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {environment} from '../environments/environment.json';
import {Achievement, AchievementReport} from 'model/achievement';
import {withSnackbar, WithSnackbarProps} from 'notistack';
import RestaurantCard from './RestaurantCard';
import CardContainer from './CardContainer';
import AchievementCard from './AchievementCard';

interface AchievementsState {
  page: number;
  pageSize: number;
  achievements: Achievement[];
  totalItems: number;
}

interface AchievementsProps {
  search: string;
  updated: boolean;
  setUpdated: Function;
}

class Shops extends Component<WithSnackbarProps&AchievementsProps, AchievementsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 12,
      achievements: [],
      totalItems: 0
    };

    this.handlePageChange = this.handlePageChange.bind(this);
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
    const {pageSize} = this.state;
    const {search} = this.props;
    const mandatoryUrl = `${environment.apiUrl}/api/achievements/${page}/${pageSize}`;
    const optionalUrl = search ? `/${search}` : '';
    const finalUrl = mandatoryUrl + optionalUrl;

    axios.get(finalUrl).then((result: AxiosResponse<AchievementReport>) => {
      const response = result.data;

      this.setState({
        page: response.page,
        pageSize: response.size,
        achievements: response.resultSet,
        totalItems: response.totalItems
      });
    }).catch((error: AxiosError<string>) => {
      const message = error.message;
    });
  }

  render() {
    const {page, pageSize, totalItems, achievements} = this.state;

    return (
      <CardContainer
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={this.handlePageChange}
      >
        {
          achievements.map((achievement, index) => {
            return <AchievementCard key={achievement.name + "-" + index} achievement={achievement} />
          })
        }
      </CardContainer>
    );
  }
}

export default withSnackbar(Shops);
