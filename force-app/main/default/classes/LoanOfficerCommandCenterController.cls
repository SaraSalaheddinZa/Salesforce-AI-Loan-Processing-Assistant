public with sharing class LoanOfficerCommandCenterController {

    public class DashboardData {
        @AuraEnabled public Integer totalApplications { get; set; }
        @AuraEnabled public Integer newApplications { get; set; }
        @AuraEnabled public Integer submittedApplications { get; set; }
        @AuraEnabled public Integer inReviewApplications { get; set; }
        @AuraEnabled public Integer approvedApplications { get; set; }
        @AuraEnabled public Integer rejectedApplications { get; set; }

        @AuraEnabled public Decimal totalLoanAmount { get; set; }
        @AuraEnabled public Decimal averageLoanAmount { get; set; }

        @AuraEnabled
        public List<Loan_Application__c> attentionApplications {
            get;
            set;
        }

        @AuraEnabled
        public List<Loan_Application__c> recentApplications {
            get;
            set;
        }
    }

    @AuraEnabled(cacheable=true)
    public static DashboardData getDashboardData() {

        DashboardData data = new DashboardData();

        data.totalApplications = 0;
        data.newApplications = 0;
        data.submittedApplications = 0;
        data.inReviewApplications = 0;
        data.approvedApplications = 0;
        data.rejectedApplications = 0;

        List<AggregateResult> statusResults = [
            SELECT Application_Status__c status,
                   COUNT(Id) total
            FROM Loan_Application__c
            GROUP BY Application_Status__c
        ];

        for (AggregateResult result : statusResults) {

            String status =
                (String) result.get('status');

            Integer total =
                (Integer) result.get('total');

            data.totalApplications += total;

            if (status == 'New') {
                data.newApplications = total;
            } else if (status == 'Submitted') {
                data.submittedApplications = total;
            } else if (status == 'In_Review') {
                data.inReviewApplications = total;
            } else if (status == 'Approved') {
                data.approvedApplications = total;
            } else if (status == 'Rejected') {
                data.rejectedApplications = total;
            }
        }

        AggregateResult amountResult = [
            SELECT SUM(Loan_Amount__c) totalAmount,
                   AVG(Loan_Amount__c) averageAmount
            FROM Loan_Application__c
        ];

        Decimal totalAmount =
            (Decimal) amountResult.get('totalAmount');

        Decimal averageAmount =
            (Decimal) amountResult.get('averageAmount');

        data.totalLoanAmount =
            totalAmount == null ? 0 : totalAmount;

        data.averageLoanAmount =
            averageAmount == null ? 0 : averageAmount;

        data.attentionApplications = [
            SELECT Id,
                   Name,
                   Applicant_Name__c,
                   Loan_Amount__c,
                   Loan_Type__c,
                   Application_Status__c
            FROM Loan_Application__c
            WHERE Loan_Amount__c >= 100000
            AND Application_Status__c != 'Approved'
            AND Application_Status__c != 'Rejected'
            ORDER BY Loan_Amount__c DESC
            LIMIT 5
        ];

        data.recentApplications = [
            SELECT Id,
                   Name,
                   Applicant_Name__c,
                   Loan_Amount__c,
                   Loan_Type__c,
                   Application_Status__c
            FROM Loan_Application__c
            ORDER BY CreatedDate DESC
            LIMIT 5
        ];

        return data;
    }
}