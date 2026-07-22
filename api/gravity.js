export default async function handler(req, res) {
  // フロントエンドから送られてきた緯度(lat)と経度(lon)を受け取る
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "緯度と経度が正しく渡されていません" });
  }

  // 国土地理院のAPI URLを構築
  const apiUrl = `https://vldb.gsi.go.jp/sokuchi/gsigra/calc/api/gravityCalculation?unit=decimal&lat=${lat}&lon=${lon}&dH=0`;

  try {
    // サーバー側（Vercel）から国土地理院APIへリクエスト（ここでCORSは発生しません）
    const response = await fetch(apiUrl);
    const data = await response.json();

    // 取得した結果をそのままフロントエンドへ返す
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "重力値の取得中にエラーが発生しました" });
  }
}