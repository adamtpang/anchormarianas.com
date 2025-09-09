/**
 * Tabs Component - Shadcn/UI inspired
 */

export class Tabs {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            defaultValue: options.defaultValue || null,
            onValueChange: options.onValueChange || (() => {}),
            ...options
        };
        this.currentValue = this.options.defaultValue;
        this.init();
    }

    init() {
        this.setupTabsStructure();
        this.bindEvents();
        
        // Set initial active tab
        if (this.currentValue) {
            this.setActiveTab(this.currentValue);
        }
    }

    setupTabsStructure() {
        // Find or create tabs list
        this.tabsList = this.container.querySelector('.tabs-list');
        if (!this.tabsList) {
            this.tabsList = document.createElement('div');
            this.tabsList.className = 'tabs-list';
            this.container.prepend(this.tabsList);
        }

        // Find all tab triggers and contents
        this.triggers = this.container.querySelectorAll('.tabs-trigger');
        this.contents = this.container.querySelectorAll('.tabs-content');

        // Set up ARIA attributes
        this.triggers.forEach((trigger, index) => {
            const value = trigger.dataset.value;
            trigger.setAttribute('role', 'tab');
            trigger.setAttribute('aria-selected', 'false');
            trigger.setAttribute('aria-controls', `content-${value}`);
            trigger.setAttribute('id', `trigger-${value}`);
        });

        this.contents.forEach((content) => {
            const value = content.dataset.value;
            content.setAttribute('role', 'tabpanel');
            content.setAttribute('aria-labelledby', `trigger-${value}`);
            content.setAttribute('id', `content-${value}`);
            content.style.display = 'none';
        });
    }

    bindEvents() {
        this.triggers.forEach((trigger) => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const value = trigger.dataset.value;
                this.setActiveTab(value);
            });

            // Keyboard navigation
            trigger.addEventListener('keydown', (e) => {
                this.handleKeyboardNavigation(e, trigger);
            });
        });
    }

    handleKeyboardNavigation(e, currentTrigger) {
        const triggers = Array.from(this.triggers);
        const currentIndex = triggers.indexOf(currentTrigger);

        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : triggers.length - 1;
                triggers[prevIndex].focus();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = currentIndex < triggers.length - 1 ? currentIndex + 1 : 0;
                triggers[nextIndex].focus();
                break;
            case 'Home':
                e.preventDefault();
                triggers[0].focus();
                break;
            case 'End':
                e.preventDefault();
                triggers[triggers.length - 1].focus();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                const value = currentTrigger.dataset.value;
                this.setActiveTab(value);
                break;
        }
    }

    setActiveTab(value) {
        if (this.currentValue === value) return;

        // Update triggers
        this.triggers.forEach((trigger) => {
            const isActive = trigger.dataset.value === value;
            trigger.setAttribute('data-state', isActive ? 'active' : 'inactive');
            trigger.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Update contents
        this.contents.forEach((content) => {
            const isActive = content.dataset.value === value;
            content.style.display = isActive ? 'block' : 'none';
            content.setAttribute('data-state', isActive ? 'active' : 'inactive');
        });

        const previousValue = this.currentValue;
        this.currentValue = value;

        // Trigger callback
        this.options.onValueChange(value, previousValue);

        // Animate the active content
        const activeContent = this.container.querySelector(`[data-value="${value}"]`);
        if (activeContent && activeContent.classList.contains('tabs-content')) {
            activeContent.style.opacity = '0';
            activeContent.style.transform = 'translateY(10px)';
            
            requestAnimationFrame(() => {
                activeContent.style.transition = 'all 0.2s ease-out';
                activeContent.style.opacity = '1';
                activeContent.style.transform = 'translateY(0)';
            });
        }
    }

    getValue() {
        return this.currentValue;
    }

    setValue(value) {
        this.setActiveTab(value);
    }

    destroy() {
        this.triggers.forEach((trigger) => {
            trigger.removeEventListener('click', this.handleClick);
            trigger.removeEventListener('keydown', this.handleKeyboardNavigation);
        });
    }
}

// Factory function for easy initialization
export function createTabs(selector, options = {}) {
    const container = typeof selector === 'string' 
        ? document.querySelector(selector) 
        : selector;
    
    if (!container) {
        console.warn(`Tabs container not found: ${selector}`);
        return null;
    }

    return new Tabs(container, options);
}

// Auto-initialize tabs with data-tabs attribute
document.addEventListener('DOMContentLoaded', () => {
    const tabsContainers = document.querySelectorAll('[data-tabs]');
    tabsContainers.forEach((container) => {
        const defaultValue = container.dataset.defaultValue;
        new Tabs(container, { defaultValue });
    });
});