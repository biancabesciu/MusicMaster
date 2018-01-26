import React, { Component } from 'react';
import {FormGroup,
        FormControl,
        InputGroup,
        Glyphicon
} from 'react-bootstrap';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

     this.handleChange = this.handleChange.bind(this);
     this.search = this.search.bind(this);
     this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            return this.search();
        }
    }

    search() {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = `${BASE_URL}q=${this.state.value}&type=artist&limit=1`;
        console.log('FETCH_URL', FETCH_URL);
    }

    render() {
        return (
            <div className="app">
                <div className="app-title">Music Master</div>

                <FormGroup>
                    <InputGroup>
                        <FormControl type="text"
                                     placeholder="Search for an Artist"
                                     value={this.state.value}
                                     onChange={this.handleChange}
                                     onKeyPress={this.handleKeyPress}
                        />

                        <InputGroup.Addon onClick={this.search}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>

                    </InputGroup>

                </FormGroup>

                <div className="profile">
                    <div>Artist picture</div>
                    <div>Artist name</div>
                </div>

                <div className="Gallery">
                    Gallery
                </div>
            </div>
    );
  }
}

export default App;
