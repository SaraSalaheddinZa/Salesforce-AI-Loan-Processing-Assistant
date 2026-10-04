import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';

import getDashboardData from '@salesforce/apex/LoanOfficerCommandCenterController.getDashboardData';

export default class LoanOfficerCommandCenter extends NavigationMixin(
    LightningElement
) {

    totalApplications = 0;
    newApplications = 0;
    submittedApplications = 0;
    inReviewApplications = 0;
    approvedApplications = 0;
    rejectedApplications = 0;

    totalLoanAmount = 0;
    averageLoanAmount = 0;

    recentApplications = [];
    attentionApplications = [];

    isLoading = true;
    hasError = false;
    showNewApplicationModal = false;
    isNightMode = false;
    wiredDashboardResult;

    @wire(getDashboardData)
    wiredDashboard(result) {
        this.wiredDashboardResult = result;

        const { data, error } = result;

        if (data) {
            this.loadDashboardData(data);

            this.hasError = false;
            this.isLoading = false;
        } else if (error) {
            console.error(
                'Error loading Loan Officer Command Center:',
                error
            );

            this.hasError = true;
            this.isLoading = false;
        }
    }

    loadDashboardData(data) {
        this.totalApplications =
            data.totalApplications || 0;

        this.newApplications =
            data.newApplications || 0;

        this.submittedApplications =
            data.submittedApplications || 0;

        this.inReviewApplications =
            data.inReviewApplications || 0;

        this.approvedApplications =
            data.approvedApplications || 0;

        this.rejectedApplications =
            data.rejectedApplications || 0;

        this.totalLoanAmount =
            data.totalLoanAmount || 0;

        // Average loan amount
        if (
            data.averageLoanAmount !== undefined &&
            data.averageLoanAmount !== null
        ) {
            this.averageLoanAmount =
                data.averageLoanAmount;
        } else if (this.totalApplications > 0) {
            this.averageLoanAmount =
                this.totalLoanAmount /
                this.totalApplications;
        } else {
            this.averageLoanAmount = 0;
        }

        // Recent applications
        this.recentApplications =
            (data.recentApplications || []).map(
                (application) =>
                    this.prepareApplication(application)
            );

        // Applications requiring attention
        this.attentionApplications =
            (data.attentionApplications || []).map(
                (application) => ({
                    ...this.prepareApplication(application),

                    attentionReason:
                        application.attentionReason ||
                        'High Value'
                })
            );
    }

    prepareApplication(application) {
        return {
            ...application,

            displayStatus:
                this.formatStatus(
                    application.Application_Status__c
                ),

            statusClass:
                this.getStatusClass(
                    application.Application_Status__c
                ),

            initials:
                this.getInitials(
                    application.Applicant_Name__c
                )
        };
    }

    get hasRecentApplications() {
        return this.recentApplications.length > 0;
    }

    get hasAttentionApplications() {
        return this.attentionApplications.length > 0;
    }

    get attentionCount() {
        return this.attentionApplications.length;
    }

    get reviewPercentage() {
        if (!this.totalApplications) {
            return 0;
        }

        return Math.round(
            (
                this.inReviewApplications /
                this.totalApplications
            ) * 100
        );
    }

    get progressClass() {
        const percentage =
            Number(this.reviewPercentage) || 0;

        const roundedPercentage =
            Math.min(
                100,
                Math.max(
                    0,
                    Math.round(percentage / 10) * 10
                )
            );

        return `progress-fill progress-${roundedPercentage}`;
    }
    get experienceClass() {
        return this.isNightMode
            ? 'loan-experience experience-dark'
            : 'loan-experience experience-light';
    }
    get heroClass() {
        return this.isNightMode
            ? 'landing-hero hero-night'
            : 'landing-hero hero-light';
    }

    get lampStatus() {
        return this.isNightMode
            ? 'Turn light on'
            : 'Turn light off';
    }

    get environmentLabel() {
        return this.isNightMode
            ? 'Night workspace'
            : 'Day workspace';
    }

    handleLightToggle() {
        this.isNightMode = !this.isNightMode;
    }

    formatStatus(status) {
        if (!status) {
            return 'Unknown';
        }

        return status.replaceAll('_', ' ');
    }

    getStatusClass(status) {
        const statusClasses = {
            New:
                'status-badge status-new',

            Submitted:
                'status-badge status-submitted',

            In_Review:
                'status-badge status-review',

            Approved:
                'status-badge status-approved',

            Rejected:
                'status-badge status-rejected'
        };

        return (
            statusClasses[status] ||
            'status-badge'
        );
    }

    getInitials(name) {
        if (!name) {
            return 'LA';
        }

        const words = name
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (words.length === 0) {
            return 'LA';
        }

        if (words.length === 1) {
            return words[0]
                .substring(0, 2)
                .toUpperCase();
        }

        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)
        ).toUpperCase();
    }

    handleOpenRecord(event) {
        const recordId =
            event.currentTarget.dataset.id;

        if (!recordId) {
            return;
        }

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',

            attributes: {
                recordId: recordId,
                objectApiName:
                    'Loan_Application__c',
                actionName: 'view'
            }
        });
    }

    handleViewAll() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',

            attributes: {
                objectApiName:
                    'Loan_Application__c',

                actionName:
                    'list'
            },

            state: {
                filterName:
                    'Recent'
            }
        });
    }

    handleNewApplication() {
        this.showNewApplicationModal = true;
    }

    handleCloseNewApplication() {
        this.showNewApplicationModal = false;
    }

    async handleFlowStatusChange(event) {
        const status = event.detail.status;

        if (
            status === 'FINISHED' ||
            status === 'FINISHED_SCREEN'
        ) {
            this.showNewApplicationModal = false;

            await this.refreshDashboard();
        }
    }

    async handleRefresh() {
        await this.refreshDashboard();
    }

    async refreshDashboard() {
        this.isLoading = true;
        this.hasError = false;

        try {
            await refreshApex(
                this.wiredDashboardResult
            );
        } catch (error) {
            console.error(
                'Error refreshing Loan Officer Command Center:',
                error
            );

            this.hasError = true;
        } finally {
            this.isLoading = false;
        }
    }
}