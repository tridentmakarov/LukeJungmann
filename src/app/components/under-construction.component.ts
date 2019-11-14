import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { TweenMax, TimelineMax, Linear } from 'gsap';
import { MediaMatcher } from '@angular/cdk/layout';


import {trigger, animate, style, group, query, transition, keyframes, state} from '@angular/animations';


@Component({
	selector: 'under-construction',
	templateUrl: './under-construction.component.html',
	styleUrls: ['./under-construction.component.scss']
})


export class UnderConstructionComponent implements OnInit, AfterViewInit {

	ngOnInit() {

	}	// End-of OnInit

	ngAfterViewInit() {
	}
}
