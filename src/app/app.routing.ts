import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
	ResumeComponent,
	AboutComponent,
	ContactComponent, 
	HomeComponent,
	ToolsComponent,
	BlankComponent
} from './pages/';

import * as Skills from './pages/skills';

const routes: Routes = [
	{
		path: 'portfolio',
		component: Skills.SkillsComponent,
		children: [
			{
				path: '**',
				component: Skills.SkillsComponent,
			},
			{
				path: 'design',
				component: Skills.SkillsDesignComponent,
			},
			{
				path: 'programming',
				component: Skills.SkillsProgrammingComponent,
			},
		]
	},
	{
		path: 'tools',
		component: ToolsComponent,
	},
	{
		path: 'resume',
		component: ResumeComponent,
	},
	{
		path: 'about',
		component: AboutComponent,
	},
	{
		path: 'contact',
		component: ContactComponent,
	},
	{
		path: 'home',
		component: BlankComponent,
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
