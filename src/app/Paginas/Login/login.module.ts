import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {ModalRestablecerContrasenaPageModule} from './ModalRestablecerContrasena/modal-restablecer-contrasena.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ModalRestablecerContrasenaPageModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
