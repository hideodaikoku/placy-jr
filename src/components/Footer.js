import React, {Component} from "react";
import FooterStyles from "../styles/footer.module.css";
import jr from "../assets/images/jr.png";
import tokyo from "../assets/images/tokyo.png";

export default class Footer extends Component{
    render(){
        return(
            <div className={FooterStyles.container}>
                <img src={jr} alt="Japan Railways" className={FooterStyles.image}/>
                <img src={tokyo} alt="Tokyo Moving Round" className={FooterStyles.image}/>
            </div>
        )
    }
}