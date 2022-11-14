import { FormGroup } from "@angular/forms";

interface json {
    [x:string]:any
}

export const formToJson = <T>(form: FormGroup,forceNumberTransform = false): T=>{
    let json: json = {}
    Object.entries(form.controls).forEach(([key,value])=>{
        console.log(value.value, value.value.length)
        if( 
            (value.value !== null &&  typeof value.value === 'number' &&  !isNaN(value.value) )|| 
            (value.value !== null && typeof value.value === 'string' && !isNaN(parseInt(value.value)) && forceNumberTransform)
        ){
            json[key] = +value.value
            return
        } else if ( value.value !== null && value.value.constructor.toString().includes('Array') && value.value.length >= 0 ) {            
            json[key] = (value.value as any[]).map((input)=>{
                if( 
                    (input !== null &&  typeof input !== 'string' &&  !isNaN(input) )|| 
                    (input !== null && !isNaN(input) && forceNumberTransform)
                ){
                    return +input
                } else {
                    return input
                }
            })
            return
        }
        json[key] = value.value

    })
    console.log(json)
    return json as T
}