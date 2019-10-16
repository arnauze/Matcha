import React from 'react'
import { connect } from 'react-redux'
import InterestTag from './InterestTag'
import { tags, apiKey } from '../../../Constants/Constants'
import { Button } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import Geocode from "react-geocode"
import ImageUploader from 'react-images-upload'
import { API, Auth } from 'aws-amplify'

Geocode.setApiKey(apiKey)

class EditProfile extends React.Component {

    // Need to be able to update:
    // Gender V
    // Sexual preferences V
    // Bio V
    // Tags V
    // Images
    // Last name V
    // First name V
    // Password V
    // Email address V
    // Location

    state = {
        firstName: '',
        lastName: '',
        oldPassword: '',
        newPassword: '',
        email: '',
        bio: '',
        gender: '',
        sexualPreferences: '',
        tags: this.props.user.info.interests,
        location: '',
        foundLocation: {},
        find: false,
        medias: this.props.user.info.medias
    }

    onFirstNameChange = (text) => {

        this.setState({
            ...this.state,
            firstName: text
        })

    }

    onLastNameChange = (text) => {

        this.setState({
            ...this.state,
            lastName: text
        })

    }

    onOldPasswordChange = (text) => {

        this.setState({
            ...this.state,
            oldPassword: text
        })

    }

    onNewPasswordChange = (text) => {

        this.setState({
            ...this.state,
            newPassword: text
        })

    }

    onEmailChange = (text) => {

        this.setState({
            ...this.state,
            email: text
        })

    }

    onBioChange = (text) => {

        this.setState({
            ...this.state,
            bio: text
        })

    }

    onGenderChange = (e) => {

        this.setState({
            ...this.state,
            gender: e.target.value
        })

    }

    onSexualPreferencesChange = (e) => {

        this.setState({
            ...this.state,
            sexualPreferences: e.target.value
        })

    }

    onLocationChange = (text) => {

        this.setState({
            ...this.state,
            location: text
        })

    }

    onFindClick = () => {

        Geocode.fromAddress(this.state.location).then(
            response => {
                console.log(response)
                this.setState({
                    ...this.state,
                    find: true,
                    foundLocation: {
                        lat: response.results[0].geometry.location.lat,
                        lng: response.results[0].geometry.location.lng,
                        address: response.results[0].formatted_address
                    }
                })
            },
            error => {
                console.log(error);
                this.setState({
                    ...this.state,
                    find: true,
                    foundLocation: {}
                })
            }
          ); 

    }


    onClick = (text) => {

        if (this.state.tags.length > 0 && this.state.tags.indexOf(text) >= 0) {

            this.setState({
                ...this.state,
                tags: this.state.tags.filter(item => item !== text)
            })

        } else {

            this.setState({
                ...this.state,
                tags: [...this.state.tags, text]
            })

        }

    }

    onDeleteMedia = (i) => {

        this.setState({
            ...this.state,
            medias: this.state.medias.filter((item, index) => index !== i)
        })

    }

    onPickImage = (file, path) => {

        this.setState({
            ...this.state,
            medias: [...this.state.medias, path[0]]
        })

    }

    onSubmitAll = () => {

        // Function called when I click on the update button
        // First I call my API to update my user in the database
        // Then if needed I update the password in Cognito

        let apiName = 'Matcha'
        let path = '/users/' + this.props.user.info.username
        let myInit = {
            body: {
                firstName: this.state.firstName.length > 0 ? this.state.firstName : this.props.user.info.first_name,
                lastName: this.state.lastName.length > 0 ? this.state.lastName : this.props.user.info.last_name,
                email: this.state.email.length > 0 ? this.state.email : this.props.user.info.email,
                bio: this.state.bio.length > 0 ? this.state.bio : this.props.user.info.bio,
                gender: this.state.gender.length > 0 ? this.state.gender : this.props.user.info.gender,
                sexualPreferences: this.state.sexualPreferences.length > 0 ? this.state.sexualPreferences : this.props.user.info.sexual_preferences,
                interests: this.state.tags,
                userLocation: this.state.foundLocation.address ? this.state.foundLocation : this.props.user.info.userLocation,
                medias: this.state.medias
            }
        }

        API.post(apiName, path, myInit)
        .then(data => {
            console.log("SUCCESS UPDATING THE USER")
            console.log(data)
            let action = {
                type: "UPDATE_USER",
                value: {
                    user: data
                }
            }
            this.props.dispatch(action)
            this.props.changePage({text: 'PROFILE', var: {}})
        })
        .catch(err => {
            console.log("ERROR UPDATING THE USER")
            console.log(err)
        })

        if (this.state.oldPassword.length > 0 && this.state.newPassword.length > 0) {

            Auth.currentAuthenticatedUser().then(user => {

                Auth.changePassword(user, this.state.oldPassword, this.state.newPassword)
                .then(data => {
                    console.log("Success updating the password")
                    console.log(data)
                })
                .catch(err => {
                    alert("Error updating the password")
                })
                
            })

        }

    }


    render() {

        console.log(this.state)

        var user = this.props.user.info

        return (
            <div style={{width: '98vw', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 100}}>
                <div style={{margin: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '55vw'}}>
                    <h2>Update your informations</h2>
                    <form style={{alignSelf: 'flex-start'}}>
                        <div style={{margin: 5}}>
                            Username: {user.username}
                        </div>
                        <br />
                        <div style={{margin: 5}}>
                            First name:
                            <input style={{margin: 5}} type="text" value={this.state.firstName} placeholder={user.first_name} onChange={e => this.onFirstNameChange(e.target.value)}/>
                        </div>
                        <br />
                        <div style={{margin: 5}}>
                            Last name:
                            <input style={{margin: 5}} type="text" value={this.state.lastName} placeholder={user.last_name} onChange={e => this.onLastNameChange(e.target.value)}/>
                        </div>
                        <br />
                        <div style={{margin: 5}}>
                            Password:
                            <input style={{margin: 5}} type="password" value={this.state.oldPassword} placeholder="Old password" onChange={e => this.onOldPasswordChange(e.target.value)}/>
                            <input style={{margin: 5}} type="password" value={this.state.newPassword} placeholder="New password" onChange={e => this.onNewPasswordChange(e.target.value)}/>
                        </div>
                        <br />
                        <div style={{margin: 5}}>
                            Email:
                            <input style={{margin: 5}} type="text" value={this.state.email} placeholder={user.email} onChange={e => this.onEmailChange(e.target.value)}/>
                        </div>
                        <br />
                        <div style={{margin: 5}}>
                            Bio:
                            <input style={{margin: 5}} type="text" value={this.state.bio} placeholder={user.bio} onChange={e => this.onBioChange(e.target.value)}/>
                        </div>
                        <br />
                        <div style={{margin: 5}}>
                            Gender:
                            <input style={{margin: 5}} list="gender" onChange={this.onGenderChange} placeholder={user.gender}/>
                            <datalist id="gender">
                                <option value="Male" />
                                <option value="Female" />
                            </datalist>
                        </div>
                        <br />
                        <div style={{margin: 5}}>
                            Sexual preference:
                            <input style={{margin: 5}} list="sp" onChange={this.onSexualPreferencesChange} placeholder={user.sexual_preferences}/>
                            <datalist id="sp">
                                <option value="Male" />
                                <option value="Female" />
                                <option value="Both" />
                            </datalist>
                        </div>
                        <br />
                        <div style={{margin: 5}}>
                            Interests:
                            <div
                            style={{display: 'flex', alignItems: 'center', overflowX: 'scroll', margin: 10, maxWidth: '55vw'}}
                            >
                                {
                                    tags.map((item, index) => (

                                        <InterestTag key={index} tag={item} tags={this.state.tags} onClick={this.onClick}/>

                                    ))
                                }
                            </div>
                        </div>
                        <br />
                        <div style={{margin: 5, display: 'flex', alignItems: 'center'}}>
                            Location:
                            <input style={{margin: 5}} type="text" value={this.state.location} placeholder={user.userLocation.address.split(',')[1].substr(1)} onChange={e => this.onLocationChange(e.target.value)}/>
                            <Button variant="contained" style={{margin: 5}} color="primary" onClick={this.onFindClick}>
                                Find
                            </Button>
                            {
                                this.state.find ?
                                    this.state.foundLocation.address ?
                                        <CheckIcon/>
                                    :
                                        <CloseIcon/>
                                :
                                    null
                            }
                        </div>
                        <br />
                        <div style={{margin: 5, display: 'flex', flexDirection: 'column'}}>
                            Medias:
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 5}}>
                                {
                                    this.state.medias.map((item, index) => {
                                        if (index < 3) {
                                            return (
                                                <div style={{width: 360, height: 240, backgroundColor: 'lightgray', position: 'relative'}}>
                                                    <img key={index} style={{width: 360, height: 240}} alt="" src={item}/>
                                                    <CloseIcon style={{position: 'absolute', top: 0, right: 0}} onClick={() => this.onDeleteMedia(index)}/>
                                                </div>
                                            )
                                        } else return null
                                    })
                                }
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 5}}>
                                {
                                    this.state.medias.map((item, index) => {
                                        if (index >= 3) {
                                            return (
                                                <div style={{width: 360, height: 240, backgroundColor: 'lightgray', position: 'relative'}}>
                                                    <img key={index} style={{width: 360, height: 240}} alt="" src={item}/>
                                                    <CloseIcon style={{position: 'absolute', top: 0, right: 0}} onClick={() => this.onDeleteMedia(index)}/>
                                                </div>
                                            )
                                        } else return null
                                    })
                                }
                                {
                                    this.state.medias.length < 5 ?
                                        <div style={{width: 360, height: 240, backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                            <ImageUploader
                                            withIcon={false}
                                            buttonText='Choose images'
                                            onChange={this.onPickImage}
                                            imgExtension={['.jpeg', '.png']}
                                            />
                                        </div>
                                    :
                                        null
                                }
                            </div>
                        </div>
                    </form>
                    <Button
                    variant="contained"
                    color="primary"
                    style={{width: '10vw', height: '7vh', marginTop: 20}}
                    onClick={this.onSubmitAll}
                    >
                        Update informations
                    </Button>
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(EditProfile)