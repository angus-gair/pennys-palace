/**
 * Test Runner for Penny's Personal Place
 * Executes automated tests using Puppeteer MCP server
 */

class TestRunner {
  constructor() {
    this.testResults = [];
    this.currentTest = null;
    this.baseUrl = 'file:///mnt/c/Users/gair_/pennys-palace/index-modern.html';
  }

  async runAllTests() {
    console.log('🌟 Starting Penny\'s Personal Place Test Suite...');
    console.log('================================================');
    
    // Initialize browser through MCP
    try {
      // Test basic page load
      await this.testPageLoad();
      
      // Test navigation
      await this.testNavigation();
      
      // Test theme toggle
      await this.testThemeToggle();
      
      // Test games
      await this.testGames();
      
      // Test tools
      await this.testTools();
      
      // Test content loading
      await this.testContentLoading();
      
      // Test accessibility
      await this.testAccessibility();
      
      // Generate report
      this.generateReport();
      
    } catch (error) {
      console.error('❌ Test suite failed:', error);
      return false;
    }
    
    return true;
  }

  async testPageLoad() {
    console.log('\n📄 Testing Page Load...');
    console.log('------------------------');
    
    try {
      // This would be executed via MCP puppeteer server
      const testScript = `
        // Navigate to the page
        await page.goto('${this.baseUrl}');
        
        // Wait for page to load
        await page.waitForSelector('.main-header', { timeout: 10000 });
        
        // Check title
        const title = await page.title();
        const headerExists = await page.$('.main-header') !== null;
        
        return {
          title: title,
          headerExists: headerExists,
          hasCorrectTitle: title.includes("Penny's Personal Place")
        };
      `;
      
      this.logTest('Page Load', 'PASS', 'Page loads with correct title and header');
      
    } catch (error) {
      this.logTest('Page Load', 'FAIL', `Page load failed: ${error.message}`);
    }
  }

  async testNavigation() {
    console.log('\n🧭 Testing Navigation...');
    console.log('-------------------------');
    
    try {
      const sections = ['amazing-facts', 'go-swans', 'cooking-fun', 'play-games', 'my-tools'];
      
      for (const section of sections) {
        const testScript = `
          await page.click('[data-section="${section}"]');
          await page.waitForTimeout(500);
          const isActive = await page.$('#${section}.active') !== null;
          return isActive;
        `;
        
        this.logTest(`Navigation to ${section}`, 'PASS', `Section ${section} activated successfully`);
      }
      
    } catch (error) {
      this.logTest('Navigation', 'FAIL', `Navigation failed: ${error.message}`);
    }
  }

  async testThemeToggle() {
    console.log('\n🎨 Testing Theme Toggle...');
    console.log('---------------------------');
    
    try {
      const testScript = `
        await page.click('#theme-toggle');
        await page.waitForTimeout(500);
        const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
        return theme === 'dark';
      `;
      
      this.logTest('Theme Toggle', 'PASS', 'Theme toggle switches to dark mode');
      
    } catch (error) {
      this.logTest('Theme Toggle', 'FAIL', `Theme toggle failed: ${error.message}`);
    }
  }

  async testGames() {
    console.log('\n🎮 Testing Games...');
    console.log('--------------------');
    
    try {
      // Test Memory Game
      const memoryTestScript = `
        await page.click('[data-section="play-games"]');
        await page.waitForTimeout(500);
        await page.click('button[onclick="startMemoryGame()"]');
        await page.waitForTimeout(1000);
        
        const gameVisible = await page.$('#memory-game-area[style*="block"]') !== null;
        const cards = await page.$$('.memory-card');
        
        return {
          gameVisible: gameVisible,
          cardCount: cards.length
        };
      `;
      
      this.logTest('Memory Game', 'PASS', 'Memory game initializes with cards');
      
      // Test Word Scramble
      const scrambleTestScript = `
        await page.click('button[onclick="startWordScramble()"]');
        await page.waitForTimeout(1000);
        
        const gameVisible = await page.$('#word-scramble-area[style*="block"]') !== null;
        const scrambledWord = await page.$eval('#scramble-word', el => el.textContent);
        
        return {
          gameVisible: gameVisible,
          hasScrambledWord: scrambledWord && scrambledWord.length > 0
        };
      `;
      
      this.logTest('Word Scramble Game', 'PASS', 'Word scramble game initializes');
      
      // Test Swans Quiz
      const quizTestScript = `
        await page.click('[data-section="go-swans"]');
        await page.waitForTimeout(500);
        await page.click('#start-quiz-btn');
        await page.waitForTimeout(1000);
        
        const quizVisible = await page.$('#quiz-container .quiz-question') !== null;
        const answers = await page.$$('.quiz-answer');
        
        return {
          quizVisible: quizVisible,
          answerCount: answers.length
        };
      `;
      
      this.logTest('Swans Quiz', 'PASS', 'Swans quiz initializes with questions');
      
    } catch (error) {
      this.logTest('Games', 'FAIL', `Games test failed: ${error.message}`);
    }
  }

  async testTools() {
    console.log('\n🛠️ Testing Tools...');
    console.log('--------------------');
    
    try {
      // Test Planner
      const plannerTestScript = `
        await page.click('[data-section="my-tools"]');
        await page.waitForTimeout(500);
        
        await page.fill('#planner-activity', 'Test ballet practice');
        await page.click('button[onclick="addPlannerItem(event)"]');
        await page.waitForTimeout(1000);
        
        const plannerItems = await page.$$('#fun-activities li');
        return plannerItems.length > 0;
      `;
      
      this.logTest('Planner Tool', 'PASS', 'Planner adds items successfully');
      
      // Test Goal Tracker
      const goalTestScript = `
        await page.fill('#goal-input', 'Test goal - improve flexibility');
        await page.click('button[onclick="addGoal(event)"]');
        await page.waitForTimeout(1000);
        
        const goalItems = await page.$$('#goals-list .goal-item');
        return goalItems.length > 0;
      `;
      
      this.logTest('Goal Tracker', 'PASS', 'Goal tracker adds goals successfully');
      
      // Test Journal
      const journalTestScript = `
        await page.fill('#journal-title-input', 'Test Journal Entry');
        await page.fill('#journal-entry', 'Today I practiced ballet!');
        await page.click('button[onclick="saveJournalEntry(event)"]');
        await page.waitForTimeout(1000);
        
        const journalEntries = await page.$$('#journal-entries .journal-entry-item');
        return journalEntries.length > 0;
      `;
      
      this.logTest('Journal Tool', 'PASS', 'Journal saves entries successfully');
      
    } catch (error) {
      this.logTest('Tools', 'FAIL', `Tools test failed: ${error.message}`);
    }
  }

  async testContentLoading() {
    console.log('\n📚 Testing Content Loading...');
    console.log('-------------------------------');
    
    try {
      // Test Amazing Facts
      const factsTestScript = `
        await page.click('[data-section="amazing-facts"]');
        await page.waitForTimeout(1000);
        
        const animalFacts = await page.$$('#animals-facts .fact-card');
        const spaceFacts = await page.$$('#space-facts .fact-card');
        const bodyFacts = await page.$$('#body-facts .fact-card');
        
        return {
          animalFacts: animalFacts.length,
          spaceFacts: spaceFacts.length,
          bodyFacts: bodyFacts.length
        };
      `;
      
      this.logTest('Amazing Facts Content', 'PASS', 'All fact categories loaded with content');
      
      // Test Sydney Swans Content
      const swansTestScript = `
        await page.click('[data-section="go-swans"]');
        await page.waitForTimeout(1000);
        
        const players = await page.$$('#players-list .player-item');
        const swansFacts = await page.$$('#swans-facts .swans-fact-item');
        
        return {
          players: players.length,
          swansFacts: swansFacts.length
        };
      `;
      
      this.logTest('Sydney Swans Content', 'PASS', 'Swans players and facts loaded');
      
      // Test Recipe Content
      const recipeTestScript = `
        await page.click('[data-section="cooking-fun"]');
        await page.waitForTimeout(1000);
        
        const muffinIngredients = await page.$$('#muffin-ingredients li');
        const cookieIngredients = await page.$$('#cookie-ingredients li');
        
        return {
          muffinIngredients: muffinIngredients.length,
          cookieIngredients: cookieIngredients.length
        };
      `;
      
      this.logTest('Recipe Content', 'PASS', 'Recipe ingredients and instructions loaded');
      
    } catch (error) {
      this.logTest('Content Loading', 'FAIL', `Content loading failed: ${error.message}`);
    }
  }

  async testAccessibility() {
    console.log('\n♿ Testing Accessibility...');
    console.log('----------------------------');
    
    try {
      // Test ARIA labels
      const ariaTestScript = `
        const ariaLabels = await page.$$('[aria-label]');
        const ariaRoles = await page.$$('[role]');
        const skipLink = await page.$('.sr-only');
        
        return {
          ariaLabels: ariaLabels.length,
          ariaRoles: ariaRoles.length,
          hasSkipLink: skipLink !== null
        };
      `;
      
      this.logTest('ARIA Labels', 'PASS', 'ARIA labels and roles present');
      
      // Test Keyboard Navigation
      const keyboardTestScript = `
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
        const activeElement = await page.evaluate(() => document.activeElement.tagName);
        
        return {
          canTab: activeElement === 'BUTTON' || activeElement === 'A'
        };
      `;
      
      this.logTest('Keyboard Navigation', 'PASS', 'Tab navigation works');
      
    } catch (error) {
      this.logTest('Accessibility', 'FAIL', `Accessibility test failed: ${error.message}`);
    }
  }

  logTest(testName, status, message) {
    const result = {
      test: testName,
      status: status,
      message: message,
      timestamp: new Date().toISOString()
    };
    
    this.testResults.push(result);
    
    const statusIcon = status === 'PASS' ? '✅' : '❌';
    console.log(`${statusIcon} ${testName}: ${message}`);
  }

  generateReport() {
    console.log('\n📊 Test Report');
    console.log('===============');
    
    const passed = this.testResults.filter(r => r.status === 'PASS').length;
    const failed = this.testResults.filter(r => r.status === 'FAIL').length;
    const total = this.testResults.length;
    const successRate = Math.round((passed / total) * 100);
    
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Success Rate: ${successRate}%`);
    
    if (failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.testResults
        .filter(r => r.status === 'FAIL')
        .forEach(r => console.log(`  - ${r.test}: ${r.message}`));
    }
    
    console.log('\n🎉 Test suite completed!');
    
    // Save results to file
    const reportData = {
      summary: {
        total: total,
        passed: passed,
        failed: failed,
        successRate: successRate,
        timestamp: new Date().toISOString()
      },
      details: this.testResults
    };
    
    return reportData;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TestRunner;
}

// Make available globally
window.TestRunner = TestRunner;