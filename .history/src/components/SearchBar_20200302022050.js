import React, {Component} from "react";

class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            query: ''
        }
    }ß
    render(){
        return(
            <div>
                <input onChange={this.props.handleInputChange}></input>
            </div>
        )
    }   
}

export default SearchBar;