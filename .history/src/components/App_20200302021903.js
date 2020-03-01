import React, {Component} from "react"; 
import SearchBar from "SearchBar";

export class App extends Component {

    constructor(){
        super();
        this.state = {
            query : ''
        }
        this._handleInputChange = this._handleInputChange.bind(this);
    }


    _handleInputChange = () => {
        return;
    }

    render(){
        return(
            <div>
                <SearchBar
                 onChange = {this._handleInputChange}
                ></SearchBar>
            </div>
        )
    }
}