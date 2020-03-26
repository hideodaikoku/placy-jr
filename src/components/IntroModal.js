import React, { Component } from "react";
import '../styles/modal.css'

export default class Modal extends Component{
    
    render(){
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="close" onClick={this.props.handleClose}>&times;</div>
          
          <div className="para">
            <h1 className="title">
            We Are Placy, a company creating an alternative place search engine.
            </h1>
            <p className="title-ja">
                Placyは新たな場所検索の仕組みを作る会社です
            </p>
          </div>
          <div>
              Information about stores is provided by Placy.<br/> 
              Although every effort has been made to ensure the information is accurate,<br/>
              we will not be liable for any damages resulting from errors.<br/>
              Thank you for your understanding and cooperation
          </div>
        </section>
      </div>
    );
  };
}

  