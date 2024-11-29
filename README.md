# TaskPro

**TaskPro** is a web application inspired by [Trello](https://trello.com), designed to streamline team collaboration and daily task management. Its goal is to simplify task organization while enhancing productivity for both teams and individuals.

## Features

TaskPro incorporates key features similar to Trello, including:

-   **Boards, Columns, and Cards**: Organize tasks into customizable boards, columns, and cards.
-   **Drag-and-Drop**: Rearrange columns and cards effortlessly with a smooth drag-and-drop interface.

## System Design

TaskPro is built using modern web development tools and technologies:

### **Frontend**

-   **React (v18.2.0)**: The core library for building a dynamic and interactive user interface.
-   **Vite**: A lightning-fast development environment for better performance.
-   **Material-UI (MUI v5.16.7)**: A powerful component library for creating a professional and responsive design.
-   **DNDKit (Core v6.1.0, Sortable v7.0.2)**: Handles drag-and-drop interactions, providing fluid task reordering.
-   **Material-UI Popup State (v5.3.1)**: Enhanced pop-ups improve user experiences.

### **Development Tools**

-   **ESLint (v8.38.0)**: Enforces consistent and error-free coding practices.
-   **Vite Plugin SVGR (v3.3.0)**: Facilitates SVG file integration into React components.

### **Folder Structure**

The project is organized into a clean and modular folder structure:

-   **`apis`**: Contains mock data for testing at the frontend.
-   **`assets`**: Stores static files like images, SVGs, and other media resources.
-   **`components`**: Reusable UI components such as headers, footers, etc.
-   **`pages`**: Contains major components like the Board and Authentication pages.
-   **`redux`**: Includes Redux-related state management files.
-   **`utils`**: Provides utility functions and reusable variables for simplifying logic across components.

## Prerequisites

-   **Node.js (v18.x.x)**: Ensure your system is running this version.
