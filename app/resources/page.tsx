"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ResourcesPage() {
  const { data: session, status } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [resources, setResources] = useState<any[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);

  const fetchResources = async () => {
    setLoadingResources(true);
    try {
      const response = await fetch("/api/resources");
      if (response.ok) {
        const data = await response.json();
        setResources(data);
      } else {
        setMessage("Failed to fetch resources list.");
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      setMessage("Error connecting to resource API.");
    } finally {
      setLoadingResources(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setFile(e.target.files[0]);
    else setFile(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file.");
    if (status !== "authenticated")
      return setMessage("You must be logged in to upload.");

    setIsUploading(true);
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`Success → ${result.filename}`);
        setFile(null);
        fetchResources();
      } else {
        setMessage(`Error: ${result.message || "Upload failed"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Unexpected error during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Resources</h1>

      {/* Upload Section */}
      {isLoading && <p>Loading session...</p>}

      {isAuthenticated && (
        <div className="mb-8 p-4 border rounded-lg shadow bg-white">
          <h2 className="text-2xl mb-4">Upload New Resource (PDFs Only)</h2>

          <form onSubmit={handleUpload} className="space-y-4">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={isUploading}
              className="block w-full text-sm"
            />

            <button
              type="submit"
              disabled={!file || isUploading}
              className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>

            {message && (
              <p
                className={`text-sm ${
                  message.startsWith("Error") ? "text-red-600" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      )}

      {!isAuthenticated && !isLoading && (
        <p>
          Please{" "}
          <a href="/auth/signin" className="text-blue-600 underline">
            sign in
          </a>{" "}
          to upload resources.
        </p>
      )}

      {/* List of Resources */}
      <div>
        <h2 className="text-3xl mb-4 border-b pb-2">Available Resources</h2>

        {loadingResources ? (
          <p>Loading resources...</p>
        ) : resources.length === 0 ? (
          <p>List of resources will appear here once uploaded and fetched.</p> // Updated placeholder content
        ) : (
          <ul className="space-y-3">
            {resources.map((item: any, index: number) => (
              <li key={index} className="p-4 border rounded bg-white shadow">
                <a
                  href={`/uploads/${item.filename}`}
                  target="_blank"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  {item.filename}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
