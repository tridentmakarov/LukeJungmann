import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import {trigger, animate, style, group, query, transition, keyframes, state} from '@angular/animations';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import * as $ from "jquery";


@Component({
	selector: 'app-skills-design',
	templateUrl: './skills-design.component.html',
	styleUrls: ['./skills-design.component.scss']
})


export class SkillsDesignComponent implements OnInit, OnDestroy {
	config: any;
	fullpage_api: any;

	constructor() {

		// for more details on config options please visit fullPage.js docs
		this.config = {

		// fullpage options
		licenseKey: 'E96AAB72-E06A4F03-A6BFCE8E-275FF0A5',
		anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
		sectionsColor: ['#5f0239', '#262626', '#5f0239', '#262626', '#5f0239'],
		menu: '#menu',
		lockAnchors: true,

		// fullpage callbacks
		afterResize: () => {
			console.log("After resize");
		},
		afterLoad: (origin, destination, direction) => {
			console.log(origin);
			}
		};
	}

	getRef(fullPageRef) {
		this.fullpage_api = fullPageRef;
	}

	ngOnInit() {

	}	// End-of OnInit

	ngOnDestroy() {

	}	// End-of ngOnDestroy
}

export class AppComponent {
  config: any;
  fullpage_api: any;

  constructor() {

    // for more details on config options please visit fullPage.js docs
    this.config = {

      // fullpage options
      licenseKey: 'E96AAB72-E06A4F03-A6BFCE8E-275FF0A5',
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
      sectionsColor: ['#7BAABE', 'whitesmoke', '#7BAABE', 'whitesmoke', '#7BAABE'],
      menu: '#menu',

      // fullpage callbacks
      afterResize: () => {
        console.log("After resize");
      },
      afterLoad: (origin, destination, direction) => {
        console.log(origin.index);
      }
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

}
