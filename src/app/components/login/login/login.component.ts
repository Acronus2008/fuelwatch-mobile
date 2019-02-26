import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FacebookService} from '../../../services/facebook.service';
import {TwitterService} from '../../../services/twitter.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    isLoggedIn: boolean;
    users: any;

    constructor(private router: Router, private route: ActivatedRoute,
                private facebookService: FacebookService,
                private twitterService: TwitterService,
                public loadingController: LoadingController,
                private facebook: Facebook,
                private twitter: TwitterConnect,
                private nativeStorage: NativeStorage) {
    }

    ngOnInit() {

        this.facebook.getLoginStatus().then((connected) => {
           if (connected.status === 'connected') {
               this.getRefreshTokenFromFacebook(connected);
           } else {
               this.removeCredentialsFromFacebook();
           }
        }, error => {
            console.log(error);
        });

    }

    async presentLoading(loading) {
        return await loading.present();
    }



    signUp() {
        this.router.navigate(['sign'], {relativeTo: this.route});
    }

   async loginTwitter() {
       const loading = await this.loadingController.create({
           message: 'Please wait...'
       });

       this.presentLoading(loading);

        this.twitter.login().then(response => {
            this.twitter.showUser().then(user => {
                console.log(user);
                loading.dismiss();
            }, err => {
                console.log(err);
                const profile_image = err.profile_image_url_https.replace('_normal', '');
                this.nativeStorage.setItem('twitter_user', {
                    name: err.name,
                    userName: err.screen_name,
                    followers: err.followers_count,
                    picture: profile_image
                }).then(() => {
                    this.router.navigate(['/user']);
                    loading.dismiss();
                }, (error) => {
                    console.log(error);
                    loading.dismiss();
                });
            });
        }, err => {
            loading.dismiss();
        });
    }

   async loginFacebook() {

        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });

        this.presentLoading(loading);

        const permissions = ['public_profile', 'email'];

        this.facebook.login(permissions)
            .then(response => {
                const userId = response.authResponse.userID;

                // Getting name and gender properties
                this.facebook.api('/me?fields=name,email', permissions)
                    .then(user => {
                        user.picture = 'https://graph.facebook.com/' + userId + '/picture?type=large';
                        // now we have the users info, let's save it in the NativeStorage

                        const facebookAccessToken = this.facebook.getAccessToken().then((token) => {
                                this.facebook.logEvent(this.facebook.EVENTS.EVENT_NAME_PUSH_TOKEN_OBTAINED);
                                return token;
                        });

                        this.setLocalStorageFacebookLogged(user, loading, facebookAccessToken);

                        this.facebook.logEvent(this.facebook.EVENTS.EVENT_PARAM_SUCCESS);
                    });
            }, error => {
                console.log(error);
                this.facebook.logEvent(this.facebook.EVENTS.EVENT_NAME_SESSION_INTERRUPTIONS);
                loading.dismiss();
            }).then(() => {
              this.nativeStorage.setItem('isLogged', true);
            });
    }

    private getRefreshTokenFromFacebook(connected) {
        this.nativeStorage.setItem('isLogged', true);
        this.nativeStorage.setItem('facebook_token', connected.authResponse.accessToken);
    }

    twitterLogout() {
        this.twitter.logout().then(response => {
            this.nativeStorage.remove('twitter_user');
            this.router.navigate(['/login']);
        }, error => {
            console.log(error);
        });
    }

    facebookLogout() {
        this.facebook.logout()
            .then(res =>{
                // user logged out so we will remove him from the NativeStorage
                this.nativeStorage.remove('facebook_user');
                this.router.navigate(['/login']);
            }, error =>{
                console.log(error);
            });
    }

    private setLocalStorageFacebookLogged(user, loading, accessToken) {
        this.nativeStorage.setItem('facebook_token', accessToken);
        this.nativeStorage.setItem('facebook_user',
            {
                name: user.name,
                email: user.email,
                picture: user.picture,
                token: accessToken
            })
            .then(() => {
                /*aqui es donde devemos meter al usuario a la base de datos cuando este se registre con Facebook
                * hay que meter el token en la sesion, esto puede tener un tiempo de caducidad, por tanto no lo podemos meter en db*/
                this.router.navigate(['/user'], {state: { name: user.name, email: user.email, picture: user.picture, token: accessToken }});
                // this.router.navigate(['/home/map']);
                loading.dismiss();
            }, error => {
                console.log(error);
                loading.dismiss();
            });
    }

    private removeCredentialsFromFacebook() {
        this.nativeStorage.remove('facebook_user');
        this.nativeStorage.remove('facebook_token');
    }



    getUserDetail(userid) {
        this.facebook.api('/' + userid + '/?fields=id,email,name,picture,gender', ['public_profile'])
            .then(res => {
                console.log(res);
                this.users = res;
            })
            .catch(e => {
                console.log(e);
            });
    }

    forgotPassword() {
        this.router.navigate(['forgot'], {relativeTo: this.route});
    }

}
