# CSS Flexbox Playground

An interactive, visual playground for learning and experimenting with CSS Flexbox properties. Built with **React**, **TypeScript**, and **Tailwind CSS v4**.

## 🚀 Overview

The **Flexbox Playground** helps developers regarding of skill level visualize how Flexbox works. It provides a real-time, interactive environment where you can manipulate both the **flex container** and individual **flex items** to see exactly how properties interact.

## ✨ Features

### 🛠 Interactive Workspace
- **Resizable Container**: Drag the bottom-right corner of the container to test responsiveness and wrapping behavior.
- **Floating Controls**:
  - **Flex Properties Panel**: Adjust global container settings (`flex-direction`, `justify-content`, `align-items`, `gap`, etc.).
  - **Item Inspector**: Select any item to tweak its specific properties (`flex-grow`, `flex-shrink`, `order`, `align-self`).
  - **Draggable & Collapsible**: Move panels out of the way or collapse them to focus on the preview.

### 📦 Dynamic Flex Items
- **Add & Remove**: Easily add new items (top-right `+` button) or delete them.
- **Resize Items**: Drag the corner of any item to change its dimensions.
- **Smart Alignment**:
  - Supports `align-items: stretch` with correct auto-sizing logic.
  - Prevents item collapse logic when wrapping.
  - Visual warnings for invalid configurations (e.g., `align-content` having no effect without `flex-wrap`).

### ⚙️ Utilities
- **Get Code**: One-click export of the HTML and CSS for your current layout.
- **Cheat Sheet**: built-in help modal explaining every Flexbox property.
- **Reset**: Quickly restore the playground to its default state.

## 🎮 How to Use

1.  **Adjust Container**: Use the floating **Flex Properties** panel on the left to change the layout direction, alignment, and wrapping.
2.  **Manage Items**:
    - Click the **+** button in the top-right of the container to add items.
    - Hover over an item and click the **Trash** icon to remove it.
    - Drag the bottom-right corner of any item to resize it manually.
3.  **Inspect Items**: Click on any item to open the **Item Inspector**. Here you can set specific `flex-grow`, `order`, or `align-self` values.
4.  **Export**: Click the **Code** button (bottom-right FAB) to copy the generated CSS.

## 💻 Tech Stack

-   **Frontend**: React (v19), TypeScript
-   **Styling**: Tailwind CSS (v4)
-   **Build Tool**: Vite
-   **Icons**: Lucide React
-   **UI Components**: Radix UI (Dialog), React-Draggable, React-Resizable

## 📦 Installation

To run this project locally:

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd flexbox_playground
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

---

*Built for educational purposes to make CSS Flexbox easier to understand.*
