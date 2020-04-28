import React from "react"
import { makeStyles } from '@material-ui/core/styles';
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

  if (!values.username) {
    errors.username = 'Полето е задължително!';
  }
  else if (values.username.length < 5) {
    errors.username = 'Потребителското име е твърде кратко!'
  }
  if (!values.password) {
    errors.password = 'Полето е задължително!';
  }
  else if (values.password.length < 5) {
    errors.password = 'Паролата трябва да е поне 5 символа!'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Полето е задължително!';
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Паролите не съвпадат'
  }
  return errors;
}

const Register = () => {
  const formik = useFormik({
    initialValues: {
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
        <h1 className={styles.title}>Регистрация</h1>
        <TextField
          className={styles.inputField}
          id="username"
          name="username"
          label="Потребителско име"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors.username && formik.touched.username}
          helperText={formik.touched.username ? formik.errors.username : ''}
        />
        <TextField
          className={styles.inputField}
          id="password"
          name="password"
          label="Парола"
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
          label="Потвърждение на паролата"
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
          disabled={!!formik.errors.password || !!formik.errors.confirmPassword || !!formik.errors.username}
        >
          Регистрация
        </Button>
        <div className={styles.footer}>
          <Link href="/" variant="body2" align="center">
            Вече имате профил? Влезте с него!
              </Link>
        </div>

      </form>
    </div>
  )
}

export default Register;