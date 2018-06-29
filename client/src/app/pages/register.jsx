/*
 * Copyright (C) 2018 Raymond Lai <airwave209gt@gmail.com>
 *
 * It is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { Grid, AppBar, Toolbar, Typography, Button, Card, CardContent } from '@material-ui/core';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { TextField } from 'redux-form-material-ui';
import {required,emailCheck,emailLengthCheck,usernameLengthCheck,passwordMatchCheck,passwordLengthCheck} from "../components/validators";
import {connect} from "react-redux";
import { RegisterFormConstants, ActionTypeConstants, ActionConstants, ResultConstants } from "../constants";
import { usernameUsedCheck } from "../actions/register";
import styles from "../styles";

const mapStateToProps = (state) => {
    return {uiState: state.registration}
}

class Register extends React.Component
{
    doSubmit = (values) => this.props.dispatch({type:ActionConstants.ACTION_REGISTER,payload:values})

    handleClose = () => this.props.dispatch({type:ActionTypeConstants.REGISTRATION,action:ResultConstants.GO_LOGIN})

    renderRegistrationSuccessDialog = () => {
        return (this.props.uiState.state === RegisterFormConstants.REGISTRATION_SUCCESSFUL) ? (
        <Dialog fullScreen={false} open={true} onClose={this.handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Registration Successful"}</DialogTitle>
            <DialogContent>
                <DialogContentText>Registration Successful! <Link replace to="/login">Login</Link></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose}>OK</Button>
            </DialogActions>
        </Dialog>) : null
    }

    renderFormError = () => {
        return (this.props.uiState.state === RegisterFormConstants.HAS_ERROR) ? (
            <Grid item xs={12}>
                <div style={{color: "red"}}>{this.props.uiState.formError}</div>
            </Grid>
        ) : null;
    }

    render(){
        const { handleSubmit, submitting } = this.props
        if(this.props.uiState.state === RegisterFormConstants.GO_LOGIN){
            return (<Redirect to="/login" />)
        } else {
            return (
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title">Register</Typography>
                        </Toolbar>
                    </AppBar>
                    {this.renderRegistrationSuccessDialog()}
                    <div class="center-content">
                        <Card style={styles.card}>
                            <CardContent>
                                <Form onSubmit={handleSubmit(this.doSubmit)}>
                                    <Grid container spacing={24}>
                                        <Grid item xs={12}>
                                            <Field name="email" component={TextField} style={styles.field} label="Email" type="email" required={true} validate={[required,emailCheck,emailLengthCheck]} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="username" component={TextField} style={styles.field} label="Username" type="text" required={true} validate={[required,usernameLengthCheck]} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="password" component={TextField} style={styles.field} label="Password" type="password" required={true} validate={[required,passwordLengthCheck]} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="passwordAgain" component={TextField} style={styles.field} label="Password Again" type="password" required={true} validate={[required,passwordLengthCheck,passwordMatchCheck]} />
                                        </Grid>
                                        {this.renderFormError()}
                                        <Grid item xs={12}>
                                            <Button color="primary" variant="contained" type="submit" disabled={submitting}>Register</Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                                <p>Already an user? <Link to="/login">Login</Link></p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )
        }
    }
}

Register = connect(mapStateToProps)(Register)

export default reduxForm({
    form: 'RegistrationForm',
    asyncValidate: usernameUsedCheck,
    asyncBlurFields: ["email","username"]
})(Register);
