import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

export default class TopBar extends React.Component {

    render() {

        return (

            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <IconButton >
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

        )

    }

}