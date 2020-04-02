import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Error extends Component{
    render(){
        return(
            <div style={{maxWidth:"300px",margin:"0 auto", position:"absolute", left: "50%",top: "30%", transform:"translateX(-50%)"}}>
                <h1>Oops! <br/>No Tracks Found</h1>
                <Link to='/' style={{color:"black"}}>Back to Top</Link>
            </div>
            )
    }
}