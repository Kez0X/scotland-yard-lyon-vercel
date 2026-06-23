import { Redis } from "@upstash/redis";

// L'intégration Upstash sur Vercel injecte ces variables automatiquement.
// On accepte les deux conventions de nommage (UPSTASH_* ou KV_*).
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

const PREFIX = "sy:"; // espace de noms pour éviter les collisions
const TTL = 60 * 60 * 24; // les parties expirent après 24 h

export default async function handler(req, res) {
  if (!redis) {
    res.status(500).json({
      error:
        "Base Redis non configurée. Ajoutez l'intégration Upstash (Vercel → Storage → Marketplace) puis redéployez.",
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
