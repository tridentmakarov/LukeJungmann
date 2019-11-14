import { Component, ElementRef, OnInit, OnDestroy, Input, Output, 
	EventEmitter,AfterViewInit,Inject, HostListener, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';

import { PageScrollInstance, PageScrollService, EasingLogic } from 'ngx-page-scroll';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';

import { trigger, state, style, animate, transition, group, query, keyframes } from '@angular/animations';
import * as $ from "jquery";
import { Edge, Node, Layout, ClusterNode } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from './customNodes';
import * as shape from 'd3-shape';
import { Subject } from 'rxjs';
import { ResizeEvent } from 'angular-resizable-element';

export class parent {
	id: number;
	name: string;
	data: {
		text: string;
		responses: string[];
		backgroundColor: string;
	}
	parentId?: number;
	parentResponseId?: number;
}

@Component({
	selector: '',
	templateUrl: './tools.component.html',
	styleUrls: ['./tools.component.scss'],
})


export class ToolsComponent implements OnInit, AfterViewChecked {

	public isMobile: boolean = false;
	public showresponses: boolean = false;
	public dialogFormGroup: FormGroup;

	public conversation: parent[] = [];
	public selectedConversation: parent = new parent;
	public selectedParent: parent = new parent;

	public character: string[] = ["John Doe"];
	public nodes: Node[] = [];
	public links: Edge[] = [];
	public layoutSettings = {
		orientation: "TB"
	}
	public curveType: string = 'Curved';
	public curve: any = shape.curveLinear;
	public layout: Layout = new DagreNodesOnlyLayout();


	public zoomEnabled: boolean = true;
	public zoomSpeed: number = 0.1;
	public minZoomLevel: number = 0.1;
	public maxZoomLevel: number = 4.0;

	// public layout: String | Layout = 'dagreCluster';
	public layouts: any[] = [
		{
			label: 'Default',
			value: 'dagre',
		},
		{
			label: 'Cluster',
			value: 'dagreCluster',
			isClustered: true,
		},
	];


	update$: Subject<boolean> = new Subject();
	center$: Subject<boolean> = new Subject();
	zoomToFit$: Subject<boolean> = new Subject();

	public interpolationTypes = [
	    'Curved',
	    'Linear',
	];  

	constructor(
		public el: ElementRef,
		private formBuilder: FormBuilder,
		){

		this.createFormGroup();

		this.conversation = [{
			id: 0,
			name: this.character[0],
			data: {
				text: "I need your help.",
				responses: ["Never", "Okay", "Banana"],
				backgroundColor: "#DC143C",
			},
		}, {
			id: 1,
			name: this.character[0],
			data: {
				text: "Why never?",
				responses: [],
				backgroundColor: "#00FFFF",
			},
			parentId: 0,
			parentResponseId: 0,
		}, {
			id: 2,
			name: this.character[0],
			data: {
				text: "This is a significantly longer response to test to see how my layout responds to changes to anything.",
				responses: [],
				backgroundColor: "#00FFFF",
			},
			parentId: 0,
			parentResponseId: 1,
		}, {
			id: 3,
			name: this.character[0],
			data: {
				text: "Like, the fruit?",
				responses: ["No, like the banana"],
				backgroundColor: "#00FFFF",
			},
			parentId: 0,
			parentResponseId: 2,
		}, {
			id: 4,
			name: this.character[0],
			data: {
				text: "I'm confused",
				responses: [],
				backgroundColor: "#8A2BE2",
			},
			parentId: 3,
			parentResponseId: 0,
		}];

		this.curve = shape.curveNatural;

		// Check if mobile
		let width = $(window).width();
		if (width < 600) {
			this.isMobile = true;
		}
	}

	public ngOnInit(): void {

		this.setInterpolationType(this.curveType);

		this.loadConversation();

		this.dialogFormGroup.valueChanges.subscribe(res => {
			this.textChanged(res);
		})
	}

    ngAfterViewChecked(): void {
    }

	public getStyles(node: Node): any {
		return {
			"border-color": node.data.backgroundColor,
		}
	}

	createNode(): void {
		console.log(this.dialogFormGroup)
	}

	setInterpolationType(curveType) {
		this.curveType = curveType;
		if (curveType === 'Curved') {
			this.curve = shape.curveBundle.beta(1);
		}
		if (curveType === 'Linear') {
			this.curve = shape.curveLinear;
		}
	}

	createFormGroup(): void {

		this.dialogFormGroup = this.formBuilder.group({
			character: new FormControl('', Validators.required),
			text: new FormControl('', Validators.required),
		});
	}

	setRequirements(): void {
		console.log("HERE")
	}

	selectConversation(node): void {
		console.log("changing conversation")
		this.selectedConversation = null;
		this.dialogFormGroup.controls["character"].setValue(node.label);
		this.dialogFormGroup.controls["text"].setValue(node.data.text)

		if (node.data.responses) {
			node.data.responses.forEach((x, i) => {
				if (x.length > 0) {
					this.dialogFormGroup.addControl("response_" + i, new FormControl(x, []))
				}
			})
		}

		this.selectedConversation = this.conversation.find(x => x.id == parseInt(node.id));
		if (this.selectedConversation.parentId) {
			this.selectedParent = this.conversation.find(x => x.id == this.selectedConversation.parentId)
		}
	}

	addResponse(): void {
		let currLength = this.selectedConversation["data"].responses.length;
		let name = 'response_' + currLength;
		console.log(name, currLength)
		this.dialogFormGroup.addControl(name, new FormControl('', []));

		this.selectedConversation["data"].responses.push('');

		let newConversation: parent = {
			id: this.conversation.length,
			name: this.character[0],
			data: {
				responses: [],
				text: "",
				backgroundColor: "#DC143C",
			},
			parentResponseId: currLength,
			parentId: this.selectedConversation["id"],
		};
		console.log(this.selectedConversation["id"])
		this.conversation.push(newConversation)
		this.updateConversation(newConversation);
	}

	loadConversation(): void {

		this.nodes = [];
		this.links = [];
		for (const conv of this.conversation) {
			this.updateConversation(conv);
		}
	}

	updateConversation(conv): void {

		const node: Node =  {
			id: conv.id.toString(),
			label: conv.name,
			data: {
				text: conv.data.text,
				backgroundColor: conv.data.backgroundColor,
				responses: conv.data.responses,
			}
		};

		if (conv.parentId !== undefined) {
			let responseId: number = conv["parentResponseId"];
			node["parentResponse"] = this.conversation.find(x => x.id == conv.parentId).data.responses[responseId];
		}

		this.nodes.push(node);
	
		if (conv.parentId !== undefined) {
			const edge: Edge =   {
				source: conv.parentId.toString(),
				target: conv.id.toString(),
			}

			this.links.push(edge);
		}


		this.update$.next(true);
	}

	textChanged(res) {
		if (this.selectedConversation && this.selectedConversation["id"]) {
			let nodeId = this.nodes.findIndex(x => x["id"] == this.selectedConversation["id"].toString());
			console.log(Object.keys(res))
			this.nodes[nodeId].data.text = res.text;
		}
	}
}

