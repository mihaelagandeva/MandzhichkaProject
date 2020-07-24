import React, { FunctionComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import If from './If';
import {makeStyles} from '@material-ui/styles';
import {Event} from 'model/event';


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
  },

  joinButton: {
    marginTop: '10px',
    textAlign: 'center'
  }
});

const renderLeaveButton = (classes: any) => {
  return (
    <div className={classes.joinButton}>
      <Button
        color="secondary"
        variant="contained"
      >Напусни</Button>
    </div>
  );
}

interface JoinCardProps {
  item: Event;
}

const RestaurantCard: FunctionComponent<JoinCardProps> = ({item}) => {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardHeader title={item.name} />
      <CardMedia className={classes.media} image={item.picturePath} title={item.name} />
      <CardContent>
        <div>Адрес: {item.address}</div>
        <div>Дата: {item.date}</div>
        <If condition={true}>
          <If condition={item.joined} els={() => renderLeaveButton(classes)}>
            <div className={classes.joinButton}>
              <Button
                color="primary"
                variant="contained"
              >Присъедини се</Button>
            </div>
          </If>
        </If>
      </CardContent>
    </Card>
  );
}

export default RestaurantCard;