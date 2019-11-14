import { Component, ElementRef, OnInit, OnDestroy, Input, Output, EventEmitter,AfterViewInit,Inject, HostListener, ChangeDetectorRef } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';

import { PageScrollInstance, PageScrollService, EasingLogic } from 'ngx-page-scroll';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';

import { trigger, state, style, animate, transition, group, query, keyframes } from '@angular/animations';
import * as $ from "jquery";

@Component({
	selector: 'app-home-component',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	animations: [
	trigger('scrollAnimation', [
		transition(':enter',  group([
			style({ opacity: 0, transform: 'translateX(-60px)' }),
			animate('1s ease-in-out', keyframes([
				style({opacity: 0, transform: 'translateX(-60px)', offset: 0}),
				style({opacity: 1, transform: 'translateX(0px)', offset: 1.0})
			]))
		]))
	]), 
	trigger('fadeAnimation', [
		transition('out => in',  group([
			style({ opacity: 0, }),
			animate('4s ease-in-out', keyframes([
				style({opacity: 0, offset: 0.8}),
				style({opacity: 1, offset: 1.0})
			]))
		])),
		transition('in => out',  group([
			style({ opacity: 1, }),
			animate('1s ease-in-out', keyframes([
				style({opacity: 1, offset: 0}),
				style({opacity: 0, offset: 1.0})
			]))
		])),
	])
	]
})


export class HomeComponent implements OnInit {

	public start: boolean = false;
	public isMobile: boolean = false;
	public state = 'hide';
	public fade = 'out';
	public selected: number = 0;

	constructor(public el: ElementRef){

		// Check if mobile
		let width = $(window).width();
		if (width < 600) {
			this.isMobile = true;
		}

	}

    ngOnInit() {
 		setTimeout(() => this.start = true, 1000)
    }

	onHover(num: number) {
		console.log(num)
		this.selected = num;
	}
}

