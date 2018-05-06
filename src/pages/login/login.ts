import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {AuthProvider} from "../../providers/auth/auth";
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private readonly navCtrl: NavController,
              private readonly loadingCtrl: LoadingController,
              private readonly authProvider: AuthProvider,
              private readonly toastCtrl: ToastController) {
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  login(value: any) { // this create the loading window on the button
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Logging in ...'
    });

    loading.present();

    this.authProvider
      .login(value) // login takes a value so inside of the parameters of login we pass the value of this form inside of this component
      .pipe(finalize(() => loading.dismiss())) // with this property of observable pipe call that takes finalize
      // we pass the method dismiss to close the window
      .subscribe( // this will execute the specified function subscribing the Observable.
        () => {},
        err => this.handleError(err)); // catch the errors will create a new loader showing in the screen login fail if this auth has an error
  }

  handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Login failed';
    }
    else {
      message = `Unexpected error: ${error.statusText}`;
    }

    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}
