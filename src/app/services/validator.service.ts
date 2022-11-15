import { Injectable } from '@angular/core';
import { ValidationErrors, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  getErrorsMSG(errors: ValidationErrors | null): string | null{
    if(errors){
      // required
      if(errors['required']){
        return '* Este campo es obligatorio'
      }
      if(errors['notNumeric']){
        return '* Este campo no acepta números'
      }
      if(errors['email']){
        return '* Este campo no es un correo valido'
      }
      if(errors['numeric']){
        return '* Se esperaba un valor númerico'
      }
      if(errors['min']){
        return `* Se esperaba un valor mayor a ${errors['min']['min'] - 1} pero se obtuvo ${errors['min']['actual']}`
      }
      if(errors['minlength']){
        return `* Se esperaban más de ${errors['minlength']['requiredLength']} caracteres pero se obtuvieron ${errors['minlength']['actualLength']}`
      }
      if(errors['minNumericLength']){
        return `* Se esperaba más de ${errors['minNumericLength']['min'] -1} caracteres pero se obtuvieron ${errors['minNumericLength']['actual']}`
      }
      if(errors['max']){
        return `* Se esperaba un valor menor a ${errors['max']['max']+1} pero se obtuvo ${errors['max']['actual']}`
      }
      if(errors['maxlength']){
        return `* Se esperaba menos de ${errors['maxlength']['requiredLength']} caracteres pero se obtuvieron ${errors['maxlength']['actualLength']}`
      }
      if(errors['maxNumericLength']){
        return `* Se esperaba menos de ${errors['maxNumericLength']['max'] +1} caracteres pero se obtuvieron ${errors['maxNumericLength']['actual']}`
      }
      if(errors['dateNotGreaterThan']){
        return `* Se esperaba una fecha menor a ${(errors['dateNotGreaterThan']['max'] as Date).toLocaleDateString()}`
      }
      if(errors['dateGreaterThan']){
        return `* Se esperaba una fecha mayor a ${(errors['dateGreaterThan']['min'] as Date).toLocaleDateString()}`
      }
      if(errors['invalidDate']){
        return `* La fecha insertada no es valida`
      }
    }
    return null
  }

  numeric(control : FormControl): ValidationErrors | null {
    const value = control.value
    if(isNaN(value)){
      return {
        numeric: true
      }
    }
    return null
  }

  notNumeric(control : FormControl): ValidationErrors | null {
    const value = control.value
    if(!isNaN(value)){
      return {
        notNumeric: true
      }
    }
    return null
  }

  minNumericLength(length: number,isRequired:boolean = false): (control:FormControl<number>)=>ValidationErrors| null{
    return (control) => {
      if(!isRequired && (control.value === null ) ) return null
      const value = control.value?.toString()
      if(length > value.length){
        return {
          minNumericLength:{
            actual: value.length,
            min: length
          }
        }
      }
      return null
    }
  }

  dateGreaterThan(minDate: Date): (control:FormControl<string>)=>ValidationErrors| null{
    return (control) =>{
      const rawDate = control.value.split('-').map(value=>parseInt(value))
      const date = new Date(rawDate[0],rawDate[1]-1,rawDate[2])

      if(minDate>date){
        return{
          dateGreaterThan:{
            actual: date,
            min:minDate
          }
        }
      }
      return null
    }
  }

  dateNotGreaterThan(maxDate: Date): (control:FormControl<string>)=>ValidationErrors| null{
    return (control) =>{
      const rawDate = control.value.split('-').map(value=>parseInt(value))
      const date = new Date(rawDate[0],rawDate[1]-1,rawDate[2])

      if(maxDate<date){
        return{
          dateNotGreaterThan:{
            actual: date,
            max:maxDate
          }
        }
      }
      return null
    }
  }

  validDate():(control: FormControl<string>)=>ValidationErrors|null{
    return (control)=>{
      if(new Date(control.value).toString() === 'Invalid Date'){
        return {
          invalidDate:true
        }
      }
      return null
    }
  }

  venezuelanNumber():(control: FormControl<string>)=>ValidationErrors|null{
    return ({value})=>{
      if(!value.startsWith('04') && !value.startsWith('+584')){
        return {
          venezuelanNumber: true
        }
      }
      if(value.length !== 11 && value.length !== 13 ){
        return {
          venezuelanNumber: true
        }
      }
      return null
    }
  }

  maxNumericLength(length: number,isRequired:boolean = false): (control:FormControl<number>)=>ValidationErrors| null{
    return (control) => {
      if(!isRequired && (control.value === null ) ) return null
      const value = control.value?.toString()
      if(length < value?.length){
        return {
          maxNumericLength:{
            actual: value.length,
            max: length
          }
        }
      }
      return null
    }
  }


  constructor() { }
}
