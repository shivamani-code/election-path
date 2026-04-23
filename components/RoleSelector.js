/**
 * RoleSelector Component
 * Renders the interface for selecting Voter, Candidate, or Officer roles.
 */
class RoleSelector {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.roles = [
            { id: 'voter', label: 'Voter', icon: '👤', color: 'var(--accent-primary)' },
            { id: 'candidate', label: 'Candidate', icon: '📢', color: 'var(--accent-secondary)' },
            { id: 'officer', label: 'Officer', icon: '⚖️', color: 'var(--warning)' }
        ];
        
        window.stateManager.subscribe((state) => this.render(state));
    }

    render(state) {
        if (!this.container) return;

        const currentRole = state.role;

        this.container.innerHTML = `
            <div class="role-selector">
                ${this.roles.map(role => `
                    <div class="role-btn ${currentRole === role.id ? 'active' : ''}" 
                         data-role="${role.id}"
                         style="--role-color: ${role.color}">
                         <span class="role-icon">${role.icon}</span>
                         <span class="role-label">${role.label}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Add event listeners
        this.container.querySelectorAll('.role-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedRole = btn.getAttribute('data-role');
                window.stateManager.setRole(selectedRole);
            });
        });
    }
}

window.RoleSelector = RoleSelector;

