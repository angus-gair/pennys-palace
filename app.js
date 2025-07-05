// Application data
const appData = {
  amazing_facts: {
    animals: [
      "Octopuses have 3 hearts and blue blood! 🐙",
      "Tigers have striped skin, not just striped fur! 🐅", 
      "Elephants are the only mammals that can't jump! 🐘",
      "A shrimp's heart is in its head! 🦐",
      "Giraffes only sleep 2 hours a day! 🦒"
    ],
    space: [
      "There are more stars in the sky than grains of sand on a beach! ✨",
      "A day on Venus is longer than a year on Venus! 🪐",
      "You could fit 1 million Earths inside the Sun! ☀️",
      "Sound doesn't travel in space - it's completely silent! 🌌",
      "Astronauts can grow up to 2 inches taller in space! 👨‍🚀"
    ],
    body: [
      "Your heart is about the same size as your fist! ❤️",
      "You have about 10,000 taste buds! 👅",
      "Your brain uses 20% of your body's energy! 🧠",
      "You blink about 17,000 times a day! 👁️",
      "Your bones are 4 times stronger than concrete! 🦴"
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
      "Nick Blakey - Defender 🛡️"
    ],
    fun_facts: [
      "The Sydney Swans were originally from Melbourne! 🏃‍♂️",
      "Their mascot Cyggy loves entertaining fans! 🦢",
      "They're known as 'The Bloods' for their red color! ❤️",
      "They play at the famous Sydney Cricket Ground! 🏟️",
      "The Swans have won 5 premierships! 🏆"
    ]
  },
  recipes: [
    {
      name: "Super Simple Banana Muffins",
      difficulty: "Easy 🌟",
      time: "30 minutes",
      ingredients: [
        "2 ripe bananas (mashed) 🍌",
        "1 cup self-raising flour",
        "1/2 cup milk 🥛",
        "1/4 cup melted butter",
        "1 egg 🥚",
        "2 tablespoons sugar",
        "Optional: chocolate chips! 🍫"
      ],
      instructions: [
        "Preheat oven to 180°C 🔥",
        "Mash bananas in a big bowl 🥣",
        "Mix in egg, milk, and melted butter",
        "Add flour and sugar, stir gently",
        "Add chocolate chips if you want!",
        "Spoon into muffin cases",
        "Bake for 18-20 minutes ⏰",
        "Let cool and enjoy! 🧁"
      ]
    },
    {
      name: "No-Bake Cookie Balls",
      difficulty: "Super Easy 🌟",
      time: "15 minutes + chilling",
      ingredients: [
        "2 cups crushed biscuits 🍪",
        "1/2 cup cocoa powder 🍫",
        "1 can condensed milk 🥛",
        "1 cup desiccated coconut 🥥",
        "Extra coconut for rolling"
      ],
      instructions: [
        "Crush biscuits into fine crumbs",
        "Mix biscuits, cocoa, and coconut",
        "Add condensed milk and mix well",
        "Roll mixture into balls ⚽",
        "Roll balls in extra coconut",
        "Put in fridge for 2 hours ❄️",
        "Enjoy your treats! 🍪"
      ]
    }
  ]
};

// Game data
const gameData = {
  scrambleWords: [
    { word: "DANCE", scrambled: "CENADA" },
    { word: "BALLET", scrambled: "TLABEL" },
    { word: "FOOTBALL", scrambled: "LLABTOOF" },
    { word: "SYDNEY", scrambled: "DNEYST" },
    { word: "SWANS", scrambled: "SNAWS" },
    { word: "COOKING", scrambled: "GNIKOCO" },
    { word: "RECIPE", scrambled: "PICEOR" },
    { word: "MUFFIN", scrambled: "NIFFUM" }
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
    }
  ],
  memoryCards: [
    "Isaac Heeney", "Errol Gulden", "Chad Warner", "Callum Mills",
    "🦢", "🏈", "❤️", "⭐",
    "Isaac Heeney", "Errol Gulden", "Chad Warner", "Callum Mills",
    "🦢", "🏈", "❤️", "⭐"
  ]
};

// App state
let currentSection = 'amazing-facts';
let gameStates = {
  memory: { score: 0, flipped: [], matched: [] },
  scramble: { score: 0, currentWord: 0 },
  quiz: { score: 0, currentQuestion: 0 }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupNavigation();
  populateContent();
  setupEventListeners();
}

function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetSection = this.dataset.section;
      switchSection(targetSection);
    });
  });
}

function switchSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });

  // Show target section
  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update nav button states
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  const activeButton = document.querySelector(`[data-section="${sectionName}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }

  currentSection = sectionName;
}

function populateContent() {
  populateAmazingFacts();
  populateSwansInfo();
  populateRecipes();
  setupQuiz();
}

function populateAmazingFacts() {
  const categories = ['animals', 'space', 'body'];
  categories.forEach(category => {
    const container = document.getElementById(`${category}-facts`);
    if (container) {
      container.innerHTML = '';
      appData.amazing_facts[category].forEach(fact => {
        const factCard = document.createElement('div');
        factCard.className = 'fact-card';
        factCard.innerHTML = `<p>${fact}</p>`;
        container.appendChild(factCard);
      });
    }
  });
}

function populateSwansInfo() {
  // Populate players
  const playersList = document.getElementById('players-list');
  if (playersList) {
    playersList.innerHTML = '';
    appData.sydney_swans.current_players.forEach(player => {
      const playerItem = document.createElement('div');
      playerItem.className = 'player-item';
      playerItem.textContent = player;
      playersList.appendChild(playerItem);
    });
  }

  // Populate fun facts
  const swansFacts = document.getElementById('swans-facts');
  if (swansFacts) {
    swansFacts.innerHTML = '';
    appData.sydney_swans.fun_facts.forEach(fact => {
      const factItem = document.createElement('div');
      factItem.className = 'swans-fact-item';
      factItem.textContent = fact;
      swansFacts.appendChild(factItem);
    });
  }
}

function populateRecipes() {
  // Populate muffin recipe
  const muffinIngredients = document.getElementById('muffin-ingredients');
  const muffinInstructions = document.getElementById('muffin-instructions');
  
  if (muffinIngredients && muffinInstructions) {
    muffinIngredients.innerHTML = '';
    muffinInstructions.innerHTML = '';
    
    appData.recipes[0].ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      muffinIngredients.appendChild(li);
    });
    
    appData.recipes[0].instructions.forEach(instruction => {
      const li = document.createElement('li');
      li.textContent = instruction;
      muffinInstructions.appendChild(li);
    });
  }

  // Populate cookie recipe
  const cookieIngredients = document.getElementById('cookie-ingredients');
  const cookieInstructions = document.getElementById('cookie-instructions');
  
  if (cookieIngredients && cookieInstructions) {
    cookieIngredients.innerHTML = '';
    cookieInstructions.innerHTML = '';
    
    appData.recipes[1].ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      cookieIngredients.appendChild(li);
    });
    
    appData.recipes[1].instructions.forEach(instruction => {
      const li = document.createElement('li');
      li.textContent = instruction;
      cookieInstructions.appendChild(li);
    });
  }
}

function setupEventListeners() {
  // Random fact button
  const randomFactBtn = document.querySelector('.random-fact-btn');
  if (randomFactBtn) {
    randomFactBtn.addEventListener('click', showRandomFact);
  }

  // Quiz start button
  const startQuizBtn = document.getElementById('start-quiz-btn');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startSwansQuiz);
  }
}

function showRandomFact() {
  const allFacts = [
    ...appData.amazing_facts.animals,
    ...appData.amazing_facts.space,
    ...appData.amazing_facts.body
  ];
  
  const randomFact = allFacts[Math.floor(Math.random() * allFacts.length)];
  showCelebration("Random Fact!", randomFact);
}

function startSwansQuiz() {
  const quizContainer = document.getElementById('quiz-container');
  const questions = [
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
    }
  ];

  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  
  quizContainer.innerHTML = `
    <div class="quiz-question">${randomQuestion.question}</div>
    <div class="quiz-answers">
      ${randomQuestion.options.map((option, index) => 
        `<div class="quiz-answer" onclick="checkSwansAnswer(${index}, ${randomQuestion.correct})">${option}</div>`
      ).join('')}
    </div>
  `;
}

function checkSwansAnswer(selected, correct) {
  const answers = document.querySelectorAll('.quiz-answer');
  answers.forEach((answer, index) => {
    if (index === correct) {
      answer.classList.add('correct');
    } else if (index === selected && index !== correct) {
      answer.classList.add('incorrect');
    }
  });

  setTimeout(() => {
    if (selected === correct) {
      showCelebration("Correct!", "Great job! You know your Swans! 🦢");
    } else {
      showCelebration("Good try!", "Keep learning about the Swans! 🦢");
    }
  }, 1000);
}

// Game functions
function startMemoryGame() {
  const gameArea = document.getElementById('memory-game-area');
  const grid = document.getElementById('memory-grid');
  
  gameArea.style.display = 'block';
  gameStates.memory = { score: 0, flipped: [], matched: [] };
  
  // Shuffle cards
  const shuffled = [...gameData.memoryCards].sort(() => Math.random() - 0.5);
  
  grid.innerHTML = '';
  shuffled.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'memory-card';
    cardElement.dataset.value = card;
    cardElement.dataset.index = index;
    cardElement.textContent = '?';
    cardElement.addEventListener('click', flipCard);
    grid.appendChild(cardElement);
  });
}

function flipCard(event) {
  const card = event.target;
  const index = parseInt(card.dataset.index);
  
  if (gameStates.memory.flipped.length < 2 && !gameStates.memory.flipped.includes(index)) {
    card.textContent = card.dataset.value;
    card.classList.add('flipped');
    gameStates.memory.flipped.push(index);
    
    if (gameStates.memory.flipped.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [first, second] = gameStates.memory.flipped;
  const cards = document.querySelectorAll('.memory-card');
  
  if (cards[first].dataset.value === cards[second].dataset.value) {
    cards[first].classList.add('matched');
    cards[second].classList.add('matched');
    gameStates.memory.matched.push(first, second);
    gameStates.memory.score += 10;
    
    if (gameStates.memory.matched.length === gameData.memoryCards.length) {
      showCelebration("Amazing!", "You matched all the cards! 🎉");
    }
  } else {
    cards[first].textContent = '?';
    cards[second].textContent = '?';
    cards[first].classList.remove('flipped');
    cards[second].classList.remove('flipped');
  }
  
  gameStates.memory.flipped = [];
  document.getElementById('memory-score').textContent = gameStates.memory.score;
}

function startWordScramble() {
  const gameArea = document.getElementById('word-scramble-area');
  gameArea.style.display = 'block';
  
  gameStates.scramble = { score: 0, currentWord: 0 };
  nextScrambleWord();
}

function nextScrambleWord() {
  if (gameStates.scramble.currentWord >= gameData.scrambleWords.length) {
    showCelebration("Congratulations!", "You unscrambled all the words! 🎉");
    return;
  }
  
  const currentWord = gameData.scrambleWords[gameStates.scramble.currentWord];
  document.getElementById('scramble-word').textContent = currentWord.scrambled;
  document.getElementById('scramble-input').value = '';
  document.getElementById('scramble-feedback').textContent = '';
}

function checkScrambleAnswer() {
  const input = document.getElementById('scramble-input');
  const feedback = document.getElementById('scramble-feedback');
  const currentWord = gameData.scrambleWords[gameStates.scramble.currentWord];
  
  if (input.value.toUpperCase() === currentWord.word) {
    feedback.textContent = `Correct! The word is ${currentWord.word}`;
    feedback.className = 'scramble-feedback correct';
    gameStates.scramble.score += 10;
    gameStates.scramble.currentWord++;
    
    setTimeout(nextScrambleWord, 2000);
  } else {
    feedback.textContent = 'Try again!';
    feedback.className = 'scramble-feedback incorrect';
  }
  
  document.getElementById('scramble-score').textContent = gameStates.scramble.score;
}

function startFactsQuiz() {
  const gameArea = document.getElementById('facts-quiz-area');
  gameArea.style.display = 'block';
  
  gameStates.quiz = { score: 0, currentQuestion: 0 };
  nextQuizQuestion();
}

function nextQuizQuestion() {
  if (gameStates.quiz.currentQuestion >= gameData.quizQuestions.length) {
    showCelebration("Quiz Complete!", `You scored ${gameStates.quiz.score} points! 🎉`);
    return;
  }
  
  const question = gameData.quizQuestions[gameStates.quiz.currentQuestion];
  document.getElementById('facts-question').textContent = question.question;
  
  const optionsContainer = document.getElementById('facts-options');
  optionsContainer.innerHTML = '';
  
  question.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'quiz-option';
    optionElement.textContent = option;
    optionElement.onclick = () => checkQuizAnswer(index);
    optionsContainer.appendChild(optionElement);
  });
  
  document.getElementById('facts-feedback').textContent = '';
}

function checkQuizAnswer(selected) {
  const question = gameData.quizQuestions[gameStates.quiz.currentQuestion];
  const feedback = document.getElementById('facts-feedback');
  
  if (selected === question.correct) {
    feedback.textContent = 'Correct!';
    feedback.className = 'quiz-feedback correct';
    gameStates.quiz.score += 10;
  } else {
    feedback.textContent = `Incorrect. The answer is: ${question.options[question.correct]}`;
    feedback.className = 'quiz-feedback incorrect';
  }
  
  gameStates.quiz.currentQuestion++;
  document.getElementById('facts-score').textContent = gameStates.quiz.score;
  
  setTimeout(nextQuizQuestion, 3000);
}

// Tool functions
function addPlannerItem() {
  const date = document.getElementById('planner-date').value;
  const activity = document.getElementById('planner-activity').value;
  
  if (!date || !activity) {
    alert('Please select a date and enter an activity!');
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
  item.textContent = `${date}: ${activity}`;
  categoryList.appendChild(item);
  
  document.getElementById('planner-activity').value = '';
  showCelebration("Added!", "Activity added to your planner! 📅");
}

function addGoal() {
  const goalInput = document.getElementById('goal-input');
  const goalText = goalInput.value.trim();
  
  if (!goalText) {
    alert('Please enter a goal!');
    return;
  }
  
  const goalsList = document.getElementById('goals-list');
  const goalItem = document.createElement('div');
  goalItem.className = 'goal-item';
  goalItem.innerHTML = `
    <div>
      <div>${goalText}</div>
      <div class="goal-progress">
        <div class="goal-progress-fill" style="width: 0%"></div>
      </div>
    </div>
    <div class="goal-buttons">
      <button class="goal-btn" onclick="updateGoalProgress(this, 25)">+25%</button>
      <button class="goal-btn" onclick="updateGoalProgress(this, -25)">-25%</button>
    </div>
  `;
  
  goalsList.appendChild(goalItem);
  goalInput.value = '';
  showCelebration("Goal Set!", "Keep working towards your goal! 🎯");
}

function updateGoalProgress(button, change) {
  const goalItem = button.closest('.goal-item');
  const progressBar = goalItem.querySelector('.goal-progress-fill');
  let currentProgress = parseInt(progressBar.style.width) || 0;
  
  currentProgress = Math.max(0, Math.min(100, currentProgress + change));
  progressBar.style.width = currentProgress + '%';
  
  if (currentProgress >= 100) {
    showCelebration("Goal Achieved!", "Congratulations on reaching your goal! 🏆");
  }
}

function saveJournalEntry() {
  const title = document.getElementById('journal-title').value;
  const entry = document.getElementById('journal-entry').value;
  
  if (!title || !entry) {
    alert('Please enter both a title and journal entry!');
    return;
  }
  
  const entriesList = document.getElementById('journal-entries');
  const entryItem = document.createElement('div');
  entryItem.className = 'journal-entry-item';
  entryItem.innerHTML = `
    <div class="journal-entry-title">${title}</div>
    <div class="journal-entry-date">${new Date().toLocaleDateString()}</div>
    <div class="journal-entry-content">${entry}</div>
  `;
  
  entriesList.insertBefore(entryItem, entriesList.firstChild);
  
  document.getElementById('journal-title').value = '';
  document.getElementById('journal-entry').value = '';
  showCelebration("Entry Saved!", "Your journal entry has been saved! 📝");
}

// Utility functions
function showCelebration(title, message) {
  const overlay = document.createElement('div');
  overlay.className = 'celebration-overlay';
  
  const celebration = document.createElement('div');
  celebration.className = 'celebration';
  celebration.innerHTML = `
    <h3>${title}</h3>
    <p>${message}</p>
    <button class="btn btn--primary" onclick="closeCelebration()">Awesome!</button>
  `;
  
  document.body.appendChild(overlay);
  document.body.appendChild(celebration);
  
  setTimeout(() => {
    overlay.remove();
    celebration.remove();
  }, 3000);
}

function closeCelebration() {
  const overlay = document.querySelector('.celebration-overlay');
  const celebration = document.querySelector('.celebration');
  
  if (overlay) overlay.remove();
  if (celebration) celebration.remove();
}

function printRecipe(recipeId) {
  const recipe = document.getElementById(recipeId);
  const printWindow = window.open('', '_blank');
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Recipe - Penny's Personal Place</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h3 { color: #FF0000; }
          .recipe-meta { margin-bottom: 20px; }
          .difficulty, .time { background: #FFF8DC; padding: 5px 10px; margin-right: 10px; }
          ul, ol { margin: 10px 0; }
          li { margin-bottom: 5px; }
        </style>
      </head>
      <body>
        ${recipe.innerHTML}
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.print();
}

// Setup quiz
function setupQuiz() {
  const startQuizBtn = document.getElementById('start-quiz-btn');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startSwansQuiz);
  }
}

// Initialize planner date to today
document.addEventListener('DOMContentLoaded', function() {
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('planner-date');
  if (dateInput) {
    dateInput.value = today;
  }
});