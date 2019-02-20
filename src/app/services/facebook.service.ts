import {EventEmitter, Injectable} from '@angular/core';

// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

export class FacebookService {

    // event = EventEmitter();

    // constructor(private fb: Facebook) {
    // }

    constructor() { }

    async loginWithFacebook() {
        /*this.fb.login(['public_profile', 'user_friends', 'email'])
            .then((res: FacebookLoginResponse) => this.userLoged(res))
            .catch(e => console.log('Error logging into Facebook', e));


        this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);*/
        this.userLoged('the user was logged');
    }

    userLoged(res) {
        localStorage['isLogged'] = true;
        console.log('Logged into Facebook!', res);

        if (res) {

            return true;
        }

        return false;
    }

    userLogedException(exception) {
        if (exception) {

        }
    }
}
