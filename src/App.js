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
            query: ''
        };

     this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState = ({query: event.target.value})
    }

    render() {
        return (
            <div className="app">
                <div className="app-title">Music Master</div>

                <FormGroup>
                    <InputGroup>
                        <FormControl type="text"
                                     placeholder="Search for an artist... "
                                     query={this.state.query}
                                     onChange={this.handleChange}
                        />

                        <InputGroup.Addon>
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
