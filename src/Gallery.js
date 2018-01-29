import React, {Component} from 'react';
import './App.css';

class Gallery extends Component {
    constructor (props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            playing: false,
            available_market: ''
        };
    }

    playAudio(previewUrl, market) {
        let audio = new Audio (previewUrl, market);
        //if track it's not playing
        //make it play
        if (!this.state.playing) {
            audio.play();
            this.setState ({
                playing: true,
                playingUrl: previewUrl,
                available_market: market,
                audio: audio
            })
        // if track is already playing
        } else {
            //pause it
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.pause();
                this.setState({
                    playing: false
                })
            // and then switch to other track to play,
            // by first, pause it and then play another one
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playing: true,
                    playingUrl: previewUrl,
                    available_market: market,
                    audio:audio
                })
            }
        }
    }
    render() {

        const tracks = this.props.tracks;
        return (
            <div>{tracks.map((track, k) => {
                console.log('track', track);
                const trackImg = track.album.images[0].url;
                return (
                    <div key={k}
                         className="track"
                         onClick={() => this.playAudio(track.preview_url, track.available_markets)}
                    >
                        <img src={trackImg} className="track-img" alt="track" />
                        <p className="track-text">{track.name}</p>

                    </div>
                    )
                })}
            </div>
        )
    }
}

export default Gallery;