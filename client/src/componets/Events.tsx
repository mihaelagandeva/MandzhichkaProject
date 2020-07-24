import React, {Component} from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {environment} from 'environments/environment.json';
import {Event, EventReport} from 'model/event';
import {withSnackbar, WithSnackbarProps} from 'notistack';
import CardContainer from './CardContainer';
import JoinCard from './JoinCard';

interface EventsState {
  page: number;
  pageSize: number;
  events: Event[];
  totalItems: number;
}

interface EventsProps {
  search: string;
  updated: boolean;
  setUpdated: Function;
}

class Events extends Component<WithSnackbarProps&EventsProps, EventsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 12,
      events: [],
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
    const mandatoryUrl = `${environment.apiUrl}/api/events/${page}/${pageSize}`;
    const optionalUrl = search ? `/${search}` : '';
    const finalUrl = mandatoryUrl + optionalUrl;

    axios.get(finalUrl, {withCredentials: true}).then((result: AxiosResponse<EventReport>) => {
      const response = result.data;
      const formattedDateResultSet = response.resultSet.map((event) => {
        return {...event, date: event.date.split('T')[0]}
      });

      this.setState({
        page: response.page,
        pageSize: response.size,
        events: formattedDateResultSet,
        totalItems: response.totalItems
      });
    }).catch((error: AxiosError<string>) => {
      const message = error.message;
    });
  }

  render() {
    const {events, page, pageSize, totalItems} = this.state;

    return (
      <CardContainer
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={this.handlePageChange}
      >
        {
          events.map((event, index) => {
            return <JoinCard key={event.name + index} item={event}></JoinCard>
          })
        }
      </CardContainer>
    );
  }
}

export default withSnackbar(Events);

