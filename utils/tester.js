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
        await this.testInvalidRole();
        await this.testJourneyProgression();
        await this.testRapidProgression();
        await this.testScenarioTriggering();
        await this.testScenarioWithoutStep();
        await this.testAssistantResponses();
        await this.testEmptyDataHandling();
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

    async testInvalidRole() {
        console.log('--- Testing Invalid Role Selection ---');
        window.stateManager.setRole('hacker');
        const isInvalidRejected = window.stateManager.state.role !== 'hacker';
        // stateManager defaults to clearing the role or holding current if invalid
        console.log(isInvalidRejected ? '  PASS: Invalid role gracefully handled' : '  FAIL: Invalid role accepted');
    }

    async testJourneyProgression() {
        console.log('--- Testing Journey Progression ---');
        window.stateManager.setRole('voter');
        const steps = window.stateManager.state.flows['voter'] || [];
        
        steps.forEach(step => window.stateManager.completeStep(step.id));
        
        const allCompleted = window.stateManager.state.completedSteps.length === steps.length;
        console.log(allCompleted ? '  PASS: All steps completed successfully' : '  FAIL: Completion logic failed');
        window.stateManager.setRole('voter'); // Reset
    }

    async testRapidProgression() {
        console.log('--- Testing Rapid Clicking Edge Case ---');
        window.stateManager.setRole('officer');
        try {
            // Rapid state updates simulating multiple clicks
            for (let i = 0; i < 10; i++) window.stateManager.completeStep(1);
            console.log('  PASS: System handled rapid updates without throwing errors');
        } catch (e) {
            console.log('  FAIL: Rapid progression caused a runtime error');
        }
    }

    async testScenarioTriggering() {
        console.log('--- Testing Scenario Triggers ---');
        const event = new CustomEvent('trigger_simulation', { 
            detail: { step: { title: 'Test Step', missed: 'Test Consequence', nextAction: 'Test Action' } } 
        });
        window.dispatchEvent(event);
        
        const overlay = document.getElementById('scenario-overlay');
        console.log(overlay ? '  PASS: Scenario overlay triggered' : '  FAIL: Scenario overlay failed');
        if (overlay) overlay.remove();
    }

    async testScenarioWithoutStep() {
        console.log('--- Testing Scenario Without Step Data ---');
        const event = new CustomEvent('trigger_simulation', { detail: {} });
        window.dispatchEvent(event);
        
        const overlay = document.getElementById('scenario-overlay');
        console.log(!overlay ? '  PASS: Handled empty scenario gracefully' : '  FAIL: Displayed empty scenario modal');
        if (overlay) overlay.remove();
    }

    async testAssistantResponses() {
        console.log('--- Testing Assistant Responses ---');
        const step = window.ELECTION_DATA.voter[0];
        const response = window.promptEngine.generateResponse('explain', step);
        console.log(response.length > 20 ? '  PASS: Assistant generated valid response' : '  FAIL: Assistant response is empty or weak');
    }

    async testEmptyDataHandling() {
        console.log('--- Testing Empty Data Handling ---');
        const response = window.promptEngine.generateResponse('explain', null);
        console.log(response.includes('select a journey step') ? '  PASS: Handled empty prompt data' : '  FAIL: Failed to handle empty prompt data');
    }
}

window.ElectionTester = ElectionTester;

if (window.DevToolbar) {
    new ElectionTester();
}

