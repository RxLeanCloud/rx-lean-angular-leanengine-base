import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from "@angular/flex-layout";

import { MdToolbarModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdMenuModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { RxAVClient, RxAVApp } from 'rx-lean-js-core';
import { ngRxLeanCloud } from 'rx-lean-angular';

let app = new RxAVApp({
  appId: `Dfvaqzrmz1x4Yos6v4DWdpwg-gzGzoHsz`,
  appKey: `I4XueooVQ4r1fUhX4bmaGpNM`
});

RxAVClient.init({
  plugins: {
    websocket: ngRxLeanCloud.ngWebSocketClient
  }
}).add(app);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdMenuModule,
    MdTabsModule,
    MdListModule,
    MdInputModule,
    MdCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
