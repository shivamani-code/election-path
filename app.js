/**
 * Main Application Entry Point
 * Orchestrates initialization and global event management.
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load and validate initial data
        if (window.stateManager) {
            await window.stateManager.loadFlows();
            
            if (!window.Validator.validateFlows(window.stateManager.state.flows)) {
                throw new Error(window.CONFIG.STRINGS.DATA_MISSING);
            }
        }

        // Initialize Services
        window.analytics = new AnalyticsTracker();

        // Initialize Components
        new RoleSelector('role-selector-container');
        new SystemVoice('system-voice-panel');
        new StepEngine('steps-list', 'active-step-card');
        new TimelineBar('timeline-container');
        new ScenarioEngine();
        new AssistantPanel('assistant-prompts', 'assistant-response');
        new ProgressTracker('progress-tracker-container');

        // Global State Listener for App-Level UI
        const debounceUpdate = debounce((state) => {
            updateDashboardVisibility(state);
        }, 50);

        window.stateManager.subscribe(debounceUpdate);

        initLandingPageListeners();
    } catch (error) {
        window.ErrorHandler.handle(error);
    }
});

/**
 * Utility: Debounce function to prevent rapid execution
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Handles visibility between Landing Page and Dashboard
 */
function updateDashboardVisibility(state) {
    const landing = document.getElementById('landing-page');
    const dashboard = document.getElementById('dashboard-content');
    const celebration = document.getElementById('celebration-overlay');
    
    if (!state.role) {
        landing.style.display = 'flex';
        dashboard.style.display = 'none';
        celebration.style.display = 'none';
    } else {
        landing.style.display = 'none';
        dashboard.style.display = 'flex';

        // Check for final completion
        const steps = state.flows[state.role] || [];
        if (steps.length > 0 && state.completedSteps.length === steps.length) {
            if (window.analytics) window.analytics.trackJourneyCompletion();
            setTimeout(() => {
                celebration.style.display = 'flex';
                celebration.focus(); // Accessibility: focus the modal
            }, 1000);
        } else {
            celebration.style.display = 'none';
        }
    }
}

/**
 * Initialize Landing Page Role Selection
 */
function initLandingPageListeners() {
    document.querySelectorAll('.role-card').forEach(card => {
        const handleSelection = () => {
            const role = card.getAttribute('data-role');
            if (window.stateManager) window.stateManager.setRole(role);
        };

        card.addEventListener('click', handleSelection);
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelection();
            }
        });
    });
}


