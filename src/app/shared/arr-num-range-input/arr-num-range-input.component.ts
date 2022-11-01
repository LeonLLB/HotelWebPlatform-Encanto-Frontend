import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-arr-num-range-input',
  template: `
    <ng-container [formGroup]="formGroup">
      <div class="flex flex-col justify-center">
          <span class="text-center">{{label}}</span>
          <div class="flex flex-row items-center">
              <div>
                  <app-arr-input
                      type="number"
                      [inputIndex]="inputIndexes[0]"
                      [formGroup]="formGroup"
                      [formArrayName]="formArrayName"
                      (onDebounce)="onDebounce()"
                      [classInput]="'forced ' + className"
                  ></app-arr-input>
              </div>
              <span class="material-icons">chevron_right</span>
              <div>
                  <app-arr-input
                      type="number"
                      [inputIndex]="inputIndexes[1]"
                      [formGroup]="formGroup"
                      [formArrayName]="formArrayName"
                      (onDebounce)="onDebounce()"
                      [classInput]="'forced ' + className"
                  ></app-arr-input>
              </div>                                
          </div>
      </div>
    </ng-container>
  `,
  styles: [
  ]
})
export class ArrNumRangeInputComponent implements OnInit {

  @Input() inputIndexes!: number[] 
  @Input() mins!: (number | null | undefined)[] 
  @Input() maxs!: (number | null | undefined)[] 
  @Input() formGroup!: FormGroup
  @Input('classInput') className!: string
  @Input() formArrayName!: string
  @Input() label!: string
  @Output() onChange = new EventEmitter()
  
  constructor() { }

  ngOnInit(): void {
  }

  onDebounce(){
    this.onChange.emit()
  }


}
