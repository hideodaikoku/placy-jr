import React,{Component} from "react";
import LoadingStyles from "../styles/loading.module.css";

export default class Loading extends Component{
    render(){
        return(
            <div className={LoadingStyles.loadContainer}>
                <div className={LoadingStyles.loaderContainer}>
                    <p className={LoadingStyles.text}>
                        Finding a station for you.
                    </p>
                    <div className={LoadingStyles.loader}>
                    </div>
                </div>
            </div>
        )
    }
}