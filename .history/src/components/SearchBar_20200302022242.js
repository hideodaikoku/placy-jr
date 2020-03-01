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
                <input onChange={ (e) => this.props.handleInputChange(e.target.value)}></input>
            </div>
        )
    }   
}

export default SearchBar;