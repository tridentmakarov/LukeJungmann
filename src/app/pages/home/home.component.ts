import { 
	Component, 
	ElementRef, 
	OnInit, 
	OnDestroy, 
	Input, 
	Output, 
	EventEmitter,
	AfterViewInit,
	Inject, 
	HostListener, 
	ChangeDetectorRef 
} from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';

import { PageScrollInstance, PageScrollService, EasingLogic } from 'ngx-page-scroll';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/animations';

@Component({
	selector: '',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	animations: [
	trigger('scrollAnimation', [
		// state('show', style({
		// 	opacity: 1,
		// 	transform: "translateX(0)"
		// })),
		// state('hide',   style({
		// 	opacity: 0,
		// 	transform: "translateX(-100%)"
		// })),
		transition('show => hide',  group([
	        animate('0.3s ease', style({
	        	transform: "translateX(0)",
	        	opacity: 1,
	        })),
	        animate('0.3s 0.3s ease', style({
		        }))
		    ])
		),
		transition('hide => show', group([
	        animate('0.3s ease', style({
	        	transform: "translateX(-100%)",
	          	opacity: 0,
	        })),
	        animate('0.3s 0.3s ease', style({
		        }))
		    ])
		),
	])]
})


export class HomeComponent implements OnInit {

	public isMobile: boolean = false;
	public state = 'hide';

	private scrollingDown: boolean = true;
	public barSize: string = "grow";

	constructor(public el: ElementRef){


		// Check if mobile
		// let width = $(window).width();
		// if (width < 600) {
		// 	this.isMobile = true;
		// }

	}

    ngOnInit() {
    }

    @HostListener('window:scroll', ['$event'])

    checkScroll() {
		const componentPosition = 20;
		const scrollPosition = window.pageYOffset;

		let bottom = 600;
		let top = 450;

		if (scrollPosition >= bottom && this.scrollingDown) {
			this.barSize = 'shrink';
			this.scrollingDown = false;
			console.log(this.barSize)
		} else if (scrollPosition <= top && !this.scrollingDown ) {
			this.barSize = "grow";
			this.scrollingDown = true;
			console.log(this.barSize)
		}
    }
}
}
