# Mahesh Rasam — Portfolio Website

A clean, responsive portfolio built with React + Vite. Ready to deploy on Vercel in minutes.

---

## 📁 Project Structure

```
mahesh-portfolio/
├── public/
│   ├── favicon.svg
│   └── Mahesh_Rasam_Resume.pdf   ← PUT YOUR RESUME PDF HERE
├── src/
│   ├── App.jsx                   ← Main portfolio component
│   ├── main.jsx                  ← React entry point
│   └── index.css                 ← Global styles
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Local Setup

### Step 1 — Install Node.js
Download and install Node.js (v18 or higher) from https://nodejs.org

### Step 2 — Add your Resume PDF
Copy your resume PDF into the `public/` folder and name it exactly:
```
Mahesh_Rasam_Resume.pdf
```

### Step 3 — Install dependencies
Open a terminal in the project folder and run:
```bash
npm install
```

### Step 4 — Start the dev server
```bash
npm run dev
```
Open http://localhost:5173 in your browser. Done!

---

## 🌐 Deploy to Vercel

### Option A — Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the project folder:
```bash
vercel
```
Follow the prompts — accept all defaults. Your site will be live at a `*.vercel.app` URL!

4. For future updates, deploy again with:
```bash
vercel --prod
```

---

### Option B — Deploy via GitHub + Vercel Dashboard

1. Push this project to a GitHub repository:
```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/mahesh-portfolio.git
git push -u origin main
```

2. Go to https://vercel.com and sign in with GitHub

3. Click **"Add New Project"** → Import your GitHub repo

4. Vercel will auto-detect Vite. Leave all settings as default.

5. Click **Deploy** — your site goes live in ~30 seconds!

---

## 🔧 Customisation Tips

- **Update resume PDF**: Replace `public/Mahesh_Rasam_Resume.pdf` with your latest resume
- **Update contact info**: Edit the contact array in `src/App.jsx`
- **Add a custom domain**: In Vercel Dashboard → Project → Settings → Domains

---

## 🛠 Tech Stack

- React 18
- Vite 5
- Plain CSS (no CSS framework)
- Google Fonts — Plus Jakarta Sans
- Deployed on Vercel
