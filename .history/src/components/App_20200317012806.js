import React, {Component} from "react"; 
import SearchBar from "./SearchBar";
import AppStyles from "../styles/app.module.css";

export default class App extends Component {

    constructor(){
        super();
        this.state = {
            query : ''
        }
        this._handleInputChange = this._handleInputChange.bind(this);
    }


    _handleInputChange = (val) => {
        this.setState({
            query: val
        })
    }

    render(){
        return(
            <div className={AppStyles.content}>
                <div
                    className = {AppStyles.container}
                >
                    <div className={AppStyles.search}>
                        <h1 className={AppStyles.header}>Placy Search</h1>
                        <SearchBar
                            handleInputChange = {this._handleInputChange}
                            query = {this.state.query}
                        />
                    </div>
                    <button 
                        onClick={() => {window.location = 'http://localhost:5000/login'}}
                        className="loginButton"
                    >
                        Sign in with Spotify
                    </button>
                </div>
            </div>
        )
    }
}
