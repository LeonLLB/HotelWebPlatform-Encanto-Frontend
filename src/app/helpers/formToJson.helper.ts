import { FormGroup } from "@angular/forms";

interface json {
    [x:string]:any
}

export const formToJson = <T>(form: FormGroup,forceNumberTransform = false): T=>{
    let json: json = {}

    Object.entries(form.controls).forEach(([key,value])=>{
        
        if( 
            (value.value !== null &&  typeof value.value !== 'string' &&  !isNaN(value.value) )|| 
            (value.value !== null && !isNaN(value.value) && forceNumberTransform)
        ){
            json[key] = +value.value
            return
        } else if ( value.value !== null && typeof value.value === 'object' && value.value.length > 0 ) {
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

    return json as T
}