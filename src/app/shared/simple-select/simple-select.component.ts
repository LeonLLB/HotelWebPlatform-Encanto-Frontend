import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

interface InputOption {
  value: string,
  label:string
}

@Component({
  selector: 'app-simple-select',
  template: `
      <div class="flex flex-col">
        <label for="tipo" class="font-light">{{label}}</label>
        <ng-container [formGroup]="formGroup">
            <select 
            class=" border-gray-300 rounded-lg"
            (change)="onChange()"
            [formControlName]="inputName"
            [name]="inputName"
            [id]="inputName">
                <option *ngFor="let option of inputOptions" [value]="option.value">{{option.label}}</option>
            </select>
        </ng-container> 
      </div>
  `,
  styles: [
  ]
})
export class SimpleSelectComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Input() inputName!: string;
  @Input() label!: string;
  @Input() inputOptions!: InputOption[];
  @Output() onChangeFunc: EventEmitter<string> = new EventEmitter();

  control!: FormControl;

  constructor() { }

  ngOnInit() {
    this.control = <FormControl>this.formGroup.get(this.inputName);
  }

  onChange(){
    this.onChangeFunc.emit()
  }

}
