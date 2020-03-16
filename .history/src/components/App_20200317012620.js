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
                    <button onClick={() => {window.location = 'http://localhost:5000/login'}}
                    style={{padding: '20px', 'font-size': '50px', 'margin-top': '20px'}}>Sign in with Spotify</button>
                </div>
            </div>
        )
    }
}
