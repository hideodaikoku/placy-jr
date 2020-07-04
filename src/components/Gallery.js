import React, {Component} from "react"
import {Link} from "react-router-dom";
import galleryStyles from "../styles/gallery.module.css";
import stationData from "../data/stations.json";
import pngData from "../data/pngMap.json"
import ResultPage from "./ResultPage"

const svg_hosting_endpoint = 'https://urban-rhythm-guide.s3-ap-northeast-1.amazonaws.com/';

export default class Gallery extends Component{
    render(){
        return(
            <div className={galleryStyles.container}>
                {this.props.changed?
                <ResultPage
                 code = {this.props.code}
                 hideLoading = {true}
                />
                :
                <>
                <div className={galleryStyles.titleContainer}>
                    <Link to="/" className={galleryStyles.arrowLink}>
                        <h1 id={galleryStyles.arrow}>
                            &#8592;
                        </h1>
                    </Link>
                    <h1 id={galleryStyles.title}>Browse</h1>
                </div>
                <div className={galleryStyles.gridContainer}>
                        <div className={galleryStyles.grid}>
                            {stationData.map(station=>(
                                <div key={station.station_id} onClick={()=>this.props.selectStation(station.station_id)}>
                                    <img 
                                        src={svg_hosting_endpoint+pngData[station.station_id]} 
                                        alt={station.station}
                                        className={galleryStyles.image}    
                                    />
                                <div className={galleryStyles.stationName}>
                                    {station.station}
                                </div>
                                </div>
                            )
                            )}
                        </div>
                </div>
                </>
                }           
            </div>
        )
    }
}