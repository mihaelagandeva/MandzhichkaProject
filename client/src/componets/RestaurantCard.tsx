import React, { FunctionComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {makeStyles, createStyles} from '@material-ui/styles';
import {Restaurant} from 'model/restaurant';


const useStyles = makeStyles({
  root: {
    width: 350,
    margin: 10,
    border: '2px solid #E1BFBF',
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
      <CardMedia image={restaurant.picturePath} title={restaurant.name} />
      <CardContent>
        <p>Адрес: {restaurant.address}</p>
        <p>Телефон: {restaurant.phone}</p>
      </CardContent>
    </Card>
  );
}

export default RestaurantCard;
