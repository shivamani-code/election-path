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
        new ProgressTracker('progress-container');

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
 * Handles visibility between Landing Page and Dashboard.
 * Uses state.currentView ("landing" | "dashboard") as the source of truth.
 */
function updateDashboardVisibility(state) {
    const landing = document.getElementById('landing-page');
    const dashboard = document.getElementById('dashboard-content');
    const celebration = document.getElementById('celebration-overlay');

    if (state.currentView === 'dashboard' && state.role) {
        // Fade landing out, fade dashboard in
        if (landing.style.display !== 'none') {
            landing.style.opacity = '0';
            landing.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                landing.style.display = 'none';
                landing.style.opacity = '';
                landing.style.transition = '';
                dashboard.style.display = 'flex';
                dashboard.style.opacity = '0';
                dashboard.style.transition = 'opacity 0.3s ease';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        dashboard.style.opacity = '1';
                        setTimeout(() => {
                            dashboard.style.opacity = '';
                            dashboard.style.transition = '';
                        }, 300);
                    });
                });
            }, 300);
        } else {
            dashboard.style.display = 'flex';
        }

        // Check for journey completion
        const steps = state.flows[state.role] || [];
        if (steps.length > 0 && state.completedSteps.length === steps.length) {
            if (!state.hasCompletedJourney) {
                window.stateManager.updateState({ hasCompletedJourney: true });
                if (window.analytics) window.analytics.trackJourneyCompletion();
                setTimeout(() => {
                    celebration.style.display = 'flex';
                    celebration.focus();
                }, 1000);
            }
        } else {
            celebration.style.display = 'none';
        }

    } else {
        // Show landing, hide dashboard
        dashboard.style.display = 'none';
        celebration.style.display = 'none';
        landing.style.display = 'flex';
    }
}

/**
 * Initialize Landing Page Role Selection
 */
function initLandingPageListeners() {
    // Handle Celebration Popup Actions
    const closeBtn = document.getElementById('celebration-close');
    const resetBtn = document.getElementById('celebration-reset');
    const celebration = document.getElementById('celebration-overlay');

    if (closeBtn) {
        closeBtn.onclick = () => {
            celebration.style.display = 'none';
        };
    }

    if (resetBtn) {
        resetBtn.onclick = () => {
            if (window.stateManager) {
                window.stateManager.goToLanding();
            }
        };
    }

    document.querySelectorAll('.role-card').forEach(card => {
        const handleSelection = () => {
            const role = card.getAttribute('data-role');
            if (window.analytics) window.analytics.trackRoleSelection(role);
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


