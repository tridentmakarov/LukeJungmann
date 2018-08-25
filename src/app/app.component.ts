import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatIcon, MatSnackBar } from '@angular/material';
import * as $ from "jquery";


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit, OnDestroy {

	public isMobile: boolean = false;

	constructor(public snackBar: MatSnackBar){


		// Check if mobile
		let width = $(window).width();
		if (width < 600) {
			this.isMobile = true;
		}

	}

	ngOnInit() {

	}

	ngOnDestroy() {

	}	// End-of ngOnDestroy

	openSnackBar() {
		console.log('opening snackbar')
		this.snackBar.open("This is a work in progress, please come back soon!", "Okay!", {
			duration: 800000,
		});
	}
}
