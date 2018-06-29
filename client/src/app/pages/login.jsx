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
import { Link, Redirect } from 'react-router-dom';
import { Field, Form, reduxForm } from 'redux-form';
import { Grid, AppBar, Toolbar, Typography, Button, Card, CardContent } from '@material-ui/core';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { TextField } from 'redux-form-material-ui';
import { connect } from "react-redux";
import { LoginFormConstants, ActionTypeConstants, ActionConstants } from "../constants";
import styles from "../styles";

const mapStateToProps = (state) => {
    return {uiState: state.login}
}

class Login extends React.Component
{
    login = (values) => this.props.dispatch({type:ActionConstants.ACTION_LOGIN, payload:values})

    handleClose = () => this.props.dispatch({type:ActionTypeConstants.LOGIN})

    renderLoginErrorDialog = () => {
        return(this.props.uiState.state === LoginFormConstants.HAS_ERROR) ? (
            <Dialog fullScreen={false} open={true} onClose={this.handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Authentication failed"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{this.props.uiState.authErrorMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        ) : null
    }

    render(){
        const { handleSubmit, submitting } = this.props
        return (this.props.uiState.state === LoginFormConstants.LOGIN_SUCCESSFUL) ? (
            <Redirect to="/" />
        ) : (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title">Welcome</Typography>
                    </Toolbar>
                </AppBar>
                {this.renderLoginErrorDialog()}
                <div class="center-content">
                    <Card style={styles.card}>
                        <CardContent>
                            <Form onSubmit={handleSubmit(this.login)}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12}>
                                        <Field label="email" style={styles.field} component={TextField} type="email" name="username" required={true} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field type="password" style={styles.field} component={TextField} label="Password" name="password" required={true} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button color="primary" variant="contained" type="submit" disabled={submitting}>Login</Button>
                                    </Grid>
                                </Grid>
                            </Form>
                            <p>Not an user? <Link to="/register">Register</Link></p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

Login = connect(mapStateToProps)(Login);

export default reduxForm({
    form: "LoginForm"
})(Login);
