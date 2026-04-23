/**
 * Prompt Engine for ElectionOS Smart Assistant
 * Generates structured, conversational responses based on step data.
 */
window.promptEngine = {
    prompts: [
        { id: 'explain', label: 'Explain simply' },
        { id: 'importance', label: 'Why important' },
        { id: 'skip', label: 'What if I skip this' }
    ],

    generateResponse(promptId, step) {
        if (!step) return "Please select a journey step to get assistance.";

        switch (promptId) {
            case 'explain':
                return `**Here’s the simple version:**<br/>Think of "${step.title}" as a mandatory checkpoint. Basically, you just need to ${step.description.toLowerCase()} Doing this before ${step.deadline} makes sure your participation is officially recognized without any hassle.`;
            
            case 'importance':
                return `**Why it’s absolutely critical:**<br/>Without completing this step, you won’t be eligible to move forward. It’s a strict legal requirement. The entire election system depends on this step being finalized accurately so that your voice can actually be counted.`;
            
            case 'skip':
                return `**The reality of skipping:**<br/>If you decide to skip this, the system won't wait for you. The result: ${step.missed}. Election timelines are legally binding, meaning missing the ${step.deadline} deadline is permanent and non-reversible. Please don't let that happen!`;
            
            default:
                return "I'm here to help guide you. Select any of the prompts above to learn more.";
        }
    }
};



