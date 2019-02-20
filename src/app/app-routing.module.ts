import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './components/map-list/map-list.module#MapListModule'
    },
    {
        path: 'login',
        loadChildren: './components/login/login.module#LoginModule'
    },
    {
        path: 'user',
        loadChildren: './components/user/user.module#UserModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
