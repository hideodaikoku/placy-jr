import React, {Component} from "react"; 
import SearchBar from "./SearchBar";

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
            <div>
                <SearchBar
                 handleInputChange = {this._handleInputChange}
                 query = {this.state.query}
                ></SearchBar>
                <h1>{this.state.query}</h1>
            </div>
        )
    }
}