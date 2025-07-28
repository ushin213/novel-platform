export async function translateText(text, targetLang = "en") {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      targetLang,
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.translatedText;
}
