import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { TweenMax, TimelineMax, Linear } from 'gsap';
import { MediaMatcher } from '@angular/cdk/layout';


import {trigger, animate, style, group, query, transition, keyframes, state} from '@angular/animations';


@Component({
	selector: '',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})


export class AboutComponent implements OnInit, AfterViewInit {

	public wipeAnimation = new TimelineMax()
		.fromTo("section.panel.turqoise", 	1, {x: '-100%'}, 	{x: '0%', ease: Linear.easeNone})
		.fromTo("section.panel.green", 		1, {x: '100%'}, 	{x: '0%', ease: Linear.easeNone})
		.fromTo("section.panel.bordeaux", 	1, {y: '-100%'}, 	{y: '0%', ease: Linear.easeNone})
	constructor() {


	}	// End-of constructor

	ngOnInit() {

	}	// End-of OnInit

	ngAfterViewInit() {
	}
}
