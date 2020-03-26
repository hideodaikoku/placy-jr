import React, {Component} from 'react';
import ResultPageStyles from '../styles/resultpage.module.css';
import stationData from '../data/stations.json';
import venueData from '../data/venue-info.json';
import svgMap from "../data/svgMap.json";
import Modal from "./Modal";

import queryString from 'query-string';

const svg_hosting_endpoint = 'https://placy-jr-svg.s3-ap-northeast-1.amazonaws.com/';
const image_hosting_endpoint = 'https://placy-jr.s3-ap-northeast-1.amazonaws.com/';

export default class ResultPage extends Component {

    constructor(){
        super();
        this.state = {
            station_name: '',
            desc: '',
            bars: [],
            show: false
        }
    }

    componentDidMount(){
        const place = venueData.filter(venue=>venue.place_id===this.props.code);
        const station_id = place[0].station_id;
        const station = stationData.filter(station=>station.station_id===station_id)[0];
        const bars = venueData.filter(venue=>venue.station_id===station_id)
        this.setState({
            station_name: station.station,
            station_id,
            desc: station.description_en,
            bars: bars
        })
    }

    showModal = () => {
        this.setState({ show: true });
    };
    
    hideModal = () => {
    this.setState({ show: false });
    };

    refresh =()=>{
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        if(accessToken){
            window.location.href= "/";
        }else{
            window.location.reload(false);
        }
    }
    render(){
        return(
            <div className={ResultPageStyles.parent}>
                <div className={ResultPageStyles.container}>
                    <h1 id={ResultPageStyles.arrow}
                        onClick={this.refresh}>
                            &#8592;
                    </h1>
                    <h1 id={ResultPageStyles.title}>{this.state.station_name}</h1>
                    <p>{this.state.desc}</p>
                    
                    {
                    
                    this.state.bars.map((bar,idx)=>(
                        
                        <div key={bar.place_id} className={ResultPageStyles.barContainer}>
                            
                            <div className={ResultPageStyles.barTitle}>
                                <p className={ResultPageStyles.number}>{idx+1}</p>
                                <p className={ResultPageStyles.clubName}>{bar.club_name_en}</p>
                            </div>
                            
                            <div className={ResultPageStyles.barImage}>
                                <img src={image_hosting_endpoint+bar.place_id+'.png'} alt={bar.clubName}/>
                            </div>
                            
                            <ul>
                                <li>{bar.category}</li>
                            </ul>
                            
                            <p className={ResultPageStyles.en}>{bar.description_en}</p>
                            
                            <p className={ResultPageStyles.ja}>{bar.description_ja}</p>
                            
                            <small className={ResultPageStyles.address}>{bar.address}</small><br/>
                        </div>
                    ))}
                </div>
                <img 
                src={svg_hosting_endpoint+svgMap[this.state.station_id]} 
                alt={this.state.station_name}
                className={ResultPageStyles.image}
                />
                <Modal 
                    show={this.state.show} 
                    handleClose={this.hideModal}>
                </Modal>
                <div className={ResultPageStyles.info} onClick={this.showModal}>
                    Towards Urban Rhythmanalysis
                </div>
            </div>
        )
    }

}