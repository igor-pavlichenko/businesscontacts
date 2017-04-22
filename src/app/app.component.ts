import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './services/firebase.service';

import { Business } from './models/business';
import { Category } from './models/category';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [ FirebaseService ]
})
export class AppComponent implements OnInit {
	businesses: Business[];
	categories: Category[];

	constructor(private firebaseService: FirebaseService) {
	}

	ngOnInit(): void {
		this.firebaseService.getBusinesses().subscribe(businesses => {
			this.businesses = businesses;
		});

		this.firebaseService.getCategories().subscribe(categories => {
			this.categories = categories;
		});
	}
}
