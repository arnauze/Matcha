import React from 'react'
import Fab from '@material-ui/core/Fab'

export default class InterestTag extends React.Component {

    isChosen = () => {

        if (this.props.tags.length > 0 && this.props.tags.indexOf(this.props.tag) >= 0) {
            return true
        }

        return false

    }

    render() {

        return (
            <div style={{margin: 5}}>
                <Fab
                variant="extended"
                size="small"
                color={this.isChosen() ? "primary" : "default"}
                aria-label="add"
                onClick={() => this.props.onClick(this.props.tag)}
                style={{minWidth: 100}}
                >
                    {this.props.tag}
                </Fab>
            </div>
        )

    }

}