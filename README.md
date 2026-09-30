# AI-Powered Loan Processing Assistant

An end-to-end loan processing solution built on Salesforce that combines **Agentforce, Salesforce Flow, Lightning Experience, Dynamic Forms, Lightning Web Components (LWC), validation rules, reports, and dashboards**.

The project demonstrates how Salesforce automation and conversational AI can work together to streamline loan application intake, guide users through the application process, automate record creation, and provide a structured workspace for managing loan applications.

---

## Overview

Loan processing often involves repetitive data collection, manual record creation, and multiple processing steps.

The **AI-Powered Loan Processing Assistant** provides a centralized Salesforce solution that supports:

- Conversational loan application intake through Agentforce
- Guided loan application creation through Screen Flow
- Automated record creation using Salesforce Flow
- High-value loan processing automation
- Dynamic Lightning record experiences
- Real-time application progress tracking with a custom LWC
- Loan reporting and dashboard analytics

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

The solution includes a Salesforce Agentforce assistant that provides a conversational interface for loan-related interactions.

### Collect Applicant Information

The **Collect Applicant Information** topic is used when a user wants to submit a new loan application.

The agent collects:

- Applicant full name
- Contact email
- Requested loan amount
- Loan type

The agent is configured to:

- Validate that the requested loan amount is positive
- Avoid assuming missing applicant information
- Ask specifically for required missing information
- Summarize the collected information
- Request confirmation before creating the application

### Create Loan Application Action

After the user confirms the collected information, Agentforce invokes the:

**Create Loan Application**

action.

The action connects Agentforce to the active autolaunched Salesforce Flow:

```text
Agentforce_Autolaunched_Create_Loan_Application1
```

The following information is passed to the Flow:

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

### Agentforce Integration Flow

```text
User
  ↓
Loan Assistant Agent
  ↓
Collect Applicant Information
  ↓
Validate Required Information
  ↓
User Confirmation
  ↓
Create Loan Application Action
  ↓
Autolaunched Salesforce Flow
  ↓
Loan_Application__c
```

### Loan Inquiry

The **Loan Inquiry** topic provides general guidance about the loan types supported by the solution:

- Personal Loan
- Home Loan
- Auto Loan
- Business Loan

The agent is instructed not to invent specific eligibility requirements, interest rates, fees, or approval decisions that are not available in the system.

### Agentforce Metadata

The Agentforce configuration is stored in the Salesforce metadata project under:

```text
force-app/main/default/genAiPlannerBundles/Loan_Assistant_Agent_v1/
```

The retrieved Planner Bundle contains the agent definition, agent graph, and supporting local actions required by the Agentforce configuration.

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

### Supported Loan Types

```text
Home
Personal
Auto
Business
```

### Application Lifecycle

```text
New → Submitted → In Review → Approved / Rejected
```

---

## Salesforce Automation

The project uses Salesforce Flow Builder for application intake, Agentforce integration, and automated loan processing.

### Create Loan Application Screen Flow

```text
Create_Loan_Application_Screen_Flow
```

The active Screen Flow provides a guided interface for creating a Loan Application.

It collects:

- Applicant Full Name
- Contact Email
- Requested Loan Amount
- Loan Type

The Flow creates a `Loan_Application__c` record and sets its initial application status to:

```text
New
```

After the record is created, a confirmation screen displays the generated record ID.

### Agentforce Autolaunched Flow

```text
Agentforce_Autolaunched_Create_Loan_Application1
```

This active Autolaunched Flow provides the automation layer between Agentforce and Salesforce.

Agentforce passes the applicant information to the Flow, and the Flow creates the corresponding Loan Application record.

### High-Value Loan Automation

```text
Loan_Application_Auto_Update_High_Value_Status
```

An active Record-Triggered Flow monitors Loan Application records.

Loan requests of **100,000 or more** are automatically moved into the review process by updating their application status.

---

## Lightning Experience

The project includes the custom Lightning application:

```text
Loan Processing Assistant
```

It provides a centralized workspace for working with loan applications and related analytics.

### Loan Application Record Page

The custom:

```text
Loan Application Record Page
```

organizes application information into structured sections such as:

**Applicant & Financial Details**

and:

**Loan Details**

Dynamic Forms and visibility rules are used to create a more contextual record experience.

---

## Custom Lightning Web Component

The project includes a custom Lightning Web Component:

```text
loanProgressTracker
```

The component is displayed as:

**Loan Application Tracker (Custom LWC)**

It provides a visual representation of the current application status directly on the Loan Application record page.

### Component Files

```text
loanProgressTracker/
├── loanProgressTracker.html
├── loanProgressTracker.js
└── loanProgressTracker.js-meta.xml
```

---

## Data Protection

The project includes the validation rule:

```text
Prevent_Manual_Risk_Score_Edit
```

The rule protects `Risk_Score__c` from unauthorized manual modification.

This helps maintain the integrity of system-managed loan information.

Salesforce access controls and field-level security can also be used to restrict access to sensitive application information.

---

## Reports & Dashboard

The solution includes Salesforce reports and a dashboard for monitoring loan application data.

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

The dashboard provides a visual overview of loan application data using Salesforce report data.

---

## Testing

The main solution workflows were tested across:

- Screen Flow loan application creation
- Agentforce applicant information collection
- Agentforce user confirmation
- Agentforce-to-Flow integration
- Loan Application record creation
- High-value loan automation
- Custom LWC application progress display
- Validation rule behavior
- Reports and dashboard visibility

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Salesforce Platform | Core application platform |
| Salesforce Agentforce | Conversational loan assistant |
| Salesforce Flow Builder | Process automation |
| Lightning App Builder | Application and record page configuration |
| Dynamic Forms | Contextual record experience |
| Lightning Web Components | Custom progress tracking UI |
| Salesforce Reports | Loan data analysis |
| Salesforce Dashboards | Visual monitoring |
| Salesforce CLI | Metadata retrieval and project management |
| Salesforce DX | Source-driven project structure |
| Git | Version control |
| GitHub | Source repository |

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
│       └── validationRules/
│
└── reports/
    └── unfiled$public/
```

---

## Responsible AI & Project Scope

This project demonstrates how conversational AI can support loan intake and Salesforce workflow automation.

Agentforce is used to:

- Guide users through loan-related interactions
- Collect structured applicant information
- Validate required conversational inputs
- Request user confirmation
- Trigger Salesforce automation

The project does **not** represent a production credit decision engine.

Agentforce is not used to independently determine creditworthiness or autonomously make real-world lending decisions.

The current scope does not include:

- External credit bureau integration
- Production credit scoring
- Automated document verification
- Core banking integration
- Predictive lending models

Production deployment of these capabilities would require additional security, compliance, governance, validation, and human oversight.

---

## Future Enhancements

Future versions could include:

- External credit bureau API integration
- Document upload and verification
- Loan officer notifications
- Enhanced review workflows
- Additional Agentforce actions
- Expanded reporting and analytics
- External banking system integration
- Advanced risk assessment models

---

## Author

**Sara Salaheddin**
