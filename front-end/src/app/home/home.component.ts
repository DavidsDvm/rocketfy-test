import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Sensor } from '../_models';
import { SensorService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    sensors?: Sensor[];

    constructor(private sensorService: SensorService) { }

    ngOnInit() {
        this.loading = true;
        this.sensorService.getAll().pipe(first()).subscribe(sensors => {
            this.loading = false;
            this.sensors = sensors;
        });
    }
}
