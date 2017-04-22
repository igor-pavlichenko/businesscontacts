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

	getBusinesses() {
		this.businesses = this.af.database.list('/businesses') as FirebaseListObservable<Business[]>;
		return this.businesses;
	}

	getCategories() {
		this.categories = this.af.database.list('/categories') as FirebaseListObservable<Category[]>;
		return this.categories;
	}

}
