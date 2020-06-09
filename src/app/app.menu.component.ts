import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from 'primeng/api';
import { ScrollPanel } from 'primeng/scrollpanel'
import { AppComponent } from './app.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit, AfterViewInit {

    model: any[];

    @ViewChild('scrollPanel') layoutMenuScrollerViewChild: ScrollPanel;

    constructor(public app: AppComponent) { }

    ngAfterViewInit() {
        setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

    ngOnInit() {
        this.model = [
            { label: 'Dashboard', routerLink: ['/'] },
            {
                label: 'Menu Hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                items: [
                                    { label: 'Submenu 1.1.1' },
                                    { label: 'Submenu 1.1.2' },
                                    { label: 'Submenu 1.1.3' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                items: [
                                    { label: 'Submenu 1.2.1' },
                                    { label: 'Submenu 1.2.2' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                items: [
                                    { label: 'Submenu 2.1.1' },
                                    { label: 'Submenu 2.1.2' },
                                    { label: 'Submenu 2.1.3' }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                items: [
                                    { label: 'Submenu 2.2.1' },
                                    { label: 'Submenu 2.2.2' }
                                ]
                            },
                        ]
                    }
                ]
            }
        ];
    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink" [attr.target]="child.target">
                    <span class="menuitem-text">{{child.label}}</span>
                    <i class="fa fa-chevron-down layout-submenu-toggler" *ngIf="child.items"></i>
                </a>
                <a (click)="itemClick($event,child,i)" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                    [routerLinkActiveOptions]="{exact: true}" [attr.target]="child.target">
                    <span class="menuitem-text">{{child.label}}</span>
                    <i class="fa fa-chevron-down layout-submenu-toggler" *ngIf="child.items"></i>
                </a>
                <ul app-submenu [item]="child" *ngIf="child.items" [@children]="isActive(i) ? 'visible' : 'hidden'"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('visible', style({
                height: '*'
            })),
            state('hidden', style({
                height: '0px'
            })),
            transition('visible => hidden', animate('600ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('600ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    activeIndex: number;

    hover: boolean;

    constructor(public app: AppComponent, public appMenu: AppMenuComponent) { }

    itemClick(event: Event, item: MenuItem, index: number)  {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        if (item.routerLink || item.items || item.command || item.url) {
            this.activeIndex = (this.activeIndex as number === index) ? -1 : index;
        }

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.appMenu.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            this.app.sidebarActive = false;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

}
