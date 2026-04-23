---
description: build accordingly
---

You are an expert full-stack AI engineer and system designer.

Your task is to build a complete, production-quality web application called:

“ElectionOS — Interactive Election Journey Assistant”

This system must NOT be a simple chatbot. It must be a structured, interactive, modular application that guides users through the election process in a step-by-step, visual, and intelligent way.

---

🎯 CORE OBJECTIVE:
Build an assistant that helps users understand election processes, timelines, and steps in an interactive and easy-to-follow system using guided flows, timelines, and simulations.

---

⚠️ IMPORTANT RULES:

* Do NOT generate everything at once.
* Build in PHASES.
* Wait after each phase for confirmation before continuing.
* Follow clean architecture and modular design strictly.
* Use reusable components.
* Avoid hardcoding — use structured data (JSON).
* Focus on Code Quality, Security, Efficiency, Testing, Accessibility.

---

🧠 SYSTEM CONCEPT:
This is NOT a chatbot.
This is a “Guided Election Operating System”

Users should:

* Select a role
* Follow a step-by-step journey
* See timelines visually
* Understand consequences of actions
* Interact with a smart assistant (controlled prompts only)

---

📦 TECH STACK:

* HTML, CSS, JavaScript (or framework if supported)
* Component-based architecture
* JSON-driven data system
* No unnecessary external dependencies

---

📁 PROJECT STRUCTURE:

/components
RoleSelector
TimelineBar
StepEngine
ScenarioEngine
AssistantPanel
ProgressTracker

/data
electionFlows.json

/utils
stateManager.js
promptEngine.js

---

🎨 UI DESIGN REQUIREMENTS:

* Modern, clean, slightly futuristic UI

* Smooth transitions and animations

* Dashboard layout:

  [Top] Timeline Bar
  [Left] Step List
  [Right] Assistant Panel
  [Bottom] Progress Tracker

* Use card-based UI

* Clear buttons and labels

* Responsive design

---

⚙️ CORE FEATURES:

1. Role Selection System

* Voter, Candidate, Officer
* Dynamically changes entire flow

2. Step Engine

* Sequential steps
* Each step includes:

  * Title
  * Description
  * Deadline
  * Consequence if missed

3. Timeline Visualization

* Show election phases
* Highlight current stage

4. Scenario Simulator (IMPORTANT)

* Simulate missed steps
* Show outcomes

5. Assistant Panel

* Predefined smart prompts only:

  * “Explain simply”
  * “Why important”
  * “What if I skip this”

6. Progress Tracker

* Show completion percentage
* Track steps completed

---

📄 DATA STRUCTURE (MANDATORY):

Use JSON like:

{
"voter": [
{
"id": 1,
"title": "Register to Vote",
"description": "Submit registration form",
"deadline": "10 days before election",
"missed": "You cannot vote in this election"
}
]
}

---

🧪 TESTING REQUIREMENTS:

Include basic test logic for:

* Role switching
* Step loading
* Step progression
* Scenario triggering

---

🔐 SECURITY REQUIREMENTS:

* No unsafe user inputs
* No unrestricted AI prompts
* Controlled logic only

---

⚡ PERFORMANCE REQUIREMENTS:

* Fast loading
* Efficient rendering
* No redundant updates

---

♿ ACCESSIBILITY REQUIREMENTS:

* Clear readable text
* Proper labels
* Simple navigation
* Optional simplified explanation mode

---

🚀 BUILD IN PHASES:

PHASE 1:

* Project setup
* Folder structure
* Basic layout (HTML/CSS)
* Navigation skeleton

PHASE 2:

* Role Selection Component
* State management

PHASE 3:

* Step Engine (data-driven rendering)

PHASE 4:

* Timeline Bar (visual + dynamic)

PHASE 5:

* Scenario Engine (missed step simulation)

PHASE 6:

* Assistant Panel (controlled prompts)

PHASE 7:

* Progress Tracker

PHASE 8:

* Testing implementation

PHASE 9:

* UI polish + animations

PHASE 10:

* Final optimization + cleanup

---

📌 OUTPUT FORMAT:

For EACH phase:

* Explain what is being built
* Provide FULL working code
* Keep code clean and modular
* Ensure everything works before moving to next phase

---

🎯 FINAL GOAL:

The result should feel like:

* A real product, not a demo
* Interactive and engaging
* Structured and scalable
* Clearly better than a chatbot

---

Start with PHASE 1 only.
Wait for confirmation before continuing.
