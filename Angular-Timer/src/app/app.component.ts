import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  max     = 1;
  current = 0;

  start() {
    const duration = interval(100);
    duration.pipe(
    takeWhile(_ => !this.isFinished),
    tap(i => this.current += 0.1))
    .subscribe();
  }

   /// finish timer
  finish() {
    this.current = this.max;
  }

  /// reset timer
  reset() {
    this.current = 0;
  }


  /// Getters to prevent NaN errors

  get maxVal() {
    return isNaN(this.max) || this.max < 0.1 ? 0.1 : this.max;
  }

  get currentVal() {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }

  get isFinished() {
    return this.currentVal >= this.maxVal;
  }



}