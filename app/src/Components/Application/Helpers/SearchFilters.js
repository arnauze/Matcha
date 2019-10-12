import React from 'react'
import Slider from '@material-ui/core/Slider'
import { tags } from '../../../Constants/Constants'
import InterestTag from './InterestTag.js'
import { Button } from '@material-ui/core'

export default class SearchFilters extends React.Component {

    render() {

        return (
            <div style={{width: '50vw', height: '15vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                <div style={{display: 'flex', width: '25vw'}}>
                    <b>Fame rating:</b>
                    <Slider
                    value={this.props.fameRating}
                    step={0.1}
                    min={0}
                    max={5}
                    onChange={this.props.onFameRatingChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={() => {return this.props.fameRating}}
                    />
                </div>
                <div style={{display: 'flex', width: '25vw'}}>
                    <b>Age range:</b>
                    <Slider
                    value={this.props.age}
                    onChange={this.props.onAgeChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={() => {return this.props.age}}
                    />
                </div>
                <div style={{display: 'flex', width: '25vw', alignItems: 'center'}}>
                    <b style={{marginRight: 20}}>Tags:</b>
                    <div style={{display: 'flex', overflowX: 'scroll', width: '25vw'}}>
                        {
                            tags.map((item, index) => (
                                    <InterestTag key={index} tag={item} tags={this.props.pickedTags} onClick={this.props.onClick}/>
                            ))
                        }
                    </div>
                </div>
                <Button variant="contained" style={{margin: 5}} color="primary" onClick={this.props.onSearch}>
                        Search
                </Button>
            </div>
        )

    }

}