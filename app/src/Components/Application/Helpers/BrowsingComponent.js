import React from 'react'
import { Button } from '@material-ui/core'
import BrowsingFilters from './BrowsingFilters'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import UserSummary from './UserSummary'

const ROW_HEIGHT = 30

class BrowsingComponent extends React.Component {

    state = {
        page: 1
    }

    goToNextPage = () => {

        if (this.state.page === this.props.total) {
            this.setState({
                ...this.state,
                page: 1
            }, () => this.props.change(this.state.page))
        } else {
            this.setState({
                ...this.state,
                page: this.state.page + 1
            }, () => this.props.change(this.state.page))
        }

    }

    goToPreviousPage = () => {

        if (this.state.page === 1) {
            this.setState({
                ...this.state,
                page: this.props.total
            }, () => this.props.change(this.state.page))
        } else {
            this.setState({
                ...this.state,
                page: this.state.page - 1
            }, () => this.props.change(this.state.page))
        }

    }

    onLikeClick = () => {

        this.props.onLikeClick(this.props.user)

    }

    onDeleteClick = () => {

        this.props.onDeleteClick(this.props.user)

    }

    reload = () => {

        this.setState({
            ...this.state,
            page: 1
        })

        this.props.reload()

    }

    outputMatches = () => {

        var user = this.props.user
        
        if (user) {
            
            return (
                <React.Fragment>
                    <center>
                        <div style={{alignItems:'center', justifyContent:'center', justifyItems:'center', alignContent:'center', paddingTop:250}}>
                        <h2> We found {this.props.total} matches for you !</h2>
                        </div>
                            <b style={{fontWeight: 'normal', marginBottom: 5, alignSelf:'center'}}>{this.state.page} / {this.props.total}</b>
                        <div style={{display: 'flex'}}>
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Button
                                onClick={this.goToPreviousPage}
                                style={{fontSize: '0.8vw', margin: 20}}
                                >
                                    <ArrowBackIcon
                                    style={{fontSize: '5vh'}}
                                    />
                                </Button>
                            </div>
                            <UserSummary
                            reload={this.reload}
                            user={user}
                            onLikeClick={this.onLikeClick}
                            onDeleteClick={this.onDeleteClick}
                            addNotification={this.props.addNotification}
                            changePage={this.props.changePage}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Button
                                onClick={this.goToNextPage}
                                style={{fontSize: '0.8vw', margin: 20}}
                                >
                                    <ArrowForwardIcon
                                    style={{fontSize: '5vh'}}
                                    />
                                </Button>
                            </div>
                        </div>
                        <b style={{fontWeight: 'normal', marginTop: 5}}>{this.state.page} / {this.props.total}</b>
                    </center>
                    
                </React.Fragment>

            )

        } else {

            return (

                <h3>I'm sorry, there is currently no user matching your profile</h3>

            )

        }

    }

    render() {
         
        return (
            <div style={{width: '98vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position:'relative'}}>
                <center><div>
                {this.outputMatches()}
                </div>
                </center>
                <div style={{display: 'flex'}}>
                <BrowsingFilters
                orderBy={this.props.orderBy}
                order={this.props.order}
                onMinimumCommonTagsChange={this.props.onMinimumCommonTagsChange}
                onMaximumDistanceChange={this.props.onMaximumDistanceChange}
                onMinimumAgeChange={this.props.onMinimumAgeChange}
                onMinimumFameRatingChange={this.props.onMinimumFameRatingChange}
                minCommonTags={this.props.minCommonTags}
                maxDistance={this.props.maxDistance}
                minAge={this.props.minAge}
                minFameRating={this.props.minFameRating}
                onFilterClick={this.props.onFilterClick}
                onResetClick={this.props.onResetClick}
                rowHeight={ROW_HEIGHT}
                />
                </div>
            </div>
        )

    }

}

export default BrowsingComponent;