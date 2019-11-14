import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsComponent } from './tools.component';

describe('NgxGraphOrgTreeComponent', () => {
    let component: ToolsComponent;
    let fixture: ComponentFixture<ToolsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ToolsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
