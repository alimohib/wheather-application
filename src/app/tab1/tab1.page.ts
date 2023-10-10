import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  city: string = '';
  weather: any;

  constructor(
    private weatherService: WeatherService,
    private toastController: ToastController
    ) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, 
      position: 'bottom' ,
      cssClass: 'error-toast'
    });
    toast.present();
  }
  async searchWeather() {
    try {
      const data = await this.weatherService.getCurrentWeather(this.city);
      this.weather = data;
    } catch (error: any) {
      let message = 'An error occurred. Please try again.';
  
      if (error.status === 404) {
        message = 'City not found. Please check the city name and try again.';
      } else if (error.status === 0) {
        message = 'Network issue. Please check your internet connection.';
      } else if (error.status === 400) {
        message = 'Please enter city name.';
      }
  
      this.presentToast(message);
    }
  }

  async getCurrentLocationWeather() {
    try {
      const data = await this.weatherService.getCurrentLocationWeather();
      this.weather = data;
      console.log(data);
    } catch (error) {
      console.error('Error fetching weather for current location:', error);
    }
  }
   
}
