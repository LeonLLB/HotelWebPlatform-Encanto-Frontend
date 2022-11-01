import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-range-input',
  template: `
    <ng-container>
      <div class="flex flex-col justify-center">
          <span class="text-center">{{label}}</span>
          <div class="flex flex-row items-center">
              <div>
                  <app-input
                      type="date"
                      [inputName]="inputNames[0]"
                      [min]="minDates[0]"
                      [max]="maxDates[0]"
                      [formGroup]="formGroup"
                      (onDebounce)="onDebounce()"
                  ></app-input>
              </div>
              <span class="material-icons">chevron_right</span>
              <div>
                  <app-input
                      type="date"
                      [inputName]="inputNames[1]"
                      [min]="minDates[1]"
                      [max]="maxDates[1]"
                      [formGroup]="formGroup"
                      (onDebounce)="onDebounce()"
                  ></app-input>
              </div>                                
          </div>
      </div>
    </ng-container>
  `,
  styles: [
  ]
})
export class DateRangeInputComponent implements OnInit {

  @Input() inputNames!: string[] 
  @Input() minDates!: string[] 
  @Input() maxDates!: string[] 
  @Input() formGroup!: FormGroup
  @Input() label!: string
  @Output() onChange = new EventEmitter()
  
  constructor() { }

  ngOnInit(): void {
  }

  onDebounce(){
    this.onChange.emit()
  }

}
