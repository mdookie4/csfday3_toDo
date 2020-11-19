import { ValidatorFn, AbstractControl } from '@angular/forms';

// export function dateCheckValidator() : ValidatorFn {
//     return (control: AbstractControl):{[key:string]: any} | null => {

export function dateCheckValidator(control: AbstractControl):{[key:string]: any} | null {
        const dateString: string = control.value.toString();
        console.log(dateString);

        if(control.pristine) {
            return null;
        }
        if((control.value!==undefined && control.value!=='' && control.value!=null)) {
            const currentDate = new Date();
            var yyyy = currentDate.getFullYear();
            var mm = currentDate.getMonth() + 1;
            var dd = currentDate.getDate();

            console.log("currentDate: ", yyyy + " " + mm + " " + dd)

            var splitYYYY = null;
            var splitMM = null;
            var splitDD = null;

            if(control.value.indexOf('-') > -1) {
                var splitDate = dateString.split("-");
                if (splitDate.length > 1) {
                    splitYYYY = parseInt(splitDate[0]);
                    splitMM = parseInt(splitDate[1]);
                    splitDD = parseInt(splitDate[2]);
                    console.log("splitDate: ", splitYYYY + " " + splitMM + " " + splitDD)
                }
            }
            //check through form date and current date
            if(splitYYYY < yyyy) {
                return { 'dateOverDue' : true};
            }  
            else if (splitYYYY === yyyy) {
                if(splitMM < mm) {
                    return { 'dateOverDue' : true};
                } 
                else if (splitMM === mm) {
                    if(splitDD < dd) {
                        return { 'dateOverDue' : true};
                    }
                }
            }
        }
        return null;
    //};
}