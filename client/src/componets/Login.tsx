import React from "react";
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {LoginFormValues} from '../model/form';

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
    }
});

const validate = (values: LoginFormValues): LoginFormValues => {
    const errors: LoginFormValues = {};
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!values.email) {
        errors.email = 'Required';
    } else if (!emailPattern.test(values.email)) {
        errors.email = 'Invalid email format'
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
            email: '',
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
                <h1 className={styles.title}>Login</h1>
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
                    id="password"
                    name="password"
                    label="Password"
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
                    disabled={!!formik.errors.email || !!formik.errors.password}
                >Login</Button>
            </form>
        </div>
    );
}

export default Login;
