import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ValidatorService } from 'src/app/services/validator.service';

interface InputOption {
  value: string,
  label:string
}

@Component({
  selector: 'hwp-arr-simple-select',
  template: `
    <div class="flex flex-col">
        <label [for]="inputName" class="font-light">{{labelText}}</label>
        <ng-container [formGroup]="formGroup">
          <ng-container [formArrayName]="formArrayName">
            <select 
            class="form-select border-gray-300 rounded-lg"
            [formControlName]="inputIndex"
            [name]="inputName"
            [id]="inputName">
                <option value="" *ngIf="hasEmptyOption"></option>
                <option *ngFor="let option of inputOptions" [value]="option.value">{{option.label}}</option>
            </select>
          </ng-container>          
        </ng-container> 
      </div>
  `,
  styles: [
  ]
})
export class ArrSimpleSelectComponent implements OnInit {
  
  @Input() formGroup!: FormGroup;
  @Input() formArrayName!: string;
  @Input() inputIndex!: number;
  @Input() label!: string;
  @Input() hasEmptyOption = true;
  @Input() inputOptions!: InputOption[];
  
  inputName!: string;
  control!: FormControl;
  debouncer: Subject<string> = new Subject()

  constructor(private validatorService: ValidatorService) { }

  ngOnInit() {
    this.inputName = this.label + this.inputIndex.toString()

    this.control = <FormControl>this.formGroup.get([this.formArrayName,this.inputIndex])
  }

  esValido(): boolean | null {
    return (this.control.errors && this.control.touched)
  }
  
  getErrorMsg(): string | null{
    return this.validatorService.getErrorsMSG(this.control.errors)
  }

  get labelText(){
    return this.label ? `${this.label}: ` : ''
  }

}
