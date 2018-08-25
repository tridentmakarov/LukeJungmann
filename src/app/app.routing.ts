import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {
	HomeComponent, 
	AboutComponent
} from './pages/';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
		children: [
			{
				path: 'about',
				component: AboutComponent,
			},
		]

	},
	{
		path: '**',
		redirectTo: 'home'
	} // End of path

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRouting { }