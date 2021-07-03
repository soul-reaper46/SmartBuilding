import React, { useState} from 'react';
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { useAuth } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';

function Login() {

    const [values, setValues] = React.useState({
        username: null,
        password: null,
        showPassword: false,
        falseUser: false,
        falsePass: false,
        errorMessage: null
    });

    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        setValues({ ...values, falseUser: false });
        setValues({ ...values, falsePass: false });
        setValues({ ...values, errorMessage: null });
        
        try {

            setLoading(true)
            await login(values.username, values.password)
            history.push('/admin/dashboard') 
            
        } catch (error) {
            //setValues({ ...values, errorMessage: error.message });
            if (error.message == 'EMAIL_NOT_FOUND'){
                setValues({ ...values, falseUser: true, falsePass: false });
            } 
            if (error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
                setValues({ ...values, falseUser: true, falsePass: false });
            } 
            if (error.message == 'The password is invalid or the user does not have a password.'){
                setValues({ ...values, falsePass: true, falseUser: false });
            } 
            if (error.message == 'INVALID_PASSWORD'){
                setValues({ ...values, falsePass: true, falseUser: false });
            }   
        }      
        setLoading(false)    
    }
    

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });   /*this function handles values when user types in textfield*/
        
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword }); /*this function changes the boolean value*/
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const forgotPass = () => {
        history.push("/forgotPass")
    };


    return (
        <div>
            <Grid container style={{ minHeight: '100vh' }}>
            <Hidden xsDown>
                <Grid item xs={12} sm={6} md={6} >
                    <img
                        src='https://i.imgur.com/kOX5znE.jpg?2'                         /*code for left image*/
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        alt='brand'
                    />
                </Grid>
            </Hidden>
                <Grid
                    container item xs={12} sm={6} md={6}
                    alignItems='center'
                    direction='column'                                                      /*code for right grid*/
                    justify='space-between'
                    style={{ padding: 10 }}
                >
                    <div />
                    <form>
                        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300 }}>
                            <Grid container justify='center'>
                                <img
                                    src='https://i.imgur.com/Aj5J83Y.png'                       /*code for logo*/
                                    width={150}
                                    alt='logo'
                                />
                            </Grid>
                            <Grid container justify='center'>
                                <h2 style={{fontWeight: '500',marginTop:0, color:'#9c27b0'}}>Log In</h2>
                            </Grid>
                            
                            <TextField required
                                id='username'
                                label="Email"
                                type='email'
                                variant="outlined"                                               /*code for username field*/
                                value={values.username}
                                onChange={handleChange('username')}
                                error={values.username === "" || values.falseUser}
                                helperText={values.falseUser ? 'Incorrect Username' : null}
                                style={{ margin: 10 }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><AccountCircle style={{ color: '#9c27b0' }} /></InputAdornment>,

                                }}
                            />
                            <TextField required
                                id='password'
                                label="Password"
                                variant="outlined"                                                 /*code for password field*/
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                error={values.password === "" || values.falsePass}
                                helperText={values.falsePass ? 'Incorrect Password' : null}
                                style={{ margin: 10 }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockRounded style={{ color: '#9c27b0' }} /></InputAdornment>,
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                            
                            <Button type='submit' onClick={handleSubmit} color='primary' variant='contained' style={{ margin: 10, backgroundColor:'#9c27b0' }}>
                                Log in                                                               {/* code for buttons  */}
                            </Button>
                            <Button style={{ margin: 10 }} onClick={forgotPass}>
                                Forgot password?
                            </Button>
                            
                        </div>
                        </form>
                    <div />
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;