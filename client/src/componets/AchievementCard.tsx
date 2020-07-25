import React, {FunctionComponent} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/styles';
import {Achievement} from 'model/achievement';

const useStyles = makeStyles({
  root: {
    width: 350,
    height: 220,
    margin: 10,
    border: '2px solid #E1BFBF',
  },
});

interface AchievementsCardProps {
  achievement: Achievement;
}

const AchievementCard: FunctionComponent<AchievementsCardProps> = ({achievement}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={achievement.name} />
      <CardContent>
        <div>{achievement.description}</div>
      </CardContent>
    </Card>
  );
}

export default AchievementCard;
