import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherCacheService {
  private cache: { [key: string]: { data: any, timestamp: number } } = {};

  constructor() { }

  set(key: string, data: any, ttl: number = 600000) { // ttl is time-to-live in milliseconds (default is 10 minutes)
    this.cache[key] = { data, timestamp: Date.now() + ttl };
  }

  get(key: string): any {
    const item = this.cache[key];
    if (item && item.timestamp > Date.now()) {
      return item.data;
    }
    return null;
  }
}
