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
            }, () => this.props.changePage(this.state.page))
        } else {
            this.setState({
                ...this.state,
                page: this.state.page + 1
            }, () => this.props.changePage(this.state.page))
        }

    }

    goToPreviousPage = () => {

        if (this.state.page === 1) {
            this.setState({
                ...this.state,
                page: this.props.total
            }, () => this.props.changePage(this.state.page))
        } else {
            this.setState({
                ...this.state,
                page: this.state.page - 1
            }, () => this.props.changePage(this.state.page))
        }

    }

    onLikeClick = () => {

        this.props.onLikeClick(this.props.user)

    }

    onDeleteClick = () => {

        this.props.onDeleteClick(this.props.user)

    }

    outputMatches = () => {

        var user = this.props.user
        
        if (user) {
            
            return (
                <React.Fragment>
                    <h2>We found {this.props.total} matches for you !</h2>
                    <b style={{fontWeight: 'normal', marginBottom: 5}}>{this.state.page} / {this.props.total}</b>
                    <div style={{width: '70vw', display: 'flex'}}>
                        <div style={{width: '10vw', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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
                        user={user}
                        onLikeClick={this.onLikeClick}
                        onDeleteClick={this.onDeleteClick}
                        />
                        <div style={{width: '10vw', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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
            <div style={{width: '98vw', height: '98vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                {this.outputMatches()}
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
        )

    }

}

export default BrowsingComponent;