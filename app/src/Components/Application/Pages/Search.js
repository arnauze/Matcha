import React from 'react'
import BrowsingFilters from '../Helpers/BrowsingFilters'
import { connect } from 'react-redux'
import { API } from 'aws-amplify'
import UserSummary from '../Helpers/UserSummary'
import SearchFilters from '../Helpers/SearchFilters'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

class Search extends React.Component {

    state = {
        loading: true,
        orderBy: 'common_tags',
        filters: {
            activated: false,
            commonTags: -1,
            age: -1,
            distance: -1,
            fameRating: -1
        },
        searchFilters: {
            tags: [],
            age: [0, 99],
            fameRating: [0, 5]
        },
        matches: []
    }

    getMatches = () => {

        let apiName = 'Matcha'
        let path = '/browsing/user/' + this.props.user.info.username
        let myInit = {}

        API.get(apiName, path, myInit)
        .then(data => {

            console.log("Success fetching the matches")
            console.log(data)
            console.log("================STARTING TO FILTER================")

            var newData = this.filter(data)

            console.log("================AFTER FILTER================")
            console.log(newData)

            var finalData = this.order(newData)

            console.log("================AFTER ORDER================")
            console.log(finalData)

            this.setState({
                ...this.state,
                loading: false,
                matches: finalData,
                sourceData: data
            })

        })
        .catch(err => {
            
            console.log("Error fetching the matches")
            console.log(err)

        })

    }

    _getCommonTags = (item) => {

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

        if (this.state.filters.commonTags >= 0) {

            var a = this._getCommonTags(item)
            var b = this.state.filters.commonTags

        } 

        var i = -1
        var c = true

        while (++i < this.state.searchFilters.tags.length) {

            if (item.interests.findIndex(item => item === this.state.searchFilters.tags[i]) < 0) {
                c = false
            }

        }

        return (a && b) ? ((a >= b) && c) : c
        
    }

    _filterMinAge = (item) => {

        var a = item.age

        if (this.state.filters.age >= 0) {

            var b = this.state.filters.age

        }

        return b ? ((a >= b) && ((a >= this.state.searchFilters.age[0]) && (a <= this.state.searchFilters.age[1]))) : ((a >= this.state.searchFilters.age[0]) && (a <= this.state.searchFilters.age[1]))

    }

    _filterMinDistance = (item) => {

        var a = item.distance
        var b = this.state.filters.distance

        return a >= b

    }

    _filterFameRating = (item) => {

        var a = item.fame_rating

        if (this.state.filters.fameRating >= 0) {

            var b = this.state.filters.fameRating

        }

        return b ? ((a >= b) && ((a >= this.state.searchFilters.fameRating[0]) && (a <= this.state.searchFilters.fameRating[1]))) : ((a >= this.state.searchFilters.fameRating[0]) && (a <= this.state.searchFilters.fameRating[1]))

    }

    filter = matches => {

        var newMatches = [...matches]

        console.log("***************ORIGINAL MATCHES***************")
        console.log(newMatches)

        newMatches = newMatches.filter(this._filterCommonTags)

        console.log("***************AFTER COMMON TAGS***************")
        console.log(newMatches)

        newMatches = newMatches.filter(this._filterMinAge)

        console.log("***************AFTER AGE***************")
        console.log(newMatches)

        if (this.state.filters.distance >= 0) {
            newMatches = newMatches.filter(this._filterMinDistance)
        }


        newMatches = newMatches.filter(this._filterFameRating)

        console.log("***************AFTER FAME RATING***************")
        console.log(newMatches)

        return newMatches

    }

    order = matches => {

        var newMatches = [...matches]

        if (this.state.orderBy === 'age_difference') {

            newMatches = newMatches.sort((a, b) => {
                return a.age - b.age
            })

        } else if (this.state.orderBy === 'common_tags') {

            newMatches = newMatches.sort((a, b) => {
                return this._getCommonTags(b) - this._getCommonTags(a)
            })

        } else if (this.state.orderBy === 'fame_rating') {

            newMatches = newMatches.sort((a, b) => {
                return b.fame_rating - a.fame_rating
            })

        }

        return newMatches

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
                age: -1,
                distance: -1,
                fameRating: -1
            }
        })

        this.getMatches()
        

    }

    orderBy = (text) => {

        var newMatches = [...this.state.matches]

        if (text === 'age_difference') {

            newMatches = newMatches.sort((a, b) => {
                return a.age - b.age
            })

        } else if (text === 'common_tags') {

            newMatches = newMatches.sort((a, b) => {
                return this._getCommonTags(b) - this._getCommonTags(a)
            })

        } else if (text === 'fame_rating') {

            newMatches = newMatches.sort((a, b) => {
                return b.fame_rating - a.fame_rating
            })

        }

        this.setState({
            ...this.state,
            orderBy: text,
            matches: newMatches
        })

    }

    onDeleteClick = (user) => {

        this.setState({
            ...this.state,
            matches: this.state.matches.filter(item => item.username !== user.username)
        })

    }

    onClick = (text) => {

        if (this.state.searchFilters.tags.length > 0 && this.state.searchFilters.tags.indexOf(text) >= 0) {

            this.setState({
                ...this.state,
                searchFilters: {
                    ...this.state.searchFilters,
                    tags: this.state.searchFilters.tags.filter(item => item !== text)
                }
            })

        } else {

            this.setState({
                ...this.state,
                searchFilters: {
                    ...this.state.searchFilters,
                    tags: [...this.state.searchFilters.tags, text]
                }
            })

        }

    }

    onAgeChange = (event, newValue) => {

        this.setState({
            ...this.state,
            searchFilters: {
                ...this.state.searchFilters,
                age: newValue
            }
        })

    }

    onFameRatingChange = (event, newValue) => {

        this.setState({
            ...this.state,
            searchFilters: {
                ...this.state.searchFilters,
                fameRating: newValue
            }
        })

    }

    render() {

        console.log(this.state)

        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '98vw', margin: 15, marginBottom: 60}}>
                <SearchFilters
                fameRating={this.state.searchFilters.fameRating}
                age={this.state.searchFilters.age}
                pickedTags={this.state.searchFilters.tags}
                onClick={this.onClick}
                onSearch={this.getMatches}
                onFameRatingChange={this.onFameRatingChange}
                onAgeChange={this.onAgeChange}
                />
                <BrowsingFilters
                orderBy={this.state.orderBy}
                order={this.orderBy}
                onMinimumCommonTagsChange={this.onMinimumCommonTagsChange}
                onMaximumDistanceChange={this.onMaximumDistanceChange}
                onMinimumAgeChange={this.onMinimumAgeChange}
                onMinimumFameRatingChange={this.onMinimumFameRatingChange}
                minCommonTags={this.state.filters.commonTags}
                maxDistance={this.state.filters.distance}
                minAge={this.state.filters.age}
                minFameRating={this.state.filters.fameRating}
                onFilterClick={this.getMatches}
                onResetClick={this.onResetClick}
                rowHeight={30}
                />
                <List>
                    {
                        this.state.matches.map((item, index) => (
                            <ListItem key={index}>
                                <UserSummary
                                user={item}
                                reload={this.getMatches}
                                onDeleteClick={this.onDeleteClick}
                                addNotification={this.props.addNotification}
                                changePage={this.props.changePage}
                                />
                            </ListItem>

                        ))
                    }
                </List>
            </div>

        )

    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Search)