import React, {Component} from "react"; 
import SearchBar from "SearchBar";

class App extends Component {

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
                <SearchBar></SearchBar>
            </div>
        )
    }
}

export defualt App;
