import React, {FunctionComponent} from 'react';
import If from './If';
import Pagination from '@material-ui/lab/Pagination';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFEEDF',
    display: 'flex',
    justifyContent: 'center',
  },

  cardsContainer: {
    width: '1150px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'left',
  },

  card: {
    margin: 50,
  },

  paginationContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

interface CardContainerProps {
  page: number,
  pageSize: number,
  totalItems: number,
  onPageChange: Function
}

function renderNoCardsMessage() {
  return (
    <div>Няма намерени записи</div>
  );
}

const CardContainer: FunctionComponent<CardContainerProps> = ({page, pageSize, totalItems,
    onPageChange, children}) => {
    
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <If condition={totalItems > 0} els={() => renderNoCardsMessage()}>
        <div>
          <div className={classes.cardsContainer}>
            {children}
          </div>
          <div className={classes.paginationContainer}>
            <If condition={totalItems > pageSize}>
              <Pagination
                count={totalItems / pageSize}
                page={page}
                color="primary"
                onChange={(event, value) => onPageChange(event, value)}
              />
            </If>
          </div>
        </div>
      </If>
    </div>
  );
}

export default CardContainer;
