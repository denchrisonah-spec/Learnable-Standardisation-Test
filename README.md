# Bandage — E-Commerce Store

## Project Overview
This project is a functional frontend implementation of the "Bandage" Figma design. It is built from scratch using **React, Vite, and TypeScript**, entirely styled with **hand-written CSS** (no CSS frameworks or component libraries). State management and API data fetching are handled seamlessly using **Redux Toolkit** and **RTK Query** with mock data provided by the DummyJSON API.

## Installation Instructions
To get this project up and running on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/denchrisonah-spec/Learnable-Standardisation-Test.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Learnable-Standardisation-Test
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Application Locally
Once dependencies are installed, start the local Vite development server:

```bash
npm run dev
```
Open `http://localhost:5173` (or the port specified in your terminal) in your browser to view the application in development mode with Hot Module Replacement (HMR).

## Build and Deployment Instructions
To create a production-ready build of the application:

1. Run the build command (which includes TypeScript type-checking):
   ```bash
   npm run build
   ```
   This will bundle and output the optimized static assets into the `dist/` directory.

2. You can preview the production build locally before deploying:
   ```bash
   npm run preview
   ```
   
## Live Deployment URL
**Netlify Live Link:** https://bandagelst.netlify.app/ 

**Git Link:** https://github.com/denchrisonah-spec/Learnable-Standardisation-Test.git

## Assumptions & Implementation Notes
* **Design Fidelity:** Accuracy was prioritized by directly measuring dimensions against the Figma file. Breakpoints (`640px`, `768px`, `1024px`) were added to make the desktop-only comp fully responsive.
* **Pure CSS Strategy:** The application strictly uses plain, handwritten CSS. Design tokens from Figma (like `--color-primary`) are mapped to CSS custom properties in `src/styles/global.css`. Each component explicitly owns its local stylesheet (e.g., `Header.tsx` corresponds to `Header.css`) utilizing a custom Block-Element-Modifier (BEM) naming convention.
* **State Management:** **Redux Toolkit** handles global UI state (like the shopping cart and wishlist quantities). **RTK Query** handles asynchronous data fetching, deduping, and caching. 
* **Dynamic vs. Static Content:** While elements like the Bestseller Grid, Featured Posts, and Cart Badge dynamically pull data from the API, specific sections (like Hero Tiles and Testimonials) render static imagery to preserve the exact look of the designer's photography.
* **Pagination Design:** Instead of replacing the product grid when paginating, successive product pages are merged into the cache entry via `serializeQueryArgs` to mimic an infinite-scroll "Load More" behavior.
