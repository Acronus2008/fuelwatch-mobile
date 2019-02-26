import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private DEFAULT_UER_IMAGE: './assets/user_picture.png';

  userImage: any;
  userName: any;
  userEmail: any;

  constructor(private router: Router, private route: ActivatedRoute) {

      if (this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state) {
          this.setUserProfileData(this.router.getCurrentNavigation().extras.state);
      }

  }

    private setUserProfileData(routerData) {
        this.userName = '';
        this.userEmail = '';
        this.userImage = this.DEFAULT_UER_IMAGE;

        if (routerData.name) {
            this.userName = routerData.name.replace(' ', '_').toLowerCase();
        }

        if (routerData.email) {
            this.userEmail = routerData.email;
        }

        if (routerData.picture) {
            this.userImage = routerData.picture;
        }
    }

    ngOnInit() {
  }

}
