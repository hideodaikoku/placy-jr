import React, {Component} from 'react';
import ResultPageStyles from '../styles/resultpage.module.scss';
import stationData from '../data/stations.json';
import venueData from '../data/venue-info.json';
import pngMap from "../data/pngMap.json";
import Modal from "./Modal";
import Loading from "./Loading"
import queryString from 'query-string';
import app_store from '../assets/images/app_store.png';
import play_store from '../assets/images/play_store.png';
import app_pr from '../assets/images/app_pr.png';

const svg_hosting_endpoint = 'https://urban-rhythm-guide.s3-ap-northeast-1.amazonaws.com/';
const image_hosting_endpoint = 'https://urban-rhythm-guide-venue.s3.ap-northeast-1.amazonaws.com/';

export default class ResultPage extends Component {

    constructor(){
        super();
        this.state = {
            station_name: '',
            desc: '',
            bars: [],
            show: false,
            loading: true
        }
    }

    componentDidMount(){
        if(!this.props.hideLoading){
            setTimeout(()=>{
                this.setState({
                    loading: false
                })
            }
            ,2500)
        }else{
            this.setState({
                loading: false
            })
        }

        // the algorithm recommends a place using a "code"
        // this code should correspond to a place id, however as it is implemented now
        // the place_ids b/w recommender and front end data do not match exactly - they will however, be in the same station

        const place = venueData.filter(venue=>venue.place_id===this.props.code);
        var station_id = 8
        if(place[0]){
            station_id = place[0].station_id;
        }
        const station = stationData.filter(station=>station.station_id===station_id)[0];
        const bars = venueData.filter(venue=>venue.station_id===station_id)
        this.setState({
            station_name: station.station,
            spotify_link: station.spotify_link,
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
                    {
                    this.state.loading?
                    <Loading/>
                    : null
                    }
                    <div className={ResultPageStyles.sidebar}>
                        <div className={ResultPageStyles.topContainer}>
                            <h1 id={ResultPageStyles.arrow}
                                onClick={this.refresh}>
                                    &#8592;
                            </h1>
                            <h1 id={ResultPageStyles.title}>{this.state.station_name}</h1>
                        </div>
                        <p className={ResultPageStyles.desc}>
                            {this.state.desc}
                        </p>
                        <a href={this.state.spotify_link} target="_blank" rel="noopener noreferrer" className={ResultPageStyles.playlist}>
                            LISTEN ON SPOTIFY
                        </a>
                        {
                        
                        this.state.bars.map((bar,idx)=>(
                            
                            <div key={bar.place_id} className={ResultPageStyles.barContainer}>
                                
                                <div className={ResultPageStyles.barTitle}>
                                    <span className={ResultPageStyles.number}>{idx+1}</span>
                                    <span className={ResultPageStyles.clubName}>{bar.club_name_en}</span>
                                    {
                                        bar.closed?
                                        <span className={ResultPageStyles.closed}>
                                            閉店
                                        </span>
                                        :null
                                    }
                                </div>
                                
                                
                                <div className={ResultPageStyles.barImage}>
                                
                                    <img src={image_hosting_endpoint+bar.place_id+'.png'} alt={bar.clubName}/>
                            
                                </div>
                                
                                <ul className={ResultPageStyles.unorderedList}>
                                    <li className={ResultPageStyles.listItem}>{bar.category}</li>
                                </ul>
                                
                                <p className={ResultPageStyles.en}>{bar.description_en}</p>
                                
                                <p className={ResultPageStyles.ja}>{bar.description_ja}</p>

                                <a href={bar.google_map_url} target="blank" rel="noopener noreferrer" className={ResultPageStyles.addressLink}>
                                    <small className={ResultPageStyles.address}>{bar.address}</small><br/>
                                </a>
                            </div>
                        ))}
                        <h3 style={{fontWeight:300, padding: ".5rem", marginTop: "3rem", fontSize:"2rem"}}>Looking for more places? <br/>Download the app.</h3>
                        <div className={ResultPageStyles.badgeContainer}>
                            <a href="https://play.google.com/store/apps/details?id=com.placy.placyapp" alt="Download on Google Play" className={ResultPageStyles.badgeLink}>
                                <img className={ResultPageStyles.badge} src={play_store} alt="Download on Google Play">
                                </img>
                            </a>
                            <a href="https://apps.apple.com/jp/app/placy/id1474567327" alt="Download on the App Store" className={ResultPageStyles.badgeLink}>
                                <img className={ResultPageStyles.badge} src={app_store} alt="Download on the App Store">
                                </img>
                            </a>
                        </div>
                        <img className={ResultPageStyles.appPr} src={app_pr} alt="Follow Your Rhythm">
                        </img>
                    </div>
                    <div className={ResultPageStyles.imgContainer}>
                        <img 
                        src={svg_hosting_endpoint+pngMap[this.state.station_id]} 
                        alt={this.state.station_name}
                        className={ResultPageStyles.image}
                        />
                    </div>
                </div>
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