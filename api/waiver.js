export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { journalName, institution, waiverInfo, apiKey } = req.body;
  if (!apiKey || !apiKey.startsWith("sk-ant-")) return res.status(401).json({ error: "Valid Anthropic API key required." });
  if (!journalName || !institution) return res.status(400).json({ error: "Missing fields" });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [{ role: "user", content: `For the journal "${journalName}", check if institutions from "${institution}" are eligible for APC waivers or discounts. Policy: "${waiverInfo}". Give a concise 2-3 sentence answer.` }],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: data.error?.message || "API error" });
    const text = data.content?.map(b => b.text || "").join("") || "";
    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
