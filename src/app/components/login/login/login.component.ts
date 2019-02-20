import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FacebookService} from '../../../services/facebook.service';
import {TwitterService} from '../../../services/twitter.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute,
                private facebookService: FacebookService,
                private twitterService: TwitterService) {
    }

    ngOnInit() {
    }

    signUp() {
        this.router.navigate(['sign'], {relativeTo: this.route});
    }

    loginFacebook() {
        this.facebookService.loginWithFacebook();
    }

    loginTwitter() {
        localStorage['isLogged'] = true;
        this.twitterService.loginWithTwitter();
    }

    forgotPassword() {
        this.router.navigate(['forgot'], {relativeTo: this.route});
    }

}
