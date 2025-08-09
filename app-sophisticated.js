// Sophisticated JavaScript for Penny's Palace

// ===== Navigation System =====
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetSection = e.target.dataset.section;
            showSection(targetSection);
            
            // Update active state with smooth transition
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            e.target.classList.add('active');
            e.target.setAttribute('aria-selected', 'true');
        });
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            section.classList.remove('active');
        }
    });
    
    // Update navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.dataset.section === sectionId) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        }
    });
}

// ===== Data Storage =====
const elegantData = {
    facts: [
        {
            category: 'animals',
            title: 'The Octopus Mind',
            subtitle: 'Nature\'s Problem Solver',
            content: 'Octopi possess nine brains and three hearts, making them one of the most intelligent invertebrates. They can solve complex puzzles and even use tools.',
            icon: '🐙'
        },
        {
            category: 'animals',
            title: 'Elephant Memory',
            subtitle: 'Never Forgets',
            content: 'Elephants can remember other elephants for over 50 years and have been observed showing signs of grief and performing burial rituals.',
            icon: '🐘'
        },
        {
            category: 'space',
            title: 'Diamond Rain',
            subtitle: 'Cosmic Luxury',
            content: 'On Neptune and Uranus, extreme pressure transforms methane into diamonds that rain down through the atmosphere.',
            icon: '💎'
        },
        {
            category: 'space',
            title: 'Silent Universe',
            subtitle: 'The Void\'s Voice',
            content: 'Space is completely silent because sound waves need a medium to travel through, and space is a near-perfect vacuum.',
            icon: '🌌'
        },
        {
            category: 'body',
            title: 'Neural Network',
            subtitle: 'Your Personal Supercomputer',
            content: 'Your brain contains approximately 86 billion neurons, creating more connections than stars in the Milky Way galaxy.',
            icon: '🧠'
        },
        {
            category: 'body',
            title: 'Bone Strength',
            subtitle: 'Natural Engineering',
            content: 'Human bones are four times stronger than concrete, yet incredibly light, making up only 15% of body weight.',
            icon: '🦴'
        }
    ],
    
    recipes: [
        {
            title: 'Lemon Herb Chicken',
            subtitle: 'Mediterranean Delight',
            difficulty: 'Intermediate',
            time: '45 minutes',
            description: 'A sophisticated blend of citrus and herbs creates an elegant main course.',
            ingredients: [
                'Organic chicken breast',
                'Fresh lemons',
                'Rosemary & thyme',
                'Extra virgin olive oil',
                'Sea salt & black pepper'
            ]
        },
        {
            title: 'Chocolate Soufflé',
            subtitle: 'French Elegance',
            difficulty: 'Advanced',
            time: '35 minutes',
            description: 'A classic French dessert that rises to the occasion with rich chocolate flavor.',
            ingredients: [
                'Dark chocolate (70%)',
                'Free-range eggs',
                'Caster sugar',
                'Butter',
                'Vanilla extract'
            ]
        },
        {
            title: 'Garden Caprese',
            subtitle: 'Italian Simplicity',
            difficulty: 'Easy',
            time: '15 minutes',
            description: 'Fresh mozzarella, ripe tomatoes, and basil create a symphony of flavors.',
            ingredients: [
                'Buffalo mozzarella',
                'Heirloom tomatoes',
                'Fresh basil leaves',
                'Balsamic reduction',
                'Extra virgin olive oil'
            ]
        }
    ]
};

// ===== Facts Display =====
function displayFacts(category = 'all') {
    const container = document.getElementById('facts-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const factsToShow = category === 'all' 
        ? elegantData.facts 
        : elegantData.facts.filter(fact => fact.category === category);
    
    factsToShow.forEach((fact, index) => {
        const factCard = createFactCard(fact);
        container.appendChild(factCard);
        
        // Stagger animation
        setTimeout(() => {
            factCard.style.opacity = '1';
            factCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createFactCard(fact) {
    const card = document.createElement('div');
    card.className = 'card fact-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    card.innerHTML = `
        <div class="card-header">
            <span class="fact-icon" style="font-size: 2.5rem; margin-bottom: 1rem; display: block;">${fact.icon}</span>
            <h3 class="card-title">${fact.title}</h3>
            <p class="card-subtitle">${fact.subtitle}</p>
        </div>
        <div class="card-content">
            <p>${fact.content}</p>
        </div>
    `;
    
    return card;
}

function filterFacts(category) {
    displayFacts(category);
}

// ===== Recipes Display =====
function displayRecipes() {
    const container = document.getElementById('recipes-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    elegantData.recipes.forEach((recipe, index) => {
        const recipeCard = createRecipeCard(recipe);
        container.appendChild(recipeCard);
        
        // Stagger animation
        setTimeout(() => {
            recipeCard.style.opacity = '1';
            recipeCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'card recipe-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    const ingredientsList = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
    
    card.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">${recipe.title}</h3>
            <p class="card-subtitle">${recipe.subtitle}</p>
        </div>
        <div class="card-content">
            <p class="recipe-meta">
                <span class="recipe-difficulty">Difficulty: ${recipe.difficulty}</span> • 
                <span class="recipe-time">Time: ${recipe.time}</span>
            </p>
            <p>${recipe.description}</p>
            <h4 style="margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.1rem;">Ingredients:</h4>
            <ul class="elegant-list">${ingredientsList}</ul>
        </div>
    `;
    
    return card;
}

// ===== Productivity Tools =====
class ProductivityTools {
    constructor() {
        this.initPlanner();
        this.initGoals();
        this.initJournal();
    }
    
    initPlanner() {
        const form = document.getElementById('planner-form');
        const taskList = document.getElementById('task-list');
        
        if (!form || !taskList) return;
        
        // Load saved tasks
        const savedTasks = JSON.parse(localStorage.getItem('sophisticatedTasks') || '[]');
        savedTasks.forEach(task => this.addTaskToDOM(task, taskList));
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('task-input');
            const taskText = input.value.trim();
            
            if (taskText) {
                const task = {
                    id: Date.now(),
                    text: taskText,
                    completed: false,
                    createdAt: new Date().toISOString()
                };
                
                this.addTaskToDOM(task, taskList);
                this.saveTasks();
                input.value = '';
            }
        });
    }
    
    addTaskToDOM(task, container) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.id = task.id;
        
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="productivityTools.toggleTask(${task.id})">
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-btn" onclick="productivityTools.deleteTask(${task.id})">×</button>
        `;
        
        container.appendChild(li);
    }
    
    toggleTask(id) {
        const tasks = JSON.parse(localStorage.getItem('sophisticatedTasks') || '[]');
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            localStorage.setItem('sophisticatedTasks', JSON.stringify(tasks));
            
            // Update UI
            const taskElement = document.querySelector(`[data-id="${id}"] span`);
            if (taskElement) {
                taskElement.classList.toggle('completed');
            }
        }
    }
    
    deleteTask(id) {
        let tasks = JSON.parse(localStorage.getItem('sophisticatedTasks') || '[]');
        tasks = tasks.filter(t => t.id !== id);
        localStorage.setItem('sophisticatedTasks', JSON.stringify(tasks));
        
        // Remove from UI with animation
        const taskElement = document.querySelector(`[data-id="${id}"]`);
        if (taskElement) {
            taskElement.style.opacity = '0';
            taskElement.style.transform = 'translateX(20px)';
            setTimeout(() => taskElement.remove(), 300);
        }
    }
    
    saveTasks() {
        const taskElements = document.querySelectorAll('.task-item');
        const tasks = Array.from(taskElements).map(el => ({
            id: parseInt(el.dataset.id),
            text: el.querySelector('span').textContent,
            completed: el.querySelector('input').checked,
            createdAt: new Date().toISOString()
        }));
        
        localStorage.setItem('sophisticatedTasks', JSON.stringify(tasks));
    }
    
    initGoals() {
        const form = document.getElementById('goal-form');
        const goalsList = document.getElementById('goals-list');
        
        if (!form || !goalsList) return;
        
        // Load saved goals
        const savedGoals = JSON.parse(localStorage.getItem('sophisticatedGoals') || '[]');
        savedGoals.forEach(goal => this.addGoalToDOM(goal, goalsList));
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('goal-input');
            const goalText = input.value.trim();
            
            if (goalText) {
                const goal = {
                    id: Date.now(),
                    text: goalText,
                    progress: 0,
                    createdAt: new Date().toISOString()
                };
                
                this.addGoalToDOM(goal, goalsList);
                this.saveGoals();
                input.value = '';
            }
        });
    }
    
    addGoalToDOM(goal, container) {
        const li = document.createElement('li');
        li.className = 'goal-item';
        li.dataset.id = goal.id;
        
        li.innerHTML = `
            <div class="goal-text">${goal.text}</div>
            <div class="goal-progress">
                <input type="range" min="0" max="100" value="${goal.progress}" 
                       onchange="productivityTools.updateGoalProgress(${goal.id}, this.value)">
                <span class="progress-label">${goal.progress}%</span>
            </div>
            <button class="delete-btn" onclick="productivityTools.deleteGoal(${goal.id})">×</button>
        `;
        
        container.appendChild(li);
    }
    
    updateGoalProgress(id, progress) {
        const goals = JSON.parse(localStorage.getItem('sophisticatedGoals') || '[]');
        const goal = goals.find(g => g.id === id);
        if (goal) {
            goal.progress = parseInt(progress);
            localStorage.setItem('sophisticatedGoals', JSON.stringify(goals));
            
            // Update UI
            const progressLabel = document.querySelector(`[data-id="${id}"] .progress-label`);
            if (progressLabel) {
                progressLabel.textContent = `${progress}%`;
            }
        }
    }
    
    deleteGoal(id) {
        let goals = JSON.parse(localStorage.getItem('sophisticatedGoals') || '[]');
        goals = goals.filter(g => g.id !== id);
        localStorage.setItem('sophisticatedGoals', JSON.stringify(goals));
        
        // Remove from UI
        const goalElement = document.querySelector(`[data-id="${id}"]`);
        if (goalElement) {
            goalElement.style.opacity = '0';
            setTimeout(() => goalElement.remove(), 300);
        }
    }
    
    saveGoals() {
        const goalElements = document.querySelectorAll('.goal-item');
        const goals = Array.from(goalElements).map(el => ({
            id: parseInt(el.dataset.id),
            text: el.querySelector('.goal-text').textContent,
            progress: parseInt(el.querySelector('input[type="range"]').value),
            createdAt: new Date().toISOString()
        }));
        
        localStorage.setItem('sophisticatedGoals', JSON.stringify(goals));
    }
    
    initJournal() {
        const form = document.getElementById('journal-form');
        const entriesContainer = document.getElementById('journal-entries');
        
        if (!form || !entriesContainer) return;
        
        // Load saved entries
        const savedEntries = JSON.parse(localStorage.getItem('sophisticatedJournal') || '[]');
        savedEntries.forEach(entry => this.addJournalEntryToDOM(entry, entriesContainer));
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const textarea = document.getElementById('journal-entry');
            const entryText = textarea.value.trim();
            
            if (entryText) {
                const entry = {
                    id: Date.now(),
                    text: entryText,
                    date: new Date().toISOString()
                };
                
                this.addJournalEntryToDOM(entry, entriesContainer);
                this.saveJournalEntries();
                textarea.value = '';
            }
        });
    }
    
    addJournalEntryToDOM(entry, container) {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'journal-entry';
        entryDiv.dataset.id = entry.id;
        
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        entryDiv.innerHTML = `
            <div class="entry-date">${formattedDate}</div>
            <div class="entry-text">${entry.text}</div>
            <button class="delete-btn" onclick="productivityTools.deleteJournalEntry(${entry.id})">×</button>
        `;
        
        container.insertBefore(entryDiv, container.firstChild);
    }
    
    deleteJournalEntry(id) {
        let entries = JSON.parse(localStorage.getItem('sophisticatedJournal') || '[]');
        entries = entries.filter(e => e.id !== id);
        localStorage.setItem('sophisticatedJournal', JSON.stringify(entries));
        
        // Remove from UI
        const entryElement = document.querySelector(`[data-id="${id}"]`);
        if (entryElement) {
            entryElement.style.opacity = '0';
            setTimeout(() => entryElement.remove(), 300);
        }
    }
    
    saveJournalEntries() {
        const entryElements = document.querySelectorAll('.journal-entry');
        const entries = Array.from(entryElements).map(el => ({
            id: parseInt(el.dataset.id),
            text: el.querySelector('.entry-text').textContent,
            date: new Date().toISOString()
        }));
        
        localStorage.setItem('sophisticatedJournal', JSON.stringify(entries));
    }
}

// ===== Initialize Everything =====
let productivityTools;

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    displayFacts();
    displayRecipes();
    productivityTools = new ProductivityTools();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add elegant loading effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Additional Styles via JavaScript =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Task and Goal Lists */
    .task-list, .goals-list {
        list-style: none;
        margin-top: 1.5rem;
    }
    
    .task-item, .goal-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        margin-bottom: 0.75rem;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 0.75rem;
        transition: all 0.3s ease;
    }
    
    .task-item:hover, .goal-item:hover {
        background: rgba(255, 255, 255, 0.8);
        transform: translateX(5px);
    }
    
    .task-item input[type="checkbox"] {
        margin-right: 1rem;
        cursor: pointer;
    }
    
    .task-item span {
        flex: 1;
        transition: all 0.3s ease;
    }
    
    .task-item span.completed {
        text-decoration: line-through;
        opacity: 0.6;
    }
    
    .goal-text {
        flex: 1;
        font-weight: 500;
    }
    
    .goal-progress {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 0 1rem;
    }
    
    .goal-progress input[type="range"] {
        width: 150px;
    }
    
    .progress-label {
        min-width: 45px;
        text-align: right;
        font-weight: 600;
        color: var(--color-dusty-rose);
    }
    
    .delete-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--color-warm-gray-500);
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        transition: all 0.3s ease;
    }
    
    .delete-btn:hover {
        color: var(--color-dusty-rose);
        transform: scale(1.2);
    }
    
    /* Form Styles */
    .elegant-form {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .form-input, .form-textarea {
        flex: 1;
        padding: 0.75rem 1.25rem;
        border: 2px solid var(--color-warm-gray-200);
        border-radius: 2rem;
        font-family: var(--font-sans);
        font-size: 1rem;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.5);
    }
    
    .form-textarea {
        min-height: 100px;
        resize: vertical;
        border-radius: 1rem;
    }
    
    .form-input:focus, .form-textarea:focus {
        outline: none;
        border-color: var(--color-dusty-rose);
        background: rgba(255, 255, 255, 0.8);
    }
    
    /* Journal Entries */
    .journal-entries {
        margin-top: 2rem;
    }
    
    .journal-entry {
        background: rgba(255, 255, 255, 0.6);
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        border-radius: 1rem;
        border-left: 4px solid var(--color-champagne);
        position: relative;
        transition: all 0.3s ease;
    }
    
    .journal-entry:hover {
        background: rgba(255, 255, 255, 0.8);
        transform: translateX(5px);
    }
    
    .entry-date {
        font-size: 0.875rem;
        color: var(--color-warm-gray-600);
        margin-bottom: 0.5rem;
        font-weight: 500;
    }
    
    .entry-text {
        line-height: 1.7;
        color: var(--color-warm-gray-700);
    }
    
    .journal-entry .delete-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    
    /* Elegant List */
    .elegant-list {
        list-style: none;
        padding-left: 0;
    }
    
    .elegant-list li {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 0.5rem;
    }
    
    .elegant-list li::before {
        content: "•";
        position: absolute;
        left: 0;
        color: var(--color-champagne-dark);
        font-weight: bold;
    }
    
    /* Recipe Meta */
    .recipe-meta {
        font-size: 0.875rem;
        color: var(--color-warm-gray-600);
        margin-bottom: 1rem;
    }
`;

document.head.appendChild(styleSheet);

// ===== Recipe Generator System =====
class RecipeGenerator {
    constructor() {
        this.state = {
            ingredients: [],
            preferences: [],
            cuisine: null,
            cookingTime: 'any',
            inputMethod: 'text',
            recipes: [],
            selectedRecipe: null
        };
        
        this.init();
    }
    
    init() {
        // Initialize particles
        this.createParticles();
        
        // Initialize event listeners
        this.initInputMethods();
        this.initIngredientInput();
        this.initPreferences();
        this.initGeneration();
        this.initVoiceInput();
        this.initPhotoUpload();
        this.initModal();
    }
    
    createParticles() {
        const particlesContainer = document.getElementById('rg-particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'rg-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    initInputMethods() {
        const methods = document.querySelectorAll('#recipe-generator .rg-input-method');
        const textContainer = document.getElementById('rg-text-input-container');
        const voiceBtn = document.getElementById('rg-voice-btn');
        const photoContainer = document.getElementById('rg-photo-upload-container');
        
        methods.forEach(method => {
            method.addEventListener('click', () => {
                methods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');
                this.state.inputMethod = method.dataset.method;
                
                // Show/hide appropriate input
                if (textContainer) textContainer.style.display = this.state.inputMethod === 'text' ? 'block' : 'none';
                if (voiceBtn) voiceBtn.style.display = this.state.inputMethod === 'voice' ? 'block' : 'none';
                if (photoContainer) photoContainer.style.display = this.state.inputMethod === 'photo' ? 'block' : 'none';
            });
        });
    }
    
    initIngredientInput() {
        const input = document.getElementById('rg-ingredient-input');
        if (!input) return;
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                this.addIngredient(input.value.trim());
                input.value = '';
            }
        });
    }
    
    addIngredient(ingredient) {
        if (!this.state.ingredients.includes(ingredient)) {
            this.state.ingredients.push(ingredient);
            this.renderIngredients();
        }
    }
    
    removeIngredient(ingredient) {
        this.state.ingredients = this.state.ingredients.filter(i => i !== ingredient);
        this.renderIngredients();
    }
    
    renderIngredients() {
        const container = document.getElementById('rg-ingredient-tags');
        if (!container) return;
        
        container.innerHTML = this.state.ingredients.map(ingredient => `
            <div class="rg-ingredient-tag">
                ${ingredient}
                <span class="rg-remove" onclick="recipeGenerator.removeIngredient('${ingredient}')">&times;</span>
            </div>
        `).join('');
    }
    
    initPreferences() {
        const pills = document.querySelectorAll('#recipe-generator .rg-preference-pill');
        
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                if (pill.dataset.pref) {
                    pill.classList.toggle('selected');
                    if (pill.classList.contains('selected')) {
                        this.state.preferences.push(pill.dataset.pref);
                    } else {
                        this.state.preferences = this.state.preferences.filter(p => p !== pill.dataset.pref);
                    }
                } else if (pill.dataset.cuisine) {
                    document.querySelectorAll('#recipe-generator [data-cuisine]').forEach(c => c.classList.remove('selected'));
                    pill.classList.add('selected');
                    this.state.cuisine = pill.dataset.cuisine;
                } else if (pill.dataset.time) {
                    document.querySelectorAll('#recipe-generator [data-time]').forEach(t => t.classList.remove('selected'));
                    pill.classList.add('selected');
                    this.state.cookingTime = pill.dataset.time;
                }
            });
        });
    }
    
    initGeneration() {
        const generateBtn = document.getElementById('rg-generate-btn');
        if (!generateBtn) return;
        
        generateBtn.addEventListener('click', async () => {
            if (this.state.ingredients.length === 0) {
                this.showMessage('Please add at least one ingredient!', 'error');
                return;
            }
            
            generateBtn.classList.add('loading');
            generateBtn.innerHTML = '<span>Generating... 🔄</span>';
            
            const loadingContainer = document.getElementById('rg-loading-container');
            const recipesContainer = document.getElementById('rg-recipes-container');
            const messageContainer = document.getElementById('rg-message-container');
            
            if (loadingContainer) loadingContainer.style.display = 'block';
            if (recipesContainer) recipesContainer.innerHTML = '';
            if (messageContainer) messageContainer.innerHTML = '';
            
            try {
                await this.simulateRecipeGeneration();
                this.renderRecipes();
                
                generateBtn.classList.remove('loading');
                generateBtn.innerHTML = '<span>Generate Recipe Ideas ✨</span>';
                if (loadingContainer) loadingContainer.style.display = 'none';
            } catch (error) {
                this.showMessage('Failed to generate recipes. Please try again.', 'error');
                generateBtn.classList.remove('loading');
                generateBtn.innerHTML = '<span>Generate Recipe Ideas ✨</span>';
                if (loadingContainer) loadingContainer.style.display = 'none';
            }
        });
        
        // Add ripple effect
        generateBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'rg-ripple';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }
    
    async simulateRecipeGeneration() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.state.recipes = [
                    {
                        id: 1,
                        title: "Mediterranean Pasta Delight",
                        subtitle: "A fresh and vibrant pasta dish",
                        description: "A light yet satisfying pasta dish featuring fresh tomatoes, garlic, and herbs with a Mediterranean twist.",
                        difficulty: "easy",
                        prepTime: "25 min",
                        servings: "4",
                        ingredients: ["pasta", "tomatoes", "garlic", "olive oil", "basil", "parmesan"],
                        cuisine: "Mediterranean"
                    },
                    {
                        id: 2,
                        title: "Rustic Tomato Soup",
                        subtitle: "Comfort in a bowl",
                        description: "A warming, creamy tomato soup perfect for any day. Made with roasted tomatoes and aromatic herbs.",
                        difficulty: "easy",
                        prepTime: "35 min",
                        servings: "6",
                        ingredients: ["tomatoes", "onions", "garlic", "cream", "basil", "vegetable stock"],
                        cuisine: "American"
                    },
                    {
                        id: 3,
                        title: "Garlic Herb Roasted Vegetables",
                        subtitle: "Colorful and nutritious",
                        description: "A medley of seasonal vegetables roasted to perfection with aromatic garlic and fresh herbs.",
                        difficulty: "easy",
                        prepTime: "40 min",
                        servings: "4",
                        ingredients: ["mixed vegetables", "garlic", "olive oil", "rosemary", "thyme"],
                        cuisine: "International"
                    },
                    {
                        id: 4,
                        title: "Classic Margherita Pizza",
                        subtitle: "Italian tradition at home",
                        description: "Homemade pizza with fresh tomato sauce, mozzarella, and basil - simple yet divine.",
                        difficulty: "medium",
                        prepTime: "45 min",
                        servings: "2-3",
                        ingredients: ["pizza dough", "tomatoes", "mozzarella", "basil", "olive oil"],
                        cuisine: "Italian"
                    },
                    {
                        id: 5,
                        title: "Spicy Garlic Stir-Fry",
                        subtitle: "Quick Asian-inspired dish",
                        description: "A fast and flavorful stir-fry with a kick of spice and aromatic garlic.",
                        difficulty: "medium",
                        prepTime: "20 min",
                        servings: "3",
                        ingredients: ["vegetables", "garlic", "soy sauce", "chili", "sesame oil"],
                        cuisine: "Asian"
                    }
                ];
                resolve();
            }, 2000);
        });
    }
    
    renderRecipes() {
        const container = document.getElementById('rg-recipes-container');
        if (!container) return;
        
        container.innerHTML = this.state.recipes.map((recipe, index) => `
            <div class="rg-recipe-card" style="animation-delay: ${index * 0.1}s">
                <div class="rg-recipe-header">
                    <h3 class="rg-recipe-title">${recipe.title}</h3>
                    <p class="rg-recipe-subtitle">${recipe.subtitle}</p>
                </div>
                <div class="rg-recipe-body">
                    <div class="rg-recipe-meta">
                        <div class="rg-meta-item">
                            <div class="rg-meta-icon">⏱</div>
                            <span>${recipe.prepTime}</span>
                        </div>
                        <div class="rg-meta-item">
                            <div class="rg-meta-icon">👥</div>
                            <span>${recipe.servings} servings</span>
                        </div>
                        <div class="rg-difficulty-badge rg-difficulty-${recipe.difficulty}">
                            ${recipe.difficulty}
                        </div>
                    </div>
                    <p class="rg-recipe-description">${recipe.description}</p>
                    <button class="rg-select-recipe-btn" onclick="recipeGenerator.selectRecipe(${recipe.id})">
                        View Full Recipe →
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    async selectRecipe(recipeId) {
        this.state.selectedRecipe = this.state.recipes.find(r => r.id === recipeId);
        
        const modal = document.getElementById('rg-recipe-modal');
        const titleEl = document.getElementById('rg-modal-recipe-title');
        const subtitleEl = document.getElementById('rg-modal-recipe-subtitle');
        const bodyEl = document.getElementById('rg-modal-body');
        
        if (!modal || !titleEl || !subtitleEl || !bodyEl) return;
        
        // Show modal
        modal.style.display = 'block';
        titleEl.textContent = this.state.selectedRecipe.title;
        subtitleEl.textContent = this.state.selectedRecipe.subtitle;
        
        // Show loading in modal
        bodyEl.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div class="rg-cooking-animation" style="margin: 0 auto;">
                    <div class="rg-pot"></div>
                    <div class="rg-steam"></div>
                </div>
                <p style="margin-top: 20px;">Loading detailed recipe...</p>
            </div>
        `;
        
        // Simulate API call for detailed instructions
        await this.loadDetailedRecipe();
    }
    
    async loadDetailedRecipe() {
        setTimeout(() => {
            const detailedRecipe = {
                ingredients: [
                    "400g pasta (penne or fusilli)",
                    "6 large ripe tomatoes, diced",
                    "4 cloves garlic, minced",
                    "1/4 cup extra virgin olive oil",
                    "1 cup fresh basil leaves",
                    "1 cup grated Parmesan cheese",
                    "Salt and pepper to taste",
                    "1 tsp dried oregano"
                ],
                instructions: [
                    "Bring a large pot of salted water to boil. Add pasta and cook according to package directions until al dente.",
                    "While pasta cooks, heat olive oil in a large skillet over medium heat. Add minced garlic and sauté for 1-2 minutes until fragrant but not browned.",
                    "Add diced tomatoes to the skillet. Season with salt, pepper, and oregano. Cook for 10-12 minutes, stirring occasionally, until tomatoes break down into a chunky sauce.",
                    "Tear half the basil leaves and add to the tomato sauce. Stir and cook for another minute.",
                    "Drain pasta, reserving 1 cup of pasta water. Add drained pasta to the skillet with tomato sauce.",
                    "Toss pasta with the sauce, adding pasta water a little at a time until you reach desired consistency.",
                    "Remove from heat. Add half the Parmesan cheese and toss to combine.",
                    "Serve immediately, garnished with remaining basil leaves and Parmesan cheese. Drizzle with extra olive oil if desired."
                ],
                tips: [
                    "Use San Marzano tomatoes for the best flavor",
                    "Don't overcook the garlic - it should be fragrant but not brown",
                    "Save some pasta water - its starch helps the sauce adhere to the pasta",
                    "Fresh basil is key - add it at the end to preserve its flavor"
                ],
                nutritionPerServing: {
                    calories: 420,
                    protein: "15g",
                    carbs: "65g",
                    fat: "12g",
                    fiber: "4g"
                }
            };
            
            this.renderDetailedRecipe(detailedRecipe);
        }, 1500);
    }
    
    renderDetailedRecipe(recipe) {
        const bodyEl = document.getElementById('rg-modal-body');
        if (!bodyEl) return;
        
        bodyEl.innerHTML = `
            <div class="rg-ingredients-list">
                <h3>Ingredients</h3>
                <ul>
                    ${recipe.ingredients.map(ing => `
                        <li>
                            <div class="rg-ingredient-check" onclick="recipeGenerator.toggleIngredientCheck(this)"></div>
                            ${ing}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="rg-instructions">
                <h3>Instructions</h3>
                ${recipe.instructions.map((step, index) => `
                    <div class="rg-instruction-step">
                        <div class="rg-step-number">${index + 1}</div>
                        <div class="rg-step-content">${step}</div>
                    </div>
                `).join('')}
            </div>
            
            ${recipe.tips ? `
                <div class="rg-tips" style="background: #fef3c7; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h3 style="color: #92400e; margin-bottom: 15px;">Pro Tips</h3>
                    <ul style="list-style: none; color: #92400e;">
                        ${recipe.tips.map(tip => `<li style="margin-bottom: 10px;">💡 ${tip}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${recipe.nutritionPerServing ? `
                <div class="rg-nutrition" style="background: #f3f4f6; padding: 20px; border-radius: 12px;">
                    <h3 style="margin-bottom: 15px;">Nutrition per Serving</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 15px;">
                        <div><strong>Calories:</strong> ${recipe.nutritionPerServing.calories}</div>
                        <div><strong>Protein:</strong> ${recipe.nutritionPerServing.protein}</div>
                        <div><strong>Carbs:</strong> ${recipe.nutritionPerServing.carbs}</div>
                        <div><strong>Fat:</strong> ${recipe.nutritionPerServing.fat}</div>
                        <div><strong>Fiber:</strong> ${recipe.nutritionPerServing.fiber}</div>
                    </div>
                </div>
            ` : ''}
        `;
    }
    
    toggleIngredientCheck(element) {
        element.classList.toggle('checked');
    }
    
    initVoiceInput() {
        const voiceBtn = document.getElementById('rg-voice-btn');
        if (!voiceBtn) return;
        
        let recognition;
        if ('webkitSpeechRecognition' in window) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const ingredients = transcript.split(/,|and/).map(i => i.trim()).filter(i => i);
                ingredients.forEach(ing => this.addIngredient(ing));
                voiceBtn.classList.remove('recording');
            };
            
            recognition.onerror = () => {
                this.showMessage('Voice recognition failed. Please try again.', 'error');
                voiceBtn.classList.remove('recording');
            };
        }
        
        voiceBtn.addEventListener('click', () => {
            if (recognition) {
                if (voiceBtn.classList.contains('recording')) {
                    recognition.stop();
                    voiceBtn.classList.remove('recording');
                } else {
                    recognition.start();
                    voiceBtn.classList.add('recording');
                }
            } else {
                this.showMessage('Voice input is not supported in your browser.', 'error');
            }
        });
    }
    
    initPhotoUpload() {
        const photoInput = document.getElementById('rg-photo-input');
        const photoContainer = document.getElementById('rg-photo-upload-container');
        
        if (!photoInput || !photoContainer) return;
        
        photoContainer.addEventListener('click', () => {
            photoInput.click();
        });
        
        photoContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            photoContainer.classList.add('dragover');
        });
        
        photoContainer.addEventListener('dragleave', () => {
            photoContainer.classList.remove('dragover');
        });
        
        photoContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            photoContainer.classList.remove('dragover');
            this.handlePhotoUpload(e.dataTransfer.files[0]);
        });
        
        photoInput.addEventListener('change', (e) => {
            this.handlePhotoUpload(e.target.files[0]);
        });
    }
    
    async handlePhotoUpload(file) {
        if (!file || !file.type.startsWith('image/')) {
            this.showMessage('Please upload a valid image file.', 'error');
            return;
        }
        
        this.showMessage('Analyzing image... (Note: In production, this would use GPT-4o mini vision API)', 'success');
        
        // Simulate image analysis
        setTimeout(() => {
            const simulatedIngredients = ['tomatoes', 'onions', 'garlic', 'pasta', 'cheese'];
            simulatedIngredients.forEach(ing => this.addIngredient(ing));
            this.showMessage('Image analyzed! Ingredients detected and added.', 'success');
        }, 2000);
    }
    
    initModal() {
        const modal = document.getElementById('rg-recipe-modal');
        if (!modal) return;
        
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                this.closeModal();
            }
        });
    }
    
    closeModal() {
        const modal = document.getElementById('rg-recipe-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    showMessage(message, type) {
        const container = document.getElementById('rg-message-container');
        if (!container) return;
        
        container.innerHTML = `<div class="rg-${type}-message">${message}</div>`;
        setTimeout(() => {
            container.innerHTML = '';
        }, 5000);
    }
}

// Global function for modal close
function closeRGModal() {
    if (window.recipeGenerator) {
        window.recipeGenerator.closeModal();
    }
}

// Initialize recipe generator when DOM is loaded
let recipeGenerator;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize recipe generator after a small delay to ensure all elements are ready
    setTimeout(() => {
        recipeGenerator = new RecipeGenerator();
        window.recipeGenerator = recipeGenerator; // Make it globally accessible
    }, 500);
});