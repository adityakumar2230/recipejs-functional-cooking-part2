// Recipe data - Foundation for all 4 parts
const recipes = [
	{
		id: 1,
		title: "Classic Spaghetti Carbonara",
		time: 25,
		difficulty: "easy",
		description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
		category: "pasta"
	},
	{
		id: 2,
		title: "Chicken Tikka Masala",
		time: 45,
		difficulty: "medium",
		description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
		category: "curry"
	},
	{
		id: 3,
		title: "Homemade Croissants",
		time: 180,
		difficulty: "hard",
		description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
		category: "baking"
	},
	{
		id: 4,
		title: "Greek Salad",
		time: 15,
		difficulty: "easy",
		description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
		category: "salad"
	},
	{
		id: 5,
		title: "Beef Wellington",
		time: 120,
		difficulty: "hard",
		description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
		category: "meat"
	},
	{
		id: 6,
		title: "Vegetable Stir Fry",
		time: 20,
		difficulty: "easy",
		description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
		category: "vegetarian"
	},
	{
		id: 7,
		title: "Pad Thai",
		time: 30,
		difficulty: "medium",
		description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
		category: "noodles"
	},
	{
		id: 8,
		title: "Margherita Pizza",
		time: 60,
		difficulty: "medium",
		description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
		category: "pizza"
	}
];

// DOM Selection - Get the container where recipes will be displayed
const recipeContainer = document.querySelector('#recipe-container');
console.log('recipeContainer:', recipeContainer);

// Function to create HTML for a single recipe card
const createRecipeCard = (recipe) => {
	return `
		<div class="recipe-card" data-id="${recipe.id}">
			<h3>${recipe.title}</h3>
			<div class="recipe-meta">
				<span>⏱️ ${recipe.time} min</span>
				<span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
			</div>
			<p>${recipe.description}</p>
		</div>
	`;
};

console.log('First recipe card HTML:', createRecipeCard(recipes[0]));

// Recipe data - Foundation for all 4 parts
const recipes = [
  { id: 1, title: "Classic Spaghetti Carbonara", time: 25, difficulty: "easy", description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.", category: "pasta" },
  { id: 2, title: "Chicken Tikka Masala", time: 45, difficulty: "medium", description: "Tender chicken pieces in a creamy, spiced tomato sauce.", category: "curry" },
  { id: 3, title: "Homemade Croissants", time: 180, difficulty: "hard", description: "Buttery, flaky French pastries that require patience but deliver amazing results.", category: "baking" },
  { id: 4, title: "Greek Salad", time: 15, difficulty: "easy", description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.", category: "salad" },
  { id: 5, title: "Beef Wellington", time: 120, difficulty: "hard", description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.", category: "meat" },
  { id: 6, title: "Vegetable Stir Fry", time: 20, difficulty: "easy", description: "Colorful mixed vegetables cooked quickly in a savory sauce.", category: "vegetarian" },
  { id: 7, title: "Pad Thai", time: 30, difficulty: "medium", description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.", category: "noodles" },
  { id: 8, title: "Margherita Pizza", time: 60, difficulty: "medium", description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.", category: "pizza" }
];

// DOM Selection - Get the container where recipes will be displayed
const recipeContainer = document.querySelector('#recipe-container');
console.log('recipeContainer:', recipeContainer);

// Function to create HTML for a single recipe card
const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

console.log('First recipe card HTML:', createRecipeCard(recipes[0]));

// Function to render recipes to the DOM
const renderRecipes = (recipesToRender) => {
  const allCardsHTML = recipesToRender
    .map(createRecipeCard)
    .join('');

  if (recipeContainer) {
    recipeContainer.innerHTML = allCardsHTML;
    console.log('Rendering complete! Total recipes:', recipesToRender.length);
  } else {
    console.error('Cannot find #recipe-container in the DOM.');
  }
};

/* ------------------ Part 2: Filters & Sorts (Functional) ------------------ */

// State
let currentFilter = 'all'; // 'all' | 'easy' | 'medium' | 'hard' | 'quick'
let currentSort = 'none';  // 'none' | 'name' | 'time'

// Button references
const filterButtons = document.querySelectorAll('[data-filter]');
const sortButtons = document.querySelectorAll('[data-sort]');

// Pure filter functions
const filterByDifficulty = (items, level) => items.filter(r => r.difficulty === level);
const filterByTime = (items, maxMinutes) => items.filter(r => r.time <= maxMinutes);

const applyFilter = (items, filterType) => {
  switch (filterType) {
    case 'easy':
      return filterByDifficulty(items, 'easy');
    case 'medium':
      return filterByDifficulty(items, 'medium');
    case 'hard':
      return filterByDifficulty(items, 'hard');
    case 'quick':
      return filterByTime(items, 30);
    case 'all':
    default:
      return [...items]; // return a shallow copy
  }
};

// Pure sort functions (operate on copies)
const sortByName = (items) => [...items].sort((a, b) => a.title.localeCompare(b.title));
const sortByTime = (items) => [...items].sort((a, b) => a.time - b.time);

const applySort = (items, sortType) => {
  switch (sortType) {
    case 'name':
      return sortByName(items);
    case 'time':
      return sortByTime(items);
    case 'none':
    default:
      return [...items];
  }
};

// Update active button states
const updateActiveButtons = () => {
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
  });

  sortButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.sort === currentSort);
  });
};

// Main update function: apply filter, then sort, then render
const updateDisplay = () => {
  let result = [...recipes];
  result = applyFilter(result, currentFilter);
  result = applySort(result, currentSort);
  renderRecipes(result);
  console.log(`Displaying ${result.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`);
  updateActiveButtons();
};

// Event handlers
const handleFilterClick = (e) => {
  const btn = e.currentTarget;
  const filter = btn.dataset.filter;
  if (!filter) return;
  currentFilter = filter;
  updateDisplay();
};

const handleSortClick = (e) => {
  const btn = e.currentTarget;
  const sort = btn.dataset.sort;
  if (!sort) return;
  currentSort = sort;
  updateDisplay();
};

// Attach listeners
const setupEventListeners = () => {
  filterButtons.forEach(btn => btn.addEventListener('click', handleFilterClick));
  sortButtons.forEach(btn => btn.addEventListener('click', handleSortClick));
};

// Initialize: render and wire up controls
setupEventListeners();
updateDisplay();

// Expose some helpers for debugging in console (optional)
window.recipeHelpers = { recipes, filterByDifficulty, filterByTime, sortByName, sortByTime };
