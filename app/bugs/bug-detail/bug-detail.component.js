"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var forbidden_string_validator_1 = require("../../shared/validation/forbidden-string.validator");
var bug_service_1 = require("../service/bug.service");
var bug_1 = require("../model/bug");
var constants_1 = require("../../shared/constant/constants");
var BugDetailComponent = (function () {
    function BugDetailComponent(formB, bugService) {
        this.formB = formB;
        this.bugService = bugService;
        this.btnToggle = false;
        this.statuses = constants_1.STATUS;
        this.severitis = constants_1.SEVERITY;
        this.statusArr = [];
        this.severityArr = [];
        this.currentBug = new bug_1.Bug(null, null, this.statuses.Logged, this.severitis.Cosmetic, null, null, null, null, null);
    }
    BugDetailComponent.prototype.ngOnInit = function () {
        this.statusArr = Object.keys(this.statuses).filter(Number);
        this.severityArr = Object.keys(this.severitis).filter(Number);
        this.configureForm();
    };
    BugDetailComponent.prototype.configureForm = function (bug) {
        if (bug) {
            this.currentBug = new bug_1.Bug(bug.id, bug.title, bug.status, bug.severity, bug.description, bug.createdBy, bug.createdDate, bug.updateBy, bug.updatedDate);
            console.log(bug.id);
            this.btnToggle = true;
            console.log(this.btnToggle);
        }
        else if (!bug) {
            this.btnToggle = false;
        }
        console.log(bug);
        this.bugForm = this.formB.group({
            title: [this.currentBug.title, [forms_1.Validators.required, forbidden_string_validator_1.forbiddenStringValidator(/puppy/i)]],
            status: [this.currentBug.status, forms_1.Validators.required],
            severity: [this.currentBug.severity, forms_1.Validators.required],
            description: [this.currentBug.description, forms_1.Validators.required]
        });
    };
    BugDetailComponent.prototype.submitForm = function () {
        this.currentBug.title = this.bugForm.value['title'];
        this.currentBug.status = this.bugForm.value['status'];
        this.currentBug.severity = this.bugForm.value['severity'];
        this.currentBug.description = this.bugForm.value['description'];
        if (this.currentBug.id) {
            this.updateBug();
            this.btnToggle = false;
        }
        else {
            this.addBug();
            this.btnToggle = false;
        }
    };
    BugDetailComponent.prototype.addBug = function () {
        this.bugService.addBug(this.currentBug);
    };
    BugDetailComponent.prototype.updateBug = function () {
        this.bugService.updateBug(this.currentBug);
    };
    BugDetailComponent.prototype.removeBug = function () {
        this.bugService.removeBug(this.currentBug);
    };
    BugDetailComponent.prototype.freshForm = function () {
        this.bugForm.reset({ status: this.statuses.Logged, severity: this.severitis.Cosmetic });
        this.cleanBug();
    };
    BugDetailComponent.prototype.cleanBug = function () {
        this.currentBug = new bug_1.Bug(null, null, this.statuses.Logged, this.severitis.Cosmetic, null, null, null, null, null);
    };
    BugDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bug-detail',
            templateUrl: 'bug-detail.component.html',
            styleUrls: ['bug-detail.component.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, bug_service_1.BugService])
    ], BugDetailComponent);
    return BugDetailComponent;
}());
exports.BugDetailComponent = BugDetailComponent;
//# sourceMappingURL=bug-detail.component.js.map