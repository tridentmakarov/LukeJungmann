import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';


import {trigger, animate, style, group, query, transition, keyframes, state} from '@angular/animations';


@Component({
	selector: '',
	templateUrl: './resume.component.html',
	styleUrls: ['./resume.component.scss']
})


export class ResumeComponent implements OnInit, OnDestroy {

	pdfSrc: string = "./../../../assets/LukeJungmannResume.pdf#toolbar=0&navpanes=0&scrollbar=0";
	
	constructor() {


	}	// End-of constructor

	ngOnInit() {

	}	// End-of OnInit

	ngOnDestroy() {

	}	// End-of ngOnDestroy
}
