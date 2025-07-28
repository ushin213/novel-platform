import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import Link from "next/link";
import { translateText } from "@/lib/translate";

export default function NovelDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [translated, setTranslated] = useState(null);
  const [translating, setTranslating] = useState(false);

  // 翻訳実行関数
  const handleTranslate = async () => {
    setTranslating(true);
    try {
      const result = await translateText(novel.content, "en"); // 他言語なら "hi" などに変更可
      setTranslated(result);
    } catch (err) {
      alert("翻訳エラー: " + err.message);
    }
    setTranslating(false);
  };

  // 削除処理
  const handleDelete = async () => {
    const ok = confirm("本当に削除しますか？");
    if (!ok) return;

    try {
      await deleteDoc(doc(db, "novels", id));
      alert("削除が完了しました。");
      router.push("/");
    } catch (err) {
      console.error("削除エラー:", err);
      alert("削除に失敗しました。");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchNovel = async () => {
      const docRef = doc(db, "novels", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setNovel(docSnap.data());
      } else {
        console.error("小説が見つかりません");
      }
      setLoading(false);
    };

    fetchNovel();
  }, [id]);

  if (loading) return <div className="p-6">読み込み中...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link href="/" className="text-blue-500 underline">
        ← トップに戻る
      </Link>

      {novel ? (
        <div className="mt-4">
          <h1 className="text-2xl font-bold mb-2">{novel.title}</h1>
          <p className="whitespace-pre-wrap text-gray-800">{novel.content}</p>

          {/* 翻訳ボタン */}
          <button
            onClick={handleTranslate}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {translating ? "翻訳中..." : "英語に翻訳"}
          </button>

          {/* 翻訳結果 */}
          {translated && (
            <div className="mt-4 bg-gray-100 p-4 rounded">
              <h3 className="font-bold mb-2">翻訳結果：</h3>
              <p className="whitespace-pre-wrap text-gray-700">{translated}</p>
            </div>
          )}

          {/* 削除ボタン */}
          <button
            onClick={handleDelete}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            この小説を削除する
          </button>
        </div>
      ) : (
        <p>小説が見つかりませんでした。</p>
      )}
    </div>
  );
}
