import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { ValidatorService } from 'src/app/services/validator.service';

type InputElementType = 'text' | 'number' | 'password' | 'radio'

@Component({
  selector: 'app-arr-input',
  templateUrl:'arr-input.component.html',
  styles: []
})
export class ArrInputComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Input() formArrayName!: string;
  @Input() type!: InputElementType;
  @Input('classInput') className!: string
  @Input() inputIndex!: number;
  @Input() label!: string;
  @Input() placeholder: string = '';
  
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
