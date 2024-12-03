# TaskPro

**TaskPro** is a web application inspired by [Trello](https://trello.com), designed to streamline team collaboration and daily task management. Its goal is to simplify task organization while enhancing productivity for both teams and individuals.

## Features

-   **Boards, Columns, and Cards**: Organize tasks into customizable boards, columns, and cards.
-   **Drag-and-Drop**: Rearrange columns and cards effortlessly with a smooth drag-and-drop interface.

## System Design

TaskPro is built using modern web development tools and technologies:

### **Frontend**

-   **React (v18.x)**: The core library for building user interfaces.
-   **Vite**: A lightning-fast development environment.
-   **Material-UI (MUI v5.x)**: A powerful component library UI design.
-   **DNDKit (Core v6.1.0, Sortable v7.x)**: Handles drag-and-drop interactions.
-   **Material-UI Popup State (v5.x)**: Enhanced pop-ups improve user experiences.
-   **Vite Plugin SVGR (v3.x)**: Facilitates SVG file integration into React components.

### **Development Tools**

-   **ESLint (v8.x)**: Enforces consistent and error-free coding practices.

### **Folder Structure**

Folder src is organized into a clean and modular folder structure:

-   **`apis`**: Contains mock data for testing at the frontend.
-   **`assets`**: Stores static files like images, SVGs, and other media resources.
-   **`components`**: Reusable UI components such as headers, footers, etc.
-   **`pages`**: Contains major components like the Board and Authentication pages.
-   **`redux`**: Includes Redux-related state management files.
-   **`utils`**: Provides utility functions and reusable variables for simplifying logic across components.

## Prerequisites

-   **Node.js (>= v18.x)**: Ensure node is running this version.
