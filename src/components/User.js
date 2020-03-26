import React, {Component} from "react";
import queryString from 'query-string';
import ResultPage from './ResultPage';

const local_rec_endpoint = 'http://0.0.0.0:5000';
const public_rec_endpoint = '';

class User extends Component{
    constructor(){
        super()
        this.state = {
            topTrack: {},
            features: null,
            artistName: '',
            found: false
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
                if(json.items){
                    this.setState({
                        topTrack : json.items[0],
                        artistName: json.items[0].artists[0].name,
                        id: json.items[0].id
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
                        features
                    })
                 }
                )
                .then(()=>{
                    const endpoint = window.location.href.includes('localhost') ? local_rec_endpoint : public_rec_endpoint;
                    const features  = this.state.features;
                    let mode = 0;
                    if(features.mode){
                        mode= features.mode
                    }
                    const URI = endpoint 
                                +'?danceability='+features.danceability
                                +'&energy='+features.energy
                                +'&instrumentalness='+features.instrumentalness
                                +'&liveness='+features.liveness
                                +'&mode='+mode
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
                        code: data.places,
                        found: true
                    })
                    )
                    .catch(err=>console.log(err))
                })
                .catch(error=>
                    console.log(error.message)
                )
            })
    }

    render(){
        return(
            <div>
            {
                this.state.found ?
                <ResultPage
                code = {this.state.code}
                />
                :null
                }
                
            </div>
        )
    }
}

export default User;