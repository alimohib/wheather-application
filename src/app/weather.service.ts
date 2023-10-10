import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { WeatherCacheService } from './weather-cache.service';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  static getCurrentWeather(cityName: string) {
    throw new Error('Method not implemented.');
  }
  apiKey = '3af246ad33f872afb74151180584ad45'; 
  apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(
    private http: HttpClient, 
    private cacheService: WeatherCacheService
    ) { }

    getCurrentWeather(city: string) {
      const cachedData = this.cacheService.get(`current_${city}`);
      if (cachedData) {
        return Promise.resolve(cachedData);
      }
      
      return this.http.get(`${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`)
        .toPromise()
        .then(data => {
          this.cacheService.set(`current_${city}`, data);
          return data;
        });
    }
  
    getWeatherForecast(city: string) {
      const cachedData = this.cacheService.get(`forecast_${city}`);
      if (cachedData) {
        return Promise.resolve(cachedData);
      }
  
      return this.http.get(`${this.apiUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`)
        .toPromise()
        .then(data => {
          this.cacheService.set(`forecast_${city}`, data);
          return data;
        });
    }
  

    async getCurrentLocationWeather() {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        const lat = coordinates.coords.latitude;
        const lon = coordinates.coords.longitude;
        return this.http.get(`${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`).toPromise();
      } catch (error) {
        throw new Error('Error fetching weather for current location');
      }
    }
    
  
    getWeatherByCoordinates(lat: number, lon: number) {
      const cachedData = this.cacheService.get(`forecast_${lat}_${lon}`);
      if (cachedData) {
        return Promise.resolve(cachedData);
      }
  
      return this.http.get(`${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`)
        .toPromise()
        .then(data => {
          this.cacheService.set(`forecast_${lat}_${lon}`, data);
          return data;
        });
    }
}
