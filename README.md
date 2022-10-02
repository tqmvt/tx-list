<div align="center">
  <h1>Tx List</h1>
  <p>Next.js + Tailwind CSS + TypeScript packed with useful development features.</p>
  <p>Made by <a href="https://github.com/launchdex">launchdex</a></p>
</div>

<br />

## Description

- Built the ui using Next.js(TS) and Tailwind CSS
- Fetched latest 100 DAI transfers from Alchemy
- Added new transfers by subscribing event in ethers
- Added a bit of animation for new transfers
- Added mobile responsiveness

<br />


## Features

This repository is packed with:

- ⚡️ Next.js 12
- ⚛️ React 18
- ✨ TypeScript
- 💨 Tailwind CSS 3 — Configured with CSS Variables to extend the **primary** color
- 💎 Pre-built Components — Components that will **automatically adapt** with your brand color, [check here for the demo](https://tsnext-tw.thcl.dev/components)
- 🃏 Jest — Configured for unit testing
- 📈 Absolute Import and Path Alias — Import components using `@/` prefix
- 📏 ESLint — Find and fix problems in your code, also will **auto sort** your imports
- 💖 Prettier — Format your code consistently
- 🐶 Husky & Lint Staged — Run scripts on your staged files before they are committed
- 🤖 Conventional Commit Lint — Make sure you & your teammates follow conventional commit
- ⏰ Release Please — Generate your changelog by activating the `release-please` workflow
- 👷 Github Actions — Lint your code on PR
- 🚘 Automatic Branch and Issue Autolink — Branch will be automatically created on issue **assign**, and auto linked on PR
- 🔥 Snippets — A collection of useful snippets
- 👀 Default Open Graph — Awesome open graph generated using [og](https://github.com/theodorusclarence/og), fork it and deploy!
- 🗺 Site Map — Automatically generate sitemap.xml
- 📦 Expansion Pack — Easily install common libraries, additional components, and configs

  <br />

## Getting Started

### 1. Install dependencies

It is encouraged to use **yarn** so the husky hooks can work properly.

```bash
yarn install
```

### 2. Environment variables

Duplicate .env.example to .env.local

### 3. Run the development server

You can start the server using this command:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Commit Message Convention

This app is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), it is mandatory to use it to commit changes.

### 5. Test

You can run the tests using this command:

```bash
yarn test
```
