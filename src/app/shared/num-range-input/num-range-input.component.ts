import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-num-range-input',
  template: `
    <ng-container>
      <div class="flex flex-col justify-center">
          <span class="text-center">{{label}}</span>
          <div class="flex flex-row items-center">
              <div>
                  <app-input
                      type="number"
                      [inputName]="inputNames[0]"
                      [min]="mins[0]"
                      [max]="maxs[0]"
                      [formGroup]="formGroup"
                      (onDebounce)="onDebounce()"
                  ></app-input>
              </div>
              <span class="material-icons">chevron_right</span>
              <div>
                  <app-input
                      type="number"
                      [inputName]="inputNames[1]"
                      [min]="mins[1]"
                      [max]="maxs[1]"
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
export class NumRangeInputComponent implements OnInit {

  @Input() inputNames!: string[] 
  @Input() mins!: (number | null | undefined)[] 
  @Input() maxs!: (number | null | undefined)[] 
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
