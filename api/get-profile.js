export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const bodyParams = req.body;

    if (!bodyParams.username) {
      return res.status(400).json({ error: "Missing 'username' parameter." });
    }

    // Prepare payload for RobTop's search endpoint
    const payload = new URLSearchParams({
      str: bodyParams.username, // The name you are searching for
      secret: "Wmfd2893gb7"     // Standard GD secret key
    });

    const gdResponse = await fetch("http://boomlings.com/database/getGJUsers20.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "" // Keeps proxy anonymous to slip past firewalls
      },
      body: payload.toString()
    });

    const rawData = await gdResponse.text();
    
    if (rawData === "-1" || !rawData) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).send(rawData);

  } catch (error) {
    return res.status(500).json({ error: "Internal Proxy Error: " + error.message });
  }
}


  } catch (error) {
    return res.status(500).json({ error: "Internal Proxy Error: " + error.message });
  }
}
