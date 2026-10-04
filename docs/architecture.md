
# Solution Architecture

## Overview

The AI-Powered Loan Processing Assistant is built on Salesforce using a combination of Agentforce, Salesforce Flow, Lightning Web Components, Apex, Dynamic Forms, reports, and dashboards.

The solution provides two primary application intake paths:

1. Conversational intake through Agentforce.
2. Guided application creation through Salesforce Screen Flow.

Both paths create records in the central `Loan_Application__c` object.

---

## High-Level Architecture

```text
                         ┌─────────────────────┐
                         │        User         │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
           ┌─────────────────┐             ┌─────────────────┐
           │   Agentforce    │             │   Screen Flow   │
           │ Loan Assistant  │             │ Loan Application│
           └────────┬────────┘             └────────┬────────┘
                    │                               │
                    ▼                               │
          Collect Applicant                         │
            Information                             │
                    │                               │
                    ▼                               │
           User Confirmation                        │
                    │                               │
                    ▼                               │
        Create Loan Application                     │
               Action                               │
                    │                               │
                    ▼                               │
           Autolaunched Flow                        │
                    │                               │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Loan_Application__c  │
                         └──────────┬───────────┘
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
             ▼                      ▼                      ▼
      Record-Triggered       Lightning Experience     Reports &
           Flow                                      Dashboard
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
        Loan Officer Command              Loan Progress Tracker
              Center                            Custom LWC
                    │
                    ▼
             Apex Controller
```

---

## Core Data Layer

The central data object is:

```text
Loan_Application__c
```

It stores the information required by the current solution, including applicant information, loan details, application status, employment information, and risk-related data.

The object acts as the shared data layer used by Salesforce Flow, Agentforce integrations, Lightning Web Components, Apex, reports, and dashboards.

---

## Agentforce Layer

The Salesforce Agentforce configuration provides the conversational interface of the solution.

The **Collect Applicant Information** topic gathers:

- Applicant full name
- Contact email
- Requested loan amount
- Loan type

The agent validates required conversational input, summarizes the collected information, and requests user confirmation before record creation.

After confirmation, the **Create Loan Application** action invokes:

```text
Agentforce_Autolaunched_Create_Loan_Application1
```

The autolaunched Flow creates the corresponding `Loan_Application__c` record and returns the generated Loan Application ID.

The agent also includes a **Loan Inquiry** topic for general guidance about the loan types supported by the solution.

---

## Flow Automation Layer

### Create Loan Application Screen Flow

```text
Create_Loan_Application_Screen_Flow
```

Provides a guided Salesforce interface for collecting the core applicant and loan information and creating a Loan Application record.

### Agentforce Autolaunched Flow

```text
Agentforce_Autolaunched_Create_Loan_Application1
```

Provides the automation bridge between Agentforce and Salesforce record creation.

### High-Value Loan Automation

```text
Loan_Application_Auto_Update_High_Value_Status
```

This record-triggered automation monitors Loan Application records.

Loan requests of 100,000 or more are moved into the review process by updating their application status.

---

## Lightning Experience Layer

The custom Salesforce application is:

```text
Loan Processing Assistant
```

The user experience includes:

- Custom Salesforce Home Page
- Loan Application Record Page
- Dynamic Forms
- Dynamic visibility
- Custom Lightning Web Components
- Standard Salesforce reports
- Salesforce dashboard

---

## Loan Officer Command Center

The custom Home Page includes the:

```text
loanOfficerCommandCenter
```

Lightning Web Component.

The component provides portfolio-level operational visibility, including:

- Total applications
- Total requested amount
- Average loan amount
- Application counts by status
- Application pipeline
- Applications requiring attention
- Recent applications

The Command Center also provides record navigation, data refresh, and direct access to the Create Loan Application Screen Flow.

---

## Apex Layer

The Command Center retrieves and aggregates Salesforce data through:

```text
LoanOfficerCommandCenterController
```

The Apex controller supplies portfolio metrics, recent applications, and high-value applications requiring attention to the Lightning Web Component.

Server-side behavior is covered by:

```text
LoanOfficerCommandCenterControllerTest
```

The final Apex test execution completed with 2 tests passed and 0 failures.

---

## Record-Level Experience

The Loan Application Record Page includes the custom:

```text
loanProgressTracker
```

Lightning Web Component.

It provides a visual representation of the current application status at the individual record level.

This complements the portfolio-level Command Center by providing detailed progress visibility for a single Loan Application.

---

## Reporting Layer

The solution uses standard Salesforce analytics alongside the custom Command Center.

Reports include:

- Loan Applications by Loan Type
- New Loan Applications Report

The Salesforce dashboard:

```text
Loan Processing Overview
```

provides additional visual monitoring of Loan Application data.

---

## Architecture Principles

The solution follows several architectural principles:

- Use declarative Salesforce automation where appropriate.
- Use Apex when server-side aggregation is required.
- Keep Agentforce actions connected to deterministic Salesforce automation.
- Require user confirmation before Agentforce creates a Loan Application.
- Separate portfolio-level monitoring from record-level tracking.
- Use standard Salesforce analytics alongside custom components.
- Keep consequential lending decisions outside autonomous AI behavior.