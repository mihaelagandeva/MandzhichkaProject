import React, { useContext } from "react"
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { RegisterFormValues } from '../model/register';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  button: {
    maxWidth: 200,
    alignSelf: 'center',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px'
  },

})

const validate = (values: RegisterFormValues): RegisterFormValues => {
  const errors: RegisterFormValues = {};
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!values.email) {
    errors.email = 'Email required!';
  }
  else if (!emailPattern.test(values.email)) {
    errors.email = 'Invalid email format!'
  }

  if (!values.username) {
    errors.username = 'Username required!';
  }
  else if (values.username.length < 5) {
    errors.username = 'Username is too short!'
  }
  if (!values.password) {
    errors.password = 'Password required!';
  }
  else if (values.password.length < 5) {
    errors.password = 'Password should be at least 5 symbols!'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm password required';
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  return errors;
}

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 3));
    }
  })

  const styles = useStyles();


  return (
    <div className={styles.root}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <h1 className={styles.title}>Register</h1>
        <TextField
          className={styles.inputField}
          id="email"
          name="email"
          label="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors.email && formik.touched.email}
          helperText={formik.touched.email ? formik.errors.email : ''}
        />
        <TextField
          className={styles.inputField}
          id="username"
          name="username"
          label="Username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors.username && formik.touched.username}
          helperText={formik.touched.username ? formik.errors.username : ''}
        />
        <TextField
          className={styles.inputField}
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors.password && formik.touched.password}
          helperText={formik.touched.password ? formik.errors.password : ''}
        />
        <TextField
          className={styles.inputField}
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
          helperText={formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
        />
        <Button
          className={styles.button}
          color="primary"
          variant="outlined"
          type="submit"
          disabled={!!formik.errors.email || !!formik.errors.password || !!formik.errors.confirmPassword || !!formik.errors.username}
        >
          Register
        </Button>
        <div className={styles.footer}>
          <Link href="/" variant="body2" align="center">
            Already have an account? Sign Ip
              </Link>
        </div>

      </form>
    </div>
  )
}

export default Register;