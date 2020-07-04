import React, {Component} from "react";
import { debounce } from 'lodash';
import {Link} from 'react-router-dom'

import SearchPageStyles from '../styles/search-page.module.scss'
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import Results from './Results';
import ResultPage from './ResultPage';
import IntroModal from './IntroModal';

import helpText from "../data/helpText.json";

import logo from "../assets/images/logo.png"
import placy from "../assets/images/placy-logo.png"
const local_endpoint = 'http://localhost:8000';
const public_endpoint = 'http://ec2-54-199-27-87.ap-northeast-1.compute.amazonaws.com:8000';


const rate_limit = 10;
class Search extends Component{
    
    
    constructor(){
        super();
        this.state = {
            query : '',
            accessToken: '',
            tracks : [],
            loading: true,
            rand: 1,
            show: false
        }
        this._handleInputChange = this._handleInputChange.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };
    
    hideModal = () => {
    this.setState({ show: false });
    };


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
                <div className = {SearchPageStyles.container}>
                    <div className={SearchPageStyles.search}>
                        <div className={SearchPageStyles.logoContainer}>
                            <img src={logo} alt="Urban Rhythm Guide"></img>
                        </div>
                        <div className={SearchPageStyles.helpText}>
                            {helpText.text}
                        </div>
                        <div className={SearchPageStyles.textContainer}>
                            <small>2020年3月現在の情報です</small>
                        </div>
                        <SearchBar
                            handleInputChange = {this._handleInputChange}
                            query = {this.state.query}
                        />
                        {
                        this.state.tracks.length>0?
                        <div className={SearchPageStyles.resultBox}>
                        <Results
                            selectTrack={(id)=>this.props._selectTrack(id)}
                            tracks={this.state.tracks}
                            query = {this.state.query}
                            />
                        </div>
                        :null
                        }
                    </div>
                    {
                        this.state.isLoggedIn? 
                        null
                    :

                        <div className={SearchPageStyles.loginContainer}>
                            <p className={SearchPageStyles.or}>OR</p>
                            <button 
                            onClick={() => {window.location = window.location.href.includes('localhost') 
                                                            ? local_endpoint + '/login' 
                                                            : public_endpoint  + '/login'}}
                            className={SearchPageStyles.loginButton}
                            >
                                Sign in with Spotify
                            </button>
                        </div>
                    }

                    <div className={SearchPageStyles.browseContainer}>
                        <Link to ="/gallery" className={SearchPageStyles.galleryLink}>
                            Browse all stations
                        </Link>
                    </div>

                    
                    <IntroModal
                        show={this.state.show} 
                        handleClose={this.hideModal}>
                    </IntroModal>
                    <a href="https://placy.city/" target="_blank" rel="noopener noreferrer">
                        <img src={placy} className={SearchPageStyles.placyLogo} alt="Placy Website"/>
                    </a>
                    
                    <div className={SearchPageStyles.info} onClick={this.showModal}>i</div>
                    <Footer/>
                </div>
                }
            </div>
        )

    }

}

export default Search