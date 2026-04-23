/**
 * ElectionOS Tester Utility
 * Automates system health checks and logic validation.
 */
class ElectionTester {
    constructor() {
        console.log('🏁 ElectionOS Tester Initialized. Run window.tester.runAll() to validate system.');
        window.tester = this;
    }

    async runAll() {
        console.group('🔍 Running ElectionOS System Health Checks');
        await this.testRoleSwitching();
        await this.testJourneyProgression();
        await this.testScenarioTriggering();
        await this.testAssistantResponses();
        console.groupEnd();
        console.log('✅ Health check complete.');
    }

    async testRoleSwitching() {
        console.log('--- Testing Role Switching ---');
        window.stateManager.setRole('voter');
        const isVoter = window.stateManager.state.role === 'voter';
        console.log(isVoter ? '  PASS: Role set to Voter' : '  FAIL: Role not set correctly');

        window.stateManager.setRole('candidate');
        const isCandidate = window.stateManager.state.role === 'candidate';
        console.log(isCandidate ? '  PASS: Role set to Candidate' : '  FAIL: Role not set correctly');
    }

    async testJourneyProgression() {
        console.log('--- Testing Journey Progression ---');
        window.stateManager.setRole('voter');
        const steps = window.stateManager.state.flows['voter'] || [];
        
        // Sim completion
        steps.forEach(step => window.stateManager.completeStep(step.id));
        
        const allCompleted = window.stateManager.state.completedSteps.length === steps.length;
        console.log(allCompleted ? '  PASS: All steps completed successfully' : '  FAIL: Completion logic failed');
        
        // Clear for next test
        window.stateManager.setRole('voter'); 
    }

    async testScenarioTriggering() {
        console.log('--- Testing Scenario Triggers ---');
        const event = new CustomEvent('trigger_simulation', { 
            detail: { step: { title: 'Test Step', missed: 'Test Consequence', nextAction: 'Test Action' } } 
        });
        window.dispatchEvent(event);
        
        const overlay = document.getElementById('scenario-overlay');
        console.log(overlay ? '  PASS: Scenario overlay triggered' : '  FAIL: Scenario overlay failed');
        
        // Cleanup
        if (overlay) overlay.remove();
    }

    async testAssistantResponses() {
        console.log('--- Testing Assistant Responses ---');
        const step = window.ELECTION_DATA.voter[0];
        const response = window.promptEngine.generateResponse('explain', step);
        const hasContent = response && response.includes('Gateway') === false; // Just basic length check
        console.log(response.length > 20 ? '  PASS: Assistant generated valid response' : '  FAIL: Assistant response is empty or weak');
    }
}

window.ElectionTester = ElectionTester;

// Auto-initialize if dev toolbar is present
if (window.DevToolbar) {
    new ElectionTester();
}

