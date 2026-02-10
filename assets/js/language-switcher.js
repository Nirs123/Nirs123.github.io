/**
 * Language Switcher for Bilingual Jekyll Site
 * Handles language detection and URL routing between French (/fr/) and English (/en/)
 */

(function() {
  'use strict';

  /**
   * Get current language from URL path
   * @returns {string} 'fr' or 'en'
   */
  function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.startsWith('/en/') || path.startsWith('/en')) {
      return 'en';
    }
    return 'fr'; // Default to French
  }

  /**
   * Get the equivalent page path in target language
   * @param {string} currentPath - Current page path
   * @param {string} targetLang - Target language ('fr' or 'en')
   * @returns {string} Equivalent path in target language
   */
  function getEquivalentPath(currentPath, targetLang) {
    // Remove current language prefix
    let path = currentPath.replace(/^\/(fr|en)\//, '/').replace(/^\/(fr|en)$/, '/');
    
    // Add target language prefix
    if (path === '/' || path === '') {
      return '/' + targetLang + '/';
    }
    return '/' + targetLang + path;
  }

  /**
   * Switch to target language
   * @param {string} targetLang - Target language ('fr' or 'en')
   */
  function switchLanguage(targetLang) {
    const currentPath = window.location.pathname;
    const newPath = getEquivalentPath(currentPath, targetLang);
    
    // Store language preference
    localStorage.setItem('preferred-language', targetLang);
    
    // Redirect to equivalent page in target language
    window.location.href = newPath;
  }

  /**
   * Update language switcher position based on hamburger button visibility
   */
  function updateSwitcherPosition() {
    const switcher = document.querySelector('.masthead__menu .language-switcher');
    const hamburgerBtn = document.querySelector('.greedy-nav button');
    
    if (!switcher) {
      return; // Switcher not found
    }
    
    if (hamburgerBtn) {
      // Check if hamburger button is visible (not hidden)
      const isButtonVisible = !hamburgerBtn.classList.contains('hidden');
      
      if (isButtonVisible) {
        // Position before the button - account for button width
        const buttonWidth = hamburgerBtn.offsetWidth || 50;
        switcher.style.right = (buttonWidth + 10) + 'px';
      } else {
        // Position at the right edge
        switcher.style.right = '0';
      }
    } else {
      // No hamburger button, position at right edge
      switcher.style.right = '0';
    }
  }

  /**
   * Initialize language switcher
   */
  function initLanguageSwitcher() {
    const currentLang = getCurrentLanguage();
    
    // Update language switcher button state
    const switcherButtons = document.querySelectorAll('.language-switcher button');
    switcherButtons.forEach(function(button) {
      if (button.dataset.lang === currentLang) {
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
      } else {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
      }
    });

    // Add click handlers
    document.querySelectorAll('.language-switcher button').forEach(function(button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetLang = this.dataset.lang;
        if (targetLang !== currentLang) {
          switchLanguage(targetLang);
        }
      });
    });

    // Update position based on hamburger button visibility
    const hamburgerBtn = document.querySelector('.greedy-nav button');
    if (hamburgerBtn) {
      updateSwitcherPosition();
      
      // Update position on window resize (when greedy nav adjusts)
      let resizeTimeout;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        // Small delay to let greedy nav update first
        resizeTimeout = setTimeout(updateSwitcherPosition, 100);
      });
      
      // Also update when greedy nav script runs (observe button class changes)
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            updateSwitcherPosition();
          }
        });
      });
      observer.observe(hamburgerBtn, { attributes: true, attributeFilter: ['class'] });
    } else {
      // If no hamburger button, just position at right edge
      updateSwitcherPosition();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
  } else {
    initLanguageSwitcher();
  }

  // Export functions for potential external use
  window.LanguageSwitcher = {
    getCurrentLanguage: getCurrentLanguage,
    switchLanguage: switchLanguage,
    getEquivalentPath: getEquivalentPath
  };

})();
