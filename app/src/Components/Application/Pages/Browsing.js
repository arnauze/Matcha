import React from 'react'
import { connect } from 'react-redux'
import { API } from 'aws-amplify'
import BrowsingComponent from '../Helpers/BrowsingComponent'

class Browsing extends React.Component {

    state = {
        loading: true,
        orderBy: 'common_tags'
    }

    componentDidMount() {

        this.getMatches()

    }

    changePage = page => {

        this.setState({
            ...this.state,
            page: page
        })

    }

    getMatches = () => {

        let apiName = 'Matcha'
        let path = '/browsing/user/' + this.props.user.info.username
        let myInit = {}

        API.get(apiName, path, myInit)
        .then(data => {

            console.log("Successfully fetched the matches")
            console.log(data)

            this.setState({
                ...this.state,
                loading: false,
                matches: data,
                page: 1,
                total: data.length,
                sourceData: [...data],
                filters: {
                    activated: false,
                    commonTags: -1,
                    distance: -1,
                    age: -1,
                    fameRating: -1,
                    matches: []
                }
            })


        })
        .catch(error => {
            
            console.log("Error fetching the matches")
            console.log(error)

        })

    }

    getCommonTags = (item) => {

        var i = 0
        var index = 0

        while (index < this.props.user.info.interests.length) {

            if (item.interests.indexOf(this.props.user.info.interests[index]) >= 0){
                i++;
            }
            index++

        }

        return i

    }

    _filterCommonTags = (item) => {

        var a = this.getCommonTags(item)
        var b = this.state.filters.commonTags

        return a >= b
    }

    _filterMinAge = (item) => {

        var a = item.age
        var b = this.state.filters.age

        return a >= b

    }

    _filterMinDistance = (item) => {

        var a = item.distance
        var b = this.state.filters.distance

        return a >= b

    }

    _filterFameRating = (item) => {

        var a = item.fame_rating
        var b = this.state.filters.fameRating

        return a >= b

    }

    getFilteredMatches = () => {

        this.setState({
            ...this.state,
            loading: true
        })

        var newMatches = [...this.state.sourceData]

        if (this.state.filters.commonTags >= 0) {
            newMatches = newMatches.filter(this._filterCommonTags)
        }
        if (this.state.filters.age >= 0) {
            newMatches = newMatches.filter(this._filterMinAge)
        }
        if (this.state.filters.distance >= 0) {
            newMatches = newMatches.filter(this._filterMinDistance)
        }
        if (this.state.filters.fameRating >= 0) {
            newMatches = newMatches.filter(this._filterFameRating)
        }

        this.setState({
            ...this.state,
            loading: false,
            filters: {
                ...this.state.filters,
                activated: true,
                matches: newMatches
            }
        })


    }

    orderBy = text => {

        var newMatches = this.state.filters.activated ? this.state.filters.matches : [...this.state.matches]

        this.setState({
            ...this.state,
            loading: true
        })
        
        if (text === 'age_difference') {

            newMatches.sort((a, b) => {
                return a.age - b.age
            })

        } else if (text === 'common_tags') {

            newMatches.sort((a, b) => {
                return this.getCommonTags(b) - this.getCommonTags(a)
            })

        } else if (text === 'fame_rating') {

            newMatches.sort((a, b) => {
                return b.fame_rating - a.fame_rating
            })

        }

        if (this.state.filters.activated) {

            this.setState({
                ...this.state,
                orderBy: text,
                filters: {
                    ...this.state.filters,
                    matches: newMatches
                }
            })

        } else {

            this.setState({
                ...this.state,
                orderBy: text,
                matches: newMatches
            })

        }

    }

    foundMatches = () => {

        if (this.state.filters.activated && this.state.filters.matches.length > 0) {
            return true
        }
        if (!this.state.filters.activated && this.state.matches.length > 0) {
            return true
        }
        return false

    }

    onMinimumCommonTagsChange = (e) => {

        this.setState({
            ...this.state,
            filters: {
                ...this.state.filters,
                commonTags: parseInt(e.target.value)
            }
        })

    }

    onMaximumDistanceChange = (e) => {

        this.setState({
            ...this.state,
            filters: {
                ...this.state.filters,
                distance: parseInt(e.target.value)
            }
        })

    }

    onMinimumAgeChange = (e) => {

        this.setState({
            ...this.state,
            filters: {
                ...this.state.filters,
                age: parseInt(e.target.value)
            }
        })

    }

    onMinimumFameRatingChange = (e) => {

        this.setState({
            ...this.state,
            filters: {
                ...this.state.filters,
                fameRating: parseInt(e.target.value)
            }
        })

    }

    onResetClick = () => {

        this.setState({
            ...this.state,
            filters: {
                activated: false,
                commonTags: -1,
                distance: -1,
                age: -1,
                fameRating: -1,
                matches: []
            }
        })

    }

    onDeleteClick = (user) => {

        this.setState({
            ...this.state,
            matches: this.state.matches.filter(item => item.username !== user.username)
        })

    }

    render() {

        console.log(this.state)

        if (this.state.loading) {

            return (
                <div style={{width: '98vw', height: '98vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <p>
                        Loading...
                    </p>
                </div>
            )

        } else {

            if (this.foundMatches()) {

                var user = this.state.filters.activated ? this.state.filters.matches[this.state.page - 1] : this.state.matches[this.state.page - 1]

                if (!this.state.filters.activated) {

                    return (
                    
                        <BrowsingComponent
                        reload={this.getMatches}
                        user={user}
                        orderBy={this.state.orderBy}
                        order={this.orderBy}
                        total={this.state.matches.length}
                        onMinimumCommonTagsChange={this.onMinimumCommonTagsChange}
                        onMaximumDistanceChange={this.onMaximumDistanceChange}
                        onMinimumAgeChange={this.onMinimumAgeChange}
                        onMinimumFameRatingChange={this.onMinimumFameRatingChange}
                        minCommonTags={this.state.filters.commonTags}
                        maxDistance={this.state.filters.distance}
                        minAge={this.state.filters.age}
                        minFameRating={this.state.filters.fameRating}
                        onFilterClick={this.getFilteredMatches}
                        onResetClick={this.onResetClick}
                        onDeleteClick={this.onDeleteClick}
                        onLikeClick={this.onLikeClick}
                        addNotification={this.props.addNotification}
                        changePage={this.props.changePage}
                        change={this.changePage}
                        />

                    )

                } else {
                    return (
                        <BrowsingComponent
                        reload={this.getMatches}
                        user={user}
                        orderBy={this.state.orderBy}
                        order={this.orderBy}
                        total={this.state.filters.matches.length}
                        onMinimumCommonTagsChange={this.onMinimumCommonTagsChange}
                        onMaximumDistanceChange={this.onMaximumDistanceChange}
                        onMinimumAgeChange={this.onMinimumAgeChange}
                        onMinimumFameRatingChange={this.onMinimumFameRatingChange}
                        minCommonTags={this.state.filters.commonTags}
                        maxDistance={this.state.filters.distance}
                        minAge={this.state.filters.age}
                        minFameRating={this.state.filters.fameRating}
                        onFilterClick={this.getFilteredMatches}
                        onResetClick={this.onResetClick}
                        onDeleteClick={this.onDeleteClick}
                        onLikeClick={this.onLikeClick}
                        addNotification={this.props.addNotification}
                        changePage={this.props.changePage}
                        change={this.changePage}
                        />
                    )
                }

            } else {

                return (
                    <BrowsingComponent
                    reload={this.getMatches}
                    user={null}
                    orderBy={this.state.orderBy}
                    order={this.orderBy}
                    total={this.state.matches.length}
                    onMinimumCommonTagsChange={this.onMinimumCommonTagsChange}
                    onMaximumDistanceChange={this.onMaximumDistanceChange}
                    onMinimumAgeChange={this.onMinimumAgeChange}
                    onMinimumFameRatingChange={this.onMinimumFameRatingChange}
                    minCommonTags={this.state.filters.commonTags}
                    maxDistance={this.state.filters.distance}
                    minAge={this.state.filters.age}
                    minFameRating={this.state.filters.fameRating}
                    onFilterClick={this.getFilteredMatches}
                    onResetClick={this.onResetClick}
                    onDeleteClick={this.onDeleteClick}
                    onLikeClick={this.onLikeClick}
                    addNotification={this.props.addNotification}
                    changePage={this.props.changePage}
                    change={this.changePage}
                    />
                )
    
            }

        } 

    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Browsing)