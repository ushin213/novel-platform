// pages/api/translate.js

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { text, targetLang } = req.body;
  const apiKey = process.env.DEEPL_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "APIキーが設定されていません" });
  }

  try {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        auth_key: apiKey,
        text,
        source_lang: "JA",
        target_lang: targetLang.toUpperCase(), // 例: "EN"
      }),
    });

    const data = await response.json();

    if (!data.translations || !data.translations[0]) {
      return res.status(500).json({ error: "翻訳に失敗しました" });
    }

    res.status(200).json({ translatedText: data.translations[0].text });
  } catch (error) {
    console.error("DeepL API通信エラー:", error);
    res.status(500).json({ error: "DeepLへの接続に失敗しました" });
  }
}
