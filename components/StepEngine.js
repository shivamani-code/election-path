/**
 * StepEngine Component
 * Handles the rendering and progression of election journey steps.
 */
class StepEngine {
    constructor(listContainerId, cardContainerId) {
        this.listContainer = document.getElementById(listContainerId);
        this.cardContainer = document.getElementById(cardContainerId);
        
        window.stateManager.subscribe((state) => this.render(state));
    }

    render(state) {
        if (!state.role || !state.flows[state.role]) {
            this.clearContent();
            return;
        }

        const steps = state.flows[state.role];
        const currentStepId = state.currentStepId;
        const currentStep = steps.find(s => s.id === currentStepId) || steps[0];

        this.renderStepList(steps, state);
        this.renderActiveStep(currentStep, state);
    }

    clearContent() {
        if (this.listContainer) this.listContainer.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">Select a role to see steps.</p>';
        if (this.cardContainer) this.cardContainer.innerHTML = '';
    }

    renderStepList(steps, state) {
        if (!this.listContainer) return;

        this.listContainer.innerHTML = steps.map((step, index) => {
            const isCompleted = state.completedSteps.includes(step.id);
            const isActive = state.currentStepId === step.id;
            
            return `
                <div class="step-item animate-stagger ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                     style="animation-delay: ${index * 0.1}s"
                     data-id="${step.id}">
                    <div class="step-indicator">
                        ${isCompleted ? '✓' : step.id}
                    </div>
                    <div class="step-info">
                        <div class="step-item-title">${step.title}</div>
                        <div class="step-item-deadline">${step.deadline}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Add listeners to jump to steps
        this.listContainer.querySelectorAll('.step-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.getAttribute('data-id'));
                this.jumpToStep(id);
            });
        });
    }

    renderActiveStep(step, state) {
        if (!this.cardContainer) return;

        const isCompleted = state.completedSteps.includes(step.id);
        const steps = state.flows[state.role];
        const stepIndex = steps.findIndex(s => s.id === step.id);
        const hasNext = stepIndex < steps.length - 1;
        const hasPrev = stepIndex > 0;

        // Phase 2: Scenario Impact
        const riskClass = state.isSimulating ? 'failed-state pulse-warning' : '';
        this.cardContainer.className = `glass card ${riskClass}`;

        this.cardContainer.innerHTML = `
            <div class="step-detail animate-fade-in">
                <div class="step-header">
                    <span class="step-badge" style="${state.isSimulating ? 'background: var(--danger);' : ''}">${state.isSimulating ? '⚠️ At Risk' : isCompleted ? 'Completed' : 'Active Stage'}</span>
                    <h2 class="step-title">${step.title}</h2>
                </div>
                <p class="step-description">${step.description}</p>
                <div class="step-meta">
                    <div class="meta-item">
                        <span class="meta-label">Deadline:</span>
                        <span class="meta-value">${step.deadline}</span>
                    </div>
                    <div class="meta-item danger">
                        <span class="meta-label">If missed:</span>
                        <span class="meta-value">${step.missed}</span>
                    </div>
                </div>
                <div class="step-actions">
                    ${hasPrev ? `<button class="btn-secondary" id="btn-prev">Back</button>` : ''}
                    ${!isCompleted ? `
                        <button class="btn-simulate" id="btn-simulate">What if I miss this?</button>
                        <button class="btn-primary" id="btn-complete">Complete Step</button>
                    ` : ''}
                    ${hasNext && isCompleted ? `<button class="btn-secondary" id="btn-next">Next Step</button>` : ''}
                </div>
            </div>
        `;

        // Action Listeners
        const simulateBtn = this.cardContainer.querySelector('#btn-simulate');
        if (simulateBtn) {
            simulateBtn.addEventListener('click', () => {
                const event = new CustomEvent('trigger_simulation', { detail: { step: step } });
                window.dispatchEvent(event);
            });
        }

        const completeBtn = this.cardContainer.querySelector('#btn-complete');
        if (completeBtn) {
            completeBtn.addEventListener('click', () => {
                // Phase 4: Emotional Feedback
                this.showToast('Great! You’ve successfully completed this step. 🎉');
                
                // Add glow effect temporarily to the card
                this.cardContainer.classList.add('pulse-glow');
                
                window.stateManager.completeStep(step.id);
                
                // Auto advance after short delay
                setTimeout(() => {
                    this.cardContainer.classList.remove('pulse-glow');
                    if (hasNext) {
                        this.jumpToStep(steps[stepIndex + 1].id);
                    }
                }, 1500);
            });
        }

        const nextBtn = this.cardContainer.querySelector('#btn-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.jumpToStep(steps[stepIndex + 1].id);
            });
        }

        const prevBtn = this.cardContainer.querySelector('#btn-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.jumpToStep(steps[stepIndex - 1].id);
            });
        }
    }

    jumpToStep(id) {
        window.stateManager.state.currentStepId = id;
        window.stateManager.notify();
    }
    
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification animate-slide-up';
        toast.innerHTML = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
}

window.StepEngine = StepEngine;



