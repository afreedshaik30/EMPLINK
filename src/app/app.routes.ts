import { Routes } from '@angular/router';
import { HomeComponent } from './employee/home/home.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path:'employee', redirectTo:'home', pathMatch:'full'},
    {path:'', redirectTo: 'home', pathMatch:'full'}
];
