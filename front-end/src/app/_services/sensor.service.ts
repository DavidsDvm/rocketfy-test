import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Sensor } from '../_models';

@Injectable({ providedIn: 'root' })
export class SensorService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Sensor[]>(`${environment.apiUrl}/sensor`);
  }

  getById(id: string) {
    return this.http.get<Sensor>(`${environment.apiUrl}/sensor/${id}`);
  }

  generateDataById(id: string) {
    return this.http.post<Sensor>(`${environment.apiUrl}/sensor/generate/${id}`, {});
  }
}
