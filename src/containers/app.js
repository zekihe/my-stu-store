import React, { Component,Fragment } from 'react';
import Header from './header/header.js';
import Index from './index/index.js';


class App extends Component {
    render (){
      return (
        <Fragment>
          <Header/>
          <Index/>
        </Fragment>
      )
    }
}

export default App;