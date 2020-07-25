import React, {FunctionComponent} from 'react';
import If from './If';
import Pagination from '@material-ui/lab/Pagination';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFEEDF',
    display: 'flex',
    justifyContent: 'center',
  },

  resultCounter: {
    flex: 8,
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
  },

  selectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 1150
  },

  filterSelection: {
    flex: 1,
    minWidth: 120,
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
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: Function;
  selectOptions?: string[];
  selected?: string;
  onSelected?: Function;
}

function renderNoCardsMessage() {
  return (
    <div>Няма намерени записи</div>
  );
}

const CardContainer: FunctionComponent<CardContainerProps> = ({page, pageSize, totalItems,
    onPageChange, children, selectOptions, selected, onSelected}) => {
    
  const classes = useStyles();
  return (
    <div className={classes.root}>  
        <div>
          <div>
            <span className={classes.selectionContainer}>
              <span className={classes.resultCounter}>Намерени: <b>{totalItems}</b></span>
              <If condition={selectOptions !== undefined && selectOptions.length > 0}>
                <FormControl className={classes.filterSelection}>
                  <InputLabel>Тип кухня</InputLabel>
                  <Select
                    value={selected}
                    onChange={onSelected ? (event) => onSelected(event) : undefined}
                  >
                    {
                      selectOptions?.map((option) => {
                        return <MenuItem value={option}>{option}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </If>
            </span>
          </div>
          <If condition={totalItems > 0} els={() => renderNoCardsMessage()}>
            <div className={classes.cardsContainer}>
              {children}
            </div>
          </If>
          <div className={classes.paginationContainer}>
            <If condition={totalItems > pageSize}>
              <Pagination
                count={Math.round(totalItems / pageSize)}
                page={page}
                color="primary"
                onChange={(event, value) => onPageChange(event, value)}
              />
            </If>
          </div>
        </div>
    </div>
  );
}

export default CardContainer;
