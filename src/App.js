import React, {Component} from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import UploadDropZone from './UploadDropZone'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#43bfa7",
    accent1Color: "#f78760"
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadScreen: []
    }
  }

  componentWillMount() {
    var uploadScreen = [<UploadDropZone key="udz" appContext={this}/>];
    this.setState({uploadScreen: uploadScreen})
  }

  render() {
    return (<MuiThemeProvider muiTheme={muiTheme}>
      <div className="App">
        <div>
          <AppBar title="Synq Upload" showMenuIconButton={false}/>
        </div>
        <div>{this.state.uploadScreen}</div>

      </div>
    </MuiThemeProvider>);
  }
}

export default App;
