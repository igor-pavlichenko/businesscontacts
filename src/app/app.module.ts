import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

// Must export the config
export const firebaseConfig = {
	apiKey: 'AIzaSyBeDiyY04vCyoHhFML9MniNpHMoxxwdL1U',
	authDomain: 'businesscontacts-c7f37.firebaseapp.com',
	databaseURL: 'https://businesscontacts-c7f37.firebaseio.com',
	storageBucket: 'businesscontacts-c7f37.appspot.com',
};

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AngularFireModule.initializeApp(firebaseConfig)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
