@IsTest
private class LoanOfficerCommandCenterControllerTest {

    @TestSetup
    static void createTestData() {

        List<Loan_Application__c> applications =
            new List<Loan_Application__c>();

        applications.add(new Loan_Application__c(
            Applicant_Name__c = 'Test Applicant One',
            Contact_Email__c = 'applicant1@example.com',
            Loan_Amount__c = 50000,
            Loan_Type__c = 'Personal',
            Application_Status__c = 'New'
        ));

        applications.add(new Loan_Application__c(
            Applicant_Name__c = 'Test Applicant Two',
            Contact_Email__c = 'applicant2@example.com',
            Loan_Amount__c = 120000,
            Loan_Type__c = 'Home',
            Application_Status__c = 'In_Review'
        ));

        applications.add(new Loan_Application__c(
            Applicant_Name__c = 'Test Applicant Three',
            Contact_Email__c = 'applicant3@example.com',
            Loan_Amount__c = 80000,
            Loan_Type__c = 'Auto',
            Application_Status__c = 'Approved'
        ));

        insert applications;
    }

    @IsTest
    static void testGetDashboardData() {

        Test.startTest();

        LoanOfficerCommandCenterController.DashboardData data =
            LoanOfficerCommandCenterController.getDashboardData();

        Test.stopTest();

        // Dashboard data
        System.assertNotEquals(
            null,
            data,
            'Dashboard data should be returned'
        );

        // Application counts
        System.assertEquals(3, data.totalApplications);
        System.assertEquals(1, data.newApplications);
        System.assertEquals(0, data.submittedApplications);
        System.assertEquals(1, data.inReviewApplications);
        System.assertEquals(1, data.approvedApplications);
        System.assertEquals(0, data.rejectedApplications);

        // Portfolio values
        System.assertEquals(
            250000,
            data.totalLoanAmount,
            'Total loan amount should equal the sum of all applications'
        );

        System.assertEquals(
            83333.33,
            data.averageLoanAmount.setScale(2),
            'Average loan amount should be calculated correctly'
        );

        // Attention queue
        System.assertNotEquals(
            null,
            data.attentionApplications,
            'Attention applications should be returned'
        );

        System.assertEquals(
            1,
            data.attentionApplications.size(),
            'Only the active high-value application should require attention'
        );

        System.assertEquals(
            'Test Applicant Two',
            data.attentionApplications[0].Applicant_Name__c
        );

        // Recent applications
        System.assertNotEquals(
            null,
            data.recentApplications,
            'Recent applications should be returned'
        );

        System.assertEquals(
            3,
            data.recentApplications.size(),
            'All three test applications should appear in recent applications'
        );
    }
}