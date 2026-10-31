# PNG Power Issue Reporting & Resolution System
## Enterprise Build Plan for Kilo Code and Other Engineering Agents

**Document status:** Implementation plan for discovery and staged delivery  
**Version:** 1.0  
**Prepared:** 31 October 2026  
**Source plan:** `PNG_Power_Issue_Reporting_Full_Plan.docx`  
**Audience:** Product owner, PNG Power operations, engineering team, security/IT reviewers, Kilo Code and other coding agents

> **Implementation mandate:** Build a secure, supportable case-and-work management system that helps PNG Power take power issues from report intake through accountable field action and recorded outcome. Do not build a complaint form that has no operational owner. Every report must remain traceable to its reporter’s case, even when confirmed as part of a larger incident.

> **Critical domain rule:** Many reports may link to one confirmed incident; an incident may have many work orders. Preserve every report and case number. Candidate matches are suggestions only; authorized staff confirm or correct links. Never auto-delete or silently merge reports.

---

## 1. How engineering agents must use this plan

Treat this file as the product and technical baseline for the first implementation. Before changing an existing repository, inspect it and report its current framework, deployment model, tests, coding conventions and uncommitted user changes. Do not replace or restructure a working repository without a clear need and an approved plan.

Agents must:

1. Implement in the phases and gates below; do not skip directly to production deployment.
2. Prefer the organization’s approved identity, hosting, notification, database and security services when they meet these requirements. Record deviations in an Architecture Decision Record (ADR).
3. Never use live resident or customer personal data in development, tests, screenshots, seed data or logs. Use synthetic fixtures only.
4. Never hard-code secrets, credentials, production URLs or private keys. Use environment configuration and the approved secret store.
5. Never apply migrations, send messages, publish a site, alter production data or perform external actions without explicit authorization from the responsible owner.
6. Add tests and documentation with each feature. Run relevant tests, type checks, linting, accessibility checks and migrations before declaring work complete.
7. Preserve audit history and user records. A correction must be represented as a new event or reversible state change, not destructive rewriting.
8. If an operational or policy decision is missing, surface it as an open decision and implement a safe configurable default where possible. Do not invent service commitments or legal requirements.

### Required agent handoff after each phase

Return a concise report containing: files changed, requirements completed, tests run and results, migrations introduced, security or privacy considerations, unresolved decisions, known limitations, and the exact next recommended task. Do not claim a feature works unless its tests and acceptance criteria pass.

---

## 2. Product objective and scope

Deliver a mobile-friendly web platform with three connected interfaces backed by one operational record system:

- **Resident portal:** report an issue and check the resident’s own case, with phone support available for residents who cannot use the web.
- **Staff management system:** securely create and review reports, group confirmed reports under incidents, assign repair work, update progress and record outcomes.
- **Field officer PWA:** use assigned work and capture permitted updates offline, then synchronize safely when connectivity returns.

The system must help operations answer: where is the problem, who is affected, who owns the next action, what is blocking progress, and what work was completed? It must support repeat-fault analysis and national/regional operational reporting.

### First-release scope

- Report intake from resident web, staff entry and phone-assisted call-centre entry.
- Case-number acknowledgement and resident status lookup with verification.
- Staff triage, safety/impact flags and regional ownership.
- Suggested report matches, staff-confirmed incident linking and correction/unlinking.
- Incident records and work orders, including multiple work orders per incident.
- Status history, field notes, photo metadata/attachments and resident feedback.
- Offline field drafts and approved work-order updates with a retryable synchronization queue.
- Role-based access, audit history, basic notifications, operational dashboards and exportable reports.

### Not assumed for the first release

- Replacing customer billing, outage management, asset management or enterprise work-order systems.
- Fully autonomous incident matching, machine-learning decisions, automatic merging or automatic dispatch.
- A native iOS/Android application, public outage map with customer-level detail, guaranteed repair-time promises, or nationwide launch before a pilot.
- SMS/USSD delivery until PNG Power confirms a viable provider, coverage, consent/opt-out rules and operational ownership.

---

## 3. Core domain concepts and rules

Keep these records distinct throughout the code, API, database and UI:

| Concept | Definition | Cardinality / key rule |
|---|---|---|
| **Report / case** | One submission from a resident, business, officer or call-centre staff member. | Every submission receives a unique case number. One report may have at most one active incident link at a time; historical links are retained. |
| **Incident** | The suspected or confirmed underlying power fault/outage. | One incident can be linked to many reports and may have many work orders. |
| **Work order** | An assigned operational repair or investigation task. | Each work order has an accountable owner/team, current status and next action. Do not create duplicate dispatches just because more reports arrive. |
| **Event / audit record** | Append-only history of a meaningful action or state change. | Record actor, timestamp, entity, action and relevant before/after or reason data. Keep sensitive data out of event payloads unless necessary. |
| **Notification** | Attempt to inform a reporter or operational user. | Track delivery state, but notification failure must not erase or roll back the case update. |

### Non-negotiable business rules

1. Create one report and case number for each submission. Preserve the original description, source and received time.
2. A report may be created before an incident is known. Incident linkage is a separate, auditable action.
3. Candidate matching may use time, issue type, location, feeder/asset information or staff context. It must produce **suggestions**, not automatic merges, in the MVP.
4. Only authorized staff can confirm, change or remove a report-to-incident link. Record who did it, when and why. Preserve the previous link history.
5. Linking reports does not combine or delete customer identities, case numbers or case histories.
6. Incident-level progress may be reflected in each linked resident’s case view. Personal details and one resident’s notes must never be exposed to another resident.
7. Repeated reports must add evidence to the incident and its impact view; they must not automatically create extra crews or repair work orders.
8. Similar timing alone is not sufficient to link faults. Keep different faults separate when the location, symptoms or field evidence differ.
9. A mistaken grouping must be correctable by unlinking, moving a report or splitting an incident. Preserve history and notify operational users affected by the correction.
10. `Pending` requires a reason, an accountable owner and a review/update date. A case or work order must not remain pending with no next action.
11. Do not mark an incident resolved merely because a crew was dispatched. Capture the work performed and restoration outcome. Provide a route to flag “still not fixed” or recurrence.
12. A resident’s “still not fixed” response reopens or flags that resident’s case for review. Staff decide whether the incident itself needs reopening or a separate follow-up incident.
13. A dangerous electrical hazard must point to PNG Power’s approved emergency process. The platform must not promise emergency dispatch or replace approved emergency channels.

---

## 4. Users, access and workflows

### Roles

- **Resident/business:** submit a report, retrieve only their own case, receive appropriate updates and provide resolution feedback.
- **Call-centre agent:** create reports for callers, find cases using permitted identifiers, explain the latest status and record feedback.
- **Field officer/crew:** see assigned work, record site findings, actions, materials needed, photos and restoration outcome; use permitted offline functions.
- **Regional coordinator:** review incoming work, triage, confirm incident links, assign work orders, set owners/next actions and escalate blockers.
- **Regional manager:** review service performance, recurring issues, resource blockers and overdue work in their region.
- **Headquarters administrator/analyst:** configure common reference data, manage access and review national trends under least-privilege rules.
- **System administrator:** maintain configuration and service health; no routine customer data access unless required and audited.

Role and region assignments are configuration, not hard-coded business logic. Enforce authorization server-side for every protected API operation; hiding a UI button is not authorization.

### Resident flow

1. Select an issue category, describe the problem and provide the best available location: province and available area hierarchy, community/street/landmark; map pin optional.
2. Provide preferred contact details only if the resident wants follow-up; account/meter information may be collected when useful but must not block reporting a safety hazard.
3. Submit and receive a unique case number and acknowledgement.
4. Staff triage the report and may link it to a confirmed shared incident. The resident’s case remains independently retrievable.
5. Resident checks status online using case number plus a verification factor, or calls and asks a staff member to check it.
6. Resident receives plain-language updates where a contact channel is available and can say the issue is not fixed or has returned.

### Staff flow

1. Receive or create a report; check category, location, source, safety risk and urgency.
2. Review potential matches. Confirm, reject or defer a suggested incident link; do not lose the report.
3. Triage the incident and affected reports; set priority, accountable owner and next review/action.
4. Create one or more work orders for the actual repair tasks and assign them to a team/crew.
5. Field staff investigate, record observations and repair progress, and request parts or escalation when needed.
6. Regional staff update affected customers, monitor delays and coordinate follow-up.
7. Record repair outcome, restoration evidence and customer feedback; close under approved rules or reopen/link follow-up if the fault remains.

### Status model

Use separate internal state machines for **Report**, **Incident** and **Work Order**. The resident interface may present a simplified view, but do not overload one status field to represent all three.

Suggested resident-facing report statuses: `Recorded`, `Under review`, `Assigned`, `Work in progress`, `Pending`, `Resolved`, `Closed`. Internal state definitions and allowed transitions must be documented and validated with PNG Power before implementation. Each transition should record actor, timestamp and reason where appropriate. Invalid transitions must be rejected by the backend.

Suggested work-order statuses: `Draft`, `Assigned`, `Accepted`, `In progress`, `Blocked`, `Work completed`, `Cancelled`. Exact values require operational validation. `Work completed` is not automatically equivalent to incident restoration or customer confirmation.

---

## 5. Recommended architecture and stack

Use a **modular monolith** for the initial system. It is simpler to operate and secure than early microservices while keeping domain boundaries explicit. The PWA communicates through a versioned API; background tasks handle notifications and file processing.

| Layer | Recommended baseline | Notes |
|---|---|---|
| Resident + staff web | TypeScript, React and a supported build tool such as Vite | Responsive, accessible browser application; one codebase can expose role-appropriate views. |
| PWA/offline | Service worker with Workbox or equivalent; IndexedDB via Dexie or equivalent | Cache static assets and limited assigned work; queue offline events; present clear sync state. |
| API/backend | Python and Django REST Framework | Versioned REST API, schema validation, authorization, admin and domain services. Publish OpenAPI. |
| Database | PostgreSQL; add PostGIS where geographic queries are required | Relational constraints, transactions and spatial operations. Select managed/approved hosting with supportable backup/restore. |
| Async jobs/cache | Celery + Redis or organization-approved equivalent, only where needed | Use for notification retries, attachment processing, exports and scheduled operational jobs; avoid unnecessary dependency if MVP load does not require it. |
| Attachments | Approved object storage | Store metadata in PostgreSQL, files separately; use short-lived authorized download links where supported. |
| Identity | PNG Power-approved identity provider using OIDC where available; MFA for staff | Resident case lookup uses a verification mechanism that does not require a full account. Never invent authentication integration settings. |
| Notifications | Provider-neutral adapter for SMS/email if approved | Messaging provider, local coverage, consent and opt-out behavior must be validated before enabling. |
| Hosting | PNG Power-approved managed hosting or data-centre environment | Decide based on data residency, network access, operational support, backups and procurement. |
| Engineering delivery | Git, automated CI, containerized local environment, controlled release pipeline | Dev/staging/prod separation, repeatable builds, reviewed migrations and deployment rollback. Infrastructure-as-code where supported. |

### Suggested repository layout

Adapt to an existing repository if one exists; do not force this layout onto it.

```text
.
├── apps/
│   ├── web/                    # React/TypeScript resident + staff PWA
│   └── api/                    # Django project and domain modules
├── packages/
│   └── api-client/             # generated/typed API client if useful
├── infra/                      # approved deployment/IaC configuration
├── docs/
│   ├── adr/                    # architecture decision records
│   ├── api/                    # OpenAPI and API usage guidance
│   ├── operations/              # runbooks, backup/restore, incident response
│   └── security/               # threat model, data classification, controls
├── scripts/
└── README.md
```

Suggested Django domain modules: `identity`, `locations`, `reports`, `incidents`, `workorders`, `attachments`, `notifications`, `audit`, `analytics`. Keep domain rules in services/use-cases and database constraints; avoid spreading workflow rules through view handlers.

---

## 6. Data model baseline

The following is a logical model. Final field names, types, retention periods and indexes must be confirmed during discovery and reviewed by the database owner.

### Core tables

- `users`: staff identity reference, role, status and identity-provider subject; do not duplicate credentials from the identity provider.
- `teams`: regional teams, operational area and active status.
- `regions`: approved province/area hierarchy; avoid assuming administrative fields not validated by PNG Power.
- `reports`: immutable report ID, human-readable case number, source, issue category, description, received time, reported time, location reference/text, optional contact reference, reporter verification state, priority signal and current case status.
- `report_incident_links`: report ID, incident ID, link/unlink times, actor, reason and active state. Enforce at most one active incident link per report with a database constraint or equivalent transactional rule.
- `incidents`: incident ID, category, current status, priority, region/location, impact summary, accountable team/owner, opened time, resolved time and resolution summary.
- `work_orders`: work-order ID, incident ID, task type, status, assigned team/owner, next action, review/due time, findings and completion details.
- `events`: append-only report/incident/work-order events including event ID, entity type/ID, event type, actor, server time, recorded local time where relevant, reason and safe metadata.
- `attachments`: object key, file type/size/checksum, related entity, creator, upload state, scan state and access policy. Never trust client-supplied file type alone.
- `notifications`: recipient/report/incident reference, channel, template, delivery state, attempts and timestamps; avoid copying unnecessary personal data into message logs.
- `idempotency_records` or `sync_receipts`: idempotency key, client event UUID, authenticated actor/device reference, response result and timestamps to make retries safe.
- `reference_data`: issue categories, status configuration, priority definitions and notification templates where these should be controlled/configurable.

### Database and data-handling rules

- Use foreign keys, uniqueness constraints and database transactions for case number allocation, report linking and idempotency.
- Use UUIDs or equivalent non-guessable internal identifiers. Case numbers should be unique and designed not to expose internal database sequence information.
- Index common staff searches: case number, active status, region, category, received time, assigned team, incident ID and work-order status. Add spatial indexes only when reliable coordinate data is available.
- Store contact details with appropriate access controls and encryption strategy approved by PNG Power. Do not put PII in logs, metrics, URLs, analytics labels or public incident responses.
- Retain case and audit records according to approved retention rules. Deletion/anonymization workflows must not silently break audit or operational requirements.
- Use soft deletion only where approved. Prefer inactive/cancelled state plus auditable events for operational records.

---

## 7. API contract and interface expectations

Implement a versioned JSON REST API and generate/maintain OpenAPI documentation. Use consistent validation errors, pagination, filtering and trace/correlation IDs. Staff endpoints require staff authentication and server-side role/region authorization. Resident endpoints must return only the permitted case and sanitized incident-level updates.

Suggested endpoint groups (final naming can follow existing conventions):

```text
POST   /api/v1/reports
GET    /api/v1/resident/cases/{case_number}
POST   /api/v1/resident/cases/{case_number}/verification
GET    /api/v1/staff/reports
GET    /api/v1/staff/reports/{report_id}
GET    /api/v1/staff/reports/{report_id}/match-suggestions
POST   /api/v1/staff/reports/{report_id}/incident-links
DELETE /api/v1/staff/reports/{report_id}/incident-links/{link_id}
POST   /api/v1/staff/incidents
GET    /api/v1/staff/incidents/{incident_id}
PATCH  /api/v1/staff/incidents/{incident_id}
POST   /api/v1/staff/incidents/{incident_id}/work-orders
GET    /api/v1/staff/work-orders/{work_order_id}
POST   /api/v1/staff/work-orders/{work_order_id}/events
POST   /api/v1/sync/events
POST   /api/v1/attachments/upload-intents
```

Required API controls:

- Validate all input server-side; reject unknown state transitions and unauthorized region access.
- Support idempotency keys for report creation and synchronization submissions.
- Use optimistic concurrency/version fields for online updates where concurrent edits are possible.
- Return stable machine-readable error codes and human-readable messages, without exposing stack traces or personal data.
- Rate-limit public report and case-lookup endpoints, with abuse protection that does not prevent safe hazard reporting.
- Do not include reporter PII in match suggestions unless the staff role is authorized to see it.
- Keep public status responses intentionally limited and cache-safe.

---

## 8. Offline field workflow and synchronization contract

Offline behavior is a core feature and must be tested before pilot. Browser storage is not automatically secure simply because it is local. Minimize cached data and rely on organization-managed device controls where available; document the threat model and device-loss process.

### Offline-capable actions for MVP

Allow field officers to:

- Open the cached application shell and reference lists.
- View only a limited set of previously assigned work orders and the minimum data required to act.
- Save draft reports/notes, field observations and permitted work-order progress events.
- Capture attachment metadata and queue files for later upload.
- See a queue state: `saved on device`, `waiting to sync`, `syncing`, `synced`, `needs attention`.

Require an online connection for high-impact canonical actions unless PNG Power approves and tests an explicit offline policy: user/role changes, incident linking/unlinking, crew assignment, incident split/merge, final incident closure and configuration changes. If a user records an offline completion, represent it as a pending field event until the server accepts it; do not silently set the canonical incident to resolved.

### Sync protocol

1. Give each client event a globally unique UUID and each retriable request an idempotency key.
2. Send event batches with actor/device reference, entity ID, event type, payload, local-recorded time and base entity version where applicable.
3. Server validates authorization, event type, current entity state and idempotency before committing in a transaction.
4. Server returns an accepted/rejected/conflict result for each event, with canonical entity version and safe actionable error details.
5. Client retries transient failures with bounded backoff and retains unresolved events until acknowledged or explicitly reviewed.
6. Upload small status/note events ahead of large photos. Attachment uploads need resumable/retry behavior where feasible and file scanning before staff download.
7. Do not silently overwrite concurrent changes. Append non-conflicting field notes; send conflicting state changes to a review queue with both versions preserved.
8. A report received offline remains a report; if it appears to match an incident during sync, create a staff review suggestion rather than auto-linking it.

The UI must warn about unsynced changes before logout or clearing local data. Expire cached records according to a tested policy. Provide a process for lost devices, revoked staff accounts and stuck queues.

---

## 9. Security, privacy and safety requirements

Create a lightweight threat model before field testing and update it before production. At minimum cover lost/stolen devices, account compromise, case-number enumeration, spam reports, unauthorized staff access, attachment exposure, malicious uploads, sync replay, notification leakage, insider misuse and service unavailability.

Required controls:

- Staff identity through approved identity provider where available; require MFA for staff and administrative users where supported.
- Least privilege, region scoping and separation of resident-facing, staff and administration API permissions.
- Secure session/token handling, HTTPS everywhere, CSRF protection where applicable, secure cookie configuration and rate limiting.
- Encryption in transit and at rest using PNG Power-approved key management. Do not claim client-side IndexedDB is encrypted by default.
- Separate public case lookup from staff search. Verify resident access using case number plus an appropriate verification factor; avoid revealing whether a guessed phone or account exists.
- Store only needed PII; mask or restrict contact fields in staff UI and audit sensitive access according to policy.
- Safe upload validation, size limits, malware scanning, private object storage and short-lived access links.
- No secrets or PII in logs, error traces, test fixtures, URLs, analytics event labels or notification preview content beyond approved minimum.
- Append-only audit trail for report creation, link/unlink, assignment, status changes, administrative actions and closure.
- Document retention, incident response, breach escalation, backup/restore and device loss in operational runbooks.
- Provide clear dangerous-hazard messaging linked to PNG Power’s approved contact/escalation procedure.

Accessibility target: follow WCAG 2.2 AA as the engineering goal, subject to PNG Power review. Ensure keyboard access, visible focus, labels, readable contrast, screen-reader status announcements, errors that identify how to fix input, and layouts usable at phone sizes. Design for low bandwidth and avoid requiring maps or large downloads for basic reporting.

---

## 10. Observability, performance and operations

Instrument the service without logging customer content. Use structured logs with correlation IDs, service metrics and alerting under PNG Power’s approved observability platform.

Monitor at minimum:

- API availability/latency/error rate and database connection/transaction health.
- Report intake volume and failures, without placing personal fields into metric labels.
- Offline sync queue age, accepted/rejected/conflicted events and retry rates.
- Notification delivery outcomes and retry backlog.
- Attachment processing failures and storage availability.
- Open/overdue incidents and work orders, by authorized operational dimensions.
- Authentication failures, access-control denials and administrative changes.

Set numeric service-level objectives only after infrastructure constraints and operational baselines are reviewed. Keep service reliability targets separate from repair/restoration targets. Design backups, point-in-time recovery where supported, restore drills, deployment rollback and database migration rollback/forward procedures. Document a support rota and escalation owner before pilot.

---

## 11. Implementation phases and agent backlog

### Phase 0 — Repository and discovery

**Agent tasks:** inspect repository and deployment constraints; produce system context diagram; document current architecture; create ADRs for framework, identity, hosting, file storage, notifications and offline threat model; create a decision register.

**Human decisions required:** product owner; regional pilot readiness; approved identity and hosting; data classification/retention; contact channels; existing systems to integrate; operational statuses and safety escalations.

**Gate:** no production code assumptions depend on unknown infrastructure or field process decisions.

### Phase 1 — Domain foundation

**Implement:** repository standards, local dev setup, Django project, React PWA shell, PostgreSQL migrations, health checks, identity integration boundary, OpenAPI, CI checks, synthetic seed data, audit/event foundation and basic reference data.

**Gate:** clean local setup from README; migrations build a clean database; tests and security checks run in CI; no secrets in repository.

### Phase 2 — Reports and resident lookup

**Implement:** report form, server validation, case number generation, report persistence, acknowledgement, rate-limited resident case lookup and sanitized status view; call-centre staff search and manual report entry.

**Gate:** each submission receives a unique case number, duplicate HTTP retries do not create duplicate reports, resident verification prevents unauthorized case disclosure, and accessibility/phone-size checks pass.

### Phase 3 — Incidents, matching suggestions and work orders

**Implement:** incident creation, candidate match search, staff confirmation/rejection, link history, correction/unlink flow, one-or-many work orders, ownership and status transitions, audit trail and incident impact summary.

**Gate:** scenario tests prove many cases can link to one incident, every case remains retrievable, unrelated reports stay separate, mistaken matches can be corrected, and reports do not automatically create duplicate work orders.

### Phase 4 — Offline PWA and synchronization

**Implement:** service-worker caching, limited assignment download, local IndexedDB store, event outbox, idempotent sync API, retry/backoff, conflict review, attachment queue, sync status UI and device-loss procedure.

**Gate:** offline field scenarios pass on target devices under no signal, intermittent signal, retries, app restart, duplicate submission, concurrent update and attachment failure; no user is told data synced until server acknowledgement.

### Phase 5 — Operational dashboards and notifications

**Implement:** regional queue, overdue review, incident/work-order filters, repeat-fault views, safe exports and provider-neutral notifications with delivery tracking. Add SMS only after provider, consent and support decisions are approved.

**Gate:** dashboard permissions are tested; notification retries do not duplicate harmful messages; no PII is exposed in public status views or metrics.

### Phase 6 — Pilot hardening and controlled release

**Implement:** security review, accessibility review, load/reliability checks sized to pilot assumptions, backup/restore drill, staff training material, incident response and support runbooks, pilot feature flags and rollback plan.

**Gate:** regional owner, repair capacity, call-centre support, emergency escalation, approved privacy/security controls, baseline metrics and fallback process are ready.

### Phase 7 — Pilot evaluation and regional expansion

**Evaluate:** resolution outcomes, response/update times, overdue queue, repeat incidents, staff adoption, resident feedback, matching correction rate, offline sync health and costs. Fix operational bottlenecks before expanding. Expand only when regional readiness criteria are met.

---

## 12. Test strategy and acceptance scenarios

All features require automated coverage appropriate to their risk. The agent must add tests in the same change as the feature.

### Test layers

- **Unit:** domain services, state transitions, matching candidate ranking, privacy sanitization and priority rules.
- **Database/integration:** constraints, transactions, idempotency, link/unlink history, role/region filtering, migrations and async job retries.
- **API contract:** OpenAPI schema, validation, pagination, authentication, authorization and stable error responses.
- **End-to-end:** resident report/lookup, call-centre entry, staff triage, incident linking, work-order assignment, field update and resolution feedback.
- **Offline:** no connectivity, intermittent connectivity, outbox retry, duplicate replay, app restart, stale entity version, session expiry, attachment retry and corrupted local queue recovery.
- **Security:** case enumeration, unauthorized region access, injection, unsafe uploads, CSRF/session issues, rate limits, token leakage, PII in logs and privilege escalation.
- **Accessibility/usability:** keyboard and screen-reader form submission, error recovery, status announcement, zoom/responsive mobile and low-bandwidth behavior.

### Mandatory acceptance scenarios

1. Submit the same report request twice with the same idempotency key: exactly one report/case is created.
2. Submit three reports for one outage: all three case numbers remain valid; staff confirm a link to one incident; one coordinated set of work orders is created.
3. Submit a nearby but unrelated meter fault: it remains on a separate incident unless staff confirm shared cause.
4. Unlink a wrongly grouped report: history remains, correction reason is audited and the affected case keeps its ID.
5. Resident A attempts to retrieve Resident B’s case: no B’s personal data or report content is disclosed.
6. Regional staff attempt access outside their assigned region: backend denies access and records the security event as configured.
7. Officer enters a work note offline, restarts the app and later reconnects: the note syncs once and the UI confirms server acknowledgement.
8. Two staff update the same work order from stale versions: no silent overwrite; both updates remain available for safe resolution.
9. Field officer records work completed while offline: it remains pending synchronization and does not mark the incident resolved before server acceptance.
10. Notification provider fails: the case and work-order updates remain committed; the message enters a retryable failure state.
11. User reports the issue is still present after a resolved notice: case is flagged/reopened for review and incident status is not changed without staff/operational rules.
12. Dangerous hazard report displays approved safety instructions without implying the web app guarantees emergency response.

---

## 13. Pilot metrics and decision gates

Establish baselines before setting numeric targets. Do not fabricate service-level promises. Separate digital platform measures from repair/restoration outcomes.

Track:

- Time from report to staff review, assignment and first useful resident update.
- Open/overdue reports, incidents and work orders, including age and owner.
- Restoration time by incident category/region where reliable timestamps exist.
- Repeat incidents, reopened reports and work orders blocked by resources or access.
- Candidate match acceptance/rejection, manual link corrections, unlinked repeat reports and complaints about mis-grouping.
- Sync success, stuck queue age, conflict rates, duplicate events prevented and attachment upload recovery.
- Resident status lookup completion, call-centre lookup success, staff adoption and resident feedback.

Daily pilot review: urgent hazards, major outages, unassigned/overdue work and sync exceptions. Monthly leadership review: regional trends, repeat faults, root causes, resource bottlenecks, data quality and expansion readiness.

### Expansion go/no-go

Do not expand solely because software is deployed. Require: accountable regional owner; trained staff; working repair/escalation capacity; verified offline operation; acceptable privacy/security review; support process; reliable case/incident correction controls; baseline and pilot results; approved funding and operational readiness.

---

## 14. Risks and open decisions

| Risk / open item | Required action before the relevant gate |
|---|---|
| Repair backlog becomes more visible but cannot be addressed | Confirm crews, regional ownership, escalation and resource planning as part of pilot readiness. |
| Existing systems hold authoritative customer/outage/asset data | Inventory systems and integration interfaces; decide system of record per data domain. |
| Mobile connectivity and device quality vary | Test on actual field devices and network conditions; define offline cache and support policy. |
| Duplicate-match errors misdirect crews or updates | Keep match suggestions human-confirmed in MVP, preserve link history and measure correction rate. |
| Sensitive customer details are cached or exposed | Minimize offline fields, region-scope staff access, test resident case verification and define device-loss steps. |
| SMS coverage/cost/provider is uncertain | Validate with PNG Power and a provider before promising availability; maintain phone support. |
| Status definitions or repair targets are not agreed | Run operational design workshop; do not hard-code unapproved service-level targets. |
| Hosting/data residency/security rules are unknown | Confirm with IT/security/procurement before infrastructure selection. |
| Dates and budget are not estimated from delivery capacity | Estimate only after discovery, integrations, procurement and staffing are understood. |

### Decision register to maintain in the repository

Create `docs/decisions.md` and keep these as unresolved until an accountable PNG Power owner approves them:

- Product owner, executive sponsor and system operator.
- Pilot region, regional owner, field crews and call-centre coverage.
- Region hierarchy, issue categories, priority rules, state machine and closure policy.
- Staff identity provider, MFA, hosting/data residency, backup and disaster-recovery requirements.
- System-of-record and integration decisions for customer, outage, asset and work-order information.
- SMS/USSD provider, customer consent/opt-out, support and cost.
- Data retention, public records/privacy obligations, photo retention and audit-access policy.
- Target devices, mobile-device management, offline cache length and lost-device process.
- Baseline measures, approved service targets, pilot exit criteria and budget.

---

## 15. Definition of done

A release is not ready for pilot or production unless all applicable items are true:

- Requirements and state transitions are documented and approved by operational owners.
- All changes are tested; CI passes; dependency and security scans have no unresolved critical/high findings without an approved exception.
- Database migrations are reviewed, repeatable and have a tested recovery plan.
- Authorization is enforced server-side and tested for roles and regions.
- Resident views expose only authorized case and sanitized incident information.
- Each report remains individually traceable through confirmed incident linking and correction.
- Offline events use unique IDs/idempotency and have observable sync outcomes; conflicts cannot silently erase data.
- User-facing language is accessible and does not promise unapproved emergency or restoration times.
- Logs, metrics and exports do not expose unnecessary personal information.
- Backup/restore, support, security incident, device loss, notification failure and deployment rollback runbooks exist.
- Staff training, phone-support workflow and pilot fallback process are ready.
- Operational crew capacity and escalation ownership are confirmed for the pilot.

---

## 16. Recommended first task for Kilo Code

Start with **Phase 0 — Repository and discovery**, not broad feature coding.

1. Inspect the existing repository and summarize the current stack, tests, deployment and uncommitted changes.
2. Identify missing stakeholder decisions from Section 14; do not invent answers.
3. Draft a system context diagram, a domain model diagram, initial ADRs and an implementation backlog mapped to Sections 11–12.
4. Propose a repository-specific plan that preserves existing conventions and identifies any deviation from this build plan.
5. Wait for human approval of the repository-specific plan and critical infrastructure/business decisions before creating production-facing integrations or deployments.

**The first implementation milestone is not “a working form.” It is a tested vertical slice:** one report gets a case number; authorized staff review it; a confirmed incident can hold multiple reports and work orders; a field update is recorded; the resident sees a safe status; and the full action history is auditable.
