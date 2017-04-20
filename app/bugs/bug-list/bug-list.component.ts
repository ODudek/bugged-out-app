import {Component, OnInit} from '@angular/core';
import {BugService} from "../service/bug.service";
import {Bug} from "../model/bug";

@Component({
    moduleId: module.id,
    selector: 'bug-list',
    templateUrl: 'bug-list.component.html',
    styleUrls: ['bug-list.component.css']
})

export class BugListComponent implements OnInit {

    private bugs: Bug[] = [];
    dataReceived = false;

    constructor(private bugService: BugService) {
    }

    ngOnInit() {
        this.getAddedBugs();
        this.getUpdateBugs();
    }

    getAddedBugs() {
        this.bugService.getAddedBugs()
            .subscribe(bug => {
                this.bugs.push(bug);
                this.dataReceived = true;
            }, err => {
                console.error('Unable to get added bug - ', err);
            });
    }

    getUpdateBugs() {
        this.bugService.changeListener()
            .subscribe(updatedBug => {
                const bugIndex = this.bugs.map(index => index.id).indexOf(updatedBug['id']);
                this.bugs[bugIndex] = updatedBug;
                this.dataReceived = true;
            }, err => {
                console.error('Unable to get updated bug - ', err)
            });
    }
}