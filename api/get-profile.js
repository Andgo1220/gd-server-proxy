export default async function handler(req, res) {
  // 1. Enable CORS for your GitHub Pages site
  res.setHeader('Access-Control-Allow-Origin', 'https://andgo1220.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. Parse the body parameters from your client-side fetch
    const bodyParams = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    
    const payload = new URLSearchParams({
      targetAccountID: bodyParams.targetAccountID,
      secret: "Wmfd2893gb7"
    });

    // 3. Request data directly from RobTop's database
    const gdResponse = await fetch("http://boomlings.com/database", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "" // Blanks out browser indicators to slide past firewalls
      },
      body: payload.toString()
    });

    const rawData = await gdResponse.text();
    
    if (rawData === "-1") {
      return res.status(404).json({ error: "User or Profile not found" });
    }

    return res.status(200).send(rawData);

  } catch (error) {
    return res.status(500).json({ error: "Internal Proxy Error: " + error.message });
  }
}
