import { Component } from "react";
import {
    weather01d,
    weather01n,
    weather02d,
    weather02n,
    weather03d,
    weather04d,
    weather09d,
    weather10d,
    weather10n,
    weather11d,
    weather13d,
    weather50d
} from '../assets'

type WeatherProps = {}
type WeatherState = {
    temperature: number | null;
    humidity: number | null;
    iconCode: string,
    iconImage: string,
}

const weatherIconsLookup = [
    {code: "01d", image: weather01d},
    {code: "01n",image: weather01n},
    {code: "02d",image: weather02d},
    {code: "02n",image: weather02n},
    {code: "03d",image: weather03d},
    {code: "04d",image: weather04d},
    {code: "09d",image: weather09d},
    {code: "10d",image: weather10d},
    {code: "10n",image: weather10n},
    {code: "11d",image: weather11d},
    {code: "13d",image: weather13d},
    {code: "50d",image: weather50d}
]

export default class Weather extends Component<WeatherProps, WeatherState>{
    constructor(props: WeatherProps) {
        super(props)
        this.state = {
            temperature: null,
            humidity: null,
            iconCode: '',
            iconImage: ''
        }
    }

    fetchWeather = async () => {
        try {
            const res = await fetch(`https://api.airvisual.com/v2/nearest_city?key=a1d8a74d-2f39-4e75-a89f-70fa6578cbd9`)
            const json = await res.json()
            const {tp: Celtemp, hu: humidity, ic: iconCode} = await json.data.current.weather

            const farTemp = Math.floor((Celtemp * 1.8) + 32)
            const iconImageIndex = weatherIconsLookup.findIndex(icon => icon.code === iconCode);
            const iconImage = weatherIconsLookup[iconImageIndex].image

            this.setState({
                temperature: farTemp,
                humidity,
                iconCode,
                iconImage
            })

        }catch(error){
            console.error(error)
        }
    } 
    
    componentDidMount(){
        this.fetchWeather()
    }
    render(){

        return (
            <div className="member-dash-card">
                <div className="container weather-card-container">
                <h1>Today's Weather</h1>
                    <div className="row">
                        <div className="col">
                            <h2>{this.state.temperature} ° F</h2>
                        </div>
                        <div className="col">
                            <img src={this.state.iconImage} alt="" width="75px" style={{borderRadius: "50%", backgroundColor: "hsla(81, 65%, 30%, 0.322)"}} />
                        </div>
                    </div>
                </div>
            </div>            
        )
    }
}