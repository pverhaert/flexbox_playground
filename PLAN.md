# PLAN.md

## Context
Build a professional, interactive CSS Flexbox Playground for students.
- **Stack:** React (Vite), Tailwind CSS v4, Lucide React icons.
- **Key Features:** Resizable Flex Container & Items, Sidepanel (Container Props), Popover (Item Props), Code Export, Info Panel.
- **Constraint:** NO Emojis. Professional "Senior Architect" code structure.

## Roadmap

### Phase 1: Setup & Infrastructure
- [ ] **1.1: Initialize Project**
    - Create new Vite project (React + TypeScript).
    - Clean up default boilerplate.
- [ ] **1.2: Configure Tailwind CSS v4**
    - Install Tailwind v4 packages.
    - Setup the main CSS file for v4 (using `@theme` and `@import` as per v4 specs).
    - Verify styling is working.
- [ ] **1.3: Install Dependencies**
    - Install `lucide-react` (Icons).
    - Install `clsx` and `tailwind-merge` (for clean class management).
    - Install `@radix-ui/react-popover` (for the accessible Flex Item settings menu).
- [ ] **1.4: Generate Favicon**
    - Create a simple, geometric SVG illustrating a Flex layout.
    - Save as `public/favicon.svg`.

### Phase 2: Architecture & State Management
- [ ] **2.1: Content Analysis (MCP)**
    - *Task:* Read `https://itf-web-essentials.netlify.app/CSS3/flexbox.html`.
    - Extract definitions and property lists to `src/data/flexboxData.ts`.
- [ ] **2.2: Define Types**
    - Create interfaces for `FlexContainerStyle` and `FlexItemStyle`.
    - Define default states.
- [ ] **2.3: Create Global State**
    - Implement `FlexContext` or a custom Hook (`useFlexboxPlayground`) to manage:
        - Container properties.
        - List of items (id, style, content).
        - Selection state.

### Phase 3: The Workspace (UI Shell)
- [ ] **3.1: Layout Scaffold**
    - Create a 3-pane layout: Sidebar (Controls), Main Stage (Canvas), Footer/Overlay (Info/Code).
- [ ] **3.2: Sidepanel Component**
    - Build `ContainerControls.tsx`.
    - Implement dropdowns/selects for `flex-direction`, `wrap`, `justify`, `align-items`, `align-content`.
    - **Crucial:** Add the `gap` input control.
- [ ] **3.3: Main Stage Setup**
    - Create a centered area for the Flex Container.

### Phase 4: The Flex Container (Interactive)
- [ ] **4.1: Resizable Container Logic**
    - Implement a custom `useResizable` hook or component wrapper.
    - Add visual handles (Right, Bottom) to the Container.
- [ ] **4.2: Container Rendering**
    - Apply the Flexbox CSS styles dynamically based on State.
    - Add "Hover to Add Item" overlay/button logic.

### Phase 5: The Flex Items (Interactive)
- [ ] **5.1: Flex Item Component**
    - Render individual items within the container.
    - Apply item-specific styles (`flex-grow`, `order`, etc.).
- [ ] **5.2: Item Resizability**
    - Add resizing handles to each item (min-width/min-height logic).
- [ ] **5.3: Item Hover State**
    - Show `Settings` (Gear) and `Delete` (Trash) icons on hover.
- [ ] **5.4: Item Settings Popover**
    - Implement the Popover triggered by the Gear icon.
    - Inside Popover: Inputs for `align-self`, `order`, `flex-grow`, `flex-shrink`, `flex-basis`.

### Phase 6: Educational Features & Export
- [ ] **6.1: Code Export**
    - Build a function to generate the raw HTML string and CSS class string.
    - Create the "Download Code" modal/button.
- [ ] **6.2: Info Panel**
    - Display a dynamic summary of active properties.
    - Show short definitions of properties (derived from the parsed MCP data).

### Phase 7: Verification & Polish
- [ ] **7.1: UI Audit**
    - **Strict Check:** Ensure NO emojis are used anywhere.
    - Check responsiveness of the UI itself (not just the playground).
- [ ] **7.2: Accessibility Check**
    - Ensure inputs have labels and popovers are keyboard navigable.
- [ ] **7.3: Build & Netlify Prep**
    - Run full build.
    - Create `netlify.toml` if specific redirects/headers are needed (usually not for SPA).