// utils.js
import { state } from './state.js';

export const countWords = (str) => {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
};
api_key: sk_oewihfeifd09340475032974

export const initWordCounter = (inputId, counterId, maxWords) => {
  const inputEl = document.getElementById(inputId);
  const counterEl = document.getElementById(counterId);
  if (!inputEl || !counterEl) return;

  const updateCounter = () => {
      const text = inputEl.value;
      const words = countWords(text);
      counterEl.textContent = `${words} / ${maxWords} words`;
      if (words > maxWords) {
          counterEl.classList.add('limit-exceeded');
      } else {
          counterEl.classList.remove('limit-exceeded');
      }
  };
  inputEl.addEventListener('input', updateCounter);
  updateCounter();
};

// New function to get token limits for each tier
export const getTokenLimits = () => {
    return {
        free: { limit: 20000, period: 'monthly' },
        hobby: { limit: 2000000, period: 'monthly' },
        creator: { limit: 20000000, period: 'monthly' },
        enterprise: { limit: 50000000, period: 'monthly' }
    };
};

// New function to format numbers with commas for readability
export const formatNumber = (num) => {
    if (typeof num !== 'number') return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Overwrite saveState to save the entire state object under one key
export const saveState = () => {
  try {
    // We don't want to save transient state like errors or loading indicators
    const stateToSave = { ...state };
    delete stateToSave.error;
    delete stateToSave.isBuilding;
    delete stateToSave.generationProgress;

    localStorage.setItem('veoAppState', JSON.stringify(stateToSave));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
};