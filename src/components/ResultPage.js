import React, {Component} from 'react';
import ResultPageStyles from '../styles/resultpage.module.css';
import stationData from '../data/stations.json';
import venueData from '../data/venue-info.json';
export default class ResultPage extends Component {
    render(){
        return(
            <div className={ResultPageStyles.container}>
                {venueData
                        .filter(venue=>venue.place_id===this.props.code)
                        .map(venue=>(
                            <>
                                <p>{venue.club_name_ja}</p>
                                <p>{venue.club_name_en}</p>
                            </>
                            )
                        )}
            </div>
        )
    }

}