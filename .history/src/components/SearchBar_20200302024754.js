import React, {Component} from "react";
import SearchStyles from "../styles/search.module.css";
class SearchBar extends Component{
   
    render(){
        const placeholder = "Type in the name of a song you like";
        return(
            <div>
                <input 
                onChange={ (e) => this.props.handleInputChange(e.target.value)}
                placeholder = {placeholder}
                />
            </div>
        )
    }   
}

export default SearchBar;