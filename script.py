# Let me create a comprehensive content framework for Penny's web app
import json

# Create the web app content structure
penny_app_content = {
    "app_name": "Penny's Personal Place",
    "tagline": "Fun, Facts, Food & More!",
    
    "sections": {
        "fun_facts_blog": {
            "title": "Did You Know? - Penny's Amazing Facts",
            "content": [
                {
                    "title": "Amazing Animal Facts",
                    "facts": [
                        "Octopuses have 3 hearts and blue blood! 🐙",
                        "Tigers have striped skin, not just striped fur! 🐅",
                        "Elephants are the only mammals that can't jump! 🐘",
                        "A shrimp's heart is in its head! 🦐",
                        "Giraffes only sleep 2 hours a day! 🦒"
                    ]
                },
                {
                    "title": "Cool Space Facts",
                    "facts": [
                        "There are more stars in the sky than grains of sand on a beach! ✨",
                        "A day on Venus is longer than a year on Venus! 🪐",
                        "You could fit 1 million Earths inside the Sun! ☀️",
                        "Sound doesn't travel in space - it's completely silent! 🌌",
                        "Astronauts can grow up to 2 inches taller in space! 👨‍🚀"
                    ]
                },
                {
                    "title": "Surprising Body Facts",
                    "facts": [
                        "Your heart is about the same size as your fist! ❤️",
                        "You have about 10,000 taste buds! 👅",
                        "Your brain uses 20% of your body's energy! 🧠",
                        "You blink about 17,000 times a day! 👁️",
                        "Your bones are 4 times stronger than concrete! 🦴"
                    ]
                }
            ]
        },
        
        "sydney_swans_section": {
            "title": "Go Swans! - All About Penny's Team",
            "content": {
                "team_info": {
                    "nickname": "The Swans, The Bloods",
                    "colors": "Red and White",
                    "home_ground": "Sydney Cricket Ground (SCG)",
                    "mascot": "Cyggy the Swan",
                    "founded": "1874 (as South Melbourne)",
                    "premierships": ["1909", "1918", "1933", "2005", "2012"]
                },
                "fun_swans_facts": [
                    "The Sydney Swans were originally called South Melbourne and moved to Sydney in 1982! 🏃‍♂️",
                    "Their mascot Cyggy is a friendly swan who loves entertaining fans! 🦢",
                    "The team colors are red and white, known as 'The Bloods'! ❤️",
                    "They play at the famous Sydney Cricket Ground! 🏟️",
                    "The Swans have won 5 premierships throughout their history! 🏆",
                    "Isaac Heeney and Errol Gulden are two of their current star players! ⭐"
                ],
                "current_season": "2025 season starts March 7 against Hawthorn",
                "famous_players": [
                    "Isaac Heeney - Forward/Midfielder",
                    "Errol Gulden - Midfielder", 
                    "Chad Warner - Midfielder",
                    "Callum Mills - Captain",
                    "Nick Blakey - Defender"
                ]
            }
        },
        
        "cooking_recipes": {
            "title": "Penny's Kitchen Adventures",
            "recipes": [
                {
                    "name": "Super Simple Banana Muffins",
                    "difficulty": "Easy 🌟",
                    "time": "30 minutes",
                    "ingredients": [
                        "2 ripe bananas (mashed)",
                        "1 cup self-raising flour",
                        "1/2 cup milk",
                        "1/4 cup melted butter",
                        "1 egg",
                        "2 tablespoons sugar",
                        "Optional: chocolate chips!"
                    ],
                    "instructions": [
                        "Preheat oven to 180°C",
                        "Mash bananas in a big bowl",
                        "Mix in egg, milk, and melted butter",
                        "Add flour and sugar, stir gently",
                        "Add chocolate chips if you want!",
                        "Spoon into muffin cases",
                        "Bake for 18-20 minutes",
                        "Let cool and enjoy! 🧁"
                    ]
                },
                {
                    "name": "No-Bake Cookie Balls",
                    "difficulty": "Super Easy 🌟",
                    "time": "15 minutes + chilling",
                    "ingredients": [
                        "2 cups crushed biscuits (like Marie or Arrowroot)",
                        "1/2 cup cocoa powder",
                        "1 can condensed milk",
                        "1 cup desiccated coconut",
                        "Extra coconut for rolling"
                    ],
                    "instructions": [
                        "Crush biscuits into fine crumbs",
                        "Mix biscuits, cocoa, and coconut in a bowl",
                        "Add condensed milk and mix well",
                        "Roll mixture into balls",
                        "Roll balls in extra coconut",
                        "Put in fridge for 2 hours",
                        "Enjoy your delicious treats! 🍪"
                    ]
                }
            ]
        },
        
        "games": {
            "title": "Penny's Fun Games",
            "games": [
                {
                    "name": "Swans Memory Challenge",
                    "description": "Test your memory with Sydney Swans players and facts!",
                    "type": "Memory Game",
                    "how_to_play": "Click cards to find matching pairs of Swans players and facts. Remember where each card is!"
                },
                {
                    "name": "Word Scramble Adventure",
                    "description": "Unscramble words related to dance, AFL, and fun facts!",
                    "type": "Word Game", 
                    "how_to_play": "Look at the scrambled letters and try to spell the correct word. Get hints if you need help!"
                },
                {
                    "name": "Fun Facts Quiz",
                    "description": "How many amazing facts do you know?",
                    "type": "Quiz Game",
                    "how_to_play": "Answer questions about animals, space, and the human body. See how many you can get right!"
                }
            ]
        },
        
        "useful_tools": {
            "title": "Penny's Helpful Tools",
            "tools": [
                {
                    "name": "Daily Planner",
                    "description": "Keep track of your dance classes, school work, and fun activities!",
                    "features": [
                        "Add dance classes with Emma",
                        "Track homework and school projects", 
                        "Plan fun activities and adventures",
                        "Set reminders for important things"
                    ]
                },
                {
                    "name": "Goal Tracker",
                    "description": "Set and achieve your dancing and learning goals!",
                    "features": [
                        "Set dance technique goals",
                        "Track reading progress",
                        "Monitor AFL knowledge growth",
                        "Celebrate achievements with fun rewards"
                    ]
                },
                {
                    "name": "Creative Journal",
                    "description": "Write about your day, draw pictures, and save memories!",
                    "features": [
                        "Daily diary entries",
                        "Upload photos from dance class",
                        "Draw and doodle",
                        "Create digital scrapbook pages"
                    ]
                }
            ]
        }
    },
    
    "design_elements": {
        "color_scheme": {
            "primary": "Sydney Swans red (#FF0000)",
            "secondary": "Pure white (#FFFFFF)", 
            "accent": "Soft pink for dance elements (#FFB6C1)",
            "background": "Light cream (#FFF8DC)"
        },
        "imagery": [
            "Sydney Swans logo and colors",
            "Dance-related icons (ballet shoes, music notes)",
            "Fun cartoon animals for facts section",
            "Cooking utensils and food illustrations",
            "Stars and space elements"
        ],
        "fonts": {
            "headers": "Playful, rounded sans-serif",
            "body": "Clean, readable sans-serif",
            "accent": "Fun script font for special elements"
        }
    }
}

# Save the content structure
with open('penny_app_content.json', 'w') as f:
    json.dump(penny_app_content, f, indent=2)

print("✅ Created comprehensive content framework for Penny's web app!")
print("\n📋 App Structure:")
print("1. Fun Facts Blog - Amazing facts about animals, space, and the human body")
print("2. Sydney Swans Section - All about her favorite AFL team")
print("3. Cooking Recipes - 2 kid-friendly recipes she can make")
print("4. Fun Games - Memory, word scramble, and quiz games") 
print("5. Useful Tools - Daily planner, goal tracker, and creative journal")
print("\n🎨 Design inspired by Sydney Swans colors with dance elements!")