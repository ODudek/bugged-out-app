import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {forbiddenStringValidator} from "../../shared/validation/forbidden-string.validator";
import {BugService} from "../service/bug.service";
import {Bug} from "../model/bug";
import {SEVERITY, STATUS} from "../../shared/constant/constants";

@Component({
    moduleId: module.id,
    selector: 'bug-detail',
    templateUrl: 'bug-detail.component.html',
    styleUrls: ['bug-detail.component.css']
})

export class BugDetailComponent implements OnInit {
    private modalId = 'bugModal';
    private bugForm: FormGroup;
    private statuses = STATUS;
    private severitis = SEVERITY;
    private statusArr: string[] = [];
    private severityArr: string[] = [];
    private currentBug = new Bug(null, null, this.statuses.Logged, this.severitis.Cosmetic, null, null, null, null, null);

    constructor(private formB: FormBuilder, private bugService: BugService) {
    }

    ngOnInit() {
        this.statusArr = Object.keys(this.statuses).filter(Number);
        this.severityArr = Object.keys(this.severitis).filter(Number);
        this.configureForm();
    }

    configureForm(bug?: Bug) {
        if (bug) {
            this.currentBug = new Bug(
                bug.id,
                bug.title,
                bug.status,
                bug.severity,
                bug.description,
                bug.createdBy,
                bug.createdDate,
                bug.updateBy,
                bug.updatedDate
            );
        }
        this.bugForm = this.formB.group({
            title: [this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]],
            status: [this.currentBug.status, Validators.required],
            severity: [this.currentBug.severity, Validators.required],
            description: [this.currentBug.description, Validators.required]
        })
    }

    submitForm() {
        this.currentBug.title = this.bugForm.value['title'];
        this.currentBug.status = this.bugForm.value['status'];
        this.currentBug.severity = this.bugForm.value['severity'];
        this.currentBug.description = this.bugForm.value['description'];
        if (this.currentBug.id) {
            this.updateBug();
        } else {
            this.addBug();
        }
    }

    addBug() {
        this.bugService.addBug(this.currentBug);
    }

    updateBug() {
        this.bugService.updateBug(this.currentBug);
    }

    freshForm() {
        this.bugForm.reset({status: this.statuses.Logged, severity: this.severitis.Cosmetic});
        this.cleanBug();
    }

    cleanBug() {
        this.currentBug = new Bug(null, null, this.statuses.Logged, this.severitis.Cosmetic, null, null, null, null, null);
    }
}