"use client"; // Needed for useEffect in Next.js App Router
import { useState, useEffect } from "react";

export default function Home() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("software");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/news/${category}`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news:", error));
  }, [category]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Job News</h1>
      <p>Select a category to get the latest job news!</p>

      <select onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
        <option value="software">Software Jobs</option>
        <option value="finance">Finance Jobs</option>
        <option value="marketing">Marketing Jobs</option>
        <option value="healthcare">Healthcare Jobs</option>
        <option value="government">Government Jobs</option>
      </select>

      <ul className="mt-4">
        {news.length > 0 ? (
          news.map((item, index) => (
            <li key={index} className="mt-2">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {item.title}
              </a>
            </li>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </ul>
    </div>
  );
}
