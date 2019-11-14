import { 
	Component, ElementRef, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, Inject, HostListener, ChangeDetectorRef, ViewEncapsulation, ViewChild
} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { MatDialog, MatIcon, MatSnackBar } from '@angular/material';
import * as $ from "jquery";

import { trigger, state, style, animate, transition, group, query, keyframes } from '@angular/animations';
import { TweenMax, TimelineMax, Linear } from 'gsap';
import 'rxjs/add/operator/filter';


import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';

import { PageScrollInstance, PageScrollService, EasingLogic } from 'ngx-page-scroll';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';

import { TypingAnimationModule } from 'angular-typing-animation';

import { fadeAnimation } from './animations';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [fadeAnimation]
})

export class AppComponent implements OnInit, OnDestroy {

	@ViewChild('sidenav') sidenav: MatSidenav;

	public isMobile: boolean = false;
	public state = 'hide';
	public toolbar = document.getElementById("toolbar");
	public toolbarbar = document.getElementById("toolbarbar");
	public w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	public h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	start: boolean = false;

	private scrollingDown: boolean = true;
	public barSize: string = "grow";

	private marg: number;
	private high: number;
	public mainPage: boolean = true;
	public url: string;
	public pageList: string[] = ["portfolio", "contact", "resume", "about"];
	public currentPage: string;

	public showNav: boolean = false;
	public scrollPage: boolean = true;
  	public pageView: boolean = false;
  	public lastScroll: number = 0;

	constructor(
		public snackBar: MatSnackBar, 
		public el: ElementRef,
		public router: Router
	){


		// Check if mobile
		let width = $(window).width();
		if (width < 600) {
			this.isMobile = true;
		}
		router.events.filter(event => event instanceof NavigationStart)
	    	.subscribe((event) => {
	    		this.url = event["url"];
	    		let short = this.url.replace(/\\|\//g,'');
	    		this.currentPage = short;
	    		let others = this.pageList.filter(e => e !== short);

	    		this.scrollPage = short != "portfolio";

	    		if (short && short != 'home') {
	    			console.log('animating up')
	    			$("#overlay-container").animate({
						scrollTop: window.innerHeight + 100
					} /* speed */ );
	    			// $('#overlay-container').scrollTop(window.innerHeight + 100)
	    			$('#overlay-container').css("pointer-events", "all")
	    		} else {
	    			$("#overlay-container").animate({
						scrollTop: 0
					} /* speed */ );
	    			$('#overlay-container').css("pointer-events", "none")
	    		}
	    });
	}

	ngOnInit(): void {
		setTimeout(() => this.start = true, 1000)
		this.toolbar = document.getElementById("toolbar");
		this.toolbarbar = document.getElementById("toolbarbar");

	    $('#overlay-container').on( 'scroll', (event) => {
	    	let scrollPos = $('#overlay-container').scrollTop();
	    	let pageHeight = window.innerHeight - (this.isMobile ? 64 : 88);
	    	let scrollVal = scrollPos - this.lastScroll;
	    	let scrollUp = scrollVal > 0;

	    	// || (scrollPos < pageHeight * (this.isMobile ? 1 : 1/3) && scrollVal < (this.isMobile ? -0 : -2) && scrollVal > (this.isMobile ? -10 : -4))

	    	if (scrollPos < pageHeight * (this.isMobile ? 0.75 : 0.33) && !scrollUp)  {
	    		this.router.navigateByUrl("/home/")
	    		$('#overlay-container').css("pointer-events", "none")
	    	}
	    	this.lastScroll = scrollPos;
		});
	}

	ngOnDestroy(): void {

	}	// End-of ngOnDestroy

	openSnackBar(): void {
		this.snackBar.open("This is a work in progress, please come back soon!", "Okay!", {
			duration: 8000,
		});
	}

	close(): void {
		this.sidenav.close();
	}
}
