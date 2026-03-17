const SYSTEM_PROMPT = `You are an expert academic publishing advisor. Given a research abstract, recommend exactly 6 journals and return ONLY a valid JSON array with no extra text, no markdown, no backticks.

Each journal object must have these exact keys:
{
  "rank": number (1-6), "name": string, "publisher": string,
  "quartile": "Q1"|"Q2"|"Q3"|"Q4", "impactFactor3yr": number,
  "oaType": "Full OA"|"Hybrid"|"Subscription",
  "oaNote": string, "apcAmount": string or null,
  "reviewType": string, "acceptanceRate": string,
  "submissionToDecision": string, "wordLimits": string,
  "indexing": string, "fitReasons": array of 5 strings,
  "waiverInfo": string, "specialIssue": string or null,
  "homepageUrl": string, "submissionUrl": string, "scope": string
}
Be specific and accurate. Use realistic values based on your knowledge.`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { abstract, apiKey } = req.body;
  if (!abstract) return res.status(400).json({ error: "Abstract required" });
  if (!apiKey || !apiKey.startsWith("sk-ant-")) return res.status(401).json({ error: "Valid Anthropic API key required." });

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
        max_tokens: 4000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: "Analyze this abstract and recommend 6 journals:\n\n" + abstract }],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: data.error?.message || "API error — check your API key" });
    const text = data.content?.map(b => b.text || "").join("") || "";
    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
