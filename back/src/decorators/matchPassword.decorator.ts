import {ValidatorConstraint,ValidationArguments, ValidatorConstraintInterface} from 'class-validator'

@ValidatorConstraint({
    name:'MatchPassword',
    async:false 
})
export class MatchPassword implements ValidatorConstraintInterface{
 validate(password:any, args:ValidationArguments): boolean | Promise<boolean> {
     
    if(password!== (args.object as any)[args.constraints[0]] )return false

    return true
 }
 defaultMessage(validationArguments?: ValidationArguments):string {
     return 'password and password confirmation don`t match'
 }
} 