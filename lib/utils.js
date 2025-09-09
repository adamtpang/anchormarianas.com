/**
 * Utility functions inspired by shadcn/ui
 */

// Class name utility (similar to clsx)
export function cn(...classes) {
    return classes
        .filter(Boolean)
        .map(cls => typeof cls === 'string' ? cls : '')
        .join(' ');
}

// Variant management utility
export function cva(base, config = {}) {
    return function(props = {}) {
        let classes = [base];
        
        if (config.variants) {
            Object.entries(config.variants).forEach(([variant, options]) => {
                const value = props[variant];
                if (value && options[value]) {
                    classes.push(options[value]);
                }
            });
        }
        
        if (config.defaultVariants) {
            Object.entries(config.defaultVariants).forEach(([variant, defaultValue]) => {
                if (!props[variant] && config.variants[variant][defaultValue]) {
                    classes.push(config.variants[variant][defaultValue]);
                }
            });
        }
        
        return cn(...classes, props.className);
    };
}

// Animation utilities
export function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `all ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
}

// Theme utilities
export function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// Local storage utilities
export function getStorageItem(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch {
        return defaultValue;
    }
}

export function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
}