import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';


import {trigger, animate, style, group, query, transition, keyframes, state} from '@angular/animations';


@Component({
	selector: '',
	templateUrl: './blank.component.html',
	styleUrls: ['./blank.component.scss']
})


export class BlankComponent implements OnInit, OnDestroy {
	
	constructor() {


	}	// End-of constructor

	ngOnInit() {

	}	// End-of OnInit

	ngOnDestroy() {

	}	// End-of ngOnDestroy
}
