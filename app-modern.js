/**
 * Penny's Palace - Modern Enhanced JavaScript
 * Features: Smooth animations, improved accessibility, modern interactions
 */

// Application data (enhanced with more content)
const appData = {
  amazing_facts: {
    animals: [
      "Octopuses have 3 hearts and blue blood! 🐙",
      "Tigers have striped skin, not just striped fur! 🐅",
      "Elephants are the only mammals that can't jump! 🐘",
      "A shrimp's heart is in its head! 🦐",
      "Giraffes only sleep 2 hours a day! 🦒",
      "Dolphins have names for each other! 🐬",
      "Honeybees dance to give directions! 🐝",
      "Penguins propose with pebbles! 🐧"
    ],
    space: [
      "There are more stars in the sky than grains of sand on a beach! ✨",
      "A day on Venus is longer than a year on Venus! 🪐",
      "You could fit 1 million Earths inside the Sun! ☀️",
      "Sound doesn't travel in space - it's completely silent! 🌌",
      "Astronauts can grow up to 2 inches taller in space! 👨‍🚀",
      "Saturn's moon Titan has lakes of liquid methane! 🌙",
      "A single teaspoon of neutron star would weigh 6 billion tons! ⭐",
      "Jupiter's Great Red Spot is a storm bigger than Earth! 🌪️"
    ],
    body: [
      "Your heart is about the same size as your fist! ❤️",
      "You have about 10,000 taste buds! 👅",
      "Your brain uses 20% of your body's energy! 🧠",
      "You blink about 17,000 times a day! 👁️",
      "Your bones are 4 times stronger than concrete! 🦴",
      "You produce about 1.5 liters of saliva every day! 💧",
      "Your nose can remember 50,000 different scents! 👃",
      "You lose about 30,000 dead skin cells every minute! 🔬"
    ]
  },
  sydney_swans: {
    team_info: {
      nickname: "The Swans, The Bloods",
      colors: "Red and White",
      home_ground: "Sydney Cricket Ground (SCG)",
      mascot: "Cyggy the Swan 🦢",
      founded: "1874",
      premierships: ["1909", "1918", "1933", "2005", "2012"]
    },
    current_players: [
      "Isaac Heeney - Forward/Midfielder ⭐",
      "Errol Gulden - Midfielder ⭐",
      "Chad Warner - Midfielder ⭐",
      "Callum Mills - Captain 👑",
      "Nick Blakey - Defender 🛡️",
      "Lance Franklin - Legend Forward 🔥",
      "Luke Parker - Midfielder 💪",
      "Tom Papley - Forward 🎯"
    ],
    fun_facts: [
      "The Sydney Swans were originally from Melbourne! 🏃‍♂️",
      "Their mascot Cyggy loves entertaining fans! 🦢",
      "They're known as 'The Bloods' for their red color! ❤️",
      "They play at the famous Sydney Cricket Ground! 🏟️",
      "The Swans have won 5 premierships! 🏆",
      "Their song is 'Cheer Cheer the Red and the White'! 🎵",
      "They moved to Sydney in 1982! 🚚",
      "The SCG has hosted cricket since 1848! 🏏"
    ]
  },
};

// Enhanced game data
const gameData = {
  scrambleWords: [
    { word: "DANCE", scrambled: "CENADA", hint: "Moving to music" },
    { word: "BALLET", scrambled: "TLABEL", hint: "Graceful dance form" },
    { word: "FOOTBALL", scrambled: "LLABTOOF", hint: "Aussie Rules sport" },
    { word: "SYDNEY", scrambled: "DNEYST", hint: "Harbor city" },
    { word: "SWANS", scrambled: "SNAWS", hint: "Penny's favorite team" },
    { word: "DREAMS", scrambled: "SMAERD", hint: "What you have when sleeping" },
    { word: "FRIENDSHIP", scrambled: "PIHSDNEIRF", hint: "Special bonds with others" }
  ],
  quizQuestions: [
    {
      question: "What are the Sydney Swans team colors?",
      options: ["Red and White", "Blue and Yellow", "Green and Gold", "Black and White"],
      correct: 0
    },
    {
      question: "What is the Swans mascot's name?",
      options: ["Swanny", "Cyggy", "Reddy", "Bloods"],
      correct: 1
    },
    {
      question: "Where do the Sydney Swans play their home games?",
      options: ["ANZ Stadium", "Allianz Stadium", "Sydney Cricket Ground", "Olympic Stadium"],
      correct: 2
    },
    {
      question: "How many hearts does an octopus have?",
      options: ["1", "2", "3", "4"],
      correct: 2
    },
    {
      question: "How many times do you blink per day?",
      options: ["5,000", "10,000", "17,000", "25,000"],
      correct: 2
    },
    {
      question: "Which planet has the longest day?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      question: "What percentage of your body's energy does your brain use?",
      options: ["10%", "15%", "20%", "25%"],
      correct: 2
    },
    {
      question: "When did the Sydney Swans move to Sydney?",
      options: ["1980", "1982", "1985", "1987"],
      correct: 1
    }
  ],
  memoryCards: [
    "Isaac Heeney", "Errol Gulden", "Chad Warner", "Callum Mills",
    "🦢", "🏈", "❤️", "⭐", "🏆", "🎯", "💪", "🔥",
    "Isaac Heeney", "Errol Gulden", "Chad Warner", "Callum Mills",
    "🦢", "🏈", "❤️", "⭐", "🏆", "🎯", "💪", "🔥"
  ]
};

// App state with enhanced tracking
let appState = {
  currentSection: 'amazing-facts',
  isAnimating: false,
  theme: 'light',
  gameStates: {
    memory: { score: 0, flipped: [], matched: [], attempts: 0 },
    scramble: { score: 0, currentWord: 0, hints: 3 },
    quiz: { score: 0, currentQuestion: 0, answered: [] }
  },
  achievements: [],
  preferences: JSON.parse(localStorage.getItem('pennyPreferences') || '{}')
};

// Animation utilities
const AnimationUtils = {
  fadeIn: (element, duration = 300) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;

    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  },

  slideIn: (element, direction = 'left', duration = 400) => {
    const translateMap = {
      left: 'translateX(-100%)',
      right: 'translateX(100%)',
      up: 'translateY(-100%)',
      down: 'translateY(100%)'
    };

    element.style.transform = translateMap[direction];
    element.style.transition = `transform ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`;

    requestAnimationFrame(() => {
      element.style.transform = 'translateX(0) translateY(0)';
    });
  },

  bounce: (element, scale = 1.1) => {
    element.style.transition = 'transform 200ms ease';
    element.style.transform = `scale(${scale})`;

    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 200);
  },

  shake: (element) => {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
  },

  sparkle: (element) => {
    const sparkles = [];
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: linear-gradient(45deg, #E91E63, #673AB7);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
      `;

      const rect = element.getBoundingClientRect();
      sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
      sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';

      document.body.appendChild(sparkle);
      sparkles.push(sparkle);

      const animation = sparkle.animate([
        { transform: 'translateY(0) scale(0)', opacity: 1 },
        { transform: 'translateY(-50px) scale(1)', opacity: 0.8 },
        { transform: 'translateY(-100px) scale(0)', opacity: 0 }
      ], {
        duration: 1000,
        easing: 'ease-out'
      });

      animation.onfinish = () => sparkle.remove();
    }
  }
};

// Enhanced accessibility support
const AccessibilityUtils = {
  announce: (message, priority = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;

    document.body.appendChild(announcer);
    setTimeout(() => announcer.remove(), 1000);
  },

  setFocus: (element, delay = 0) => {
    setTimeout(() => {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, delay);
  },

  updateAriaPressed: (button, pressed) => {
    button.setAttribute('aria-pressed', pressed.toString());
  }
};

// Toast notification system
const ToastManager = {
  show: (message, type = 'success', duration = 3000) => {
    const container = document.getElementById('toast-container');
    if (!container) return; // Exit gracefully if container doesn't exist
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="toast-message">${message}</span>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close notification">×</button>
    `;

    container.appendChild(toast);
    AnimationUtils.slideIn(toast, 'right');

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  }
};

// Progress tracking
const ProgressTracker = {
  show: () => {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return; // Exit gracefully if element doesn't exist
    progressBar.style.display = 'block';
    const fill = progressBar.querySelector('.progress-fill');
    if (fill) fill.style.width = '0%';
  },

  update: (percentage) => {
    const fill = document.querySelector('.progress-fill');
    if (fill) fill.style.width = percentage + '%';
  },

  hide: () => {
    setTimeout(() => {
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) progressBar.style.display = 'none';
    }, 500);
  }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

// Main initialization function
function initializeApp() {
  addCustomStyles();
  setupNavigation();
  setupThemeToggle();
  populateContent();
  setupEventListeners();
  initializeScrollEffects();
  loadUserPreferences();
  addKeyboardNavigation();

  // Show welcome animation
  setTimeout(() => {
    ToastManager.show('Welcome to Penny\'s Personal Place! 🌟', 'info');
  }, 1000);
}

// Add custom styles for animations
function addCustomStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    .toast {
      position: relative;
      background: white;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      border-left: 4px solid var(--color-primary);
      transform: translateX(100%);
    }
    
    .toast-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .toast-close {
      position: absolute;
      top: 8px;
      right: 8px;
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: var(--color-gray);
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    
    .toast-close:hover {
      background: var(--color-light-gray);
    }
    
    .progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(233, 30, 99, 0.2);
      z-index: 9999;
      display: none;
    }
    
    .progress-fill {
      height: 100%;
      background: var(--gradient-primary);
      width: 0%;
      transition: width 0.3s ease;
    }
    
    .toast-container {
      position: fixed;
      top: 100px;
      right: 20px;
      z-index: 1000;
      max-width: 400px;
    }
    
    .theme-toggle {
      background: var(--color-white);
      border: 2px solid var(--color-primary);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .theme-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 5px 15px rgba(233, 30, 99, 0.3);
    }
    
    .theme-toggle .sun-icon,
    .theme-toggle .moon-icon {
      position: absolute;
      transition: all 0.3s ease;
    }
    
    [data-theme="dark"] .theme-toggle .sun-icon {
      transform: rotate(180deg) scale(0);
    }
    
    [data-theme="dark"] .theme-toggle .moon-icon {
      transform: rotate(0deg) scale(1);
    }
    
    [data-theme="light"] .theme-toggle .sun-icon {
      transform: rotate(0deg) scale(1);
    }
    
    [data-theme="light"] .theme-toggle .moon-icon {
      transform: rotate(-180deg) scale(0);
    }
  `;
  document.head.appendChild(style);
}

// Enhanced navigation with smooth transitions
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(button => {
    button.addEventListener('click', function () {
      if (appState.isAnimating) return;

      const targetSection = this.dataset.section;
      switchSection(targetSection);
      AnimationUtils.bounce(this);
    });
  });
}

// Theme toggle functionality
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Apply saved theme
  if (appState.preferences.theme) {
    document.documentElement.setAttribute('data-theme', appState.preferences.theme);
    appState.theme = appState.preferences.theme;
  }
}

function toggleTheme() {
  const newTheme = appState.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  appState.theme = newTheme;
  appState.preferences.theme = newTheme;
  saveUserPreferences();

  ToastManager.show(`Switched to ${newTheme} mode! ${newTheme === 'dark' ? '🌙' : '☀️'}`, 'info');
}

// Enhanced section switching with animations
function switchSection(sectionName) {
  if (appState.isAnimating) return;

  appState.isAnimating = true;
  ProgressTracker.show();

  // Animate out current section
  const currentSection = document.querySelector('.content-section.active');
  if (currentSection) {
    currentSection.style.opacity = '0';
    currentSection.style.transform = 'translateX(-20px)';
  }

  setTimeout(() => {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.style.opacity = '0';
      targetSection.style.transform = 'translateX(20px)';

      // Animate in new section
      requestAnimationFrame(() => {
        targetSection.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateX(0)';
      });
    }

    // Update nav button states with accessibility
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
      button.classList.remove('active');
      AccessibilityUtils.updateAriaPressed(button, false);
    });

    const activeButton = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
      AccessibilityUtils.updateAriaPressed(activeButton, true);
    }

    appState.currentSection = sectionName;
    ProgressTracker.update(100);

    setTimeout(() => {
      ProgressTracker.hide();
      appState.isAnimating = false;
    }, 200);

    // Announce section change
    AccessibilityUtils.announce(`Switched to ${sectionName.replace('-', ' ')} section`);
  }, 200);
}

// Enhanced content population with animations
function populateContent() {
  setupAmazingFacts();
  populateSwansInfo();
  populateRecipes();
  setupQuiz();
}

function populateSwansInfo() {
  // Populate players with enhanced animations
  const playersList = document.getElementById('players-list');
  if (playersList) {
    playersList.innerHTML = '';
    appData.sydney_swans.current_players.forEach((player, index) => {
      const playerItem = document.createElement('div');
      playerItem.className = 'player-item';
      playerItem.setAttribute('role', 'listitem');
      playerItem.textContent = player;

      playerItem.addEventListener('click', () => {
        AnimationUtils.bounce(playerItem);
        ToastManager.show(`${player.split(' - ')[0]} is awesome! ⭐`, 'info', 2000);
      });

      playersList.appendChild(playerItem);

      setTimeout(() => {
        AnimationUtils.slideIn(playerItem, 'left');
      }, index * 100);
    });
  }

  // Populate fun facts
  const swansFacts = document.getElementById('swans-facts');
  if (swansFacts) {
    swansFacts.innerHTML = '';
    appData.sydney_swans.fun_facts.forEach((fact, index) => {
      const factItem = document.createElement('div');
      factItem.className = 'swans-fact-item';
      factItem.setAttribute('role', 'listitem');
      factItem.textContent = fact;

      factItem.addEventListener('click', () => {
        AnimationUtils.sparkle(factItem);
      });

      swansFacts.appendChild(factItem);

      setTimeout(() => {
        AnimationUtils.fadeIn(factItem);
      }, index * 80);
    });
  }
}

function populateRecipes() {
}

// Enhanced event listeners
function setupEventListeners() {
  // Amazing Facts navigation
  setupAmazingFactsListeners();

  // Quiz start button
  const startQuizBtn = document.getElementById('start-quiz-btn');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startSwansQuiz);
  }

  // Header scroll effect
  window.addEventListener('scroll', handleScroll);

  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Scroll effects
function initializeScrollEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        AnimationUtils.fadeIn(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .fact-card, .tool-card').forEach(card => {
    observer.observe(card);
  });
}

function handleScroll() {
  const header = document.querySelector('.main-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Keyboard navigation support
function addKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
}

function handleKeyboardShortcuts(e) {
  if (e.altKey) {
    switch (e.key) {
      case '1':
        switchSection('amazing-facts');
        break;
      case '2':
        switchSection('play-games');
        break;
      case '3':
        switchSection('monthly-calendar');
        break;
      case 't':
        toggleTheme();
        break;
    }
  }
}

// Amazing Facts Data and Logic
const factsData = {
  animals: {
    title: "Amazing Animals",
    icon: "🐾",
    facts: [
      "Octopuses have 3 hearts and blue blood! 🐙",
      "Tigers have striped skin, not just striped fur! 🐅", 
      "Elephants are the only mammals that can't jump! 🐘",
      "A shrimp's heart is in its head! 🦐",
      "Giraffes only sleep for about 30 minutes a day! 🦒",
      "Dolphins have names for each other! 🐬",
      "Honeybees dance to give directions! 🐝",
      "Penguins propose with pebbles! 🐧"
    ]
  },
  space: {
    title: "Cool Space",
    icon: "🚀",
    facts: [
      "There are more stars in the universe than grains of sand on all the Earth's beaches! ✨",
      "A day on Venus is longer than a year on Venus! 🪐",
      "You could fit 1 million Earths inside the Sun! ☀️",
      "In space, no one can hear you scream because there is no air to carry sound! 🌌",
      "Astronauts can grow up to 2 inches taller in space! 👨‍🚀",
      "Saturn's moon Titan has lakes of liquid methane! 🌙",
      "A single teaspoon of neutron star would weigh 6 billion tons! ⭐",
      "Jupiter's Great Red Spot is a storm bigger than Earth! 🌪️"
    ]
  },
  body: {
    title: "Your Body",
    icon: "💖",
    facts: [
      "Your heart is about the same size as your fist! ❤️",
      "You have about 10,000 taste buds on your tongue! 👅",
      "Your brain uses 20% of your body's oxygen and calories! 🧠",
      "You blink about 20 times per minute, that's over 10 million times a year! 👁️",
      "Your bones are about 4 times stronger than concrete! 🦴",
      "You produce about 1.5 liters of saliva every day! 💧",
      "Your nose can remember 50,000 different scents! 👃",
      "You lose about 30,000 dead skin cells every minute! 🔬"
    ]
  },
  swans: {
    title: "Sydney Swans",
    icon: "🏆",
    facts: [
      "Originally based in South Melbourne before relocating to Sydney in 1982. 🦢",
      "The club was formed on June 19, 1874, making it one of the oldest AFL clubs. 📅",
      "Their 2005 Grand Final win is considered one of the greatest of all time. 🏆",
      "The SCG is nicknamed 'Swanland' or 'The Spiritual Home of the Swans'. 🏟️",
      "Bob Skilton won three Brownlow Medals, a record for the club. 🏅",
      "Tony Lockett's post-siren goal in 1996 sent the Swans to the Grand Final. ⚽",
      "The club's colors are red and white. ❤️",
      "Adam Goodes is the only Swan to win the Brownlow Medal twice since the move to Sydney. 🌟"
    ]
  },
  jazz: {
    title: "Jazz Dance",
    icon: "🎭",
    facts: [
      "The Charleston dance incorporated hand clapping and foot stamping from African origins. 👏",
      "Jazz dance was initially performed to ragtime music. 🎵",
      "Bill 'Bojangles' Robinson influenced jazz dance through his clean tap dancing style. 👞",
      "The term 'jazz' originally referred to any dance performed to jazz music. 🎭",
      "Jazz dance helped break down racial barriers in entertainment. 🤝",
      "Many Broadway shows and Hollywood movies popularized jazz dance styles. 🎬",
      "Jazz dance emphasizes the dancer's personal interpretation of the music. 💃"
    ]
  }
};

let currentCategory = null;
let currentFactIndex = 0;

function setupAmazingFacts() {
  // This function initializes the Amazing Facts section
  AccessibilityUtils.announce('Amazing Facts section loaded with 5 categories to explore');
}

function setupAmazingFactsListeners() {
  // Category card click listeners
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', handleCategoryClick);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCategoryClick.call(card);
      }
    });
  });

  // Back button listener
  const backBtn = document.getElementById('facts-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', showCategoryView);
  }

  // Navigation buttons
  const prevBtn = document.getElementById('prev-fact-btn');
  const nextBtn = document.getElementById('next-fact-btn');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', showPreviousFact);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', showNextFact);
  }
}

function handleCategoryClick() {
  const category = this.dataset.category;
  if (category && factsData[category]) {
    currentCategory = category;
    currentFactIndex = 0;
    showFactsView(category);
    AnimationUtils.bounce(this);
  }
}

function showCategoryView() {
  document.getElementById('facts-category-view').style.display = 'block';
  document.getElementById('facts-detail-view').classList.add('hidden');
  currentCategory = null;
  AccessibilityUtils.announce('Returned to category selection');
}

function showFactsView(category) {
  const categoryData = factsData[category];
  
  // Hide category view and show detail view
  document.getElementById('facts-category-view').style.display = 'none';
  document.getElementById('facts-detail-view').classList.remove('hidden');
  
  // Update title
  document.getElementById('current-category-title').textContent = categoryData.title;
  
  // Update fact counter
  document.getElementById('total-facts').textContent = categoryData.facts.length;
  
  // Show first fact
  displayCurrentFact();
  
  AccessibilityUtils.announce(`Viewing ${categoryData.title} facts. Use Previous and Next buttons to navigate.`);
}

function displayCurrentFact() {
  if (!currentCategory) return;
  
  const categoryData = factsData[currentCategory];
  const fact = categoryData.facts[currentFactIndex];
  
  document.getElementById('current-fact-content').textContent = fact;
  document.getElementById('current-fact-number').textContent = currentFactIndex + 1;
  
  // Update button states
  const prevBtn = document.getElementById('prev-fact-btn');
  const nextBtn = document.getElementById('next-fact-btn');
  
  if (prevBtn) {
    prevBtn.disabled = currentFactIndex === 0;
  }
  
  if (nextBtn) {
    nextBtn.disabled = currentFactIndex === categoryData.facts.length - 1;
  }
  
  // Animate fact display
  const factContent = document.getElementById('current-fact-content');
  AnimationUtils.fadeIn(factContent);
}

function showPreviousFact() {
  if (currentCategory && currentFactIndex > 0) {
    currentFactIndex--;
    displayCurrentFact();
    AccessibilityUtils.announce('Previous fact');
  }
}

function showNextFact() {
  if (currentCategory) {
    const maxIndex = factsData[currentCategory].facts.length - 1;
    if (currentFactIndex < maxIndex) {
      currentFactIndex++;
      displayCurrentFact();
      AccessibilityUtils.announce('Next fact');
    }
  }
}

// Enhanced Swans quiz with better UX
function startSwansQuiz() {
  const quizContainer = document.getElementById('quiz-container');
  const questions = gameData.quizQuestions.filter(q =>
    q.question.toLowerCase().includes('swans') ||
    q.question.toLowerCase().includes('sydney') ||
    q.question.toLowerCase().includes('mascot') ||
    q.question.toLowerCase().includes('colors')
  );

  if (questions.length === 0) return;

  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

  quizContainer.innerHTML = `
    <div class="quiz-question" role="heading" aria-level="4">${randomQuestion.question}</div>
    <div class="quiz-answers" role="radiogroup" aria-labelledby="quiz-question">
      ${randomQuestion.options.map((option, index) =>
    `<button class="quiz-answer" 
                 role="radio" 
                 aria-checked="false"
                 onclick="checkSwansAnswer(${index}, ${randomQuestion.correct})"
                 onkeydown="handleQuizKeydown(event, ${index}, ${randomQuestion.correct})"
                 tabindex="${index === 0 ? '0' : '-1'}">${option}</button>`
  ).join('')}
    </div>
  `;

  // Focus first option for accessibility
  setTimeout(() => {
    const firstOption = quizContainer.querySelector('.quiz-answer');
    AccessibilityUtils.setFocus(firstOption, 100);
  }, 100);
}

function handleQuizKeydown(event, index, correct) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    checkSwansAnswer(index, correct);
  }
}

function checkSwansAnswer(selected, correct) {
  const answers = document.querySelectorAll('.quiz-answer');
  answers.forEach((answer, index) => {
    answer.disabled = true;
    if (index === correct) {
      answer.classList.add('correct');
      AnimationUtils.bounce(answer);
    } else if (index === selected && index !== correct) {
      answer.classList.add('incorrect');
      AnimationUtils.shake(answer);
    }
  });

  setTimeout(() => {
    if (selected === correct) {
      showCelebration("🎉 Correct!", "Great job! You know your Swans! 🦢", 'success');
      AnimationUtils.sparkle(answers[correct]);
    } else {
      showCelebration("📚 Good try!", "Keep learning about the Swans! 🦢", 'info');
    }
  }, 1000);
}

// Enhanced memory game
function startMemoryGame() {
  const gameArea = document.getElementById('memory-game-area');
  const grid = document.getElementById('memory-grid');

  gameArea.style.display = 'block';
  appState.gameStates.memory = { score: 0, flipped: [], matched: [], attempts: 0 };

  // Shuffle cards
  const shuffled = [...gameData.memoryCards].sort(() => Math.random() - 0.5);

  grid.innerHTML = '';
  grid.setAttribute('role', 'grid');
  grid.setAttribute('aria-label', 'Memory card game grid');

  shuffled.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'memory-card';
    cardElement.setAttribute('role', 'gridcell');
    cardElement.setAttribute('tabindex', '0');
    cardElement.setAttribute('aria-label', `Card ${index + 1}, hidden`);
    cardElement.dataset.value = card;
    cardElement.dataset.index = index;
    cardElement.textContent = '?';

    cardElement.addEventListener('click', flipCard);
    cardElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipCard(e);
      }
    });

    grid.appendChild(cardElement);

    // Stagger card animations
    setTimeout(() => {
      AnimationUtils.fadeIn(cardElement);
    }, index * 50);
  });

  AccessibilityUtils.announce('Memory game started! Find matching pairs.');
}

function flipCard(event) {
  const card = event.target;
  const index = parseInt(card.dataset.index);

  if (appState.gameStates.memory.flipped.length < 2 &&
    !appState.gameStates.memory.flipped.includes(index) &&
    !appState.gameStates.memory.matched.includes(index)) {

    card.textContent = card.dataset.value;
    card.classList.add('flipped');
    card.setAttribute('aria-label', `Card ${index + 1}, showing ${card.dataset.value}`);

    AnimationUtils.bounce(card, 1.05);
    appState.gameStates.memory.flipped.push(index);

    if (appState.gameStates.memory.flipped.length === 2) {
      appState.gameStates.memory.attempts++;
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [first, second] = appState.gameStates.memory.flipped;
  const cards = document.querySelectorAll('.memory-card');

  if (cards[first].dataset.value === cards[second].dataset.value) {
    cards[first].classList.add('matched');
    cards[second].classList.add('matched');
    appState.gameStates.memory.matched.push(first, second);
    appState.gameStates.memory.score += 10;

    AnimationUtils.sparkle(cards[first]);
    AnimationUtils.sparkle(cards[second]);

    ToastManager.show('Perfect match! 🎯', 'success', 2000);

    if (appState.gameStates.memory.matched.length === gameData.memoryCards.length) {
      const efficiency = Math.round((gameData.memoryCards.length / 2) / appState.gameStates.memory.attempts * 100);
      showCelebration("🏆 Amazing!", `You matched all cards with ${efficiency}% efficiency! 🎉`, 'achievement');
    }
  } else {
    cards[first].textContent = '?';
    cards[second].textContent = '?';
    cards[first].classList.remove('flipped');
    cards[second].classList.remove('flipped');
    cards[first].setAttribute('aria-label', `Card ${first + 1}, hidden`);
    cards[second].setAttribute('aria-label', `Card ${second + 1}, hidden`);

    AnimationUtils.shake(cards[first]);
    AnimationUtils.shake(cards[second]);
  }

  appState.gameStates.memory.flipped = [];
  document.getElementById('memory-score').textContent = appState.gameStates.memory.score;
}

// Enhanced word scramble game
function startWordScramble() {
  const gameArea = document.getElementById('word-scramble-area');
  gameArea.style.display = 'block';

  appState.gameStates.scramble = { score: 0, currentWord: 0, hints: 3 };
  nextScrambleWord();

  // Add hint button
  const scrambleArea = document.getElementById('word-scramble-area');
  if (!scrambleArea.querySelector('.hint-btn')) {
    const hintBtn = document.createElement('button');
    hintBtn.className = 'btn btn--accent hint-btn';
    hintBtn.innerHTML = '💡 Hint (3 left)';
    hintBtn.onclick = showScrambleHint;
    scrambleArea.insertBefore(hintBtn, scrambleArea.querySelector('.scramble-feedback'));
  }

  AccessibilityUtils.announce('Word scramble game started! Unscramble the letters to form words.');
}

function nextScrambleWord() {
  if (appState.gameStates.scramble.currentWord >= gameData.scrambleWords.length) {
    showCelebration("🎊 Congratulations!", "You unscrambled all the words! 🎉", 'achievement');
    return;
  }

  const currentWord = gameData.scrambleWords[appState.gameStates.scramble.currentWord];
  const scrambleElement = document.getElementById('scramble-word');

  scrambleElement.textContent = currentWord.scrambled;
  scrambleElement.setAttribute('aria-label', `Scrambled word: ${currentWord.scrambled.split('').join(' ')}`);

  document.getElementById('scramble-input').value = '';
  document.getElementById('scramble-feedback').textContent = '';

  // Focus input for better UX
  AccessibilityUtils.setFocus(document.getElementById('scramble-input'), 100);

  // Update hint button
  const hintBtn = document.querySelector('.hint-btn');
  if (hintBtn) {
    hintBtn.style.display = appState.gameStates.scramble.hints > 0 ? 'inline-flex' : 'none';
    hintBtn.innerHTML = `💡 Hint (${appState.gameStates.scramble.hints} left)`;
  }
}

function showScrambleHint() {
  if (appState.gameStates.scramble.hints <= 0) return;

  const currentWord = gameData.scrambleWords[appState.gameStates.scramble.currentWord];
  appState.gameStates.scramble.hints--;

  ToastManager.show(`Hint: ${currentWord.hint}`, 'info', 4000);

  const hintBtn = document.querySelector('.hint-btn');
  if (hintBtn) {
    hintBtn.innerHTML = `💡 Hint (${appState.gameStates.scramble.hints} left)`;
    if (appState.gameStates.scramble.hints === 0) {
      hintBtn.style.display = 'none';
    }
  }
}

function checkScrambleAnswer() {
  const input = document.getElementById('scramble-input');
  const feedback = document.getElementById('scramble-feedback');
  const currentWord = gameData.scrambleWords[appState.gameStates.scramble.currentWord];

  if (input.value.toUpperCase() === currentWord.word) {
    feedback.textContent = `🎉 Correct! The word is ${currentWord.word}`;
    feedback.className = 'scramble-feedback correct';
    appState.gameStates.scramble.score += 10;
    appState.gameStates.scramble.currentWord++;

    AnimationUtils.sparkle(feedback);
    AccessibilityUtils.announce(`Correct! The word was ${currentWord.word}`);

    setTimeout(nextScrambleWord, 2000);
  } else {
    feedback.textContent = 'Try again! 🤔';
    feedback.className = 'scramble-feedback incorrect';
    AnimationUtils.shake(input);
    AccessibilityUtils.announce('Try again');
  }

  document.getElementById('scramble-score').textContent = appState.gameStates.scramble.score;
}

// Enhanced facts quiz
function startFactsQuiz() {
  const gameArea = document.getElementById('facts-quiz-area');
  gameArea.style.display = 'block';

  appState.gameStates.quiz = { score: 0, currentQuestion: 0, answered: [] };
  nextQuizQuestion();

  AccessibilityUtils.announce('Facts quiz started! Answer questions about amazing facts.');
}

function nextQuizQuestion() {
  if (appState.gameStates.quiz.currentQuestion >= gameData.quizQuestions.length) {
    const percentage = Math.round((appState.gameStates.quiz.score / (gameData.quizQuestions.length * 10)) * 100);
    showCelebration("📊 Quiz Complete!", `You scored ${appState.gameStates.quiz.score} points (${percentage}%)! 🎉`, 'achievement');
    return;
  }

  const question = gameData.quizQuestions[appState.gameStates.quiz.currentQuestion];
  document.getElementById('facts-question').textContent = question.question;

  const optionsContainer = document.getElementById('facts-options');
  optionsContainer.innerHTML = '';
  optionsContainer.setAttribute('role', 'radiogroup');
  optionsContainer.setAttribute('aria-labelledby', 'facts-question');

  question.options.forEach((option, index) => {
    const optionElement = document.createElement('button');
    optionElement.className = 'quiz-option';
    optionElement.textContent = option;
    optionElement.setAttribute('role', 'radio');
    optionElement.setAttribute('aria-checked', 'false');
    optionElement.setAttribute('tabindex', index === 0 ? '0' : '-1');

    optionElement.onclick = () => checkQuizAnswer(index);
    optionElement.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        checkQuizAnswer(index);
      }
    };

    optionsContainer.appendChild(optionElement);

    setTimeout(() => {
      AnimationUtils.fadeIn(optionElement);
    }, index * 100);
  });

  document.getElementById('facts-feedback').textContent = '';

  // Focus first option
  setTimeout(() => {
    AccessibilityUtils.setFocus(optionsContainer.querySelector('.quiz-option'), 100);
  }, 500);
}

function checkQuizAnswer(selected) {
  const question = gameData.quizQuestions[appState.gameStates.quiz.currentQuestion];
  const feedback = document.getElementById('facts-feedback');
  const options = document.querySelectorAll('.quiz-option');

  options.forEach(option => option.disabled = true);

  if (selected === question.correct) {
    feedback.textContent = '🎉 Correct!';
    feedback.className = 'quiz-feedback correct';
    appState.gameStates.quiz.score += 10;

    AnimationUtils.bounce(options[selected]);
    AnimationUtils.sparkle(options[selected]);
    AccessibilityUtils.announce('Correct answer!');
  } else {
    feedback.textContent = `❌ Incorrect. The answer is: ${question.options[question.correct]}`;
    feedback.className = 'quiz-feedback incorrect';

    AnimationUtils.shake(options[selected]);
    AnimationUtils.bounce(options[question.correct]);
    AccessibilityUtils.announce(`Incorrect. The correct answer was ${question.options[question.correct]}`);
  }

  appState.gameStates.quiz.currentQuestion++;
  document.getElementById('facts-score').textContent = appState.gameStates.quiz.score;

  setTimeout(nextQuizQuestion, 3000);
}

// Enhanced planner functionality
function addPlannerItem(event) {
  if (event) event.preventDefault();

  const date = document.getElementById('planner-date').value;
  const activity = document.getElementById('planner-activity').value;

  if (!date || !activity) {
    ToastManager.show('Please select a date and enter an activity! 📅', 'error');
    AnimationUtils.shake(document.getElementById('planner-activity'));
    return;
  }

  let category = 'fun-activities';
  if (activity.toLowerCase().includes('dance') || activity.toLowerCase().includes('ballet')) {
    category = 'dance-activities';
  } else if (activity.toLowerCase().includes('school') || activity.toLowerCase().includes('homework')) {
    category = 'school-activities';
  }

  const categoryList = document.getElementById(category);
  const item = document.createElement('li');
  item.innerHTML = `
    <span>${date}: ${activity}</span>
    <button class="btn btn--sm" onclick="removePlannerItem(this)" aria-label="Remove activity">❌</button>
  `;
  item.setAttribute('role', 'listitem');

  categoryList.appendChild(item);
  AnimationUtils.slideIn(item, 'left');

  document.getElementById('planner-activity').value = '';
  ToastManager.show('Activity added to your planner! 📅', 'success');
  AccessibilityUtils.announce(`Activity added: ${activity} on ${date}`);

  // Save to localStorage
  savePlannerData();
}

function removePlannerItem(button) {
  const item = button.parentElement;
  item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  item.style.opacity = '0';
  item.style.transform = 'translateX(-100%)';

  setTimeout(() => {
    item.remove();
    savePlannerData();
    ToastManager.show('Activity removed! 🗑️', 'info');
  }, 300);
}

// Enhanced goal tracker
function addGoal(event) {
  if (event) event.preventDefault();

  const goalInput = document.getElementById('goal-input');
  const goalText = goalInput.value.trim();

  if (!goalText) {
    ToastManager.show('Please enter a goal! 🎯', 'error');
    AnimationUtils.shake(goalInput);
    return;
  }

  const goalsList = document.getElementById('goals-list');
  const goalItem = document.createElement('div');
  goalItem.className = 'goal-item';
  goalItem.setAttribute('role', 'listitem');
  goalItem.innerHTML = `
    <div>
      <div class="goal-text">${goalText}</div>
      <div class="goal-progress">
        <div class="goal-progress-fill" style="width: 0%"></div>
      </div>
      <div class="goal-percentage">0%</div>
    </div>
    <div class="goal-buttons">
      <button class="goal-btn" onclick="updateGoalProgress(this, 25)" aria-label="Increase progress by 25%">+25%</button>
      <button class="goal-btn" onclick="updateGoalProgress(this, -25)" aria-label="Decrease progress by 25%">-25%</button>
      <button class="goal-btn" onclick="removeGoal(this)" aria-label="Remove goal">🗑️</button>
    </div>
  `;

  goalsList.appendChild(goalItem);
  AnimationUtils.slideIn(goalItem, 'right');

  goalInput.value = '';
  ToastManager.show('Goal set! Keep working towards it! 🎯', 'success');
  AccessibilityUtils.announce(`New goal added: ${goalText}`);

  saveGoalsData();
}

function updateGoalProgress(button, change) {
  const goalItem = button.closest('.goal-item');
  const progressBar = goalItem.querySelector('.goal-progress-fill');
  const percentageDisplay = goalItem.querySelector('.goal-percentage');
  let currentProgress = parseInt(progressBar.style.width) || 0;

  currentProgress = Math.max(0, Math.min(100, currentProgress + change));
  progressBar.style.width = currentProgress + '%';
  percentageDisplay.textContent = currentProgress + '%';

  if (currentProgress >= 100) {
    AnimationUtils.sparkle(goalItem);
    showCelebration("🏆 Goal Achieved!", "Congratulations on reaching your goal! 🎉", 'achievement');
    AccessibilityUtils.announce('Goal completed! Congratulations!');
  } else if (change > 0) {
    AnimationUtils.bounce(progressBar);
    ToastManager.show(`Progress updated! ${currentProgress}% complete 📈`, 'info', 2000);
  }

  saveGoalsData();
}

function removeGoal(button) {
  const goalItem = button.closest('.goal-item');
  goalItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  goalItem.style.opacity = '0';
  goalItem.style.transform = 'translateX(100%)';

  setTimeout(() => {
    goalItem.remove();
    saveGoalsData();
    ToastManager.show('Goal removed! 🗑️', 'info');
  }, 300);
}

// Enhanced journal functionality
function saveJournalEntry(event) {
  if (event) event.preventDefault();

  const title = document.getElementById('journal-title-input').value;
  const entry = document.getElementById('journal-entry').value;

  if (!title || !entry) {
    ToastManager.show('Please enter both a title and journal entry! 📝', 'error');
    AnimationUtils.shake(document.getElementById('journal-title-input'));
    return;
  }

  const entriesList = document.getElementById('journal-entries');
  const entryItem = document.createElement('div');
  entryItem.className = 'journal-entry-item';
  entryItem.setAttribute('role', 'listitem');
  entryItem.innerHTML = `
    <div class="journal-entry-title">${title}</div>
    <div class="journal-entry-date">${new Date().toLocaleDateString()}</div>
    <div class="journal-entry-content">${entry.replace(/\n/g, '<br>')}</div>
    <button class="btn btn--sm" onclick="removeJournalEntry(this)" aria-label="Remove journal entry">🗑️</button>
  `;

  entriesList.insertBefore(entryItem, entriesList.firstChild);
  AnimationUtils.slideIn(entryItem, 'up');

  document.getElementById('journal-title-input').value = '';
  document.getElementById('journal-entry').value = '';
  ToastManager.show('Journal entry saved! 📝', 'success');
  AccessibilityUtils.announce(`Journal entry saved: ${title}`);

  saveJournalData();
}

function removeJournalEntry(button) {
  const entryItem = button.closest('.journal-entry-item');
  entryItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  entryItem.style.opacity = '0';
  entryItem.style.transform = 'translateY(-20px)';

  setTimeout(() => {
    entryItem.remove();
    saveJournalData();
    ToastManager.show('Journal entry removed! 🗑️', 'info');
  }, 300);
}



// Data persistence
function saveUserPreferences() {
  localStorage.setItem('pennyPreferences', JSON.stringify(appState.preferences));
}

function loadUserPreferences() {
  const saved = localStorage.getItem('pennyPreferences');
  if (saved) {
    appState.preferences = JSON.parse(saved);
  }
}

function savePlannerData() {
  const plannerData = {};
  ['dance-activities', 'school-activities', 'fun-activities'].forEach(category => {
    const items = Array.from(document.getElementById(category).children).map(li =>
      li.querySelector('span').textContent
    );
    plannerData[category] = items;
  });
  localStorage.setItem('pennyPlanner', JSON.stringify(plannerData));
}

function saveGoalsData() {
  const goals = Array.from(document.getElementById('goals-list').children).map(item => ({
    text: item.querySelector('.goal-text').textContent,
    progress: parseInt(item.querySelector('.goal-progress-fill').style.width) || 0
  }));
  localStorage.setItem('pennyGoals', JSON.stringify(goals));
}

function saveJournalData() {
  const entries = Array.from(document.getElementById('journal-entries').children).map(item => ({
    title: item.querySelector('.journal-entry-title').textContent,
    date: item.querySelector('.journal-entry-date').textContent,
    content: item.querySelector('.journal-entry-content').innerHTML
  }));
  localStorage.setItem('pennyJournal', JSON.stringify(entries));
}

// Load saved data
function loadSavedData() {
  // Load planner data
  const plannerData = JSON.parse(localStorage.getItem('pennyPlanner') || '{}');
  Object.entries(plannerData).forEach(([category, items]) => {
    const list = document.getElementById(category);
    if (list) {
      items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${item}</span>
          <button class="btn btn--sm" onclick="removePlannerItem(this)" aria-label="Remove activity">❌</button>
        `;
        list.appendChild(li);
      });
    }
  });

  // Load goals data
  const goalsData = JSON.parse(localStorage.getItem('pennyGoals') || '[]');
  const goalsList = document.getElementById('goals-list');
  if (goalsList) {
    goalsData.forEach(goal => {
      const goalItem = document.createElement('div');
      goalItem.className = 'goal-item';
      goalItem.innerHTML = `
        <div>
          <div class="goal-text">${goal.text}</div>
          <div class="goal-progress">
            <div class="goal-progress-fill" style="width: ${goal.progress}%"></div>
          </div>
          <div class="goal-percentage">${goal.progress}%</div>
        </div>
        <div class="goal-buttons">
          <button class="goal-btn" onclick="updateGoalProgress(this, 25)">+25%</button>
          <button class="goal-btn" onclick="updateGoalProgress(this, -25)">-25%</button>
          <button class="goal-btn" onclick="removeGoal(this)">🗑️</button>
        </div>
      `;
      goalsList.appendChild(goalItem);
    });
  }

  // Load journal data
  const journalData = JSON.parse(localStorage.getItem('pennyJournal') || '[]');
  const journalEntries = document.getElementById('journal-entries');
  if (journalEntries) {
    journalData.forEach(entry => {
      const entryItem = document.createElement('div');
      entryItem.className = 'journal-entry-item';
      entryItem.innerHTML = `
        <div class="journal-entry-title">${entry.title}</div>
        <div class="journal-entry-date">${entry.date}</div>
        <div class="journal-entry-content">${entry.content}</div>
        <button class="btn btn--sm" onclick="removeJournalEntry(this)">🗑️</button>
      `;
      journalEntries.appendChild(entryItem);
    });
  }
}

// Initialize planner date to today
document.addEventListener('DOMContentLoaded', function () {
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('planner-date');
  if (dateInput) {
    dateInput.value = today;
  }

  // Load saved data after a short delay
  setTimeout(loadSavedData, 500);
});

// Setup quiz initialization
function setupQuiz() {
  const startQuizBtn = document.getElementById('start-quiz-btn');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startSwansQuiz);
  }
}

// Export for global access (if needed)
window.PennysPalace = {
  switchSection,
  startMemoryGame,
  startWordScramble,
  startFactsQuiz,
  addPlannerItem,
  addGoal,
  saveJournalEntry
};