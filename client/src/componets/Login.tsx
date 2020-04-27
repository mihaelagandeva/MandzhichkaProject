import React from "react";
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LoginFormValues } from '../model/form';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    width: '40%',
    height: '50%',
    left: '30%',
    top: '25%'
  },

  formContainer: {
    height: '100%',
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'column'
  },

  title: {
    flex: 1,
    textAlign: 'center',
  },

  inputField: {
    flex: 1,
    minWidth: 300,
    alignSelf: 'center'
  },

  loginButton: {
    maxWidth: 200,
    alignSelf: 'center',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px'
  },

});

const validate = (values: LoginFormValues): LoginFormValues => {
  const errors: LoginFormValues = {};

  if (!values.username) {
    errors.username = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  // only by returning an empty object here you can submit the form
  return errors;
}

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <h1 className={styles.title}>Вход</h1>
        <TextField
          className={styles.inputField}
          id="username"
          name="Потребителско име"
          label="Потребителско име"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors.username && formik.touched.username}
          helperText={formik.touched.username ? formik.errors.username : ''}
        />
        <TextField
          className={styles.inputField}
          id="password"
          name="Парола"
          label="Парола"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors.password && formik.touched.password}
          helperText={formik.touched.password ? formik.errors.password : ''}
        />
        <Button
          className={styles.loginButton}
          color="primary"
          variant="outlined"
          type="submit"
          disabled={!!formik.errors.username || !!formik.errors.password}
        >Вход</Button>
        <div className={styles.footer}>
          <Link href="/register" variant="body2" align="center">
            Нямате профил? Регистрирайте се!
              </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
