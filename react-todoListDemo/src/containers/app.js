import React, { Component,Fragment } from 'react';
import Header from './header/header.js';
import Index from './index/index.js';
import Footer from './footer/footer.js';

class App extends Component {
    constructor (props){
      super(props);
      console.log(this)
    }
    render (){
      return (
        <Fragment>
          <Header/>
          <Index/>
          <Footer/>
        </Fragment>
      )
    }
}


export default App;