import React, {Component} from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {environment} from 'environments/environment.json';
import {Event, EventReport} from 'model/event';
import {withSnackbar, WithSnackbarProps} from 'notistack';
import CardContainer from './CardContainer';
import JoinCard from './JoinCard';

interface CoursesState {
  page: number;
  pageSize: number;
  events: Event[];
  totalItems: number;
}

interface CoursesProps {
  search: string;
  updated: boolean;
  setUpdated: Function;
}

class Courses extends Component<WithSnackbarProps&CoursesProps, CoursesState> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 12,
      events: [],
      totalItems: 0
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCourseJoin = this.handleCourseJoin.bind(this);
    this.handleCourseLeave = this.handleCourseLeave.bind(this);
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
    const mandatoryUrl = `${environment.apiUrl}/api/courses/${page}/${pageSize}`;
    const optionalUrl = search ? `/${search}` : '';
    const finalUrl = mandatoryUrl + optionalUrl;

    axios.get(finalUrl, {withCredentials: true, headers: {'content-type': 'application/json'}}).then((result: AxiosResponse<EventReport>) => {
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

  handleCourseJoin(courseId: string) {
    const url = `${environment.apiUrl}/api/courses/${courseId}`;

    axios.put(url, {}, {withCredentials: true}).then((result) => {
      this.setPage(1);
    }).catch((error) => {
      console.log(error);
    });
  }

  handleCourseLeave(courseId: string) {
    const url = `${environment.apiUrl}/api/courses/leave/${courseId}`;

    axios.put(url, {}, {withCredentials: true}).then((result) => {
      this.setPage(1);
    }).catch((error) => {
      console.log(error);
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
            return (
              <JoinCard
                key={event.name + index}
                item={event}
                onJoin={this.handleCourseJoin}
                onCancel={this.handleCourseLeave}
              ></JoinCard>
            );
          })
        }
      </CardContainer>
    );
  }
}

export default withSnackbar(Courses);

