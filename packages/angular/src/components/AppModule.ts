import "zone.js";

import { Component, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { publishDOM, subscribeDOM } from "dom-pubsub";

@Component({
    selector: "[id=angular-app]",
    template: "<span (click)=\"onClick()\">Т</span>",
})
export class AppComponent {
    constructor() {
    }

    onClick() {
        console.log('ANGULAR: отправил');
        publishDOM('YO', {
            from: 'ANGULAR'
        })
    }
}

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {
        subscribeDOM('YO', payload => {
            if (payload.from !== 'ANGULAR') {
                console.log(`ANGULAR: получил от ${ payload.from }`);
            }
        })
    }
}