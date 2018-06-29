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
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { ActionConstants } from "../constants";

const mapStateToProps = (state) => {
    return {
        uiState: {
            profile: state.home.profile
        }
    }
}

class Home extends React.Component {

    constructor(props){
        super(props)
        this.updateProfile()
    }

    logout = () => this.props.dispatch({type:ActionConstants.ACTION_LOGOUT})

    updateProfile = () => this.props.dispatch({type:ActionConstants.ACTION_GET_PROFILE})

    render(){
        let profile = this.props.uiState.profile
        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="title" style={{flex:1,color:"white"}}>Welcome Home {profile.username} ({profile.email})</Typography>
                        <form onSubmit={this.logout}><Button color="inherit" type="submit" onClick={this.logout}>Logout</Button></form>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Home);
