import React, { Component } from "react";
import '../styles/modal.css'
import explanationData from '../data/intro.json';
import figure from '../assets/images/figure.png';

export default class Modal extends Component{
    
    render(){
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="close" onClick={this.props.handleClose}>&times;</div>
          
          <div className="desc">
          <h1 className="title">
            Toward Urban Rhythmanalysis
          </h1>
            <p className="intro-en">{explanationData.intro_en}</p>
            <p className="intro-jp">{explanationData.intro_jp}</p>
          </div>
          <div className="figure">
              <img src={figure} alt="toward urban rhythmanalysis"/>
          </div>
        </section>
      </div>
    );
  };
}

  