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

	activeCompany: 			string;
	activeDescription: 		string;
	activeCategory: 		string;
	activeYearsInBusiness: 	number;
	activeStreetAddress: 	string;
	activeCity: 			string;
	activeState: 			string;
	activeZipcode: 			string;
	activePhone: 			string;
	activeEmail: 			string;

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

	showEdit(business) {
		this.changeState('edit', business.$key);

		this.activeCompany = 			business.company;
		this.activeDescription = 		business.description;
		this.activeCategory = 			business.category;
		this.activeYearsInBusiness = 	business.years_in_business;
		this.activeStreetAddress = 		business.street_address;
		this.activeCity = 				business.city;
		this.activeState = 				business.state;
		this.activeZipcode = 			business.zipcode;
		this.activePhone = 				business.phone;
		this.activeEmail = 				business.email;
	}

	updateBusiness() {
		let updatedBusiness = {
			company: 			this.activeCompany,
			description: 		this.activeDescription,
			category: 			this.activeCategory,
			years_in_business: 	this.activeYearsInBusiness,
			street_address: 	this.activeStreetAddress,
			city: 				this.activeCity,
			state: 				this.activeState,
			zipcode: 			this.activeZipcode,
			phone: 				this.activePhone,
			email: 				this.activeEmail
		};

		this.firebaseService.updateBusiness(this.activeKey, updatedBusiness);

		this.changeState('default');
	}
}
