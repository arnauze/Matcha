import React from 'react'
import { Button } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DeleteIcon from '@material-ui/icons/Delete'
import BrowsingFilters from './BrowsingFilters'
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

    render() {

        var user = this.props.user

        if (!user) {
         
            return (
                <div style={{width: '98vw', height: '98vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <h3>I'm sorry, there is currently no user matching your profile</h3>
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
            
        } else {

            return (
            
                <div style={{width: '98vw', height: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', flexDirection: 'column'}}>
                    <h2>We found {this.props.total} matches for you !</h2>
                    <b style={{fontWeight: 'normal', marginBottom: 5}}>{this.state.page} / {this.props.total}</b>
                    <div style={{width: '70vw', display: 'flex'}}>
                        <div style={{width: '10vw', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            <Button
                            onClick={this.goToPreviousPage}
                            style={{fontSize: '0.8vw', margin: 20}}
                            >
                                Previous
                            </Button>
                        </div>
                        <UserSummary user={user}/>
                        <div style={{width: '10vw', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            <Button
                            onClick={this.goToNextPage}
                            style={{fontSize: '0.8vw', margin: 20}}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                    <b style={{fontWeight: 'normal', marginTop: 5}}>{this.state.page} / {this.props.total}</b>
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

}

export default BrowsingComponent;