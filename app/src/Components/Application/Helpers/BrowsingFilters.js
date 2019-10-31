import React from 'react'
import { Button } from '@material-ui/core'

export default class BrowsingFilters extends React.Component {

    state = {
        disabled: true
    }

    onFilterClick = () => {

        this.setState({
            disabled: false
        })

        this.props.onFilterClick()

    }

    onResetClick = () => {

        this.setState({
            disabled: true
        })

        this.props.onResetClick()

    }

    render() {

        return (

            <div style={{flex: 8, width: '50vw', height: '15vh', backgroundColor: 'white', display: 'flex',alignItems:'center'}}>
                <div style={{flex: 2, display: 'flex', alignItems: 'center', flexDirection: 'column', margin: 10, paddingRight:10}}>
                    <b>Order by:</b>
                    <Button
                    onClick={() => this.props.order('common_tags')}
                    color={this.props.orderBy === 'common_tags' ? 'primary' : "default"}>Common tags</Button>
                    <Button
                    onClick={() => this.props.order('distance')}
                    color={this.props.orderBy === 'distance' ? 'primary' : "default"}>Distance</Button>
                    <Button
                    onClick={() => this.props.order('age_difference')}
                    color={this.props.orderBy === 'age_difference' ? 'primary' : "default"}>Age</Button>
                    <Button
                    onClick={() => this.props.order('fame_rating')}
                    color={this.props.orderBy === 'fame_rating' ? 'primary' : "default"}>Fame rating</Button>
                </div>
                <div style={{flex: 2, display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column'}}>
                    <Button variant="contained" color="primary" onClick={this.onFilterClick} style={{margin: 5}}>
                            Filter
                    </Button>
                    <Button variant="contained" color="secondary" onClick={this.onResetClick} style={{margin: 5}} disabled={this.state.disabled}>
                            Reset
                    </Button>
                </div>
                <div style={{flex: 2, display: 'flex', alignItems: 'flex-start', flexDirection: 'column', paddingTop:10, margin: 10, }}>
                    <b>Filter by:</b>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 2}}>
                            <b style={{flex:1, height: this.props.rowHeight, fontWeight: 'normal', paddingBottom:5}}>Min. common tags:</b>
                            <div style={{flex:1 ,height: this.props.rowHeight, display: 'flex', alignItems: 'center', justifyContent: 'space evenly'}}>
                                <input type="number" onChange={this.props.onMinimumCommonTagsChange} value={this.props.minCommonTags === -1 ? "0" : this.props.minCommonTags}/>
                            </div>
                            <b style={{height: this.props.rowHeight, fontWeight: 'normal', paddingBottom:5}}>Max. distance:</b>
                            <div style={{height: this.props.rowHeight, display: 'flex', alignItems: 'center', justifyContent: 'space evenly'}}>
                                <input type="number" onChange={this.props.onMaximumDistanceChange} value={this.props.maxDistance === -1 ? "0" : this.props.maxDistance}/>
                            </div>
                            <b style={{height: this.props.rowHeight, fontWeight: 'normal',paddingBottom:5}}>Min. age:</b>
                            <div style={{height: this.props.rowHeight,  display: 'flex', alignItems: 'center'}}>
                                <input type="number" onChange={this.props.onMinimumAgeChange} value={this.props.minAge === -1 ? "0" : this.props.minAge}/>
                            </div>
                            <b style={{height: this.props.rowHeight, fontWeight: 'normal',paddingBottom:5}}>Min. fame rating:</b>
                            <div style={{height: this.props.rowHeight, display: 'flex', alignItems: 'center'}}>
                                <input type="number" onChange={this.props.onMinimumFameRatingChange} value={this.props.minFameRating === -1 ? "0" : this.props.minFameRating}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )

    }

}