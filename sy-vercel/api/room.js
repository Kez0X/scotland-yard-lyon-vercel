import { Redis } from "@upstash/redis";

// Détection robuste des identifiants Upstash, quel que soit le préfixe que
// l'intégration Vercel a ajouté (ex: UPSTASH_REDIS_REST_KV_REST_API_URL).
function findEnv(test) {
  for (const [k, v] of Object.entries(process.env)) {
    if (v && test(k)) return v;
  }
  return undefined;
}

// URL REST (https://...) : on prend la variable se terminant par REST_API_URL.
const url =
  process.env.UPSTASH_REDIS_REST_KV_REST_API_URL ||
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  findEnv((k) => /REST_API_URL$/.test(k));

// Token en LECTURE/ÉCRITURE : terminant par REST_API_TOKEN, jamais READ_ONLY.
const token =
  process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN ||
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  findEnv((k) => /REST_API_TOKEN$/.test(k) && !/READ_ONLY/.test(k));

const redis = url && token ? new Redis({ url, token }) : null;

const PREFIX = "sy:"; // espace de noms
const TTL = 60 * 60 * 24; // les parties expirent après 24 h

export default async function handler(req, res) {
  if (!redis) {
    res.status(500).json({
      error:
        "Base Redis non configurée : variables Upstash introuvables. Vérifiez l'intégration Upstash dans Vercel, puis redéployez.",
    });
    return;
  }

  try {
    if (req.method === "GET") {
      const key = req.query.key;
      if (!key) { res.status(400).json({ error: "paramètre 'key' manquant" }); return; }
      const value = await redis.get(PREFIX + key); // Upstash dé-sérialise le JSON
      res.status(200).json({ value: value ?? null });
      return;
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const { key, value } = body || {};
      if (!key) { res.status(400).json({ error: "champ 'key' manquant" }); return; }
      await redis.set(PREFIX + key, value, { ex: TTL });
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: "méthode non supportée" });
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) });
  }
}
