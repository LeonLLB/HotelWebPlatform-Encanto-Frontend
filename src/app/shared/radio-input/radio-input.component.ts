import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator.service';

interface RadioInput {
  value: any,
  label:string
}

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styles: [
  ]
})
export class RadioInputComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Input() radioInputs!: RadioInput[]
  @Input() inputName!: string
  @Input() label!: string
  @Output() onChange = new EventEmitter<any>()
  control!: FormControl;

  constructor(
    private validatorService: ValidatorService
  ){}
  
  ngOnInit() {
    // Fetch Form control (validator) from FormGroup parent
    this.control = <FormControl>this.formGroup.get(this.inputName);
  }

  esValido(campo: string): boolean | null {
    return (this.control.errors && this.control.touched)
  }
  
  getErrorMsg(campo: string): string | null{
    return this.validatorService.getErrorsMSG(this.control.errors)
  }

  change(event: any){
    this.onChange.emit(event)
  }

}
