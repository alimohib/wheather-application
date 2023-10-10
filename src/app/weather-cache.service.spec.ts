import { TestBed } from '@angular/core/testing';

import { WeatherCacheService } from './weather-cache.service';

describe('WeatherCacheService', () => {
  let service: WeatherCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
