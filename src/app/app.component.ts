import {Component, Renderer, NgZone} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        trigger('children', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('1000ms ease-out'))
        ])
    ]
})
export class AppComponent {

    layoutStatic: boolean = true;

    sidebarActive: boolean;

    mobileMenuActive: boolean;

    menuButtonClick: boolean;

    theme = 'primeng';

    constructor(public renderer: Renderer, public zone: NgZone) {}

    onMenuButtonClick(event: Event) {
        this.menuButtonClick = true;
        this.layoutStatic = !this.layoutStatic;

        if (this.isMobile()) {
            this.mobileMenuActive = !this.mobileMenuActive;
        }

        event.preventDefault();
    }

    onWrapperClick() {
        if (!this.menuButtonClick) {
            this.mobileMenuActive = false;
        }

        this.menuButtonClick = false;
    }

    isMobile() {
        return window.innerWidth <= 1024;
    }
}
