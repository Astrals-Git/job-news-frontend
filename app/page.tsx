"use client"; // Required for useEffect in Next.js App Router
import { useState, useEffect } from "react";

// ✅ Define the expected type of job news items
type JobNews = {
  title: string;
  link: string;
};

export default function Home() {
  const [news, setNews] = useState<JobNews[]>([]); // State to store job news
  const [category, setCategory] = useState<string>("software");
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // ✅ Fetch job news from backend API when category changes
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/news/${category}`);
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data: JobNews[] = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Job News</h1>
      <p>Select a category to get the latest job news!</p>

      {/* Category Dropdown */}
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded mt-2"
      >
        <option value="software">Software Jobs</option>
        <option value="finance">Finance Jobs</option>
        <option value="marketing">Marketing Jobs</option>
        <option value="healthcare">Healthcare Jobs</option>
        <option value="government">Government Jobs</option>
      </select>

      {/* Display News List */}
      <div className="mt-4">
        {loading ? (
          <p>Loading latest job news...</p>
        ) : news.length > 0 ? (
          <ul>
            {news.map((item, index) => (
              <li key={index} className="mt-2">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No news available. Try a different category.</p>
        )}
      </div>
    </div>
  );
}
