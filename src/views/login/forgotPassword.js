import React, { useState } from 'react';
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useAuth } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

function ForgotPassword() {

    const [values, setValues] = React.useState({
        username: null,
        falseUser: false,
        errorMessage: null,
        beforeReset: true
    });

    const { resetPassword } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        setValues({ ...values, falseUser: false });
        setValues({ ...values, errorMessage: null });

        try {

            setLoading(true)
            await resetPassword(values.username)
            setValues({ ...values, beforeReset: false });

        } catch (error) {
            setValues({ ...values, errorMessage: error.message });
            setValues({ ...values, falseUser: true });
        }

        if (values.errorMessage == "INVALID_EMAIL") {
            setValues({ ...values, falseUser: true });
        }
        setLoading(false)
    }


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });   /*this function handles values when user types in textfield*/

    };

    const backToLogin = () => {
        history.push("/login")
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
                                <h2 style={{ fontSize: '35px', fontWeight: '500', marginTop: 0, color: '#9c27b0' }}>Password Reset</h2>
                            </Grid>

                            {values.beforeReset ?
                                <TextField required
                                    id='username'
                                    label="Username"
                                    type='email'
                                    variant="outlined"                                              /*code for username field*/
                                    value={values.username}
                                    onChange={handleChange('username')}
                                    error={values.username === "" || values.falseUser}
                                    helperText={values.falseUser ? 'Incorrect Username' : null}
                                    style={{ margin: 10 }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><AccountCircle style={{ color: '#9c27b0' }} /></InputAdornment>,

                                    }}
                                />
                                : null}
                            {values.beforeReset ?
                                <Button type='submit' onClick={handleSubmit} color='primary' variant='contained' style={{ margin: 10, backgroundColor: '#9c27b0' }}>
                                    Reset Password                                                               {/* code for buttons  */}
                                </Button>
                                : null}
                            {values.beforeReset ? null : 
                            <SnackbarContent
                                message={
                                    "Check your inbox for further instructions"
                                }
                                close
                                color="primary"
                            />}
                            <Button style={{ margin: 10 }} onClick={backToLogin}>
                                Back To Login
                            </Button>

                        </div>
                    </form>
                    <div />
                </Grid>
            </Grid>
        </div>
    )
}

export default ForgotPassword;