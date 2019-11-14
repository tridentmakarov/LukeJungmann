import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import {trigger, animate, style, group, query, transition, keyframes, state} from '@angular/animations';

import * as $ from "jquery";


@Component({
	selector: '',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.scss']
})


export class SkillsComponent implements OnInit, OnDestroy {

	// public page: string = 'main';
	public page: string = 'programming';

	constructor() {

	}	// End-of constructor

	ngOnInit() {

	}	// End-of OnInit

	ngOnDestroy() {

	}	// End-of ngOnDestroy

	openPage(page: string) {
		this.page = page;
	}

	
}

