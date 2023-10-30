import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Sensor } from '../_models';
import { SensorService } from '../_services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'detail.component.html' })
export class DetailComponent {
  loading = false;
  sensorId?: string;
  sensor!: Sensor;
  checked = false;
  chartsData: any[] = [];

  // Define the data items you want to create charts for
  dataItems = ['temperature', 'humidity', 'pressure', 'wind_speed', 'noise_level'];

  constructor(
    private sensorService: SensorService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Get parameter from URL
    this.sensorId = window.location.pathname.split('/')[2];

    if (!this.sensorId) {
      this.router.navigate(['/']);
    }

    this.loading = true;
    this.sensorService
      .getById(this.sensorId)
      .pipe(first())
      .subscribe((sensor) => {
        this.loading = false;
        this.sensor = sensor;

        for (const item of this.dataItems) {
          if (sensor.data[0] && sensor.data[0].hasOwnProperty(item)) {
            const chartData = this.transformData(sensor.data, item);
            this.chartsData.push([{ name: item, series: chartData }]);
          }
        }

        console.log(this.chartsData)
      });
  }

  onSlideToggleChange() {
    this.loading = true;
    this.chartsData = [];

    if (this.checked && this.sensorId) {
      this.sensorService
      .getById(this.sensorId)
      .pipe(first())
      .subscribe((sensor) => {
        this.loading = false;
        this.sensor = sensor;

        for (const item of this.dataItems) {
          if (sensor.data[0] && sensor.data[0].hasOwnProperty(item)) {
            const chartData = this.transformData(sensor.data, item);
            this.chartsData.push([{ name: item, series: chartData }]);
          }
        }
      });
    }


    this.checked = !this.checked;
    if(this.checked && this.sensorId) {
      this.sensorService
        .generateDataById(this.sensorId)
        .pipe(first())
        .subscribe((sensor) => {
          this.loading = false;
          this.sensor = sensor;

          for (const item of this.dataItems) {
            if (sensor.data[0] && sensor.data[0].hasOwnProperty(item)) {
              const chartData = this.transformData(sensor.data, item);
              this.chartsData.push([{ name: item, series: chartData }]);
            }
          }
        });
    }
  }

  // transform data to chart
  transformData(data: any, dataItem: string) {
    const result = [];
    for (const item of data) {
      result.push({
        name: item.timestamp,
        value: item[dataItem],
      });
    }
    return result;
  }
}
