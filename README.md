# CTIS 255 - Frontend Web Technologies Project

This repository contains the final project for the CTIS 255 course (Fall 2025) at Bilkent University, instructed by Serkan GENÇ. The project is a grid-based reflex game implemented strictly using HTML, CSS, JavaScript, and the DOM API.

Project Specifications
Based on the official project requirements, the following features have been implemented:

- Mandatory Cover Page: Displays all project members with their real profile photos.
- Game Mechanics: - A 3-to-1 countdown before the game starts.
    - A 4x4 grid where 3 black tiles appear at random positions.
    - Dynamic tile generation: Clicking a tile turns it green, displays the points, and spawns a new black tile in a different position.
- Scoring & Timer: - A 10-second countdown timer.
    - A shrinking point bar (10 to 0 every 100ms) that determines the points awarded per click.
- Persistence & Effects:
    - High Score: Stored and retrieved using `localStorage`.
    - Confetti Effect: Triggered upon achieving a new high score using the `canvas-confetti` library.
    - Game Over: Displays "Time is up" or "New High Score" with an animated "Press F5 to play again" message.

#Technical Stack
- HTML5 & CSS3: Layout designed with Flexbox and Grid. Includes Google Fonts integration.
- JavaScript (Vanilla):** Logic handled without any external frameworks, using DOM manipulation for all game states.
- Web Storage API: Used for session-persistent High Score tracking.

*Bilkent University - Department of Computer Technology and Information Systems (CTIS)*
