# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development mode**: `npm run electron-dev` - Runs Vite dev server and Electron concurrently
- **Build application**: `npm run dist` - Creates distributable packages for all platforms
- **Build without packaging**: `npm run dist:dir` - Builds to release directory without creating installers
- **Vite dev server only**: `npm run dev` - Runs frontend development server at http://localhost:5173 (uses configs/vite.config.ts)
- **Electron only**: `npm start` - Runs Electron in production mode

**Note**: Configuration files are now organized in the `configs/` directory, and documentation files are in the `docs/` directory for better project structure.

## Architecture Overview

This is an Electron-based desktop application following the main process/renderer process architecture:

### Main Process (electron/)
- `main.js` - Entry point, manages BrowserWindow and handles all native OS operations
- `preload.js` - Securely exposes APIs to renderer process using contextBridge
- All file system operations are handled here via IPC handlers

### Renderer Process (src/)
- React application with TypeScript and Material-UI
- Redux Toolkit for state management with feature-based slices
- TipTap for rich text editing capabilities

### Key Architectural Patterns

1. **IPC Communication**:
   - Renderer process never directly accesses Node.js APIs
   - All native operations go through `window.electronAPI` exposed in preload.js
   - API layer in `src/api/` abstracts IPC calls

2. **Redux Structure**:
   - Feature-based slices in `src/features/`
   - Each feature contains its own reducer, actions, and selectors
   - Central store configuration in `src/app/store.ts`

3. **Component Organization**:
   - Feature components in `src/features/[feature]/`
   - Each feature contains subcomponents in `components/` directory
   - Feature-specific hooks in `[feature]/hooks/` directory
   - Feature-specific styles in `[feature]/styles/` directory
   - **Outline Module Structure**:
     ```
     src/features/outline/
     ├── components/
     │   ├── OutlineNavigator.tsx      # Main navigation
     │   └── modules/                  # 8 sub-modules
     │       ├── StoryOverview/
     │       ├── CharacterRelations/   # Includes relationship visualization
     │       ├── PlotTimeline/
     │       ├── WorldBuilding/
     │       ├── ChapterOutline/
     │       ├── ThemeExploration/
     │       ├── SubplotManager/
     │       └── CreativeIdeas/
     ├── hooks/
     │   ├── useOutlineData.ts
     │   └── useModuleSync.ts          # Inter-module data sync
     ├── services/
     │   ├── outlineStorage.ts         # LowDB persistence
     │   └── dataExport.ts
     └── types/
         └── outline.types.ts          # All outline-related types
     ```
   - Shared components in `src/components/`
   - Shared custom hooks in `src/hooks/`
   - Utility functions in `src/utils/`

### Current Implementation Status

#### Phase 1: Basic Editor Platform ✅ (Completed)

- [x] Project structure initialization (Electron + React + TypeScript)
- [x] Dependencies configuration (MUI, Redux Toolkit, TipTap)
- [x] Main process with file operation APIs
- [x] Core editor component using TipTap
- [x] File operations (new, open, save, save as)
- [x] Real-time word count functionality
- [x] Auto-save mechanism (3-second delay after last edit)
- [x] **Code Quality Optimization** (2025-08-04):
  - Refactored Editor.tsx from 264 lines to 40 lines
  - Implemented modular component architecture
  - Eliminated code redundancy with utility functions
  - Reorganized project structure (configs/, docs/ directories)
  - Created feature-specific hooks and styles

#### Phase 2: Outline-Centered Creation System ✅ **(COMPLETED - 2025-08-04)**

**Architecture Decision (2025-08-04)**: Merged overlapping modules into a unified Outline system based on novel writing methodology.

- [x] **Outline Core Module** (`src/features/outline/`) - Central hub for all novel planning features ⭐ **COMPLETED**
  - [x] 1️⃣ **Story Overview Module** ⭐ **(COMPLETED)** - Story background, core themes, synopsis with 起承转合 structure
  - [x] 2️⃣ **Character Relations Module** ⭐ **(COMPLETED)** - Character profiles + relationship visualization (merged original mindmap functionality)
  - [x] 3️⃣ **Plot Timeline Module** ⭐ **(COMPLETED)** - Event timeline with ReactFlow visual timeline and event management
  - [x] 4️⃣ **World Building Module** ⭐ **(COMPLETED)** - Geography, society, history settings with comprehensive world design
  - [x] 5️⃣ **Chapter Outline Module** ⭐ **(COMPLETED)** - Chapter breakdown with scene management, structure overview
  - [x] 6️⃣ **Theme Exploration Module** ⭐ **(COMPLETED)** - Deep theme analysis, character motivations, philosophical reflection
  - [x] 7️⃣ **Subplot Manager Module** ⭐ **(COMPLETED)** - Secondary plots, character stories, weaving strategy
  - [x] 8️⃣ **Creative Ideas Module** ⭐ **(COMPLETED)** - Ideas management, plot alternatives, inspiration sources

**Implementation Highlights (2025-08-04)**:
- ✅ All 8 core modules fully implemented with modular architecture
- ✅ Comprehensive type system (`outline.types.ts`) with 360+ lines of structured data definitions
- ✅ Redux integration with complete state management (`outlineSlice.ts`) with 466 lines
- ✅ Modular component architecture - each component under 200 lines (following code architecture guidelines)
- ✅ ReactFlow integration for visual timeline and relationship mapping
- ✅ Comprehensive UI with Material-UI components and consistent design patterns

**Still In Progress**:
- 🔄 Data synchronization between all 8 modules (high priority)
- 🔄 Export capabilities for outline data (medium priority)
- 🔄 Local storage using LowDB with modular JSON structure
- ✅ Visual components using ReactFlow for relationship maps and timelines **(COMPLETED)**

#### Phase 3: Language Optimization & Assistant Features (Pending)

- [ ] Spell check and text polishing
- [ ] Plot suggestion system
- [ ] Text-to-speech (TTS) functionality

#### Phase 4: Experience Optimization (Pending)

- [ ] Focus mode ("小黑屋") for distraction-free writing
- [ ] Lock reading mode with fullscreen and dark theme

### Important Notes

- The application is designed to work completely offline
- All data is stored locally on the user's machine
- TypeScript is strictly enforced for type safety
- Material-UI is the primary component library
- Word count calculation filters HTML tags and counts Chinese characters separately from English words

### Design Philosophy

**Outline-Centered Architecture**: Based on professional novel writing methodology, the application treats the outline as the central hub containing 8 specialized modules rather than separate disconnected features. This approach:
- Eliminates functional overlap (e.g., character relationships merged with visualization)
- Ensures data consistency across all planning aspects
- Provides a natural workflow following the novel creation process
- Maintains modular architecture while enabling seamless inter-module communication

**Visual-First Approach**: Key planning features (character relationships, plot timelines, chapter flow) prioritize visual representation using ReactFlow and other visualization libraries to enhance creative thinking and pattern recognition.