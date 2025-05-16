# web-design-project-group-10
web-design-project-group-10 created by GitHub Classroom
The purpose of this project is to build a web application while learning how to manage a collaborative project. 
The project combines UI/UX design with practical frontend development using HTML, CSS, and JavaScript.

# Team Members
- Zora Pinter(https://github.com/username)
- Alen Eminovic(https://github.com/username)
- Milica Mandic(https://github.com/milicamandic04)

# Project Overview
We are developing NomNom as an intuitive, simple, Japanese design inspired recipe website application. 
We aim to provide users with an extensive collection of recipes, incorporate user-friendly design 
and categorization. All of this to solve the problem of cluttered, ad-heavy websites.

# NomNom - Your Simple Japanese Recipes

## Overview
NomNom is an intuitive, Japanese-inspired recipe website designed for home chefs (beginners and intermediates), busy professionals, students, healthy food lovers, foodies, vegetarians, and travelers. It offers clear, minimalistic recipes with user reviews to simplify cooking Japanese cuisine, addressing the clutter of ad-heavy platforms.

## Repository Structure

## /css/                  # Stylesheets for different pages
main.css          # Styles for index.html (carousels, layout)
recipes.css       # Styles for recipes.html (filtering, cards)
recipe-detail.css # Styles for recipe-detail.html (rating, steps)
kitchen-tips.css  # Styles for kitchen-tips.html (tips layout)
sign-up.css       # Styles for sign-up.html (form design)
log-in.css        # Styles for log-in.html (form design)
contact-us.css    # Styles for contact-us.html (form design)

## /js/                   # JavaScript files for interactivity
main-recipes.js   # Carousel logic for index.html
filter-recipes.js # Filtering and sorting for recipes.html
recipe-detail.js  # Recipe detail loading for recipe-detail.html
kitchen-tips.js   # Tips rendering for kitchen-tips.html
input-logic.js    # Form validation for sign-up, login, contact
star-rating.js    # Star rating system for recipe ratings
carousel.js       # Static image carousel logic

## /json/                 # Data files for dynamic content
recipe-card.json  # Recipe data (36 recipes)
kitchen-tips.json # Detailed kitchen tips (3 tips)
quick-tips.json   # Quick tips (27 tips)

## /html/                 # HTML templates
index.html        # Homepage with recipe carousels
recipes.html      # Recipes page with filtering
recipe-detail.html # Individual recipe page
kitchen-tips.html # Kitchen tips page
sign-up.html      # Sign-up form page
log-in.html       # Login form page
contact-us.html   # Contact form page

# Git Workflow
We use a structured Git workflow to track progress and collaborate effectively:
- `main` – stable, production-ready version
- `feature/x` – individual features
- `hotfix/x` – issue-specific fixes
  
# GitHub Usage plan
- Feature development is done via `feature/*` branches and merged into `main` via **Pull Requests**.
- All Pull Requests are reviewed by the requesting member or another team member before merging.

## FEATURE DESCRIPTIONS

- Dynamic Recipe Carousels: Displays recent and top-rated Japanese recipes on the homepage (index.html) with a responsive, manually navigable carousel (main-recipes.js), showcasing up to nine recipes with images and ratings, ideal for quick browsing by busy professionals and foodies.
  
- Category-Based Filtering: Allows users to filter recipes by category (e.g., Drinks, Desserts) on the recipes page (recipes.html) using client-side logic (filter-recipes.js), catering to home chefs and healthy food lovers seeking specific meal types.
  
- Detailed Recipe Pages: Provides clear, minimalistic recipe details (recipe-detail.html) with step-by-step instructions, ingredient checklists, and expandable nutrition info, designed for beginners and travelers recreating authentic Japanese dishes.
  
- Interactive Star Rating System: Features a dynamic 5-star rating display (star-rating.js) on recipe pages, reflecting user reviews (e.g., "Reviewed by 33 users"), aiding decision-making for foodies and those preferring user feedback.
  
- Robust Form Validation: Implements secure sign-up, login, and contact forms (input-logic.js) with email and password validation, ensuring a smooth experience for professionals and students managing accounts efficiently.
  
- Kitchen Tips Section: Offers expandable long tips and random quick tips (kitchen-tips.js) from JSON data (kitchen-tips.json, quick-tips.json), supporting beginners and healthy food lovers with practical cooking advice.
  
- Responsive Design: Adapts layouts for mobile and desktop users (e.g., recipe-detail.css media queries), meeting the needs of time-constrained users like students and travelers accessing recipes on the go.
  
- Favorites System: Enables users to save favorite recipes using localStorage, accessible across pages (filter-recipes.js, main-recipes.js), enhancing usability for foodies and vegetarians tracking preferred dishes.

## USAGE GUIDELINES
1.Navigating Recipes: Browse the homepage (index.html) for recent and top-rated Japanese recipes via the carousel. Use the "Load More" button on the recipes page (recipes.html) to explore categorized options (e.g., Drinks, Desserts) filtered with the category buttons.

2.Viewing Details: Click a recipe card to access recipe-detail.html for step-by-step instructions, ingredient checklists, and nutrition info (toggle with "Nutrition Info ▼"). Check user ratings (displayed as stars) to guide your choice.

3.Managing Favorites: Click the heart icon on recipe cards to save favorites, accessible across pages via localStorage. View saved recipes on your profile after signing in.

4.Account Interaction: Sign up or log in (sign-up.html, log-in.html) using valid email and password formats (e.g., 8+ characters, one special character). Contact us (contact-us.html) for support with required fields.

5.Accessibility: The site is responsive—use on desktop or mobile. Toggle ingredients on mobile (recipe-detail.css media query) with the "Show Ingredients" button.

6.Tips Exploration: Visit kitchen-tips.html for long tips (expandable) and quick tips (randomized with a shuffle button), ideal for beginners and healthy cooking enthusiasts.
