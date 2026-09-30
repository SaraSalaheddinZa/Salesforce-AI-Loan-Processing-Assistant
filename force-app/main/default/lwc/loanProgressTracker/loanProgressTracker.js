import { LightningElement, wire } from 'lwc';
import getActiveLoans from '@salesforce/apex/LoanController.getActiveLoans';

const COLUMNS = [
    { label: 'Loan Application Name', fieldName: 'Name' },
    { label: 'Applicant Name', fieldName: 'Applicant_Name__c' },
    { label: 'Loan Amount', fieldName: 'Loan_Amount__c', type: 'currency' },
    { label: 'Status', fieldName: 'Application_Status__c' },
    { label: 'Loan Type', fieldName: 'Loan_Type__c' }
];

export default class LoanProgressTracker extends LightningElement {
    loans;
    error;
    columns = COLUMNS;

    @wire(getActiveLoans)
    wiredLoans({ error, data }) {
        if (data) {
            this.loans = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.loans = undefined;
        }
    }
}