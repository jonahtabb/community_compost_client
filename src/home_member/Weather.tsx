import { Component } from "react";

type WeatherProps = {}
type WeatherState = {
    temperature: number | null;
    humidity: number | null;
    icon: string
}

export default class Weather extends Component<WeatherProps, WeatherState>{
    constructor(props: WeatherProps) {
        super(props)
        this.state = {
            temperature: null,
            humidity: null,
            icon: ''
        }
    }

    fetchWeather = async () => {
        try {
            const res = await fetch(`http://api.airvisual.com/v2/nearest_city?key=a1d8a74d-2f39-4e75-a89f-70fa6578cbd9`)
            const json = await res.json()
            const {tp: temperature , hu: humidity, ic: icon} = await json.data.current.weather
            console.info(temperature, humidity, icon)


            this.setState({
                temperature,
                humidity,
                icon: `https://www.airvisual.com/images/${await icon}`
            })
            // Icon format https://www.airvisual.com/images/01n.png
            console.log(await json)

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
                <h3>Today's Weather</h3>
                {this.state.humidity}
                <img src={this.state.icon} alt="" />
            </div>            
        )
    }
}