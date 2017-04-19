import {Injectable} from '@angular/core';

import {FirebaseConfigService} from'../../core/service/firebase-config.service';
import {Observable} from "rxjs/Observable";

@Injectable()

export class BugService {

    bugDbRef = this.fire.database.ref('/bugs');

    constructor(private fire: FirebaseConfigService) {}

    getAddedBugs(): Observable<any> {
        return Observable.create(obs => {
            this.bugDbRef.on('child_added', bug => {
                obs.next(bug.val());
            }, err => {
                obs.throw(err);
            });
        });
    }
}