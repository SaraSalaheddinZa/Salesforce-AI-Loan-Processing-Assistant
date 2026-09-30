# AI-Powered Loan Processing Assistant

An end-to-end loan processing solution built on Salesforce that combines **Agentforce, Salesforce Flow, Lightning Experience, Dynamic Forms, Lightning Web Components (LWC), validation rules, reports, and dashboards**.

The project demonstrates how Salesforce automation and conversational AI can be combined to streamline loan application intake, guide users through the application process, automate record creation, and provide loan officers with a structured workspace for managing applications.

---

## Overview

Loan processing often involves repetitive data collection, manual record creation, and multiple steps before an application can be reviewed.

The **AI-Powered Loan Processing Assistant** provides a centralized Salesforce solution where users can:

- Submit loan applications through a guided Screen Flow.
- Interact with an Agentforce loan assistant.
- Create Loan Application records through Agentforce.
- Automatically process high-value applications using Salesforce Flow.
- Track application progress using a custom Lightning Web Component.
- Manage loan information through a customized Lightning Record Page.
- Analyze application data using Salesforce Reports and Dashboards.

The solution combines conversational AI with Salesforce's declarative automation capabilities while keeping loan records and processing logic inside the Salesforce platform.

---

## Solution Architecture

```text
                         ┌───────────────────────┐
                         │         User          │
                         └───────────┬───────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
                    ▼                                 ▼
          ┌──────────────────┐              ┌──────────────────┐
          │    Agentforce    │              │   Screen Flow    │
          │ Loan Assistant   │              │ Loan Application │
          └────────┬─────────┘              └────────┬─────────┘
                   │                                 │
                   ▼                                 │
          Collect Applicant                          │
             Information                             │
                   │                                 │
                   ▼                                 │
            User Confirmation                        │
                   │                                 │
                   ▼                                 │
        Create Loan Application                      │
               Action                                │
                   │                                 │
                   ▼                                 │
          Autolaunched Flow                          │
                   │                                 │
                   └────────────────┬────────────────┘
                                    ▼
                         ┌──────────────────────┐
                         │ Loan_Application__c  │
                         └──────────┬───────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
        Record-Triggered       Lightning Record      Reports &
             Flow                  Page              Dashboard
                                    │
                                    ▼
                           Loan Progress Tracker
                                Custom LWC
```

---

## Agentforce — Loan Assistant Agent

A major part of the project is the **Loan Assistant Agent**, built using Salesforce Agentforce.

The agent provides a conversational interface for users who want information about available loan options or want to start a new loan application.

### Collect Applicant Information

The **Collect Applicant Information** topic is used when a user wants to submit a new loan application.

The agent collects:

- Applicant full name
- Contact email
- Requested loan amount
- Loan type

The topic is configured to:

- Validate that the requested loan amount is a positive number.
- Avoid assuming missing applicant information.
- Ask specifically for any required information that has not been provided.
- Summarize the collected information before submission.
- Ask the user to confirm the information before creating the application.

### Create Loan Application Action

After the applicant confirms the information, Agentforce invokes the:

**Create Loan Application**

action.

The action is connected to the autolaunched Salesforce Flow:

```text
Agentforce_Autolaunched_Create_Loan_Application1
```

The action passes the following inputs to the Flow:

```text
varApplicantName
varContactEmail
varLoanAmount
varLoanType
```

The Flow creates the Loan Application record and returns:

```text
varLoanApplicationId
```

This creates an integration path between conversational AI and Salesforce automation:

```text
User
  ↓
Loan Assistant Agent
  ↓
Collect Applicant Information
  ↓
User Confirmation
  ↓
Create Loan Application Action
  ↓
Autolaunched Flow
  ↓
Loan Application Record
```

### Loan Inquiry

The Agentforce configuration also includes a **Loan Inquiry** topic.

This topic provides general guidance about the loan options supported by the solution:

- Personal Loan
- Home Loan
- Auto Loan
- Business Loan

The agent is instructed not to invent specific interest rates, fees, eligibility requirements, or approval decisions that are not available in the system.

### Agentforce Metadata

The Agentforce configuration is stored in the Salesforce metadata project under:

```text
force-app/main/default/genAiPlannerBundles/Loan_Assistant_Agent_v1/
```

The retrieved Planner Bundle contains the agent definition, graph, and local actions required by the Salesforce Agentforce configuration.

---

## Loan Application Data Model

The solution is centered around the custom Salesforce object:

```text
Loan_Application__c
```

### Main Fields

| Field | API Name | Type |
|---|---|---|
| Applicant Name | `Applicant_Name__c` | Text |
| Contact Email | `Contact_Email__c` | Email |
| Annual Income | `Annual_Income__c` | Currency |
| Loan Amount | `Loan_Amount__c` | Currency |
| Loan Type | `Loan_Type__c` | Picklist |
| Application Status | `Application_Status__c` | Picklist |
| Risk Score | `Risk_Score__c` | Number |
| Employment Status | `Employment_Status__c` | Picklist |

### Loan Types

The application supports:

```text
Home
Personal
Auto
Business
```

### Application Status

The application lifecycle includes:

```text
New
Submitted
In Review
Approved
Rejected
```

---

## Salesforce Automation

The project uses multiple Salesforce Flows for user interaction, Agentforce integration, and automated processing.

### 1. Create Loan Application Screen Flow

```text
Create_Loan_Application_Screen_Flow
```

This active Screen Flow provides a guided interface for creating a new loan application.

The Flow collects:

- Applicant Full Name
- Contact Email
- Requested Loan Amount
- Loan Type

It then creates a new `Loan_Application__c` record and sets the initial application status to:

```text
New
```

After creation, the Flow displays a confirmation screen containing the generated record ID.

---

### 2. Agentforce Autolaunched Flow

```text
Agentforce_Autolaunched_Create_Loan_Application1
```

This active Autolaunched Flow allows Agentforce to create Loan Application records without requiring the standard Screen Flow interface.

Agentforce passes the applicant information to the Flow, and the Flow creates the Salesforce record.

This Flow is the automation layer connecting the **Loan Assistant Agent** with the Salesforce data model.

---

### 3. High-Value Loan Automation

```text
Loan_Application_Auto_Update_High_Value_Status
```

An active Record-Triggered Flow monitors Loan Application records.

For loan requests of **100,000 or more**, the automation moves the application into the review process by updating the application status.

This demonstrates automated processing based on loan application data without requiring manual intervention for the status update.

---

## Lightning Experience

The project includes a custom Salesforce Lightning application:

```text
Loan Processing Assistant
```

The application provides a centralized workspace for managing loan applications and accessing reporting functionality.

### Lightning Record Page

A custom Lightning Record Page was created:

```text
Loan Application Record Page
```

The page organizes loan information into sections including:

### Applicant & Financial Details

Contains information related to the applicant and their financial profile.

### Loan Details

Contains information about the requested loan and its processing status.

The page uses **Dynamic Forms and component visibility** to provide a more contextual user experience.

---

## Custom Lightning Web Component

The project includes a custom Lightning Web Component:

```text
loanProgressTracker
```

Displayed in Salesforce as:

**Loan Application Tracker (Custom LWC)**

The component provides a visual representation of the current loan application status directly on the Loan Application record page.

It allows users and loan officers to quickly understand where an application is in the processing lifecycle.

### Component Files

```text
loanProgressTracker/
├── loanProgressTracker.html
├── loanProgressTracker.js
└── loanProgressTracker.js-meta.xml
```

---

## Data Protection

A validation rule is included to protect the Risk Score field:

```text
Prevent_Manual_Risk_Score_Edit
```

The rule prevents unauthorized manual modification of `Risk_Score__c`.

This helps keep system-managed information protected from unintended user changes.

Salesforce security configuration and field-level access are also used to control access to loan application information.

---

## Reports & Dashboard

The project includes Salesforce reporting components for monitoring loan applications.

### Reports

**Loan Applications by Loan Type**

```text
Loan_Applications_by_Loan_Type_0KE
```

Provides visibility into applications grouped by loan type.

**New Loan Applications Report**

```text
New_Loan_Applications_Report_nBu
```

Provides visibility into newly created loan applications.

### Dashboard

**Loan Processing Overview**

The dashboard provides a visual overview of loan application data and uses Salesforce report data to support monitoring and analysis.

---

## Testing

The solution was tested across its main workflows, including:

- Creating loan applications through the Screen Flow.
- Creating loan applications through Agentforce.
- Passing applicant information from Agentforce to the Autolaunched Flow.
- Creating `Loan_Application__c` records.
- Displaying application progress through the custom LWC.
- Executing automated processing for high-value applications.
- Displaying loan information through reports and the dashboard.
- Validating protected field behavior.

Testing focused on verifying that the major Salesforce components work together as an integrated loan processing solution.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Salesforce Platform | Core application platform |
| Salesforce Agentforce | Conversational loan assistant |
| Salesforce Flow Builder | Business process automation |
| Lightning App Builder | Application and record page design |
| Dynamic Forms | Contextual record experience |
| Lightning Web Components | Custom loan progress interface |
| Salesforce Reports | Loan data analysis |
| Salesforce Dashboards | Visual monitoring |
| Salesforce CLI | Metadata retrieval and project management |
| Salesforce DX | Source-driven project structure |
| Git | Source control |
| GitHub | Project repository |

---

## Project Structure

```text
force-app/main/default/
│
├── applications/
│   └── Loan_Processing_Assistant.app-meta.xml
│
├── dashboards/
│   └── PublicDashboards/
│       └── WOwFqzxAxdwebkXMWFUhIMhEiRAzLw1.dashboard-meta.xml
│
├── flexipages/
│   ├── Loan_Application_Record_Page.flexipage-meta.xml
│   └── Loan_Processing_Assistant_UtilityBar.flexipage-meta.xml
│
├── flows/
│   ├── Agentforce_Autolaunched_Create_Loan_Application1.flow-meta.xml
│   ├── Create_Loan_Application_Screen_Flow.flow-meta.xml
│   └── Loan_Application_Auto_Update_High_Value_Status.flow-meta.xml
│
├── genAiPlannerBundles/
│   └── Loan_Assistant_Agent_v1/
│
├── lwc/
│   └── loanProgressTracker/
│       ├── loanProgressTracker.html
│       ├── loanProgressTracker.js
│       └── loanProgressTracker.js-meta.xml
│
├── objects/
│   └── Loan_Application__c/
│       ├── fields/
│       ├── listViews/
│       ├── validationRules/
│       └── Loan_Application__c.object-meta.xml
│
└── reports/
    └── unfiled$public/
        ├── Loan_Applications_by_Loan_Type_0KE.report-meta.xml
        └── New_Loan_Applications_Report_nBu.report-meta.xml
```

---

## Responsible AI & Scope

This project demonstrates how Agentforce can assist with loan intake and workflow automation.

The AI assistant is used to:

- Guide users through loan-related interactions.
- Collect structured applicant information.
- Validate required conversational inputs.
- Trigger Salesforce automation after user confirmation.

The project does **not** represent a production credit decision engine.

Agentforce is not used to independently make real-world lending decisions, determine creditworthiness, or autonomously approve or reject applicants.

The current project scope does not include:

- External credit bureau integration
- Production credit scoring
- Automated document verification
- Core banking integration
- Predictive lending models

These capabilities could be considered as future extensions in a production architecture with appropriate security, compliance, governance, and human oversight.

---

## Future Enhancements

Potential future development could include:

- External credit bureau API integration
- Document upload and verification
- Additional loan officer workflow automation
- Email and notification automation
- Enhanced application review workflows
- Additional Agentforce actions
- Expanded reporting and analytics
- Integration with external banking systems
- More advanced risk assessment models

---

## Author

**Sara Salaheddin**

---

## Repository

This repository contains the Salesforce DX metadata and source components for the **AI-Powered Loan Processing Assistant** project.
