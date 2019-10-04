import React from 'react'
import LandingPage from './Components/LandingPage'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

class App extends React.Component {

  // Entry point of the ReactJS App
  // I use react-redux to add a global state in my app for the user

  render() {

    return (
      <Provider store={Store}>
        <LandingPage />
      </Provider>

    )

  }

}

export default App;
