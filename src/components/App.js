import React, {Component} from "react"; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Search from './Search'
import User from './User'

const local_endpoint = 'http://localhost:8000';
const public_endpoint = 'https://boiling-garden-91117.herokuapp.com/';

const local_rec_endpoint = 'http://0.0.0.0:5000';
const public_rec_endpoint = 'https://boiling-beach-00069.herokuapp.com/';

export default class App extends Component {

    constructor(){
        super()
        this.state = {
            features : {},
            accessToken: '',
            changed: false,
            code: 0
        }
        this.selectTrack_=this.selectTrack_.bind(this);
    }

    getTrackData=(token, id)=>{
        fetch('https://api.spotify.com/v1/audio-features/'+id,{
                    method: 'GET',
                    headers: {'Authorization': 'Bearer '+ token}
                })
            .then(response=> response.json())
            .then(json=> 
                {
                const features = {
                    danceability: json.danceability,
                    energy: json.energy,
                    loudness: json.loudness,
                    speechiness: json.speechiness,
                    accousticness: json.acousticness,
                    instrumentalness: json.instrumentalness,
                    liveness: json.liveness,
                    valence: json.valence,
                    mode : json.mode,
                    tempo: json.tempo
                }
                this.setState({
                    features
                })
                }
            )
            .then(()=>{
                const endpoint = window.location.href.includes('localhost') ? local_rec_endpoint : public_rec_endpoint;
                const features  = this.state.features;
                const URI = endpoint 
                            +'?danceability='+features.danceability
                            +'&energy='+features.energy
                            +'&instrumentalness='+features.instrumentalness
                            +'&liveness='+features.liveness
                            +'&mode='+features.mode
                            +'&speechiness='+features.speechiness
                            +'&tempo='+features.tempo
                            +'&valence='+features.valence;
                fetch(URI, {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response=>response.json())
                .then(data=>this.setState({
                    code:data.places,
                    changed: true
                })
                )
                .catch(err=>console.log(err))
            })
            .catch(error=>
                console.log(error.message)
            )
    }

    selectTrack_=(id)=>{
        fetch(window.location.href.includes('localhost')?local_endpoint:public_endpoint)
        .then( res => { 
            return res.json()
        })
        .then( json => {
            this.setState({
                accessToken:json.access_token
            },()=> this.getTrackData(json.access_token,id))
        })
        .catch(err=>console.log(err.message))
    }

    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/user">
                        <User/>
                    </Route>
                    <Route path="/">
                        <Search
                        _selectTrack = {(id)=>this.selectTrack_(id)}
                        code={this.state.code}
                        changed={this.state.changed}
                        />
                    </Route>
                </Switch>
            </Router>
        )
    }
}