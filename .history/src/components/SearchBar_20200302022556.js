import React, {Component} from "react";

class SearchBar extends Component{
    render(){
        return(
            <div>
                <input 
                onChange={ (e) => this.props.handleInputChange(e.target.value)}
                value = {this.props.query}
                />
            </div>
        )
    }   
}

export default SearchBar;