import React, { Component } from 'react';
import {FormGroup,
        FormControl,
        InputGroup,
        Glyphicon
} from 'react-bootstrap';

import Profile from './Profile';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null
        };

     this.handleChange = this.handleChange.bind(this);
     this.search = this.search.bind(this);
     this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            return this.search();
        }
    }

    search() {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;

        let accessToken = 'BQDLE7EM8TDKH0Kao08H3AF68sOKO39b8PdstxERZyNB3bRHLxsK9NTSYWbPjfpj7ZfhLhZcI7-mnws36_rF5In1uH5WCNKMqBY5-vRu3dn1KqkXSkLcWFtQN03Ui3DotECnjAhs09OWYUpGX5V1iKtvSBfe7A&refresh_token=AQCUOE4_MOLn4NiH92CR98PaHMn0rEpY2Fwu5D2Acj_IlfN9MZG7IUE-Nk5_QKnyP8FLEcprKbGLmMpJA9eJZd5q35H3lq6433s2jA4tSFESOelebhXZTj8Fli1ZZ1DPoMw';

        let response = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },

            mode: 'cors',
            cache: 'default'
        };

        fetch(FETCH_URL, response)
            .then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0];
                this.setState({artist});
            })
    }

    render() {
        return (
            <div className="app">
                <div className="app-title">Music Master</div>

                <FormGroup>
                    <InputGroup>
                        <FormControl type="text"
                                     placeholder="Search for an Artist"
                                     value={this.state.query}
                                     onChange={this.handleChange}
                                     onKeyPress={this.handleKeyPress}
                        />

                        <InputGroup.Addon onClick={this.search}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>

                    </InputGroup>

                </FormGroup>

                <Profile
                    artist={this.state.artist}
                />

                <div className="Gallery">
                    Gallery
                </div>
            </div>
    );
  }
}

export default App;
