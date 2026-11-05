# Snug Cafe — Sip, Snuggle, Repeat ☕🐧

A marketing campaign and interactive web application for **Snug Cafe**, featuring signature drink and tabletop plushie promos, multi-item cozy cart purchasing, table reservation planner, and brand storytelling.

---

## 🚀 Deploying to GitHub Pages

This project is pre-configured with relative asset paths (`base: './'`) and an automated GitHub Actions deployment workflow.

### Option A: Automatic Deployment via GitHub Actions (Recommended)

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Snug Cafe"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. On GitHub, navigate to your repository and click **Settings**.
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** → **Source**, select **GitHub Actions**.
5. The included workflow (`.github/workflows/deploy.yml`) will automatically trigger, build the project, and publish your site at:
   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```

### Option B: Manual Static Build

1. Build the production bundle:
   ```bash
   npm install
   npm run build
   ```
2. The generated `dist/` folder contains the static HTML, CSS, JS, and image assets.
3. You can deploy the `dist/` directory directly to GitHub Pages (via `gh-pages` branch), Vercel, Netlify, or any static hosting service.

---

## 💻 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Type check & Lint:**
   ```bash
   npm run lint
   ```

4. **Production Build:**
   ```bash
   npm run build
   ```

---

## 🎨 Brand Identity & Palette

- **Toffee Brown (`#3D231E`)**: Pantone 4975 C — Grounding, deep espresso warmth.
- **Oat (`#FAF6EB` / `#F4EEDC`)**: Pantone P 1-3 C — Creamy oat milk canvas.
- **Strawberry Pink (`#E8A2A5` / `#D07A7E`)**: Pantone P 62-3 C — Gentle blush rose accent.
- **Olive (`#9B8B59`)**: Pantone P 9-13 U — Earthy matcha tranquility.

---

## 📋 Features

- **Signature Drink & Buddy Promos**: Pebble Choco Proposal Bundle, Capybara Hot Spring Cocoa, and The Mossy Bear Matcha Latte.
- **Tabletop Plushie Companionship**: Clear guidelines for dine-in plushie rentals vs keepsake take-home buddies.
- **Multi-Item Cozy Cart**: Quantity adjustment, subtotal calculation, format verification (Dine-in required for rentals), and barista ticket generation.
- **Snug Pass Reservation Planner**: Customizable party size, date, arrival time, and instant digital pass generator.
- **Fully Responsive**: Optimized for Mobile, Tablet (iPad), and Desktop viewports.
