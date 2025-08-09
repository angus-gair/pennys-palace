# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deployment Guidelines

- When I say "deploy", I mean deploy via Docker to Localhost & sometimes production
- NEVER use GitHub Actions for deployment

## Recent Design Updates (2025)

**Penny's Personal Place** has been completely redesigned with a modern, elegant aesthetic while maintaining its playful character. The redesign features:

### Design System
- **Modern Color Palette**: Rose Pink (#E91E63), Deep Purple (#673AB7), and Cyan (#00BCD4) accents
- **Gradient Backgrounds**: Sophisticated gradients throughout the interface
- **Glass Morphism**: Semi-transparent cards with backdrop blur effects
- **Fluid Typography**: Responsive font sizes using clamp() for optimal readability
- **Modern Fonts**: Quicksand, Comfortaa, and Fredoka for playful yet sophisticated typography

### Enhanced Features
- **Theme Toggle**: Light/dark mode switching with smooth transitions
- **Smooth Animations**: Sparkle effects, bounces, shakes, and fade transitions
- **Toast Notifications**: Non-intrusive feedback system
- **Progress Tracking**: Visual progress bars for loading states
- **Enhanced Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Data Persistence**: LocalStorage for planner, goals, and journal entries
- **Interactive Elements**: Hover effects, click animations, and visual feedback

## Commands

### Development Setup

```bash
# No build process required - this is a static HTML/CSS/JS application
# To run locally, simply open index.html in a web browser:
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# Or serve with any static file server:
python -m http.server 8000
# Then navigate to http://localhost:8000

# To regenerate content JSON from the Python script:
python script.py
```

### Docker Deployment

```bash
# Build and run with Docker Compose (recommended)
docker-compose up -d

# The app will be available at http://localhost:8080

# To stop the container:
docker-compose down

# To rebuild after changes:
docker-compose build --no-cache
docker-compose up -d

# Alternative: Using Docker directly
docker build -t pennys-palace .
docker run -d -p 8080:80 --name pennys-palace pennys-palace

# View logs
docker-compose logs -f

# Check container health
docker-compose ps
```

### Testing

This project currently has no automated tests. When adding tests:
- Consider using Jest for JavaScript unit tests
- Use Cypress or Playwright for end-to-end testing
- Test game logic, navigation, and data persistence features

## Architecture Overview

**Penny's Personal Place** is a single-page static web application designed for a young user named Penny. It requires no backend, database, or build process.

### Core Structure

```
├── index.html              # Main HTML structure (uses modern assets)
├── index-modern.html       # Enhanced HTML with accessibility features
├── app.js                  # Original JavaScript functionality
├── app-modern.js           # Enhanced JavaScript with animations & modern features
├── style.css               # Original styling
├── style-modern.css        # Modern design system with glass morphism & gradients
├── penny_app_content.json  # Structured content database
├── script.py               # Content generation script
├── penny-app-concept.md    # Detailed design document
├── Dockerfile              # Container configuration (updated for modern assets)
├── docker-compose.yml      # Orchestration configuration
└── nginx.conf              # Web server configuration
```

### File Versions
- **Current (Modern)**: Uses `style-modern.css` and `app-modern.js` for enhanced experience
- **Legacy**: Original `style.css` and `app.js` files preserved for reference

### Application Sections

1. **Amazing Facts** - Educational content about animals, space, and human body
2. **Go Swans!** - Sydney Swans AFL team information and history
3. **Cooking Fun** - Kid-friendly recipes with step-by-step instructions
4. **Play Games** - Interactive games:
   - Memory Match (card matching game)
   - Word Scramble 
   - Penny's Quiz (trivia questions)
5. **My Tools** - Productivity features:
   - Daily Planner (localStorage persistent)
   - Goal Tracker (localStorage persistent)
   - My Journal (localStorage persistent)

### Key Implementation Details

**Navigation System**: Button-based section switching using `showSection()` function in app.js

**Data Management**: 
- All content stored in `app.js` as JavaScript objects
- Persistent data (planner, goals, journal) uses localStorage
- No external API calls or dependencies

**Game Logic**:
- Memory Match: DOM-based card flipping with match detection
- Word Scramble: Array shuffle algorithm with hint system
- Quiz: Random question selection with score tracking

**Styling Approach**:
- CSS custom properties for theming
- Sydney Swans colors (red: #ED171E, white) as primary palette
- Purple accents (#E6ADD8) for dance/personal touches
- Mobile-responsive design considerations

### Content Management

The `script.py` file generates `penny_app_content.json` which structures all app content. When updating content:
1. Modify the data structures in `script.py`
2. Run `python script.py` to regenerate the JSON
3. Manually update the corresponding data in `app.js`

### localStorage Keys

- `pennyPlanner` - Daily planner tasks
- `pennyGoals` - Goal tracker entries  
- `pennyJournal` - Journal entries

### Future Enhancement Areas (from concept doc)

- Dance tutorial videos section
- Drawing canvas tool
- Weather widget
- Homework helper
- Photo gallery
- Music player for dance practice
- Virtual pet game
- More recipes and facts

When implementing new features, maintain the child-friendly design and ensure all content is appropriate for a young user interested in Sydney Swans, dance, and learning.