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
	appState: string;
	activeKey: string;

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

	changeState(state, key?) {
		console.log('changing state to: ' + state + ' - Key: ' + (key ? key : 'empty'));
		if (key) {
			this.activeKey = key;
		}
		this.appState = state;
	}

	/**
	 *
	 * @param event
	 */
	filterCategory(event) {
		const target: HTMLElement = event.target || event.srcElement || event.currentTarget;

		const selectedCategory = target.textContent.trim();

		this.firebaseService.getBusinesses(selectedCategory).subscribe(businesses => {
			this.businesses = businesses;
		});
	}

	addBusiness(
		company: 			string,
		description: 		string,
		category: 			string,
		years_in_business: 	number,
		street_address: 	string,
		city: 				string,
		state: 				string,
		zipcode: 			string,
		phone: 				string,
		email: 				string,
	) {
		let created_at = Date.now().toString();

		let newBusiness = {
			company: 			company,
			description: 		description,
			category: 			category,
			years_in_business: 	years_in_business,
			street_address: 	street_address,
			city: 				city,
			state: 				state,
			zipcode: 			zipcode,
			phone: 				phone,
			email: 				email,
			created_at:			created_at
		};

		this.firebaseService.addBusiness(newBusiness);

		this.changeState('default');

	}
}
