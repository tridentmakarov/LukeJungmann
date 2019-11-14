import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import {trigger, animate, style, group, query, transition, keyframes, state} from '@angular/animations';

import * as $ from "jquery";


@Component({
	selector: 'app-skills-programming',
	templateUrl: './skills-programming.component.html',
	styleUrls: ['./skills-programming.component.scss'],
	animations: [
	trigger('scrollAnimation', [
		transition(':enter',  group([
			style({ opacity: 0, transform: 'translateX(-60px)' }),
			animate('1s ease-in-out', keyframes([
				style({opacity: 0, transform: 'translateX(-60px)', offset: 0}),
				style({opacity: 1, transform: 'translateX(0px)', offset: 1.0})
			]))
		]))
	]), 
	trigger('fadeAnimation', [
		transition('out => in',  group([
			style({ opacity: 0, }),
			animate('4s ease-in-out', keyframes([
				style({opacity: 0, offset: 0.8}),
				style({opacity: 1, offset: 1.0})
			]))
		])),
		transition('in => out',  group([
			style({ opacity: 1, }),
			animate('1s ease-in-out', keyframes([
				style({opacity: 1, offset: 0}),
				style({opacity: 0, offset: 1.0})
			]))
		])),
	])
	]
})


export class SkillsProgrammingComponent implements OnInit, OnDestroy {
	
	start: boolean = false;

	public isMobile: boolean = false;
	public state = 'hide';
	public fade = 'out';

	private scrollingDown: boolean = true;
	public barSize: string = "grow";
	public node_list;
	public node_lengths = [];
	public current_view;
	public left_school;
	public right_school;

	public w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	public h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	public logolock;

	public imageList = [
		{id: "angular", src: './../../../assets/images/Software/angular_logo.png'},
		{id:"typescript", src:'./../../../assets/images/Software/typescript_logo.png'},
		{id:"javascript", src:'./../../../assets/images/Software/javascript_logo.png'},
		{id:"python", src:'./../../../assets/images/Software/python_logo.png'},
		{id:"solidworks", src:'./../../../assets/images/Software/solidworks_logo.png'},
		{id:"matlab", src:'./../../../assets/images/Software/matlab_logo.png'}
	];

	public imageList2 = [
		{id: "drone", src: './../../../assets/images/Portfolio/Drone.png'},
		{id:"franken", src:'./../../../assets/images/Portfolio/Frankenfingers.png'},
		{id:"kiosk", src:'./../../../assets/images/Portfolio/Kiosk1.png'},
		{id:"mug", src:'./../../../assets/images/Portfolio/Mug.png'},
	];

	public textListInd = ["Robotics Engineer", "Software Developer", "Full-Time Geek"];
	public textList = [];
	public prevLogo = [];
	public prevLogo2 = [];
	public hugeLogo = '';
	public hugeLogo2 = '';

	constructor() {

	}	// End-of constructor

	ngOnInit() {

		// Check if mobile
		let width = $(window).width();
		if (width < 600) {
			this.isMobile = true;
		}

	}	// End-of OnInit

	ngOnDestroy() {

	}	// End-of ngOnDestroy
	

	onScroll(event: Event, time: boolean) {
	}

    onLogoClick(e, i){
    	let elementId = []
    	if (e.srcElement.id == 'angular' || e.srcElement.id == 'javascript' || e.srcElement.id == 'typescript'){
    		elementId = ['angular', 'javascript', 'typescript'];
    	} else { 
    		elementId = [e.srcElement.id];
    	}
    	if (i < 6) {
    		this.hugeLogo = this.imageList[i].src;
    	} else {
    		this.hugeLogo2 = this.imageList2[i-6].src;
    	}
    	

    	for (let elem in elementId) {
	    	document.getElementById(elementId[elem]).classList.remove('logo');
	    	document.getElementById(elementId[elem]).classList.add('logo-selected');
		}

    	if (this.prevLogo && this.prevLogo[0] != elementId[0]){
    		for (let elem2 in this.prevLogo) {
		    	document.getElementById(this.prevLogo[elem2]).classList.remove('logo-selected');
		    	document.getElementById(this.prevLogo[elem2]).classList.add('logo');
		    }
	    }
		this.prevLogo = elementId;
    }

    @HostListener('window:scroll', ['$event'])

    checkScroll() {
		let scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }


    onResize(event) {
		this.w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		this.h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		this.logolock = this.isMobile ? this.h * 1.25 : this.h * 1.32;
    }


    moveWithScroll(container, el, scrollPos, el_start, el_end, top_offset, travel, ratio, color = ''){

    	let el_position = el.offset(),
    		container_top = $('#'+container).offset().top,
    		container_height = $('#'+container).height(),


			el_sep = Math.abs(el_end - el_start),
			dir = Math.sign(el_end - el_start),
			body_sep = scrollPos - container_top - top_offset;


		if(body_sep >= 0){
			let move_ratio = body_sep / travel;
			(document.getElementById('toolbar').style.background != color && color != '') ? document.getElementById('toolbar').style.background = color: '';
			$('#toolbar').css("background", "'#ff3d00")

			if ( move_ratio > 0 && move_ratio < 1 ){
				let r = 0.5 - Math.cos(move_ratio * Math.PI) / 2;
				el.css('left', (el_start + dir * r * el_sep).toString() + 'px');
			} else {
				el.css('left', (el_end).toString() + 'px');
			}

			if (el.css('display') === 'none'){
				el.css('display', 'block');
			}

		} else {
			if (el.css('display') === 'block'){
				el.css('display', 'none');
			}
		}
    }

    addText(){

		for(let i = 0; i < this.textListInd.length; i++){
	        setTimeout(() => {
	            this.textList.push(this.textListInd[i]);
	        }, 1000*(i+1));
	    }
	}
}
