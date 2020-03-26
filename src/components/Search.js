import React, {Component} from "react";
import { debounce } from 'lodash';


import SearchPageStyles from '../styles/search-page.module.css'
import SearchBar from "./SearchBar";
import Results from './Results'
import ResultPage from './ResultPage'

const local_endpoint = 'http://localhost:8000';
const public_endpoint = '';


const rate_limit = 10;
class Search extends Component{
    
    
    constructor(){
        super();
        this.state = {
            query : '',
            accessToken: '',
            tracks : [],
            loading: true
        }
        this._handleInputChange = this._handleInputChange.bind(this);
    }

    componentDidMount(){
        fetch(window.location.href.includes('localhost')?local_endpoint:public_endpoint)
        .then( res => { 
            return res.json()
        })
        .then( json => {
            this.setState({
                accessToken: json.access_token
            })
        })
    }

    sendQuery=debounce(()=>{
        const token = this.state.accessToken;
        const query = this.state.query;
        const URL = 'https://api.spotify.com/v1/search?q='+query+'&type=track&limit='+rate_limit;
        fetch(URL, {
            method: 'GET',
            headers: {'Authorization': 'Bearer '+token}
        })
        .then(response=> response.json())
        .then(json =>{
            this.setState({
                tracks:json.tracks.items
            })
        })
        .catch(err => console.log(err.message))
    }, 500)

    _handleInputChange = (val) => {
        this.setState({
            query: val
        },()=> this.sendQuery())
    }

    render(){
        return(
            <div className={SearchPageStyles.content}>
                {this.props.changed?
                <ResultPage
                 code = {this.props.code}
                />
                :
                <div
                    className = {SearchPageStyles.container}
                >
                    <div className={SearchPageStyles.search}>
                        <h1 className={SearchPageStyles.header}>Placy Search</h1>
                        <SearchBar
                            handleInputChange = {this._handleInputChange}
                            query = {this.state.query}
                        />
                        {
                        this.state.tracks.length>0?
                        <Results
                            selectTrack={(id)=>this.props._selectTrack(id)}
                            tracks={this.state.tracks}
                            query = {this.state.query}
                            />
                        :null
                        }
                    </div>
                    {
                        this.state.isLoggedIn? 
                        null
                    :
                        <button 
                        onClick={() => {window.location = window.location.href.includes('localhost') 
                                                        ? local_endpoint + '/login' 
                                                        : public_endpoint  + '/login'}}
                        className={SearchPageStyles.loginButton}
                        >
                            Sign in with Spotify
                        </button>
                    }
                    
                </div>
                }
            </div>
        )

    }

}

export default Search