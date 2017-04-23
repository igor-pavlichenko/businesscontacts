import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import 'rxjs/add/operator/map';

import { Business } from '../models/business';
import { Category } from '../models/category';


@Injectable()
export class FirebaseService {
	businesses: FirebaseListObservable<Business[]>;
	categories: FirebaseListObservable<Category[]>;


	constructor(private af: AngularFire) {
		this.categories = af.database.list('/categories');
	}

	getBusinesses(category: string = null) {
		if (category && category !== 'None') {
			this.businesses = this.af.database.list('/businesses', {
				query: {
					// filter by category
					orderByChild: 'category',
					equalTo: category
				}
			}) as FirebaseListObservable<Business[]>;
		} else {
			this.businesses = this.af.database.list('/businesses') as FirebaseListObservable<Business[]>;
		}

		return this.businesses;
	}

	getCategories() {
		this.categories = this.af.database.list('/categories') as FirebaseListObservable<Category[]>;
		return this.categories;
	}

	addBusiness(newBusiness: Business) {
		return this.businesses.push(newBusiness);
	}

	updateBusiness(key, updatedBusiness) {
		return this.businesses.update(key, updatedBusiness);
	}

}
