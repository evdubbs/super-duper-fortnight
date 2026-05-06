# Evan Dubey — Personal Website

This repository holds a simple, modern personal website for Evan Dubey. It's built with plain HTML, CSS, and JavaScript so you can edit and extend it easily.

## 📁 Files you care about

- `index.html` — main site with Home, About, Projects, Contact
- `style.css` — styles and responsive layout
- `script.js` — theme toggle, smooth scroll, contact handler

## 🚀 Quick preview

Open `index.html` in VS Code and use the Live Server extension to preview locally, or view the site after you push to GitHub Pages.

### Run locally in Codespaces or VS Code

1. Open this folder in VS Code
2. Install the **Live Server** extension (optional)
3. Open `index.html` and choose **Open with Live Server** or just open the file in a browser

## ✏️ Personalize the site

- Update your name, role, and bio in `index.html` (look for `Evan Dubey` and `Grade 10`)
- Change the email in the profile card and in `script.js` (mailto URL in the contact form handler)
- Replace social links in `index.html` with your profiles
- To add a resume: put `resume.pdf` in the repository root and the "Download Resume" button will open it

## 📤 Commit & deploy (push to GitHub)

Use these commands in the terminal if you're comfortable with git:

```bash
git add .
git commit -m "Personalize site: update homepage and styles"
git pull --rebase origin main    # integrate remote changes first
git push origin main
```

After pushing, enable GitHub Pages in the repository settings (Source: `main` / root) if not already enabled. It may take a minute to publish.

## 🛠️ Tips & next steps

- Add real project links in the Projects section (replace the placeholder cards)
- Swap the avatar with an image: place your image in the repo and replace the `profile-avatar` element with an `<img>` tag
- Want forms to actually send messages? Use a simple service like Formspree or Netlify Forms (requires extra setup)

If you want, I can:

- Add your real social links and email now
- Add real project entries with links to your repositories
- Deploy and verify the live site for you

Happy building — tell me which parts you want changed next!
