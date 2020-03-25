import React, {Component} from 'react';
import ResultPageStyles from '../styles/resultpage.module.css';

export default class ResultPage extends Component {
    render(){
        return(
            <div className={ResultPageStyles.container}>
                <h1>RESULTS</h1>
                <p>danceability {this.props.features.danceability}</p>
                <p>energy {this.props.features.energy}</p>
                <p>loudness {this.props.features.loudness}</p>
                <p>speechiness {this.props.features.speechiness}</p>
                <p>acousticness {this.props.features.acousticness}</p>
                <p>instrumentalness {this.props.features.instrumentalness}</p>
                <p>liveness {this.props.features.liveness}</p>
                <p>valence {this.props.features.valence}</p>
                <p>tempo {this.props.features.tempo}</p>
            </div>
        )
    }

}