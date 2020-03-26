import React, {Component} from "react";
import queryString from 'query-string';
import Loading from './Loading';
import { Link } from 'react-router-dom';


class User extends Component{
    constructor(){
        super()
        this.state = {
            topTrack: {},
            loading: true,
            features: null,
            artistName: ''
        }
    }

    componentDidMount(){
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        if (!accessToken)
        return;
        fetch('https://api.spotify.com/v1/me/top/tracks?limit=1', {
            method: 'GET',
            headers : {'Authorization': 'Bearer '+accessToken}
        })
            .then(response=> 
                response.json()
                )
            .then(json => {
                if(json.items[0]){
                    this.setState({
                        found: true,
                        topTrack : json.items[0],
                        artistName: json.items[0].artists[0].name,
                        id: json.items[0].id
                    })
                }else{
                    this.setState({
                        found: false
                    })
                }
            })
            .then(()=>{
                const id = this.state.id;
                fetch('https://api.spotify.com/v1/audio-features/'+id,{
                    method: 'GET',
                    headers: {'Authorization': 'Bearer '+accessToken}
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
                        loading: false,
                        features
                        
                    })
                 }
                )
                .catch(error=>
                    console.log(error.message)
                )
            })
    }

    render(){
        const features = this.state.features;
        return(
            <div style={{margin:"5rem auto", maxWidth: "600px"}}>
            {
                this.state.found ?
                <div>
                    <h1>{this.state.topTrack.name}</h1>
                    <p>{this.state.artistName}</p>
                    {
                        this.state.loading?
                        <Loading/>
                        :
                        <ul>
                            <li>Danceability: {features.danceability}</li>
                            <li>Energy: {features.energy}</li>
                            <li>Loudness: {features.loundess}</li>
                            <li>Speechiness: {features.speechiness}</li>
                            <li>Accousticness: {features.accousticness}</li>
                            <li>Instrumentalness: {features.instrumentalness}</li>
                            <li>Liveness: {features.liveness}</li>
                            <li>Valence: {features.valence}</li>
                            <li>Tempo: {features.tempo}</li>
                        </ul>
                    }
                </div>
                :
                <div>
                    <h1>Track not found</h1>
                        <Link to="/">
                            Back
                        </Link>
                </div>
                }
                
            </div>
        )
    }
}

export default User;