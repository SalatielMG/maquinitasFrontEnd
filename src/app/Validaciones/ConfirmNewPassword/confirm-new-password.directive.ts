import {Directive, Injectable} from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import {UtileriasService} from '../../Servicios/Utilerias/utilerias.service';

@Directive({
  selector: '[appConfirmNewPassword]'
})
@Injectable({
  providedIn: 'root'
})
export class ConfirmNewPasswordDirective implements Validator{

  constructor(private util: UtileriasService) { }

  validate(control: AbstractControl): ValidationErrors | null {
    const confirmPassword = <string> control.value;
    console.log("newPassword [" + this.util.newPassword +"] == confirmPassword [" + confirmPassword +"]");
    if (this.util.newPassword != confirmPassword){
      return {NoConfirmNewPassword: true};
    }
    return null;
  }

}
