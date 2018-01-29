import React, { Component } from 'react';
import {FormGroup,
        FormControl,
        InputGroup,
        Glyphicon
} from 'react-bootstrap';

import Profile from './Profile';
import Gallery from './Gallery';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
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
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

        let accessToken= 'BQDDFI0PKt57Y9i8cySHxW3t5JunJQ2eHJ3NxPEVd13Zy0KfAp24-1xYd47hxhQHe-j3CLGOQQ9A_HpxyCLwUAOvrtKpeidDG0yswm-8KsRamgw_RXccwr5SB7BzU56HdZKZBhsRmcf8St9JP4WFzTxxJIAHmQ&refresh_token=AQC-bR9i_BOdyiYqHpO69jRTZQNg9RofTC1VYXiA8ERKQE1zjmOLWdfAvgYHCeHxdD3EwfZESr064-6hxyEkivE6ojrEp9745tBmLdybZKN_VXMpX0T-3B0vFb6Rh69UAaE';

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

                FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=NL&?market=US`;
                fetch(FETCH_URL,response)
                    .then(response => response.json())
                    .then(json => {
                        console.log('artists top tracks', json);
                        const tracks = json.tracks;
                        this.setState({tracks})
                    })

            });
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
                {
                    this.state.artist !== null
                    ?
                        <div>
                            <Profile artist={this.state.artist}/>

                            <Gallery tracks={this.state.tracks}/>
                        </div>

                    : <div></div>
                }

            </div>
    );
  }
}

export default App;



/*F*/