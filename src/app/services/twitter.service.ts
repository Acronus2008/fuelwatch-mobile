import { Injectable } from '@angular/core';

export class TwitterService {

  constructor() { }

  loginWithTwitter() {
      localStorage['isLogged'] = true;
    console.log('try to loggin with twitter');
    return true;
  }
}
