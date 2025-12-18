// app.js - AI Fitness Coach Dashboard JavaScript

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateCurrentDate();
    initializeCharts();
    setupChatFunctionality();
});

function initializeApp() {
    console.log('AI Fitness Coach Dashboard initialized');

    // Set up initial state
    updateHydrationProgress();
    setupWorkoutTimers();
    animateProgressBars();

    // Initialize authentication
    initializeAuth();
    setupAuthListeners();
    setupUserDropdown();
}

// Handle navigation based on clicked menu item
function handleNavigation(navItem) {
    const navText = navItem.querySelector('span').textContent.toLowerCase();

    // Close any open modals
    closeLoginModal();

    // Handle different navigation items
    switch(navText) {
        case 'dashboard':
            showDashboard();
            break;
        case 'all workouts':
        case 'cardio':
        case 'strength':
        case 'yoga & flexibility':
            showWorkouts(navText);
            break;
        case 'meal plans':
        case 'recipes':
        case 'hydration':
        case 'diet preferences':
            showDietPlans(navText);
            break;
        case 'track metrics':
        case 'achievements':
        case 'history':
        case 'goals':
            showProgress(navText);
            break;
        case 'profile':
        case 'notifications':
        case 'preferences':
        case 'app settings':
            showSettings(navText);
            break;
        default:
            // For section headers, expand the section
            break;
    }
}

function showDashboard() {
    // Show the main dashboard content
    document.querySelector('.main-content').style.display = 'block';
    showNotification('Dashboard loaded', 'info');
}

function showWorkouts(section) {
    // Define workout data based on section
    const workoutData = {
        'all workouts': {
            title: 'All Workouts',
            workouts: [
                { name: 'HIIT Blast', duration: '30 min', intensity: 'high', calories: 400, description: 'High-intensity interval training with cardio bursts' },
                { name: 'Strength Circuit', duration: '45 min', intensity: 'medium', calories: 350, description: 'Full body strength training with compound movements' },
                { name: 'Yoga Flow', duration: '20 min', intensity: 'low', calories: 150, description: 'Gentle yoga sequence for flexibility and recovery' },
                { name: 'Cardio Burn', duration: '25 min', intensity: 'medium', calories: 280, description: 'Steady-state cardio for endurance building' },
                { name: 'Full Body Challenge', duration: '50 min', intensity: 'high', calories: 500, description: 'Comprehensive workout targeting all muscle groups' },
                { name: 'Core Crusher', duration: '15 min', intensity: 'medium', calories: 200, description: 'Ab-focused workout for core strength' },
                { name: 'Upper Body Power', duration: '35 min', intensity: 'high', calories: 320, description: 'Strength training for arms, chest, and back' },
                { name: 'Lower Body Burn', duration: '40 min', intensity: 'high', calories: 380, description: 'Leg and glute focused strength training' }
            ]
        },
        'cardio': {
            title: 'Cardio Workouts',
            workouts: [
                { name: 'Running Intervals', duration: '35 min', intensity: 'high', calories: 420, description: 'Alternating between sprint and jog intervals' },
                { name: 'Cycling HIIT', duration: '30 min', intensity: 'high', calories: 380, description: 'High-intensity cycling with resistance changes' },
                { name: 'Rowing Challenge', duration: '25 min', intensity: 'medium', calories: 300, description: 'Full body cardio workout using rowing machine' },
                { name: 'Steady State Run', duration: '45 min', intensity: 'medium', calories: 350, description: 'Consistent pace running for endurance' },
                { name: 'Dance Cardio', duration: '40 min', intensity: 'medium', calories: 320, description: 'Fun dance-based cardio workout' }
            ]
        },
        'strength': {
            title: 'Strength Workouts',
            workouts: [
                { name: 'Chest & Triceps', duration: '45 min', intensity: 'high', calories: 300, description: 'Focus on push-ups, bench press, and tricep exercises' },
                { name: 'Back & Biceps', duration: '40 min', intensity: 'high', calories: 280, description: 'Pull-ups, rows, and bicep-focused movements' },
                { name: 'Leg Day', duration: '50 min', intensity: 'high', calories: 400, description: 'Squats, deadlifts, lunges, and calf work' },
                { name: 'Shoulders & Arms', duration: '35 min', intensity: 'medium', calories: 250, description: 'Overhead press, lateral raises, and arm curls' },
                { name: 'Compound Movements', duration: '55 min', intensity: 'high', calories: 450, description: 'Multi-joint exercises for maximum efficiency' }
            ]
        },
        'yoga & flexibility': {
            title: 'Yoga & Flexibility',
            workouts: [
                { name: 'Morning Flow', duration: '20 min', intensity: 'low', calories: 100, description: 'Gentle flow to start your day with energy' },
                { name: 'Evening Relax', duration: '25 min', intensity: 'low', calories: 80, description: 'Calming poses for stress relief and recovery' },
                { name: 'Hip Flexibility', duration: '15 min', intensity: 'low', calories: 70, description: 'Targeted hip opening and stretching sequence' },
                { name: 'Spinal Mobility', duration: '18 min', intensity: 'low', calories: 85, description: 'Spine stretching and mobility exercises' },
                { name: 'Full Body Stretch', duration: '30 min', intensity: 'low', calories: 120, description: 'Complete flexibility routine for all muscle groups' }
            ]
        }
    };

    const data = workoutData[section.toLowerCase()] || workoutData['all workouts'];

    // Create and show workouts content
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="section-header">
            <h2>${data.title}</h2>
        </div>
        <div class="content-grid">
            <div class="card">
                <h3>Featured Workouts</h3>
                <div class="workout-list">
                    ${data.workouts.map(workout => `
                        <div class="workout-item">
                            <div class="workout-info">
                                <div class="workout-details">
                                    <div class="workout-header">
                                        <span class="intensity-indicator ${workout.intensity}-intensity"></span>
                                        <span class="workout-name">${workout.name}</span>
                                        <span class="workout-calories">${workout.calories} cal</span>
                                    </div>
                                    <div class="workout-meta">
                                        <span class="workout-duration"><i class="fas fa-clock"></i> ${workout.duration}</span>
                                        <span class="workout-desc">${workout.description}</span>
                                    </div>
                                </div>
                            </div>
                            <button class="outline-button" onclick="startWorkout('${workout.name}', ${workout.calories})">Start</button>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="card">
                <h3>Quick Stats</h3>
                <div class="stats-grid">
                    <div class="stat-box">
                        <i class="fas fa-fire"></i>
                        <div>
                            <span class="value">${data.workouts.length}</span>
                            <span class="change">available workouts</span>
                        </div>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-trophy"></i>
                        <div>
                            <span class="value">12</span>
                            <span class="change">workouts this week</span>
                        </div>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-shoe-prints"></i>
                        <div>
                            <span class="value">8,432</span>
                            <span class="change">steps today</span>
                        </div>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-clock"></i>
                        <div>
                            <span class="value">8h 32m</span>
                            <span class="change">active time</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    showNotification(`Loading ${data.title}...`, 'info');
}

// Function to start a workout
function startWorkout(workoutName, calories = null) {
    showNotification(`Starting ${workoutName}...`, 'info');

    // Simulate workout start
    setTimeout(() => {
        if (calories) {
            showNotification(`${workoutName} started! Burn approximately ${calories} calories.`, 'success');
        } else {
            showNotification(`${workoutName} started successfully!`, 'success');
        }
    }, 1000);
}

function showDietPlans(section) {
    // Define diet data based on section
    const dietData = {
        'meal plans': {
            title: 'Meal Plans',
            meals: [
                { name: 'Breakfast: Protein Oatmeal', calories: 350, type: 'breakfast', description: 'Oats with protein powder, berries, and almond milk' },
                { name: 'Snack: Greek Yogurt', calories: 150, type: 'snack', description: 'Greek yogurt with honey and nuts' },
                { name: 'Lunch: Grilled Chicken Salad', calories: 420, type: 'lunch', description: 'Chicken breast with mixed greens and vegetables' },
                { name: 'Snack: Apple with Almond Butter', calories: 200, type: 'snack', description: 'Fresh apple with natural almond butter' },
                { name: 'Dinner: Salmon with Quinoa', calories: 520, type: 'dinner', description: 'Baked salmon with quinoa and steamed broccoli' },
                { name: 'Post-Workout Shake', calories: 180, type: 'post-workout', description: 'Protein shake with banana and spinach' },
                { name: 'Veggie Wrap', calories: 320, type: 'lunch', description: 'Whole wheat wrap with vegetables and hummus' }
            ]
        },
        'recipes': {
            title: 'Recipes',
            meals: [
                { name: 'Protein Pancakes', calories: 280, type: 'breakfast', description: 'Fluffy pancakes made with oats and protein powder' },
                { name: 'Quinoa Buddha Bowl', calories: 450, type: 'lunch', description: 'Quinoa with roasted vegetables and tahini dressing' },
                { name: 'Zucchini Noodles with Pesto', calories: 320, type: 'dinner', description: 'Low-carb pasta alternative with fresh pesto' },
                { name: 'Chia Pudding', calories: 220, type: 'dessert', description: 'Overnight chia pudding with berries and nuts' },
                { name: 'Protein Smoothie', calories: 200, type: 'shake', description: 'Green smoothie with spinach, banana, and protein' }
            ]
        },
        'hydration': {
            title: 'Hydration Tracker',
            meals: [
                { name: 'Morning Water', calories: 0, type: 'hydration', description: 'Start your day with 500ml of water' },
                { name: 'Pre-Workout Hydration', calories: 0, type: 'hydration', description: 'Drink 250ml water 30 minutes before exercise' },
                { name: 'During Workout', calories: 0, type: 'hydration', description: 'Sip 150-200ml every 15-20 minutes' },
                { name: 'Post-Workout Rehydration', calories: 0, type: 'hydration', description: 'Replace 150% of fluid lost through sweat' },
                { name: 'Evening Hydration', calories: 0, type: 'hydration', description: 'Keep water intake consistent throughout the day' }
            ]
        },
        'diet preferences': {
            title: 'Diet Preferences',
            meals: [
                { name: 'Vegetarian Options', calories: 0, type: 'preference', description: 'Plant-based meals rich in protein and nutrients' },
                { name: 'Vegan Options', calories: 0, type: 'preference', description: 'Vegan meals with complete amino acid profiles' },
                { name: 'Keto Friendly', calories: 0, type: 'preference', description: 'Low-carb, high-fat meal options' },
                { name: 'Gluten-Free', calories: 0, type: 'preference', description: 'Meals without gluten-containing ingredients' },
                { name: 'High Protein', calories: 0, type: 'preference', description: 'Meals with 25-30g protein per serving' }
            ]
        }
    };

    const data = dietData[section.toLowerCase()] || dietData['meal plans'];

    // Create and show diet plans content
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="section-header">
            <h2>${data.title}</h2>
        </div>
        <div class="content-grid">
            <div class="card">
                <h3>${data.title === 'Hydration Tracker' ? 'Hydration Schedule' : 'Today\'s Meals'}</h3>
                <div class="meal-list">
                    ${data.meals.map(meal => `
                        <div class="meal-item">
                            <div class="meal-info">
                                <div class="meal-details">
                                    <div class="meal-header">
                                        <span class="meal-name">${meal.name}</span>
                                        <span class="meal-calories">${meal.calories} cal</span>
                                    </div>
                                    <div class="meal-meta">
                                        <span class="meal-type">${meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}</span>
                                        <span class="meal-desc">${meal.description}</span>
                                    </div>
                                </div>
                            </div>
                            <button class="outline-button" onclick="showMealDetails('${meal.name.replace(/'/g, "\\'")}')">Details</button>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="card">
                <h3>${data.title === 'Hydration Tracker' ? 'Daily Hydration Goals' : 'Nutrition Goals'}</h3>
                ${data.title === 'Hydration Tracker' ? `
                <div class="progress-item">
                    <div class="progress-info">
                        <span>Water Intake</span>
                        <span>2.1L/3.0L</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" data-target="70"></div>
                    </div>
                </div>
                <div class="progress-item">
                    <div class="progress-info">
                        <span>Electrolytes</span>
                        <span>2/5 servings</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" data-target="40"></div>
                    </div>
                </div>
                <div class="progress-item">
                    <div class="progress-info">
                        <span>Timing Goals</span>
                        <span>6/8 times</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" data-target="75"></div>
                    </div>
                </div>
                ` : `
                <div class="progress-item">
                    <div class="progress-info">
                        <span>Protein</span>
                        <span>85/120g</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" data-target="71"></div>
                    </div>
                </div>
                <div class="progress-item">
                    <div class="progress-info">
                        <span>Carbs</span>
                        <span>165/250g</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" data-target="66"></div>
                    </div>
                </div>
                <div class="progress-item">
                    <div class="progress-info">
                        <span>Fat</span>
                        <span>52/70g</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" data-target="74"></div>
                    </div>
                </div>
                <div class="progress-item">
                    <div class="progress-info">
                        <span>Fiber</span>
                        <span>22/30g</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" data-target="73"></div>
                    </div>
                </div>
                `}
            </div>
        </div>
    `;
    showNotification(`Loading ${data.title}...`, 'info');
}

// Function to show meal details
function showMealDetails(mealName) {
    const mealDetails = {
        'Protein Oatmeal': {
            ingredients: ['Oats', 'Protein Powder', 'Berries', 'Almond Milk'],
            nutrition: { calories: 350, protein: '30g', carbs: '45g', fat: '8g' },
            steps: ['Mix oats with almond milk', 'Add protein powder', 'Top with berries']
        },
        'Greek Yogurt': {
            ingredients: ['Greek Yogurt', 'Honey', 'Nuts'],
            nutrition: { calories: 150, protein: '15g', carbs: '12g', fat: '6g' },
            steps: ['Take Greek yogurt', 'Drizzle with honey', 'Add nuts for crunch']
        },
        'Grilled Chicken Salad': {
            ingredients: ['Grilled Chicken', 'Mixed Greens', 'Cherry Tomatoes', 'Cucumber', 'Olive Oil'],
            nutrition: { calories: 420, protein: '35g', carbs: '15g', fat: '25g' },
            steps: ['Grill chicken breast', 'Chop vegetables', 'Mix with olive oil dressing']
        },
        'Apple with Almond Butter': {
            ingredients: ['Apple', 'Almond Butter'],
            nutrition: { calories: 200, protein: '4g', carbs: '25g', fat: '10g' },
            steps: ['Slice apple', 'Serve with almond butter for dipping']
        },
        'Salmon with Quinoa': {
            ingredients: ['Salmon Fillet', 'Quinoa', 'Broccoli', 'Lemon', 'Olive Oil'],
            nutrition: { calories: 520, protein: '40g', carbs: '35g', fat: '28g' },
            steps: ['Season and bake salmon', 'Cook quinoa', 'Steam broccoli', 'Garnish with lemon']
        }
    };

    const details = mealDetails[mealName];
    if (details) {
        showNotification(`Loading details for ${mealName}...`, 'info');

        // Create a modal or expandable section to show details
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>${mealName}</h3>
                    <span class="close" onclick="this.parentElement.parentElement.parentElement.style.display='none';">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="nutrition-info">
                        <h4>Nutrition Facts</h4>
                        <div class="nutrition-grid">
                            <div class="nutrition-item">
                                <span class="label">Calories:</span>
                                <span class="value">${details.nutrition.calories}</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="label">Protein:</span>
                                <span class="value">${details.nutrition.protein}</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="label">Carbs:</span>
                                <span class="value">${details.nutrition.carbs}</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="label">Fat:</span>
                                <span class="value">${details.nutrition.fat}</span>
                            </div>
                        </div>
                    </div>
                    <div class="ingredients-info">
                        <h4>Ingredients</h4>
                        <ul>
                            ${details.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="steps-info">
                        <h4>Preparation Steps</h4>
                        <ol>
                            ${details.steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

function showProgress(section) {
    // Define progress data based on section
    const progressData = {
        'track metrics': {
            title: 'Track Metrics',
            metrics: [
                { name: 'Weight', current: '69.2 kg', goal: '65.0 kg', progress: '4.2 kg down', type: 'weight' },
                { name: 'Body Fat', current: '18.5%', goal: '15.0%', progress: '3.5% down', type: 'percentage' },
                { name: 'Muscle Mass', current: '35.2 kg', goal: '38.0 kg', progress: '2.8 kg up', type: 'mass' },
                { name: 'BMI', current: '23.1', goal: '21.5', progress: '1.6 down', type: 'index' }
            ]
        },
        'achievements': {
            title: 'Achievements',
            metrics: [
                { name: '7-Day Streak', date: 'Completed today', type: 'streak' },
                { name: '10,000 Calories Burned', date: 'Completed yesterday', type: 'calories' },
                { name: '50 Workouts Completed', date: 'Completed last week', type: 'workouts' },
                { name: 'Healthy Eating Streak', date: '15 days', type: 'eating' },
                { name: 'Sleep Goal Achieved', date: '10 days', type: 'sleep' },
                { name: 'First Marathon', date: 'Completed 2 months ago', type: 'milestone' },
                { name: '30-Day Challenge', date: 'Completed last month', type: 'challenge' }
            ]
        },
        'history': {
            title: 'History',
            metrics: [
                { name: 'Weight History', current: '69.2 kg', date: 'Dec 18, 2025', change: '-0.3 kg from last week', type: 'weight' },
                { name: 'Workout History', current: '12 this week', date: 'This week', change: '+2 from last week', type: 'workouts' },
                { name: 'Calorie History', current: '2,150 avg', date: 'This week', change: '-150 from last week', type: 'calories' },
                { name: 'Step History', current: '8,432 avg', date: 'This week', change: '+500 from last week', type: 'steps' },
                { name: 'Hydration History', current: '2.1L avg', date: 'This week', change: '+0.2L from last week', type: 'hydration' }
            ]
        },
        'goals': {
            title: 'Goals',
            metrics: [
                { name: 'Weight Loss', current: '69.2 kg', goal: '65.0 kg', progress: '85%', type: 'weight' },
                { name: 'Muscle Gain', current: '35.2 kg', goal: '38.0 kg', progress: '65%', type: 'muscle' },
                { name: 'Cardio Endurance', current: '25 min', goal: '45 min', progress: '75%', type: 'cardio' },
                { name: 'Flexibility', current: '90°', goal: '120°', progress: '70%', type: 'flexibility' },
                { name: 'Strength Bench Press', current: '65 kg', goal: '80 kg', progress: '80%', type: 'strength' }
            ]
        }
    };

    const data = progressData[section.toLowerCase()] || progressData['track metrics'];

    // Create and show progress content
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="section-header">
            <h2>${data.title}</h2>
        </div>
        <div class="content-grid">
            <div class="card">
                <h3>${data.title === 'Track Metrics' ? 'Personal Metrics' : data.title}</h3>
                <div class="progress-list">
                    ${data.metrics.map(metric => {
                        if (data.title === 'Track Metrics') {
                            return `
                                <div class="progress-item">
                                    <div class="progress-info">
                                        <span class="progress-name">${metric.name}</span>
                                        <div class="progress-values">
                                            <span class="current-value">${metric.current}</span>
                                            <span class="goal-value">→ ${metric.goal}</span>
                                        </div>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${Math.min(100, Math.round((1 - (parseFloat(metric.progress) / 10)) * 100))}%;"></div>
                                    </div>
                                    <div class="progress-summary">
                                        <span class="progress-change">${metric.progress} progress</span>
                                    </div>
                                </div>
                            `;
                        } else if (data.title === 'Achievements') {
                            return `
                                <div class="achievement-item">
                                    <i class="fas ${getAchievementIcon(metric.type)}" style="color: ${getAchievementColor(metric.type)};"></i>
                                    <div>
                                        <span class="achievement-name">${metric.name}</span>
                                        <span class="achievement-date">${metric.date}</span>
                                    </div>
                                </div>
                            `;
                        } else if (data.title === 'History') {
                            return `
                                <div class="history-item">
                                    <div class="history-header">
                                        <span class="history-name">${metric.name}</span>
                                        <span class="history-value">${metric.current}</span>
                                    </div>
                                    <div class="history-meta">
                                        <span class="history-date">${metric.date}</span>
                                        <span class="history-change">${metric.change}</span>
                                    </div>
                                </div>
                            `;
                        } else { // Goals
                            const progressPercent = metric.progress || Math.round((parseFloat(metric.current) / parseFloat(metric.goal)) * 100);
                            return `
                                <div class="progress-item">
                                    <div class="progress-info">
                                        <span class="progress-name">${metric.name}</span>
                                        <div class="progress-values">
                                            <span class="current-value">${metric.current}</span>
                                            <span class="goal-value">→ ${metric.goal}</span>
                                        </div>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${progressPercent}%;"></div>
                                    </div>
                                    <div class="progress-summary">
                                        <span class="progress-change">${progressPercent}% complete</span>
                                    </div>
                                </div>
                            `;
                        }
                    }).join('')}
                </div>
            </div>
            <div class="card">
                <h3>Quick Stats</h3>
                <div class="stats-grid">
                    <div class="stat-box">
                        <i class="fas fa-fire"></i>
                        <div>
                            <span class="value">2,150</span>
                            <span class="change">calories burned</span>
                        </div>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-trophy"></i>
                        <div>
                            <span class="value">12</span>
                            <span class="change">workouts this week</span>
                        </div>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-shoe-prints"></i>
                        <div>
                            <span class="value">8,432</span>
                            <span class="change">steps today</span>
                        </div>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-glass-whiskey"></i>
                        <div>
                            <span class="value">2.1L</span>
                            <span class="change">water intake</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-grid">
            <div class="card">
                <h3>Weight Progress</h3>
                <div class="chart-placeholder">
                    <canvas id="progressChart"></canvas>
                </div>
                <div class="progress-summary">
                    <div class="summary-item">
                        <span class="summary-label">Current Weight</span>
                        <span class="summary-value">69.2 kg</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Goal Weight</span>
                        <span class="summary-value">65.0 kg</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Progress</span>
                        <span class="summary-value">4.2 kg down</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <h3>Weekly Summary</h3>
                <div class="weekly-stats">
                    <div class="week-stat">
                        <span class="stat-name">Mon</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="height: 70%;"></div>
                        </div>
                        <span class="stat-value">70%</span>
                    </div>
                    <div class="week-stat">
                        <span class="stat-name">Tue</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="height: 85%;"></div>
                        </div>
                        <span class="stat-value">85%</span>
                    </div>
                    <div class="week-stat">
                        <span class="stat-name">Wed</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="height: 90%;"></div>
                        </div>
                        <span class="stat-value">90%</span>
                    </div>
                    <div class="week-stat">
                        <span class="stat-name">Thu</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="height: 65%;"></div>
                        </div>
                        <span class="stat-value">65%</span>
                    </div>
                    <div class="week-stat">
                        <span class="stat-name">Fri</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="height: 95%;"></div>
                        </div>
                        <span class="stat-value">95%</span>
                    </div>
                    <div class="week-stat">
                        <span class="stat-name">Sat</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="height: 80%;"></div>
                        </div>
                        <span class="stat-value">80%</span>
                    </div>
                    <div class="week-stat">
                        <span class="stat-name">Sun</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="height: 75%;"></div>
                        </div>
                        <span class="stat-value">75%</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize chart for progress section
    setTimeout(initializeProgressChart, 100);
    showNotification(`Loading ${data.title}...`, 'info');
}

// Helper functions for progress section
function getAchievementIcon(type) {
    const icons = {
        'streak': 'fa-medal',
        'calories': 'fa-fire',
        'workouts': 'fa-dumbbell',
        'eating': 'fa-apple-alt',
        'sleep': 'fa-bed',
        'milestone': 'fa-trophy',
        'challenge': 'fa-flag'
    };
    return icons[type] || 'fa-award';
}

function getAchievementColor(type) {
    const colors = {
        'streak': '#FFD700',
        'calories': '#FF6B6B',
        'workouts': '#4ECDC4',
        'eating': '#9B59B6',
        'sleep': '#3498DB',
        'milestone': '#F39C12',
        'challenge': '#2ECC71'
    };
    return colors[type] || '#9B59B6';
}

function initializeProgressChart() {
    if (typeof Chart !== 'undefined') {
        const ctx = document.getElementById('progressChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                    datasets: [{
                        label: 'Weight (kg)',
                        data: [72.5, 71.8, 71.2, 70.5, 69.8, 69.2],
                        borderColor: '#00c6ff',
                        backgroundColor: 'rgba(0, 198, 255, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#b0b0c0'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#b0b0c0'
                            }
                        }
                    }
                }
            });
        }
    }
}

function showSettings(section) {
    // Create and show settings content
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="section-header">
            <h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2>
        </div>
        <div class="content-grid">
            <div class="card">
                <h3>Account Settings</h3>
                <div class="settings-list">
                    <div class="setting-item">
                        <span class="setting-name">Profile Information</span>
                        <button class="outline-button">Edit</button>
                    </div>
                    <div class="setting-item">
                        <span class="setting-name">Privacy Settings</span>
                        <button class="outline-button">Manage</button>
                    </div>
                    <div class="setting-item">
                        <span class="setting-name">Notification Preferences</span>
                        <button class="outline-button">Configure</button>
                    </div>
                    <div class="setting-item">
                        <span class="setting-name">Change Password</span>
                        <button class="outline-button">Update</button>
                    </div>
                </div>
            </div>
            <div class="card">
                <h3>App Preferences</h3>
                <div class="settings-list">
                    <div class="setting-item">
                        <span class="setting-name">Theme</span>
                        <select class="setting-select">
                            <option>Dark Mode</option>
                            <option>Light Mode</option>
                            <option>Auto</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <span class="setting-name">Units</span>
                        <select class="setting-select">
                            <option>Imperial (lbs, inches)</option>
                            <option>Metric (kg, cm)</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <span class="setting-name">Language</span>
                        <select class="setting-select">
                            <option>English</option>
                            <option>Urdu</option>
                            <option>Hindi</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    `;
    showNotification(`Loading ${section}...`, 'info');
}

function setupEventListeners() {
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Don't deactivate if it's a sub-item
            if (!this.classList.contains('sub-item')) {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            } else {
                // For sub-items, also activate their parent section
                navItems.forEach(nav => nav.classList.remove('active'));

                // Find the parent section and activate the first item in that section
                let parent = this.parentElement;
                while (parent && !parent.classList.contains('nav-section')) {
                    parent = parent.parentElement;
                }

                if (parent) {
                    const firstNavItem = parent.querySelector('.nav-item:not(.sub-item)');
                    if (firstNavItem) {
                        firstNavItem.classList.add('active');
                    }
                }

                this.classList.add('active');
            }

            // Handle navigation logic based on the clicked item
            handleNavigation(this);
        });
    });

    // Neon buttons
    const neonButtons = document.querySelectorAll('.neon-button, .outline-button');
    neonButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Day cards in weekly plan
    const dayCards = document.querySelectorAll('.day-card');
    dayCards.forEach(card => {
        card.addEventListener('click', function() {
            dayCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('active');
        });
    }

    // Chat toggle
    const chatToggle = document.querySelector('.chat-toggle');
    if (chatToggle) {
        chatToggle.addEventListener('click', function() {
            const chat = document.querySelector('.floating-chat');
            chat.style.display = chat.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Add water button
    const addWaterBtn = document.querySelector('.add-water');
    if (addWaterBtn) {
        addWaterBtn.addEventListener('click', function() {
            addWaterIntake();
        });
    }

    // Start workout button
    const startWorkoutBtn = document.querySelector('.start-workout');
    if (startWorkoutBtn) {
        startWorkoutBtn.addEventListener('click', function() {
            startWorkout();
        });
    }

    // Send message in chat
    const sendButton = document.querySelector('.send-button');
    const chatInput = document.querySelector('.chat-input input');

    if (sendButton && chatInput) {
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

function addWaterIntake() {
    // Simulate adding water
    const waterIntake = document.querySelector('.water-intake .percentage');
    const currentPct = parseInt(waterIntake.textContent) || 0;
    const newPct = Math.min(currentPct + 10, 100);
    waterIntake.textContent = newPct + '%';

    // Update the progress circle
    const circle = document.querySelector('.progress-circle circle:last-child');
    if (circle) {
        const circumference = 251.2;
        const offset = circumference - (circumference * newPct / 100);
        circle.style.strokeDashoffset = offset;
    }

    // Show success feedback
    showNotification('Water intake updated!', 'success');
}

function startWorkout() {
    // Simulate workout start
    showNotification('Workout started! Remember to stay hydrated.', 'info');

    // Add visual feedback
    const button = document.querySelector('.start-workout');
    button.innerHTML = '<i class="fas fa-pause"></i> Pause Workout';
    button.classList.add('pulse-glow');

    // Change button behavior for pause
    button.onclick = function() {
        this.innerHTML = '<i class="fas fa-play"></i> Resume Workout';
        this.classList.remove('pulse-glow');
        this.onclick = function() {
            this.innerHTML = '<i class="fas fa-pause"></i> Pause Workout';
            this.classList.add('pulse-glow');
            this.onclick = arguments.callee;
        };
    };
}

function setupWorkoutTimers() {
    // Simulate workout timers and progress
    setInterval(() => {
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            const value = item.querySelector('.stat-value');
            if (value && value.textContent.includes('L')) {
                // Simulate water intake
                const current = parseFloat(value.textContent);
                if (current < 3.5) {
                    value.textContent = (current + 0.01).toFixed(1) + 'L';
                }
            }
        });
    }, 30000); // Update every 30 seconds
}

function updateHydrationProgress() {
    // Calculate hydration progress based on current intake
    const hydrationValue = document.querySelector('.hydration-tracker .percentage');
    if (hydrationValue) {
        const current = parseFloat(hydrationValue.textContent);
        const circle = document.querySelector('.progress-circle circle:last-child');
        if (circle) {
            const circumference = 251.2;
            const offset = circumference - (circumference * current / 100);
            circle.style.strokeDashoffset = offset;
        }
    }
}

function animateProgressBars() {
    // Animate progress bars on page load
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-target') || '50';
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, 300);
    });
}

function initializeCharts() {
    // Initialize weight chart
    if (typeof Chart !== 'undefined') {
        const weightCtx = document.getElementById('weightChart');
        if (weightCtx) {
            new Chart(weightCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                    datasets: [{
                        label: 'Weight (kg)',
                        data: [72.5, 71.8, 71.2, 70.5, 69.8, 69.2],
                        borderColor: '#00c6ff',
                        backgroundColor: 'rgba(0, 198, 255, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#b0b0c0'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#b0b0c0'
                            }
                        }
                    }
                }
            });
        }

        // Initialize completion chart
        const completionCtx = document.getElementById('completionChart');
        if (completionCtx) {
            new Chart(completionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'Pending'],
                    datasets: [{
                        data: [78, 22],
                        backgroundColor: ['#00c6ff', '#323246'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }
}

function setupChatFunctionality() {
    // Set up AI coach responses
    const aiResponses = [
        "Mashallah! Aap bohut acche kar rahe hain! Keep it up!",
        "Excellent work on your hydration today! Remember to drink water every 15-20 minutes during workout.",
        "Aaj ka workout plan perfect hai. Consistency is key to success!",
        "Protein-rich vegetarian tip: Quinoa with chickpeas is an excellent combination for muscle recovery.",
        "For weight loss, focus on compound movements like squats and push-ups. Great job today!",
        "Remember: Proper form over speed. If you feel dizzy, take a rest.",
        "Your progress is amazing! You've lost 0.8kg this week. Keep going!",
        "Hydration tip: Add lemon or cucumber to your water for better taste and benefits."
    ];

    // Auto-reply feature
    setInterval(() => {
        const lastMessage = document.querySelector('.message:last-child');
        if (lastMessage && !lastMessage.classList.contains('ai-message')) {
            // Only respond if it's been more than 5 seconds since last AI message
            setTimeout(() => {
                addAIMessage(aiResponses[Math.floor(Math.random() * aiResponses.length)]);
            }, 1000);
        }
    }, 5000);
}

function sendMessage() {
    const chatInput = document.querySelector('.chat-input input');
    const message = chatInput.value.trim();

    if (message) {
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Simulate AI thinking
        setTimeout(() => {
            // Generate AI response based on user message
            const aiResponse = generateAIResponse(message);
            addAIMessage(aiResponse);
        }, 1000);
    }
}

function addMessage(text, sender) {
    const chatMessages = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    messageDiv.innerHTML = `
        <div class="avatar ${sender}">
            <i class="fas fa-${sender === 'ai' ? 'robot' : 'user'}"></i>
        </div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addAIMessage(text) {
    // Show typing indicator first
    const chatMessages = document.querySelector('.chat-messages');
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message ai-message typing-indicator';
    typingIndicator.innerHTML = `
        <div class="avatar ai">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Replace typing indicator with actual message after delay
    setTimeout(() => {
        typingIndicator.remove();
        addMessage(text, 'ai');
    }, 1500);
}

function generateAIResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();

    // Fitness-related responses
    if (lowerMsg.includes('workout') || lowerMsg.includes('exercise')) {
        return "Excellent question! For effective workouts, focus on compound movements like squats, push-ups, and planks. Remember: proper form over speed. Consistency will bring great results!";
    }

    if (lowerMsg.includes('diet') || lowerMsg.includes('food') || lowerMsg.includes('meal')) {
        return "For a healthy diet, include protein-rich foods like quinoa, chickpeas, and lentils. Also add plenty of vegetables and healthy fats. Remember: moderation is key!";
    }

    if (lowerMsg.includes('water') || lowerMsg.includes('hydrate')) {
        return "Great focus on hydration! Aim for 2.5-3 liters daily, especially when working out. Drink 200ml every 15-20 minutes during exercise. You're doing amazing!";
    }

    if (lowerMsg.includes('progress') || lowerMsg.includes('weight')) {
        return "Your progress is fantastic! Remember, sustainable weight loss is 0.5-1kg per week. Keep following your plan and staying consistent. You're on the right track!";
    }

    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        return "Hello! Main aapka AI Fitness Coach hoon 💪. How can I help you today?";
    }

    if (lowerMsg.includes('thank')) {
        return "You're welcome! Remember, I'm always here to support your fitness journey. Keep up the great work!";
    }

    // Default responses
    const responses = [
        "Mashallah! That's a great question. Consistency in your fitness journey will lead to success!",
        "Excellent focus! Remember, small steps lead to big changes. Keep going!",
        "Great question! For personalized advice, consider your specific goals and current fitness level.",
        "Bohot acchi baat! Your dedication to health is inspiring. Keep up the motivation!",
        "Perfect! Remember: proper form over speed, and consistency is key to success.",
        "That's an important aspect of fitness! Focus on progressive overload and recovery.",
        "Wonderful! Your commitment to health is admirable. I'm here to support you.",
        "Fantastic question! Remember to combine exercise with proper nutrition for best results."
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}

// New functions for day details
function showDayDetails(day) {
    const panel = document.getElementById('dayDetailsPanel');
    const title = document.getElementById('dayTitle');

    // Update title based on selected day
    const dayNames = {
        'monday': 'Monday: Upper Body Strength',
        'tuesday': 'Tuesday: Cardio & Core',
        'wednesday': 'Wednesday: Lower Body Strength',
        'thursday': 'Thursday: HIIT Training',
        'friday': 'Friday: Full Body Circuit',
        'saturday': 'Saturday: Yoga & Stretching',
        'sunday': 'Sunday: Rest Day'
    };

    title.textContent = dayNames[day] || 'Day Details';

    // Update workout and diet content based on the day
    updateDayContent(day);

    panel.style.display = 'block';

    // Add animation
    panel.style.animation = 'fadeIn 0.3s ease';
    setTimeout(() => {
        panel.style.animation = '';
    }, 300);
}

function hideDayDetails() {
    const panel = document.getElementById('dayDetailsPanel');
    panel.style.display = 'none';
}

function updateDayContent(day) {
    const workoutContainer = document.querySelector('.day-workout');
    const dietContainer = document.querySelector('.day-diet');

    // Define content for each day
    const dayContent = {
        'monday': {
            workout: [
                { name: 'Push-ups', sets: '3', reps: '12-15', intensity: 'medium' },
                { name: 'Bench Press', sets: '4', reps: '8-10', intensity: 'high' },
                { name: 'Shoulder Press', sets: '3', reps: '10-12', intensity: 'medium' },
                { name: 'Bicep Curls', sets: '3', reps: '12-15', intensity: 'low' },
                { name: 'Tricep Dips', sets: '3', reps: '10-12', intensity: 'medium' }
            ],
            diet: [
                { name: 'Breakfast: Protein Oatmeal', calories: '350 cal' },
                { name: 'Snack: Greek Yogurt', calories: '150 cal' },
                { name: 'Lunch: Grilled Chicken Wrap', calories: '420 cal' },
                { name: 'Snack: Protein Shake', calories: '180 cal' },
                { name: 'Dinner: Salmon with Veggies', calories: '480 cal' }
            ]
        },
        'tuesday': {
            workout: [
                { name: 'Warm-up Run', sets: '1', reps: '5 min', intensity: 'low' },
                { name: 'Burpees', sets: '4', reps: '10', intensity: 'high' },
                { name: 'Mountain Climbers', sets: '3', reps: '30 sec', intensity: 'high' },
                { name: 'Plank', sets: '3', reps: '45 sec', intensity: 'medium' },
                { name: 'Bicycle Crunches', sets: '3', reps: '20 each side', intensity: 'medium' },
                { name: 'Cool-down Stretch', sets: '1', reps: '10 min', intensity: 'low' }
            ],
            diet: [
                { name: 'Breakfast: Green Smoothie', calories: '280 cal' },
                { name: 'Snack: Banana with Almond Butter', calories: '200 cal' },
                { name: 'Lunch: Quinoa Salad Bowl', calories: '450 cal' },
                { name: 'Pre-Workout: Apple', calories: '95 cal' },
                { name: 'Dinner: Lean Beef with Sweet Potato', calories: '520 cal' }
            ]
        },
        'wednesday': {
            workout: [
                { name: 'Squats', sets: '4', reps: '10-12', intensity: 'high' },
                { name: 'Lunges', sets: '3', reps: '12 each leg', intensity: 'medium' },
                { name: 'Deadlifts', sets: '4', reps: '8', intensity: 'high' },
                { name: 'Calf Raises', sets: '3', reps: '15', intensity: 'low' },
                { name: 'Glute Bridges', sets: '3', reps: '15', intensity: 'medium' }
            ],
            diet: [
                { name: 'Breakfast: Oatmeal with Berries', calories: '320 cal' },
                { name: 'Snack: Protein Shake', calories: '180 cal' },
                { name: 'Lunch: Grilled Chicken Salad', calories: '450 cal' },
                { name: 'Snack: Mixed Nuts', calories: '180 cal' },
                { name: 'Dinner: Salmon with Quinoa', calories: '520 cal' }
            ]
        },
        'thursday': {
            workout: [
                { name: 'Warm-up', sets: '1', reps: '5 min', intensity: 'low' },
                { name: 'Jump Squats', sets: '4', reps: '15', intensity: 'high' },
                { name: 'High Knees', sets: '4', reps: '30 sec', intensity: 'high' },
                { name: 'Push-up to T', sets: '3', reps: '10', intensity: 'medium' },
                { name: 'Plank Jacks', sets: '3', reps: '30 sec', intensity: 'high' },
                { name: 'Cool-down', sets: '1', reps: '5 min', intensity: 'low' }
            ],
            diet: [
                { name: 'Breakfast: Protein Pancakes', calories: '320 cal' },
                { name: 'Snack: Apple with PB', calories: '190 cal' },
                { name: 'Lunch: Turkey & Avocado Wrap', calories: '420 cal' },
                { name: 'Pre-Workout: Energy Bar', calories: '150 cal' },
                { name: 'Dinner: Grilled Chicken with Rice', calories: '480 cal' }
            ]
        },
        'friday': {
            workout: [
                { name: 'Warm-up', sets: '1', reps: '5 min', intensity: 'low' },
                { name: 'Pull-ups', sets: '4', reps: '6-8', intensity: 'high' },
                { name: 'Dumbbell Rows', sets: '3', reps: '10-12', intensity: 'medium' },
                { name: 'Lateral Raises', sets: '3', reps: '12-15', intensity: 'low' },
                { name: 'Russian Twists', sets: '3', reps: '20', intensity: 'medium' },
                { name: 'Cool-down', sets: '1', reps: '5 min', intensity: 'low' }
            ],
            diet: [
                { name: 'Breakfast: Veggie Scramble', calories: '280 cal' },
                { name: 'Snack: Protein Shake', calories: '180 cal' },
                { name: 'Lunch: Buddha Bowl', calories: '480 cal' },
                { name: 'Snack: Hummus & Veggies', calories: '150 cal' },
                { name: 'Dinner: Cod with Vegetables', calories: '420 cal' }
            ]
        },
        'saturday': {
            workout: [
                { name: 'Sun Salutation', sets: '2', reps: '5 rounds', intensity: 'low' },
                { name: 'Downward Dog', sets: '1', reps: '2 min hold', intensity: 'low' },
                { name: 'Warrior Poses', sets: '1', reps: '30 sec each', intensity: 'low' },
                { name: 'Hip Flexor Stretch', sets: '1', reps: '1 min each', intensity: 'low' },
                { name: 'Spinal Twist', sets: '1', reps: '30 sec each side', intensity: 'low' },
                { name: 'Meditation', sets: '1', reps: '10 min', intensity: 'low' }
            ],
            diet: [
                { name: 'Breakfast: Chia Pudding', calories: '280 cal' },
                { name: 'Snack: Green Smoothie', calories: '150 cal' },
                { name: 'Lunch: Macro Bowl', calories: '450 cal' },
                { name: 'Snack: Trail Mix', calories: '200 cal' },
                { name: 'Dinner: Stir-fry Tofu', calories: '400 cal' }
            ]
        },
        'sunday': {
            workout: [
                { name: 'Gentle Walk', sets: '1', reps: '30 min', intensity: 'low' },
                { name: 'Foam Rolling', sets: '1', reps: '15 min', intensity: 'low' },
                { name: 'Light Stretching', sets: '1', reps: '20 min', intensity: 'low' },
                { name: 'Meditation', sets: '1', reps: '15 min', intensity: 'low' }
            ],
            diet: [
                { name: 'Breakfast: Weekend Brunch', calories: '450 cal' },
                { name: 'Snack: Fruit Salad', calories: '120 cal' },
                { name: 'Lunch: Comfort Food (Moderated)', calories: '550 cal' },
                { name: 'Snack: Herbal Tea', calories: '5 cal' },
                { name: 'Dinner: Light Soup & Salad', calories: '320 cal' }
            ]
        }
    };

    // Update workout content
    let workoutHTML = '<h5>Morning Workout</h5>';
    if (dayContent[day] && dayContent[day].workout) {
        dayContent[day].workout.forEach(exercise => {
            workoutHTML += `
                <div class="exercise-item">
                    <div class="exercise-info">
                        <span class="intensity-indicator ${exercise.intensity}-intensity"></span>
                        <span class="exercise-name">${exercise.name}</span>
                        <span class="exercise-stats">${exercise.sets} sets × ${exercise.reps}</span>
                    </div>
                </div>
            `;
        });
    }
    workoutContainer.innerHTML = workoutHTML;

    // Update diet content
    let dietHTML = '<h5>Diet Plan</h5>';
    if (dayContent[day] && dayContent[day].diet) {
        dayContent[day].diet.forEach(meal => {
            dietHTML += `
                <div class="meal-item">
                    <span class="meal-name">${meal.name}</span>
                    <span class="meal-calories">${meal.calories}</span>
                </div>
            `;
        });
    }
    dietContainer.innerHTML = dietHTML;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 200, 83, 0.9)' : type === 'error' ? 'rgba(255, 23, 68, 0.9)' : 'rgba(0, 198, 255, 0.9)'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for animations and notifications
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }

        .typing-dots {
            display: flex;
            gap: 4px;
        }

        .typing-dots span {
            width: 8px;
            height: 8px;
            background: #00c6ff;
            border-radius: 50%;
            opacity: 0.4;
            animation: typingPulse 1.4s infinite ease-in-out;
        }

        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingPulse {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);
}

// Call the function to add dynamic styles
addDynamicStyles();

// Authentication Functions
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    modal.style.display = 'flex';

    // Add animation
    modal.style.animation = 'fadeIn 0.3s ease';
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
}

function showSignup() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
}

function showLogin() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
}

function setupAuthListeners() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simple validation
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Simple authentication (in a real app, this would be an API call)
            if (authenticateUser(email, password)) {
                showNotification('Login successful! Welcome back.', 'success');
                closeLoginModal();
                updateUserProfile(email);
            } else {
                showNotification('Invalid credentials. Please try again.', 'error');
            }
        });
    }

    // Signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;

            // Simple validation
            if (!name || !email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }

            // Register user (in a real app, this would be an API call)
            if (registerUser(name, email, password)) {
                showNotification('Account created successfully! Please sign in.', 'success');
                showLogin();
            } else {
                showNotification('Email already exists. Please use a different email.', 'error');
            }
        });
    }

    // Click outside modal to close
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLoginModal();
            }
        });
    }
}

function authenticateUser(email, password) {
    // Simple authentication simulation
    // In a real app, this would be an API call to your backend
    const storedUsers = JSON.parse(localStorage.getItem('fitnessAppUsers') || '[]');
    const user = storedUsers.find(u => u.email === email && u.password === password);

    if (user) {
        // Store user session
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

function registerUser(name, email, password) {
    // Simple registration simulation
    // In a real app, this would be an API call to your backend
    const storedUsers = JSON.parse(localStorage.getItem('fitnessAppUsers') || '[]');

    // Check if user already exists
    if (storedUsers.some(u => u.email === email)) {
        return false;
    }

    // Add new user
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password, // In a real app, this should be hashed
        joinDate: new Date().toISOString()
    };

    storedUsers.push(newUser);
    localStorage.setItem('fitnessAppUsers', JSON.stringify(storedUsers));

    // Store user session
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
}

function updateUserProfile(email) {
    // Update the header with user info
    const userInitials = email.charAt(0).toUpperCase();
    const userImage = document.querySelector('.user-profile img');
    if (userImage) {
        userImage.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=00c6ff&color=fff&size=40`;
    }

    // Update welcome message
    const headerCenter = document.querySelector('.header-center h1');
    if (headerCenter) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const userName = currentUser.name || email.split('@')[0];
        headerCenter.textContent = `Welcome Back, ${userName}!`;
    }
}

function initializeAuth() {
    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.email) {
        updateUserProfile(currentUser.email);
    } else {
        // Show login modal on first visit (optional)
        // setTimeout(showLoginModal, 1000);
    }
}

// Add logout functionality
function logout() {
    localStorage.removeItem('currentUser');
    const headerCenter = document.querySelector('.header-center h1');
    if (headerCenter) {
        headerCenter.textContent = 'Welcome Back, User!';
    }

    const userImage = document.querySelector('.user-profile img');
    if (userImage) {
        userImage.src = 'https://via.placeholder.com/40x40/00c6ff/ffffff?text=U';
    }

    showNotification('You have been logged out', 'info');
}

// Show settings page (placeholder function)
function showSettings() {
    showNotification('Settings page would open here', 'info');
}

// Initialize dropdown functionality
function setupUserDropdown() {
    const userProfile = document.getElementById('userProfile');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (userProfile && dropdownMenu) {
        // Toggle dropdown on user profile click
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userProfile.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    // Update user profile with user info if logged in
    updateProfileDisplay();
}

// Update profile display based on login status
function updateProfileDisplay() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userProfile = document.getElementById('userProfile');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (userProfile) {
        if (currentUser.email) {
            // User is logged in
            const userInitials = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase();
            userProfile.innerHTML = `<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || currentUser.email)}&background=00c6ff&color=fff&size=40" alt="User">`;

            // Add chat option to dropdown for logged-in users
            const chatItem = document.createElement('div');
            chatItem.className = 'dropdown-item';
            chatItem.onclick = function() { showChat(); };
            chatItem.innerHTML = '<i class="fas fa-comments"></i><span>AI Coach Chat</span>';

            // Insert chat option before the separator
            const separator = dropdownMenu.querySelector('.dropdown-separator');
            if (separator) {
                dropdownMenu.insertBefore(chatItem, separator);
            } else {
                dropdownMenu.appendChild(chatItem);
            }
        } else {
            // User is not logged in - remove chat option if it exists
            const chatItem = dropdownMenu.querySelector('.dropdown-item[onclick*="showChat"]');
            if (chatItem) {
                chatItem.remove();
            }
        }
    }
}

// Show chat interface (only for logged-in users)
function showChat() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (!currentUser.email) {
        showNotification('Please sign in to access the AI Coach Chat', 'error');
        showLoginModal();
        return;
    }

    // Show the chat interface
    const chat = document.querySelector('.floating-chat');
    if (chat) {
        chat.style.display = 'block';
        showNotification('AI Coach is ready to help you!', 'info');
    }
}

// Mobile-specific functionality
function setupMobileFunctionality() {
    // Toggle sidebar on mobile
    const menuBtn = document.querySelector('.menu-toggle');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        const sidebar = document.querySelector('.sidebar');
        const menuBtn = document.querySelector('.menu-toggle');

        if (sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !menuBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// Initialize mobile functionality
setupMobileFunctionality();

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}