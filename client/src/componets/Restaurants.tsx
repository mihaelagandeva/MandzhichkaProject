import React, {Component} from 'react'
import { makeStyles } from '@material-ui/core'

class Restaurants extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 15,
      search: '',
      restaurants: []
    }
  }

  componentDidMount() {
    // make a request
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default Restaurants;
