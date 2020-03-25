import React ,{Component} from 'react';
import ResultStyles from '../styles/result.module.css';

class Results extends Component{

    render(){
        return(
            <div className={this.props.query?ResultStyles.resultsContainer:ResultStyles.noResult}>
                {this.props.tracks.map(track=>{
                    return(
                    <div key={track.id} className={ResultStyles.resultContainer} onClick={()=>this.props.selectTrack(track.id)}>
                        <p className={ResultStyles.trackText}>
                            <strong>{track.name}</strong>{"-"}
                            {track.artists[0].name}
                        </p>
                    </div>
                    )
                })}
            </div>
        )
    }
}

export default Results;