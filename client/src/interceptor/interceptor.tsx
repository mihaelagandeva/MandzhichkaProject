import React from 'react';
import axios, {AxiosError} from 'axios';
import {useSnackbar, OptionsObject} from 'notistack';

const Interceptor = () => {
  const {enqueueSnackbar} = useSnackbar();
  const snackbarOptions: OptionsObject = {
    variant: 'error'
  }

  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.message === 'Network Error' && !error.response) {
      enqueueSnackbar('Греша в мрежата.', snackbarOptions);
    } else {
      if (error.response) {
        enqueueSnackbar(error.response.data, snackbarOptions);
      }
    }
  });

  return (
    <div> </div>
  )
}

export default Interceptor;
