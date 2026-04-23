/**
 * Main Application Entry Point
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log('ElectionOS Initializing...');

    // Load initial data from window.ELECTION_DATA
    await window.stateManager.loadFlows();

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

    // Dev Components
    if (window.DevToolbar) new DevToolbar();

    // Handle Landing Page vs Dashboard Visibility
    window.stateManager.subscribe((state) => {
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
                // Show celebration after a short delay to allow the last step's animations to play
                setTimeout(() => {
                    celebration.style.display = 'flex';
                }, 1000);
            } else {
                celebration.style.display = 'none';
            }
        }
    });

    console.log('ElectionOS Ready.');
});


