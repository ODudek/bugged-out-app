import {Injectable} from '@angular/core';

import {FirebaseConfigService} from'../../core/service/firebase-config.service';
import {Observable} from "rxjs/Observable";
import {Bug} from "../model/bug";

@Injectable()

export class BugService {

    bugDbRef = this.fire.database.ref('/bugs');

    constructor(private fire: FirebaseConfigService) {
    }

    getAddedBugs(): Observable<any> {
        return Observable.create(obs => {
            this.bugDbRef.on('child_added', bug => {
                const newBug = bug.val() as Bug;
                newBug.id = bug.key;
                obs.next(newBug);
            }, err => {
                obs.throw(err);
            });
        });
    }

    changeListener(): Observable<any> {
        return Observable.create(obs => {
            this.bugDbRef.on('child_changed', bug => {
                const updateBug = bug.val() as Bug;
                updateBug.id = bug.key;
                obs.next(updateBug);
            }, err => {
                obs.throw(err);
            });
        });
    }

    removeListener(): Observable<any> {
        return Observable.create(obs => {
            this.bugDbRef.on('child_removed', bug => {
                const deletedBug = bug.val() as Bug;
                deletedBug.id = bug.key;
                obs.next(deletedBug);
                this.getAddedBugs();
            }, err => {
                obs.throw(err);
            })
        })
    }

    addBug(bug: Bug) {
        const newBugRef = this.bugDbRef.push();
        newBugRef.set({
            title: bug.title,
            status: bug.status,
            severity: bug.severity,
            description: bug.description,
            createdBy: 'Olek',
            createdDate: Date.now()
        })
            .catch(err => console.error('Unable to add bug to Firebase - ', err));
    }

    updateBug(bug: Bug) {
        const currentBugRef = this.bugDbRef.child(bug.id);
        bug.id = null;
        bug.updateBy = 'Tom Tickle';
        bug.updatedDate = Date.now();
        currentBugRef.update(bug);
    }

    removeBug(bug: Bug) {
        const removeBugRef = this.bugDbRef.child(bug.id);
        removeBugRef.remove();
    }

}