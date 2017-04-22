import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import 'rxjs/add/operator/map';

import { Business } from '../models/business';
import { Category } from '../models/category';


@Injectable()
export class FirebaseService {
	businesses: FirebaseListObservable<Business[]>;
	categories: FirebaseListObservable<Category[]>;


	constructor(af: AngularFire) {
		this.businesses = af.database.list('/businesses');
		this.categories = af.database.list('/categories');
	}

}
