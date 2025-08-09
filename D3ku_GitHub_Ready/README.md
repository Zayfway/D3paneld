# D3ku Project

Ce dépôt contient trois dossiers :

- `frontend/` — site à déployer sur **Vercel** (mobile, gradient bleu, drapeau 🇫🇷 aligné, page de chargement).
  - **Important :** édite `frontend/config.js` et remplace `https://YOUR_BACKEND_URL` par l'URL publique de ton backend Replit (ex: `https://d3ku-backend-xxx.repl.co`).

- `backend/` — API Node.js à déployer sur **Replit** (ou Railway).  
  - Variables d'env : `DISCORD_WEBHOOK_URL`.

- `bot/` — Bot Discord Node.js à déployer sur **Replit**.  
  - Variables d'env : `BOT_TOKEN`.

## Déploiement rapide

1. **GitHub** : importe ce dossier sur un repo.
2. **Vercel** : crée un projet et sélectionne le sous-dossier `frontend/` comme racine.
3. **Replit (backend)** : crée un Repl Node.js et importe le sous-dossier `backend/`. Ajoute `DISCORD_WEBHOOK_URL` dans *Secrets*, puis **Run** et récupère l'URL en `.repl.co`.
4. **Config frontend** : mets cette URL dans `frontend/config.js`, commit sur GitHub → Vercel redéploie.
5. **Replit (bot)** : crée un Repl Node.js, importe `bot/`, ajoute `BOT_TOKEN` dans *Secrets*, puis **Run**.
