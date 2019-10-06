import React from 'react'
import { tags } from '../../../Constants/Constants'
import InterestTag from './InterestTag'
import Button from '@material-ui/core/Button'
import ImageUploader from 'react-images-upload'
import { API } from 'aws-amplify'
import { connect } from 'react-redux'

class FirstConnection extends React.Component {

    state = {
        pickedTags: [],
        pickedImages: [],
        bio: '',
        sexualPreferences: '',
        gender: '',
        enabled: false,
        page: 'FIRST'
    }

    checkIfEnabled = () => {

        if (this.state.pickedTags.length > 0 && this.state.bio.length > 8 &&
            this.state.sexualPreferences.length > 0 && this.state.gender.length > 0)
        {

            this.setState({
                ...this.state,
                enabled: true
            })

        } else {
            
            this.setState({
                ...this.state,
                enabled: false
            })
            
        }

    }

    onClick = (text) => {

        if (this.state.pickedTags.length > 0 && this.state.pickedTags.indexOf(text) >= 0) {

            this.setState({
                ...this.state,
                pickedTags: this.state.pickedTags.filter(item => item !== text)
            }, () => this.checkIfEnabled())

        } else {

            this.setState({
                ...this.state,
                pickedTags: [...this.state.pickedTags, text]
            }, () => this.checkIfEnabled())

        }

    }

    onBiographyChange = (e) => {

        this.setState({
            ...this.state,
            bio: e.target.value
        }, () => this.checkIfEnabled())

    }

    onGenderChange = (e) => {

        this.setState({
            ...this.state,
            gender: e.target.value
        }, () => this.checkIfEnabled())

    }

    onSexualPreferencesChange = (e) => {

        this.setState({
            ...this.state,
            sexualPreferences: e.target.value
        }, () => this.checkIfEnabled())

    }

    onSubmitForm = () => {

        this.setState({
            ...this.state,
            page: 'SECOND'
        })

    }

    onSubmitAll = () => {

        let apiName = 'Matcha'
        let path = '/users/' + this.props.user.info.username + '/first_connection'
        let myInit = {
            body: {
                gender: this.state.gender,
                sexualPreferences: this.state.sexualPreferences,
                bio: this.state.bio,
                pickedTags: this.state.pickedTags,
                pickedImages: this.state.pickedImages
            }
        }

        API.post(apiName, path, myInit)
        .then(data => {

            console.log("Successfully updated the user informations")
            console.log(data)

            let action = {
                type: 'UPDATE_USER',
                value: {
                    user: data
                }
            }
            this.props.dispatch(action)

        })
        .catch(error => {

            console.log("Error updating the user informations")
            console.log(error)

        })

    }

    canConfirmAll = () => {

        return (this.state.pickedImages.length >= 1 && this.state.pickedImages <= 5)

    }

    onPickImage = (file, path) => {

        var array = []
        var i = 0

        while (i < file.length) {
            array.push(path[i++])
        }

        this.setState({
            ...this.state,
            pickedImages: array
        })

    }

    render() {

        if (this.state.page === 'FIRST') {

            return (

                <div style={{margin: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '98vw', marginTop: '25vh'}}>
                    <form
                    style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                    >
                        <label style={{margin: 5}}>
                            <b>To be able to match you with the right people, we need you to enter more informations:</b>
                        </label>
                        <label
                        style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 5}}
                        >
                            Gender:
                            <input list="gender" onChange={this.onGenderChange}/>
                            <datalist id="gender">
                                <option value="Male" />
                                <option value="Female" />
                            </datalist>
                        </label>
                        <label
                        style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 5}}
                        >
                            Sexual preference:
                            <input list="sp" onChange={this.onSexualPreferencesChange}/>
                            <datalist id="sp">
                                <option value="Male" />
                                <option value="Female" />
                                <option value="Both" />
                            </datalist>
                        </label>
                        <label
                        style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 5}}
                        >
                            Interests:
                            <div style={{border: '0.5px solid gray', borderRadius: 5}}>
                                <div
                                style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: 300, width: 200, overflowY: 'scroll', margin: 10}}
                                >
                                    {
                                        tags.map((item, index) => (

                                            <InterestTag key={index} tag={item} tags={this.state.pickedTags} onClick={this.onClick}/>

                                        ))
                                    }
                                </div>
                            </div>
                            <div style={{display: 'flex'}}>
                                {
                                    this.state.pickedTags.map((item, index) => (

                                        <b style={{fontWeight: 'normal', marginRight: 5}} key={index}>{item}</b>

                                    ))
                                }
                            </div>
                        </label>
                        <label style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 5}}>
                            Biography:
                            <textarea
                            name="text"
                            cols="40"
                            rows="5"
                            onChange={this.onBiographyChange}
                            placeholder='Minimum 10 characters'
                            />
                        </label>
                        <Button
                        variant="contained" color="primary" style={{width: 200, height: 50}}
                        disabled={!this.state.enabled}
                        onClick={() => this.onSubmitForm()}
                        >
                                Submit
                        </Button>
                    </form>
                </div>
                
            )

        } else {

            console.log(this.state)

            return (

                <div style={{margin: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '98vw', marginTop: '25vh'}}>
                    <b>One last step: add pictures of yourself</b>
                    <b style={{fontWeight: 'normal'}}>Minimum: 1</b>
                    <b style={{fontWeight: 'normal'}}>Maximum: 5</b>
                    <div style={{width: 250}}>
                        <ImageUploader
                        withIcon={false}
                        buttonText='Choose images'
                        onChange={this.onPickImage}
                        imgExtension={['.jpeg', '.png']}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                        {
                            this.state.pickedImages.map((item, index) => (

                                <div style={{width: 400, height: 300, margin: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid gray', borderRadius: 5}} key={index}>
                                    <img src={item} alt={index.toString()} style={{maxWidth: 400, maxHeight: 300}}/>
                                </div>

                            ))
                        }
                    </div>
                    <Button
                    variant="contained" color="primary" style={{width: 200, height: 50}}
                    disabled={this.canConfirmAll()}
                    onClick={() => this.onSubmitAll()}
                    >
                            Submit
                    </Button>
                </div>

            )

        }

    }

}

const mapsStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapsStateToProps)(FirstConnection)