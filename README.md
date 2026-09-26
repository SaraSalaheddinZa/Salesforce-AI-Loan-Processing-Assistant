# AI-Powered Loan Processing Assistant

An AI-powered loan processing solution built on Salesforce to streamline loan application intake, workflow automation, and application monitoring.

The project combines Salesforce Platform capabilities with Agentforce, Flow Builder, Lightning Web Components, Dynamic Forms, Reports, and Dashboards to create a structured loan processing experience.

---

## Project Overview

Traditional loan processing can involve repetitive data entry, manual workflow steps, and inconsistent information collection.

This project addresses these challenges by creating a Salesforce-based loan processing assistant that helps users collect loan application information, automate business processes, visualize application progress, and monitor application data.

---

## Solution

The solution provides a custom Salesforce application called **Loan Processing Assistant**.

The application includes:

- Agentforce-powered loan assistance
- Structured loan application intake
- Salesforce Flow automation
- Dynamic record page experience
- Custom Lightning Web Component
- Reports and dashboards
- Security and field-level access controls
- User acceptance testing

---

## Architecture


```text
                    Agentforce
                         │
                         ▼
                  Agent Actions
                         │
                         ▼
                  Salesforce Flow
                         │
                         ▼
                Loan Application
                 /      |       \
                /       |        \
        Automation     LWC     Reporting
                              │
                              ▼
                           Dashboard
```
## Salesforce Components

### Custom Object

- **Loan Application (`Loan_Application__c`)**
  - Central object used to manage loan applications throughout the processing lifecycle.

### Custom Fields

- `Applicant_Name__c` — Applicant Name
- `Contact_Email__c` — Contact Email
- `Annual_Income__c` — Annual Income
- `Loan_Amount__c` — Loan Amount
- `Loan_Type__c` — Loan Type
- `Application_Status__c` — Application Status
- `Risk_Score__c` — Risk Score
- `Employment_Status__c` — Employment Status

### Lightning Application

**Loan Processing Assistant**

A custom Salesforce Lightning application designed for loan officers to manage loan applications, access reports, dashboards, and process applications.

### Lightning Record Page

**Loan Application Record Page**

The record page provides a structured view of applicant, financial, and loan information.

It includes:

- Dynamic Forms
- Conditional field visibility
- Standard Salesforce components
- Loan Application Tracker custom LWC

### Custom Lightning Web Component

**`loanProgressTracker`**

A custom Lightning Web Component that displays the current loan application progress based on the application's status.

### Salesforce Flows

#### Create Loan Application

A Screen Flow used to collect loan applicant information and create a new `Loan_Application__c` record.

#### Automated Risk Evaluation / Status Update

A Record-Triggered Flow that evaluates loan application data and automatically updates the application status based on the configured risk logic.

### Validation

**`Prevent_Manual_Risk_Score_Edit`**

A validation rule used to prevent unauthorized manual modification of the Risk Score field.

### Agentforce

**Loan Assistant Agent**

The Agentforce assistant supports:

- Applicant information collection
- Loan amount and loan type inquiries
- Loan application status checks
- Loan application creation through Salesforce automation

### Agent Topics

- Collect Applicant Name
- Ask for Loan Amount
- Loan Inquiry / Status Check

### Agent Actions

The agent uses Salesforce actions and Flow integration to interact with loan application data and automate record creation.

### Reports

- **Loan Applications by Status**
- **Loan Applications by Type**

### Dashboard

**Loan Processing Overview**

Provides a visual overview of loan application activity using Salesforce reports and dashboard components.
