import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { ValidatorService } from 'src/app/services/validator.service';

type InputElementType = 'text' | 'number' | 'password' | 'radio' | 'date' | 'tel'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styles: [
  ]
})
export class InputComponent implements OnInit, OnDestroy {

  @Input() formGroup!: FormGroup;
  @Input() inputName!: string;
  @Input() label: string = '';
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string = '';
  @Input('classInput') className!: string;
  @Input() max!: string | number | undefined | null
  @Input() min!: string | number | undefined | null
  @Input() type: InputElementType = 'text';
  @Input() datalist: string[] = []

  control!: FormControl;
  debouncer: Subject<string> = new Subject()

  constructor(private validatorService: ValidatorService) { }

  ngOnInit() {
    // Fetch Form control (validator) from FormGroup parent
    this.control = <FormControl>this.formGroup.get(this.inputName);

    this.debouncer
    .pipe(debounceTime(300))
    .subscribe(event => this.onDebounce.emit(event))

  }

  esValido(): boolean | null {
    return (this.control.errors && this.control.touched)
  }
  
  getErrorMsg(): string | null{
    return this.validatorService.getErrorsMSG(this.control.errors)
  }

  onValueChange(){
    this.debouncer.next(this.control.value)
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe()
  }

}
