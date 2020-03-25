import React, {Component} from "react"; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Search from './Search'
import User from './User'

const local_endpoint = 'http://localhost:8000';
const public_endpoint = '';

export default class App extends Component {

    constructor(){
        super()
        this.state = {
            features : {},
            accessToken: '',
            changed: false
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
                    tempo: json.tempo
                }
                this.setState({
                    features,
                    changed: true
                })
                }
            )
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
                        features={this.state.features}
                        changed={this.state.changed}
                        />
                    </Route>
                </Switch>
            </Router>
        )
    }
}