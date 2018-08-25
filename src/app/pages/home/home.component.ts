import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, Inject  } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';

import { PageScrollInstance, PageScrollService, EasingLogic } from 'ngx-page-scroll';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';


@Component({
	selector: '',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})


export class HomeComponent implements OnInit {

	public isMobile: boolean = false;

	constructor(){


		// Check if mobile
		// let width = $(window).width();
		// if (width < 600) {
		// 	this.isMobile = true;
		// }

	}

    ngOnInit() {
    }
}
