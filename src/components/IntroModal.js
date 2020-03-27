import React, { Component } from "react";
import '../styles/modal.css'

export default class Modal extends Component{
    
    render(){
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main-a">
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
          <div style={{marginTop:"2rem"}}>
              店舗に関する記載は、株式会社Placyが行っています。 <br/>
              記載に当たっては正確に記載するよう努めてはおりますが、仮に誤り等がありましても、<br/>
              それにより発生した損害について、当社は責任を負いかねますので、ご了知おきください。
          </div>
        </section>
      </div>
    );
  };
}

  