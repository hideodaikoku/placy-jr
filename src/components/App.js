import React, {Component} from "react"; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Search from './Search'
import User from './User'
import Gallery from './Gallery'

const local_endpoint = 'http://localhost:8000';
const public_endpoint = 'http://ec2-54-199-27-87.ap-northeast-1.compute.amazonaws.com:8000/';

const local_rec_endpoint = 'http://0.0.0.0:5000';
const public_rec_endpoint = 'https://urban-recommender.placy.city/';

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
        this._selectStation = this._selectStation.bind(this)
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

    _selectStation(id){
        this.setState({
            changed:true,
            code: id
        })
    }
    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/user">
                        <User/>
                    </Route>
                    <Route path="/gallery">
                        <Gallery
                         selectStation = {(id)=>this._selectStation(id)}
                         code={this.state.code}
                         changed={this.state.changed}
                        />
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