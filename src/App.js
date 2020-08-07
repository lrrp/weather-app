import React, { Component } from 'react';
import Weather from './components/weather/Weather';
import Form from './components/form/Form'


class App extends Component {
  state = {
    temperature : '',
    city : '',
    country : '',
    humidity : '',
    description : '',
    error : ''
  }
  
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=a39ace1e79f453fc45f82782ba2dae0e`);
    const data = await api.json();
    console.log(data);
    if(city && country) {
      this.setState({
        temperature : data.main.temp,
        city : data.name,
        country : data.sys.country,
        humidity : data.humidity,
        description : data.weather[0].description,
        error : ''
      })
    }else {
        this.setState({
          temperature : '',
          city : '',
          country : '',
          humidity : '',
          description : '',
          error : 'Please enter data'
        })
    }
  }
  render () {
    return (
      <div className="wrapper">
        <div className='form-container'>
          <Form getWeather={this.getWeather} />
          <Weather 
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
 
}

export default App;
