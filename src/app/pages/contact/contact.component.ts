import { Component, ElementRef, OnInit, OnDestroy, Input, Output, EventEmitter,AfterViewInit,Inject, HostListener, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';

import { PageScrollInstance, PageScrollService, EasingLogic } from 'ngx-page-scroll';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';

import { trigger, state, style, animate, transition, group, query, keyframes } from '@angular/animations';
import * as $ from "jquery";

// import 'animation.gsap';
// import 'debug.addIndicators';
// import {TweenLite} from 'gsap/TweenLite';
// import {ScrollToPlugin} from "gsap/ScrollToPlugin";

@Component({
	selector: '',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
})


export class ContactComponent implements OnInit, AfterViewChecked {

	public isMobile: boolean = false;
	public state = 'hide';
	public fade = 'out';


	constructor(public el: ElementRef){

		// Check if mobile
		let width = $(window).width();
		if (width < 600) {
			this.isMobile = true;
		}
	}

    ngOnInit() {
    }

    ngAfterViewChecked(){
    	let element = document.getElementById("linkedin-parent");
    }

	openLinkedin(){
		let win = window.open('https://www.linkedin.com/in/luke-jungmann', '_blank');
		if(win) {
			win.focus();
		} else {
			alert('Please allow popups for this website');
		}
	}

	upgradeImage(object) {
		console.log(object)
		// var id = object.id;
		// var target = "div_" + id.substring(4);

		// document.getElementById(target).style.backgroundImage = "url(" + object.src + ")";
	}
}

