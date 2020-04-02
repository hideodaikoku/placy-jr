import React, {Component} from "react";
import FooterStyles from "../styles/footer.module.css";
import tokyo from "../assets/images/tokyo.png";

export default class Footer extends Component{
    render(){
        return(
            <div className={FooterStyles.container}>
                <a href="https://www.jreast.co.jp/tokyomovinground/" target="_blank" rel="noopener noreferrer">
                    <img src={tokyo} alt="Tokyo Moving Round" id={FooterStyles.tokyo}/>
                </a>
            </div>
        )
    }
}