import React from 'react'
import { Button } from '@material-ui/core'

export default class BrowsingFilters extends React.Component {

    render() {

        return (

            <div style={{width: '50vw', height: '15vh', backgroundColor: 'red', display: 'flex'}}>
                <div style={{flex: 4, display: 'flex', alignItems: 'center', flexDirection: 'column', margin: 10}}>
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
                <div style={{flex: 4, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <b>Filter by:</b>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                            <b style={{height: this.props.rowHeight, fontWeight: 'normal', margin: 5}}>Minimum common tags:</b>
                            <b style={{height: this.props.rowHeight, fontWeight: 'normal', margin: 5}}>Maximum distance:</b>
                            <b style={{height: this.props.rowHeight, fontWeight: 'normal', margin: 5}}>Minimum age:</b>
                            <b style={{height: this.props.rowHeight, fontWeight: 'normal', margin: 5}}>Minimum fame rating:</b>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                            <div style={{height: this.props.rowHeight, margin: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <input type="number" onChange={this.props.onMinimumCommonTagsChange} value={this.props.minCommonTags === -1 ? "0" : this.props.minCommonTags}/>
                            </div>
                            <div style={{height: this.props.rowHeight, margin: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <input type="number" onChange={this.props.onMaximumDistanceChange} value={this.props.maxDistance === -1 ? "0" : this.props.maxDistance}/>
                            </div>
                            <div style={{height: this.props.rowHeight, margin: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <input type="number" onChange={this.props.onMinimumAgeChange} value={this.props.minAge === -1 ? "0" : this.props.minAge}/>
                            </div>
                            <div style={{height: this.props.rowHeight, margin: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <input type="number" onChange={this.props.onMinimumFameRatingChange} value={this.props.minFameRating === -1 ? "0" : this.props.minFameRating}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column'}}>
                    <Button variant="contained" color="primary" onClick={this.props.onFilterClick} style={{margin: 5}}>
                            Filter
                    </Button>
                    <Button variant="contained" color="secondary" onClick={this.props.onResetClick} style={{margin: 5}}>
                            Reset
                    </Button>
                </div>
            </div>

        )

    }

}