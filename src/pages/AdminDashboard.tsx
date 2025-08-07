import React, { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";

// List of allowed admin emails
const allowedEmails = ["shivangk512@gmail.com", "your@email.com"];

const AdminDashboard: React.FC = () => {
  const { user } = useUser();

  // Block access if not allowed
  if (!user || !allowedEmails.includes(user.emailAddresses[0]?.emailAddress)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Access Denied</h2>
          <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
          <button
            onClick={() => window.Clerk?.signOut(() => window.location.href = "/admin")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-200"
          >
            Sign Out & Go to Login
          </button>
        </div>
      </div>
    );
  }

  const [resources, setResources] = useState<Resource[]>([]);
  const [form, setForm] = useState<Partial<Resource>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:5050/api/resources")
      .then((res) => res.json())
      .then(setResources);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedResources;
    if (editingId !== null) {
      updatedResources = resources.map((r) =>
        r.id === editingId ? { ...r, ...form, id: editingId } : r
      );
    } else {
      const newId = resources.length ? Math.max(...resources.map(r => r.id)) + 1 : 1;
      updatedResources = [...resources, { ...form, id: newId } as Resource];
    }
    fetch('http://localhost:5050/api/resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedResources),
    }).then(() => {
      setResources(updatedResources);
      setForm({});
      setEditingId(null);
    });
  };

  const handleEdit = (resource: Resource) => {
    setForm(resource);
    setEditingId(resource.id);
  };

  const handleDelete = (id: number) => {
    const updatedResources = resources.filter((r) => r.id !== id);
    fetch('http://localhost:5050/api/resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedResources),
    }).then(() => {
      setResources(updatedResources);
      setForm({});
      setEditingId(null);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow flex items-center justify-between px-8 py-4 mb-8">
        <span className="text-xl font-bold text-purple-700">Admin Dashboard</span>
        <div className="flex items-center gap-2">
          {user && (
            <>
              <span className="text-gray-700 font-medium">{user.fullName || user.emailAddresses[0]?.emailAddress}</span>
              <UserButton afterSignOutUrl="/admin" />
            </>
          )}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto py-12 px-4">
        <form onSubmit={handleSubmit} className="mb-8 bg-black/20 p-6 rounded-xl">
          <input
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            placeholder="Title"
            className="w-full mb-2 p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="w-full mb-2 p-2 rounded"
          />
          <select
            name="type"
            value={form.type || ""}
            onChange={handleChange}
            className="w-full mb-2 p-2 rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="document">Document</option>
            <option value="link">Link</option>
            <option value="book">Book</option>
            <option value="video">Video</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          <input
            name="url"
            value={form.url || ""}
            onChange={handleChange}
            placeholder="URL"
            className="w-full mb-2 p-2 rounded"
          />
          <input
            type="date"
            name="dateAdded"
            value={form.dateAdded || ""}
            onChange={handleChange}
            className="w-full mb-2 p-2 rounded"
          />
          <select
            name="category"
            value={form.category || ""}
            onChange={handleChange}
            className="w-full mb-2 p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="General">General</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Books">Books</option>
            <option value="Videos">Videos</option>
            <option value="Documents">Documents</option>
            <option value="Links">Links</option>
          </select>
          <input
            name="internalPath"
            value={form.internalPath || ""}
            onChange={handleChange}
            placeholder="Internal Path (optional)"
            className="w-full mb-2 p-2 rounded"
          />
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
            {editingId !== null ? "Update Resource" : "Add Resource"}
          </button>
        </form>
        <div>
          <h2 className="text-xl font-semibold mb-4">Resources</h2>
          <ul>
            {resources.map((resource) => (
              <li key={resource.id} className="mb-4 p-4 bg-black/10 rounded flex justify-between items-center">
                <div>
                  <div className="font-bold">{resource.title}</div>
                  <div className="text-sm">{resource.description}</div>
                  <div className="text-xs text-gray-400">
                    {resource.type} | {resource.category} | Date Added: {resource.dateAdded}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(resource)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(resource.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;