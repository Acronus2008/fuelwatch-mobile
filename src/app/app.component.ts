import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public appPages = [
        {
            title: 'User Profile',
            url: '/user/profile',
            icon: 'fa fa-user-circle'
        },
        {
            title: 'Starred Gas Station',
            url: '/',
            icon: 'fa fa-heart'
        },
        {
            title: 'Station Reviews',
            url: '/',
            icon: 'fa fa-eye'
        },
        {
            title: 'Settings',
            url: '/user/settings',
            icon: 'fa fa-cogs'
        },
        {
            title: 'Help',
            url: '/',
            icon: 'fa fa-question-circle'
        },
        {
            title: 'Feedback',
            url: '/',
            icon: 'fa fa-comments'
        },
        {
            title: 'Terms of use',
            url: '/',
            icon: 'fa fa-file-text'
        },
        {
            title: 'Login',
            url: '/login',
            icon: 'fa fa-sign-in'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });

        localStorage['isLogged'] = false;
    }
}
