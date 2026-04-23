# ElectionOS 🗳️
**Interactive Election Journey Assistant**

ElectionOS is an intelligent, interactive web application designed to guide Voters, Candidates, and Election Officers through the complex election process. It replaces static information with a dynamic, timeline-based simulation that explains concepts, tracks progress, and simulates the consequences of missed deadlines.

## ✨ Features

- **🎭 Role-Based Engine:** Personalized journeys for Voters, Candidates, and Officers.
- **⏱️ Interactive Timeline:** Real-time visual tracking of election phases (Registration, Campaign, Voting, Results) with active status indicators.
- **🔮 Scenario Simulator:** "What-if" engine that calculates and displays the consequences and next possible actions if a user misses a critical deadline.
- **🤖 Smart Assistant:** Context-aware AI responses that can explain steps simply or detail their legal importance without relying on external API calls.
- **📊 Progress Tracking:** Live calculation of completion percentage and user status (On Track ✅ vs Behind ❌).
- **💅 Premium UI/UX:** Built with modern glassmorphism, dynamic micro-interactions, toast notifications, and smooth CSS animations.

## 🛠️ Technical Architecture

ElectionOS is built as a highly optimized, **serverless client-side application**.

- **Core:** Vanilla HTML5, CSS3, JavaScript (ES6+).
- **State Management:** Custom Singleton `StateManager` utilizing the Observer pattern to handle cross-component reactivity without heavy frameworks.
- **Data Layer:** JSON-structured data injected globally, completely bypassing CORS issues and allowing the app to run locally offline via the `file://` protocol.
- **Security:** Strict button-driven inputs. No free-text fields prevent prompt injection and XSS vulnerabilities.

## 🚀 How to Run Locally

No build tools, no `npm install`, and no local servers required.

1. Clone or download the repository.
2. Double click `index.html` to open it in any modern web browser.
3. Select a role and begin your journey!

## 📦 Deployment

Because ElectionOS has zero build dependencies and runs entirely client-side, it can be deployed instantly to any static hosting provider.

**Vercel / Netlify:**
1. Drag and drop the project folder into the deployment UI.
2. (Alternative) Connect your GitHub repository. Leave "Build Command" and "Output Directory" blank.

**GitHub Pages:**
1. Push the code to a GitHub repository.
2. Navigate to Settings > Pages.
3. Select the `main` branch and save. Your site will be live in minutes.

## 🧪 Testing
The application includes a built-in health check utility.
1. Open the browser console (F12).
2. Run `window.tester.runAll()` to automatically validate state transitions, scenario logic, and assistant generation.
