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
