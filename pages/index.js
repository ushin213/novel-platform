import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "novels"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(docs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">投稿された小説</h1>

      <Link href="/post" className="text-blue-500 underline">
        ▶ 小説を投稿する
      </Link>

      {/* 🔗 自己紹介リンク（転職用） */}
      <p className="mt-6 text-sm text-gray-600">
        開発者:{" "}
        <a
          href="https://github.com/ushin213"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          GitHub プロフィール
        </a>{" "}
        / サイトURL:{" "}
        <a
          href="https://novelplatform.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          公開サイトはこちら
        </a>
      </p>

      <ul className="space-y-4 mt-6">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
