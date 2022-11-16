import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator.service';

interface RadioIconInput {
  icon?:string
  icons?:string[]
  value: any,
  label:string
}


@Component({
  selector: 'hwp-icon-radio-input',
  templateUrl: './icon-radio-input.component.html',
  styles: [
  ]
})
export class IconRadioInputComponent implements OnInit {

 
  @Input() formGroup!: FormGroup;
  @Input() radioInputs!: RadioIconInput[]
  @Input() inputName!: string
  @Input() label!: string
  @Output() onChange = new EventEmitter<any>()
  control!: FormControl;

  constructor(
    private validatorService: ValidatorService
  ){}
  
  ngOnInit() {
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
