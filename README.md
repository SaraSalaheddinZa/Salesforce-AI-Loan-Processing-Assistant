# AI-Powered Loan Processing Assistant

A Salesforce-based loan processing solution that combines **Agentforce, Salesforce Flow, Lightning Web Components, Dynamic Forms, automation, reports, and dashboards** to create a structured digital experience for managing loan applications.

The project demonstrates how Salesforce platform capabilities and conversational AI can work together to support loan application intake, automate business processes, track application progress, and provide operational visibility.

---

## Project Overview

Traditional loan processing can involve repetitive data entry, manual workflow steps, inconsistent information collection, and limited visibility into application progress.

The **AI-Powered Loan Processing Assistant** was developed as a Salesforce solution to demonstrate a more structured and automated loan processing experience.

The system provides:

- Guided loan application intake
- Agentforce-powered assistance
- Automated Salesforce workflows
- Dynamic Lightning record experiences
- Custom application progress tracking
- Validation and data protection
- Reports and dashboard monitoring

---

## Solution Architecture

```text
                     Agentforce
                         │
                         ▼
                  Agent Actions
                         │
                         ▼
              Salesforce Flow Layer
                  /             \
                 /               \
        Screen Flow        Autolaunched Flow
                 \               /
                  \             /
                   ▼           ▼
                  Loan Application
                  (Custom Object)
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
     Automation        LWC         Reporting
          │             │             │
          ▼             ▼             ▼
    Status Update   Progress      Reports &
                    Tracker       Dashboard
```

---

## Salesforce Components

### Custom Object

**Loan Application (`Loan_Application__c`)**

The central Salesforce object used to store and manage loan application information throughout the application lifecycle.

### Custom Fields

| Field | API Name |
|---|---|
| Applicant Name | `Applicant_Name__c` |
| Contact Email | `Contact_Email__c` |
| Annual Income | `Annual_Income__c` |
| Loan Amount | `Loan_Amount__c` |
| Loan Type | `Loan_Type__c` |
| Application Status | `Application_Status__c` |
| Risk Score | `Risk_Score__c` |
| Employment Status | `Employment_Status__c` |

---

## Lightning Application

### Loan Processing Assistant

A custom Salesforce Lightning application that provides a centralized workspace for managing loan applications and accessing related Salesforce functionality.

The application brings together:

- Loan application records
- Automation
- Reports
- Dashboard
- Custom Lightning components

---

## Lightning Record Page

### Loan Application Record Page

A custom Lightning Record Page provides a structured interface for viewing and managing loan application information.

The page uses Salesforce capabilities including:

- Dynamic Forms
- Conditional field visibility
- Standard Lightning components
- Custom Lightning Web Component

---

## Lightning Web Component

### `loanProgressTracker`

A custom Lightning Web Component used to visualize the progress of a loan application based on its current application status.

The component is integrated directly into the Loan Application Lightning Record Page.

```text
Loan Application
       │
       ▼
Application Status
       │
       ▼
loanProgressTracker
       │
       ▼
Visual Progress Indicator
```

Source:

```text
force-app/main/default/lwc/loanProgressTracker/
```

---

## Salesforce Flow Automation

The project uses multiple Salesforce Flows for application intake, Agentforce integration, and record automation.

### 1. Create Loan Application Screen Flow

**API Name:** `Create_Loan_Application_Screen_Flow`

A Screen Flow provides a guided interface for creating a new loan application.

The flow collects key information including:

- Applicant name
- Contact email
- Requested loan amount
- Loan type

After the application is created, a confirmation screen displays the created record information.

---

### 2. Agentforce Autolaunched Loan Creation Flow

**API Name:** `Agentforce_Autolaunched_Create_Loan_Application1`

An active Autolaunched Flow provides an automation layer that can receive loan application information and create a `Loan_Application__c` record.

The flow exposes input variables for applicant information and returns the created Loan Application record ID as an output.

---

### 3. High-Value Loan Status Automation

**API Name:** `Loan_Application_Auto_Update_High_Value_Status`

A Record-Triggered Flow automatically processes high-value loan applications.

The configured automation evaluates applications with a loan amount of **100,000 or greater** and updates qualifying applications to the **In Review** stage according to the configured status logic.

This demonstrates Salesforce record-triggered automation for implementing business rules without custom Apex code.

---

## Agentforce Integration

### Loan Assistant Agent

The project includes an Agentforce configuration represented in Salesforce metadata as:

`Loan_Assistant_Agent_v1`

The Agentforce metadata is stored directly in the Salesforce DX project:

```text
force-app/main/default/genAiPlannerBundles/
└── Loan_Assistant_Agent_v1/
    ├── agentGraph/
    ├── agentScript/
    ├── localActions/
    └── Loan_Assistant_Agent_v1.genAiPlannerBundle
```

The agent is designed to support conversational interaction around the loan application process and works with Salesforce automation to support structured application handling.

The retrieved Agentforce metadata includes the agent graph, agent definition, and local action configuration.

---

## Validation and Data Protection

### Prevent Manual Risk Score Edit

**Validation Rule:** `Prevent_Manual_Risk_Score_Edit`

The project includes a Salesforce Validation Rule designed to protect the Risk Score field from unauthorized manual modification.

This demonstrates the use of declarative Salesforce controls to protect important application data and enforce data integrity.

---

## Reports

The solution includes Salesforce reports for monitoring loan application activity.

### Loan Applications by Loan Type

Provides visibility into loan applications grouped by loan type and includes loan amount information for analysis.

### New Loan Applications Report

Provides visibility into newly created loan applications for operational monitoring.

Report metadata is included in:

```text
force-app/main/default/reports/
```

---

## Dashboard

### Loan Processing Overview

A Salesforce dashboard provides a visual overview of loan application activity using the project's reporting data.

Dashboard metadata is included in:

```text
force-app/main/default/dashboards/
```

---

## Salesforce DX Project Structure

```text
force-app/
└── main/
    └── default/
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
        │
        ├── objects/
        │   └── Loan_Application__c/
        │
        └── reports/
            └── unfiled$public/
```

---

## Technologies and Salesforce Features

- Salesforce Platform
- Agentforce
- Salesforce Flow Builder
- Lightning App Builder
- Lightning Web Components (LWC)
- Dynamic Forms
- Dynamic Visibility
- Custom Objects and Fields
- Validation Rules
- Salesforce Reports
- Salesforce Dashboards
- Salesforce DX
- Salesforce CLI
- Visual Studio Code

---

## Testing

The solution was tested across the main application workflows, including:

- Loan application creation through the Screen Flow
- Loan record creation and storage
- Application status automation
- Loan progress visualization through the custom LWC
- Agentforce interaction with loan application functionality
- Report generation and application monitoring

Testing was performed using sample loan application records in the Salesforce development environment.

---

## Project Scope

This project is a demonstration and learning implementation of a Salesforce-based loan processing workflow.

It focuses on:

- Structured application intake
- Salesforce automation
- Agentforce integration
- User experience
- Application monitoring
- Declarative platform capabilities

The current implementation does **not** integrate with external credit bureaus, banking systems, or production lending decision engines.

The solution is not intended to autonomously make real-world lending decisions. Any consequential lending decision would require appropriate human review, governance, security controls, and regulatory compliance.

---

## Future Enhancements

Potential future improvements include:

- External credit bureau integration
- Document upload and verification
- Approval workflows
- Applicant notifications
- Enhanced risk evaluation models
- Additional Agentforce actions
- Integration with external banking systems
- Expanded analytics and reporting

---

## Author

**Sara Salaheddin**

Information Technology and Computing  
Arab Open University
