import React, { FunctionComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/styles';
import {Restaurant} from 'model/restaurant';


const useStyles = makeStyles({
  root: {
    width: 350,
    margin: 10,
    border: '2px solid #E1BFBF',
  },

  media: {
    height: 80,
    paddingTop: '65.25%',
    objectFit: 'contain'
  }
});

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: FunctionComponent<RestaurantCardProps> = ({restaurant}) => {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardHeader title={restaurant.name} />
      <CardMedia className={classes.media} image={restaurant.picturePath} title={restaurant.name} />
      <CardContent>
        <div>Адрес: {restaurant.address}</div>
        <div>Телефон: {restaurant.phone}</div>
      </CardContent>
    </Card>
  );
}

export default RestaurantCard;
