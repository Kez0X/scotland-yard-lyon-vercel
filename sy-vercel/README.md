# Scotland Yard — Lyon

Version web hébergeable (Vite + React) du jeu, avec multijoueur en ligne via une
base **Upstash Redis** et des fonctions serverless Vercel. Chaque joueur ouvre la
même URL, crée ou rejoint une partie avec un code, et joue depuis son appareil.

## Comment ça marche

- Le front (`src/App.jsx`) est l'application de jeu. L'état partagé d'une partie
  est lu/écrit via `GET`/`POST /api/room` (sondage toutes les 2,5 s).
- `api/room.js` est une fonction serverless qui stocke l'état dans Upstash Redis.
- L'identité du joueur (id + nom) est conservée en `localStorage` dans son navigateur.

## Déployer sur Vercel (≈ 5 minutes)

1. **Mettre le code sur GitHub** (ou GitLab/Bitbucket) : créez un dépôt et poussez
   le contenu de ce dossier.
2. **Importer dans Vercel** : sur https://vercel.com → *Add New… → Project* →
   sélectionnez le dépôt. Vercel détecte Vite tout seul (build `vite build`,
   sortie `dist`). Ne déployez pas encore, ou déployez puis ajoutez la base.
3. **Ajouter la base Redis** : dans le projet Vercel → onglet **Storage** →
   *Create / Connect Database* → **Marketplace** → **Upstash** → **Redis**.
   Créez une base (plan gratuit suffisant pour tester) et connectez-la au projet.
   Vercel injecte automatiquement les variables d'environnement
   (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`).
   - Alternative en ligne de commande : `vercel install upstash`.
4. **Redéployer** : onglet *Deployments* → *Redeploy* (nécessaire pour que la
   fonction voie les nouvelles variables).
5. **Jouer** : ouvrez l'URL `*.vercel.app`, créez une partie, partagez l'URL + le
   code à vos collègues. Un seul Mister X, les autres en détectives, l'hôte lance.

## Développer en local

```bash
npm install
cp .env.example .env.local   # puis remplir avec les identifiants Upstash
npm run dev                  # http://localhost:5173
```

Les identifiants Upstash se trouvent dans la console Upstash (base Redis →
section *REST API*). Sans eux, l'API renverra une erreur explicite mais le jeu
se chargera quand même.

## Notes

- **Position cachée de Mister X** : par honnêteté entre joueurs. Sa position est
  dans l'état partagé mais l'écran des détectives ne l'affiche jamais ; quelqu'un
  de déterminé pourrait l'inspecter via les outils du navigateur. À garder pour
  des parties entre amis.
- **Limites Upstash (plan gratuit)** : le sondage consomme des commandes Redis.
  À 2,5 s, comptez ~1 500 lectures/heure par joueur. Largement suffisant pour des
  sessions de test ; surveillez votre quota si vous laissez tourner longtemps.
- **Tailwind** est chargé via CDN (`index.html`) pour aller vite. Pour une vraie
  mise en production, installez Tailwind dans le build.
- **Mode « Même écran »** : disponible aussi ici, sans base de données — un seul
  appareil qu'on se passe.
