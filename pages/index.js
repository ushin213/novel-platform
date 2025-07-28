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

    // コンポーネントが破棄されたら購読を解除
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">投稿された小説</h1>
      <Link href="/post" className="text-blue-500 underline">▶ 小説を投稿する</Link>
      <ul className="space-y-4 mt-6">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow">
            <Link href={`/novel/${post.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
              {post.title}
             </h2>
            </Link>
            <p className="mt-2 text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
