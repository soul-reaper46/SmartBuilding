import React, {useState} from "react";
// core components
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { useAuth, AuthProvider } from "../../contexts/authContext";
import { Link, useHistory } from "react-router-dom";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

export default function UpdateProfile() {

  const [values, setValues] = React.useState({
    username: null,
    password: null,
    cnfPassword: null,
    showPassword: false,
    showPassword1: false,
    falseUser: false,
    falsePass: false,
    falsePass1: false,
    errorMessage: null,
    showAlert: false
  });

  const { currentUser, updatePassword, updateEmail, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    setValues({ ...values, falseUser: false, falsePass: false, falsePass1: false });

    if (values.password != values.cnfPassword) {
      setValues({ ...values, falsePass1: true });
      return
    }

    try {
      setLoading(true)
      if (values.username !== currentUser.email) {
        await updateEmail(values.username)
        history.push('/admin/dashboard')
      }
      if (values.password) {
        await updatePassword(values.password)
        setAlert()
        //alert("Password Updated, Please Login with new Password")
        await logout()
        history.push('/login')
      }
    } catch (error) {
      //alert(error.message)
      if (error.message === "This operation is sensitive and requires recent authentication. Log in again before retrying this request.") {
        alert("CREDENTIAL TOO OLD, LOGIN AGAIN")
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

  const handleClickShowPassword1 = () => {
    setValues({ ...values, showPassword1: !values.showPassword1 }); /*this function changes the boolean value*/
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const cancel = () => {
    history.push("/admin/dashboard")
  };

  const setAlert = () => {
    setValues({ ...values, showAlert: true})
  };

  return (
    <div>
      <Grid container style={{ minHeight: '100vh' }}>
            <Grid
                    container item xs={12} sm={12} md={12}
                    alignItems='center'
                    direction='column'                                                      /*code for right grid*/
                    justify='space-between'
                    style={{ padding: 10 }}
                >
                    <form>
                        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300 }}>
                            <Grid container justify='center'>
                                <h2 style={{marginTop:0, color:'#9c27b0', fontWeight:'500'}}>Update Profile</h2>
                            </Grid>
                            <Grid container justify='center'>
                                <p style={{marginTop:0, paddingBottom:'30px'}}>For User: {currentUser.email} </p>
                            </Grid>
                            {!values.showAlert ? 
                            <TextField required
                                id='username'
                                label="Username"
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
                            /> : null }
                            {!values.showAlert ?
                            <TextField 
                                id='password'
                                label="Password"
                                variant="outlined" 
                                placeholder="Leave blank to keep same"                                                /*code for password field*/
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
                            /> : null }
                            {!values.showAlert ?
                            <TextField 
                                id='cnfPassword'
                                label="Confirm Password"
                                variant="outlined"
                                placeholder="Leave blank to keep same"                                                 /*code for password field*/
                                type={values.showPassword1 ? 'text' : 'password'}
                                value={values.cnfPassword}
                                onChange={handleChange('cnfPassword')}
                                error={values.cnfPassword === "" || values.falsePass1}
                                helperText={values.falsePass1 ? 'Password Mismatch' : null}
                                style={{ margin: 10 }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockRounded style={{ color: '#9c27b0' }} /></InputAdornment>,
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword1}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword1 ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            /> : null }
                            {!values.showAlert ?
                            <Button type='submit' onClick={handleSubmit} color='primary' variant='contained' style={{ margin: 10, backgroundColor:'#9c27b0' }}>
                                Update Profile                                                               {/* code for buttons  */}
                            </Button> : null }
                            {!values.showAlert ?
                            <Button style={{ margin: 10 }} onClick={cancel}>
                                Cancel
                            </Button>
                           : null }
                           {values.showAlert ?  
                            <SnackbarContent
                                message={
                                    "Password updated, Please login again."
                                }
                                color="primary"
                            />
                           : null }
                        </div>
                        </form>
                    <div />
                </Grid>
            </Grid>
    </div>
  );
}
