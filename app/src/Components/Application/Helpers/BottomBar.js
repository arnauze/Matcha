import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

export default class BottomBar extends React.Component {

    render() {

        return (

            <AppBar position="fixed" color="primary" style={{bottom: 0, position: 'absolute', top: 'auto'}}>
                <Toolbar>
                    <IconButton >
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

        )

    }

}