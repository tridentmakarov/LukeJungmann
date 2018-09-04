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
	ChangeDetectorRef,
	ViewEncapsulation
} from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatIcon, MatSnackBar } from '@angular/material';
import * as $ from "jquery";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [
	trigger('scrollAnimation', [
		state('grow', style({
			minHeight: '80px',
			opacity: 1.0
		})),
		state('shrink',   style({
			minHeight: '40px',
			opacity: 0.5
		})),
		transition('grow => shrink', animate('700ms ease-in')),
		transition('shrink => grow', animate('700ms ease-out'))
		])
	]
})

export class AppComponent implements OnInit, OnDestroy {

	public isMobile: boolean = false;
	public state = 'hide';
	public toolbar = document.getElementById("toolbar");
	public toolbarbar = document.getElementById("toolbarbar");
	public w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	public h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	public tbW;
	public tbH;

	private scrollingDown: boolean = true;
	public barSize: string = "grow";

	private marg: number;
	private high: number;


	constructor(
		public snackBar: MatSnackBar, 
		public el: ElementRef
	){


		// Check if mobile
		let width = $(window).width();
		if (width < 600) {
			this.isMobile = true;
		}

	}

	ngOnInit() {

		this.toolbar = document.getElementById("toolbar");
		console.log(this.tbW, this.tbH)
		this.toolbarbar = document.getElementById("toolbarbar");
	}

	ngOnDestroy() {

	}	// End-of ngOnDestroy

	openSnackBar() {
		console.log('opening snackbar')
		this.snackBar.open("This is a work in progress, please come back soon!", "Okay!", {
			duration: 8000,
		});
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
