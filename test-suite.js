/**
 * Automated Test Suite for Penny's Personal Place
 * Uses Puppeteer MCP server for comprehensive UI testing
 */

const testResults = [];
const testConfig = {
  baseUrl: 'file:///mnt/c/Users/gair_/pennys-palace/index-modern.html',
  timeout: 30000,
  screenshotPath: '/mnt/c/Users/gair_/pennys-palace/screenshots'
};

// Test utility functions
function logTest(testName, status, message = '') {
  const result = {
    test: testName,
    status: status,
    message: message,
    timestamp: new Date().toISOString()
  };
  testResults.push(result);
  console.log(`[${status.toUpperCase()}] ${testName}: ${message}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Test suites
const testSuites = {
  
  // Basic functionality tests
  basicTests: [
    {
      name: 'Page loads correctly',
      test: async (page) => {
        await page.goto(testConfig.baseUrl);
        await page.waitForSelector('.main-header', { timeout: 10000 });
        const title = await page.title();
        if (title.includes("Penny's Personal Place")) {
          logTest('Page loads correctly', 'PASS', 'Page title and header loaded');
          return true;
        } else {
          logTest('Page loads correctly', 'FAIL', 'Page title incorrect');
          return false;
        }
      }
    },
    
    {
      name: 'Theme toggle functionality',
      test: async (page) => {
        await page.click('#theme-toggle');
        await sleep(500);
        const dataTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
        if (dataTheme === 'dark') {
          logTest('Theme toggle functionality', 'PASS', 'Theme switched to dark mode');
          return true;
        } else {
          logTest('Theme toggle functionality', 'FAIL', 'Theme toggle not working');
          return false;
        }
      }
    }
  ],

  // Navigation tests
  navigationTests: [
    {
      name: 'Navigation between sections',
      test: async (page) => {
        const sections = ['amazing-facts', 'go-swans', 'cooking-fun', 'play-games', 'my-tools'];
        let allPassed = true;
        
        for (const section of sections) {
          await page.click(`[data-section="${section}"]`);
          await sleep(500);
          const isVisible = await page.isVisible(`#${section}.active`);
          if (!isVisible) {
            logTest('Navigation between sections', 'FAIL', `Section ${section} not active`);
            allPassed = false;
            break;
          }
        }
        
        if (allPassed) {
          logTest('Navigation between sections', 'PASS', 'All sections navigable');
          return true;
        }
        return false;
      }
    },
    
    {
      name: 'Random fact button',
      test: async (page) => {
        await page.click('[data-section="amazing-facts"]');
        await sleep(500);
        await page.click('.random-fact-btn');
        await sleep(1000);
        
        // Check if celebration modal appears
        const modalVisible = await page.isVisible('#celebration-overlay:not(.hidden)');
        if (modalVisible) {
          logTest('Random fact button', 'PASS', 'Random fact modal appears');
          await page.click('#celebration button'); // Close modal
          return true;
        } else {
          logTest('Random fact button', 'FAIL', 'Random fact modal not visible');
          return false;
        }
      }
    }
  ],

  // Game functionality tests
  gameTests: [
    {
      name: 'Memory game initialization',
      test: async (page) => {
        await page.click('[data-section="play-games"]');
        await sleep(500);
        await page.click('button[onclick="startMemoryGame()"]');
        await sleep(1000);
        
        const gameVisible = await page.isVisible('#memory-game-area[style*="block"]');
        const cardsCount = await page.$$eval('.memory-card', cards => cards.length);
        
        if (gameVisible && cardsCount > 0) {
          logTest('Memory game initialization', 'PASS', `Memory game started with ${cardsCount} cards`);
          return true;
        } else {
          logTest('Memory game initialization', 'FAIL', 'Memory game not initialized');
          return false;
        }
      }
    },
    
    {
      name: 'Word scramble game',
      test: async (page) => {
        await page.click('button[onclick="startWordScramble()"]');
        await sleep(1000);
        
        const gameVisible = await page.isVisible('#word-scramble-area[style*="block"]');
        const scrambledWord = await page.textContent('#scramble-word');
        
        if (gameVisible && scrambledWord && scrambledWord.length > 0) {
          logTest('Word scramble game', 'PASS', `Word scramble started with word: ${scrambledWord}`);
          return true;
        } else {
          logTest('Word scramble game', 'FAIL', 'Word scramble not initialized');
          return false;
        }
      }
    },
    
    {
      name: 'Swans quiz functionality',
      test: async (page) => {
        await page.click('[data-section="go-swans"]');
        await sleep(500);
        await page.click('#start-quiz-btn');
        await sleep(1000);
        
        const quizVisible = await page.isVisible('#quiz-container .quiz-question');
        const answersVisible = await page.$$eval('.quiz-answer', answers => answers.length);
        
        if (quizVisible && answersVisible > 0) {
          logTest('Swans quiz functionality', 'PASS', `Quiz started with ${answersVisible} answer options`);
          return true;
        } else {
          logTest('Swans quiz functionality', 'FAIL', 'Quiz not initialized');
          return false;
        }
      }
    }
  ],

  // Tools functionality tests
  toolsTests: [
    {
      name: 'Planner functionality',
      test: async (page) => {
        await page.click('[data-section="my-tools"]');
        await sleep(500);
        
        // Add a planner item
        await page.fill('#planner-activity', 'Test ballet practice');
        await page.click('button[onclick="addPlannerItem(event)"]');
        await sleep(1000);
        
        // Check if item was added
        const plannerItems = await page.$$eval('#fun-activities li', items => items.length);
        if (plannerItems > 0) {
          logTest('Planner functionality', 'PASS', 'Planner item added successfully');
          return true;
        } else {
          logTest('Planner functionality', 'FAIL', 'Planner item not added');
          return false;
        }
      }
    },
    
    {
      name: 'Goal tracker functionality',
      test: async (page) => {
        await page.fill('#goal-input', 'Test goal - improve flexibility');
        await page.click('button[onclick="addGoal(event)"]');
        await sleep(1000);
        
        const goalItems = await page.$$eval('#goals-list .goal-item', items => items.length);
        if (goalItems > 0) {
          logTest('Goal tracker functionality', 'PASS', 'Goal added successfully');
          return true;
        } else {
          logTest('Goal tracker functionality', 'FAIL', 'Goal not added');
          return false;
        }
      }
    },
    
    {
      name: 'Journal functionality',
      test: async (page) => {
        await page.fill('#journal-title-input', 'Test Journal Entry');
        await page.fill('#journal-entry', 'Today I practiced my ballet moves and learned about the Sydney Swans!');
        await page.click('button[onclick="saveJournalEntry(event)"]');
        await sleep(1000);
        
        const journalEntries = await page.$$eval('#journal-entries .journal-entry-item', items => items.length);
        if (journalEntries > 0) {
          logTest('Journal functionality', 'PASS', 'Journal entry saved successfully');
          return true;
        } else {
          logTest('Journal functionality', 'FAIL', 'Journal entry not saved');
          return false;
        }
      }
    }
  ],

  // Content and accessibility tests
  contentTests: [
    {
      name: 'Amazing facts content loads',
      test: async (page) => {
        await page.click('[data-section="amazing-facts"]');
        await sleep(1000);
        
        const animalFacts = await page.$$eval('#animals-facts .fact-card', cards => cards.length);
        const spaceFacts = await page.$$eval('#space-facts .fact-card', cards => cards.length);
        const bodyFacts = await page.$$eval('#body-facts .fact-card', cards => cards.length);
        
        if (animalFacts > 0 && spaceFacts > 0 && bodyFacts > 0) {
          logTest('Amazing facts content loads', 'PASS', `Facts loaded: ${animalFacts + spaceFacts + bodyFacts} total`);
          return true;
        } else {
          logTest('Amazing facts content loads', 'FAIL', 'Facts not loaded properly');
          return false;
        }
      }
    },
    
    {
      name: 'Sydney Swans content loads',
      test: async (page) => {
        await page.click('[data-section="go-swans"]');
        await sleep(1000);
        
        const players = await page.$$eval('#players-list .player-item', items => items.length);
        const swansFacts = await page.$$eval('#swans-facts .swans-fact-item', items => items.length);
        
        if (players > 0 && swansFacts > 0) {
          logTest('Sydney Swans content loads', 'PASS', `Players: ${players}, Facts: ${swansFacts}`);
          return true;
        } else {
          logTest('Sydney Swans content loads', 'FAIL', 'Swans content not loaded');
          return false;
        }
      }
    },
    
    {
      name: 'Recipe content loads',
      test: async (page) => {
        await page.click('[data-section="cooking-fun"]');
        await sleep(1000);
        
        const muffinIngredients = await page.$$eval('#muffin-ingredients li', items => items.length);
        const cookieIngredients = await page.$$eval('#cookie-ingredients li', items => items.length);
        
        if (muffinIngredients > 0 && cookieIngredients > 0) {
          logTest('Recipe content loads', 'PASS', `Recipe ingredients loaded: ${muffinIngredients + cookieIngredients}`);
          return true;
        } else {
          logTest('Recipe content loads', 'FAIL', 'Recipe content not loaded');
          return false;
        }
      }
    }
  ],

  // Accessibility tests
  accessibilityTests: [
    {
      name: 'ARIA labels present',
      test: async (page) => {
        const ariaLabels = await page.$$eval('[aria-label]', elements => elements.length);
        const ariaRoles = await page.$$eval('[role]', elements => elements.length);
        
        if (ariaLabels > 0 && ariaRoles > 0) {
          logTest('ARIA labels present', 'PASS', `ARIA labels: ${ariaLabels}, Roles: ${ariaRoles}`);
          return true;
        } else {
          logTest('ARIA labels present', 'FAIL', 'Insufficient ARIA attributes');
          return false;
        }
      }
    },
    
    {
      name: 'Keyboard navigation',
      test: async (page) => {
        // Test tab navigation
        await page.keyboard.press('Tab');
        await sleep(200);
        const focusedElement = await page.evaluate(() => document.activeElement.tagName);
        
        if (focusedElement === 'BUTTON' || focusedElement === 'A') {
          logTest('Keyboard navigation', 'PASS', 'Tab navigation working');
          return true;
        } else {
          logTest('Keyboard navigation', 'FAIL', 'Tab navigation not working');
          return false;
        }
      }
    }
  ],

  // Performance tests
  performanceTests: [
    {
      name: 'Page load performance',
      test: async (page) => {
        const startTime = Date.now();
        await page.goto(testConfig.baseUrl);
        await page.waitForSelector('.main-header');
        const loadTime = Date.now() - startTime;
        
        if (loadTime < 3000) {
          logTest('Page load performance', 'PASS', `Page loaded in ${loadTime}ms`);
          return true;
        } else {
          logTest('Page load performance', 'FAIL', `Page load too slow: ${loadTime}ms`);
          return false;
        }
      }
    },
    
    {
      name: 'Animation performance',
      test: async (page) => {
        await page.click('[data-section="amazing-facts"]');
        await sleep(100);
        await page.click('.random-fact-btn');
        await sleep(1000);
        
        // Check if page is still responsive
        const isResponsive = await page.evaluate(() => {
          const element = document.querySelector('.random-fact-btn');
          return element && element.getBoundingClientRect().width > 0;
        });
        
        if (isResponsive) {
          logTest('Animation performance', 'PASS', 'Animations do not block UI');
          return true;
        } else {
          logTest('Animation performance', 'FAIL', 'Animations may be blocking UI');
          return false;
        }
      }
    }
  ]
};

// Main test runner
async function runTestSuite() {
  console.log('Starting Penny\'s Personal Place Test Suite...');
  console.log('======================================');
  
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  
  // Count total tests
  for (const suite of Object.values(testSuites)) {
    totalTests += suite.length;
  }
  
  console.log(`Total tests to run: ${totalTests}`);
  console.log('');
  
  // Run all test suites
  for (const [suiteName, suite] of Object.entries(testSuites)) {
    console.log(`Running ${suiteName}...`);
    console.log('-'.repeat(30));
    
    for (const testCase of suite) {
      try {
        const result = await testCase.test();
        if (result) {
          passedTests++;
        } else {
          failedTests++;
        }
      } catch (error) {
        logTest(testCase.name, 'ERROR', error.message);
        failedTests++;
      }
    }
    console.log('');
  }
  
  // Generate test report
  console.log('Test Suite Complete!');
  console.log('====================');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${failedTests}`);
  console.log(`Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);
  
  // Return detailed results
  return {
    summary: {
      total: totalTests,
      passed: passedTests,
      failed: failedTests,
      successRate: Math.round((passedTests / totalTests) * 100)
    },
    details: testResults
  };
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runTestSuite, testSuites };
}

// Make available globally
window.PennysPalaceTestSuite = { runTestSuite, testSuites };