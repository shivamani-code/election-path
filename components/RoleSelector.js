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
            <div class="role-selector" role="tablist" aria-label="Role selection">
                ${this.roles.map(role => `
                    <div class="role-btn ${currentRole === role.id ? 'active' : ''}" 
                         data-role="${role.id}"
                         role="tab"
                         aria-selected="${currentRole === role.id}"
                         tabindex="0"
                         aria-label="Select ${role.label} role"
                         style="--role-color: ${role.color}">
                         <span class="role-icon" aria-hidden="true">${role.icon}</span>
                         <span class="role-label">${role.label}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Add event listeners
        this.container.querySelectorAll('.role-btn').forEach(btn => {
            const handleSelect = () => {
                const selectedRole = btn.getAttribute('data-role');
                if (window.analytics) window.analytics.trackRoleSelection(selectedRole);
                window.stateManager.setRole(selectedRole);
            };

            btn.addEventListener('click', handleSelect);
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect();
                }
            });
        });
    }
}

window.RoleSelector = RoleSelector;

