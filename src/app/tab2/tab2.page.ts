import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  forecasts: any;
  forecastsArray: any[] = [];
  
  defaultSetlocation:boolean = false;
  UserCurrentlocation:boolean = false;

  constructor(
    private weatherService: WeatherService,
    private toastController: ToastController,
    private geolocation: Geolocation,
    ) {}

  
  async ionViewDidEnter() {
      try {
        const data = await this.weatherService.getWeatherForecast('pune');
        console.log(data);
        this.forecasts = data;
        this.forecastsArray = Object.values(this.forecasts.list);
        this.defaultSetlocation = true;
        this.UserCurrentlocation = false;

      } catch (error: any) {
        let message = 'An error occurred. Please try again.';
    
        if (error.status === 404) {
          message = 'City not found. Please check the city name and try again.';
        } else if (error.status === 0) {
          message = 'Network issue. Please check your internet connection.';
        }
    
        this.presentToast(message);
      }
      }

      async presentToast(message: string) {
        const toast = await this.toastController.create({
          message: message,
          duration: 3000, 
          position: 'bottom',
         cssClass: 'error-toast'
        });
        toast.present();
      }
      
      getForecastForCurrentLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
          const latitude = resp.coords.latitude;
          const longitude = resp.coords.longitude;
      
          this.weatherService.getWeatherByCoordinates(latitude, longitude)
            .then((data: any) => { 
              this.forecastsArray = data.list;
              console.log(this.forecastsArray);
              this.UserCurrentlocation = true;
              this.defaultSetlocation = false;
            })
            .catch((error) => {
              console.log('Error getting weather data', error);
            });
        }).catch((error) => {
          console.log('Error getting location', error);
        });
      }
      
    }