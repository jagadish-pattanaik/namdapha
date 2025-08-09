import React, { useState, useEffect } from "react";

type ImportantLink = {
  id: number;
  title: string;
  url: string;
  description: string;
};

const AdminImportantLinks: React.FC = () => {
  const [links, setLinks] = useState<ImportantLink[]>([]);
  const [form, setForm] = useState<Partial<ImportantLink>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:5050/api/important-links")
      .then((res) => res.json())
      .then(setLinks);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedLinks;
    if (editingId !== null) {
      updatedLinks = links.map((l) =>
        l.id === editingId ? { ...l, ...form, id: editingId } : l
      );
    } else {
      const newId = links.length ? Math.max(...links.map(l => l.id)) + 1 : 1;
      updatedLinks = [...links, { ...form, id: newId } as ImportantLink];
    }
    fetch('http://localhost:5050/api/important-links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedLinks),
    }).then(() => {
      setLinks(updatedLinks);
      setForm({});
      setEditingId(null);
    });
  };

  const handleEdit = (link: ImportantLink) => {
    setForm(link);
    setEditingId(link.id);
  };

  const handleDelete = (id: number) => {
    const updatedLinks = links.filter((l) => l.id !== id);
    fetch('http://localhost:5050/api/important-links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedLinks),
    }).then(() => {
      setLinks(updatedLinks);
      setForm({});
      setEditingId(null);
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-8 text-purple-700">Admin Important Links</h1>
      <form onSubmit={handleSubmit} className="mb-8 bg-black/20 p-6 rounded-xl">
        <input
          name="title"
          value={form.title || ""}
          onChange={handleChange}
          placeholder="Link Title"
          className="w-full mb-2 p-2 rounded"
          required
        />
        <input
          name="url"
          value={form.url || ""}
          onChange={handleChange}
          placeholder="URL"
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
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
          {editingId !== null ? "Update Link" : "Add Link"}
        </button>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-4">Important Links</h2>
        <ul>
          {links.map((link) => (
            <li key={link.id} className="mb-4 p-4 bg-black/10 rounded flex justify-between items-center">
              <div>
                <div className="font-bold">{link.title}</div>
                <div className="text-sm">{link.description}</div>
                <div className="text-xs text-gray-400">{link.url}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(link)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(link.id)}
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
  );
};

export default AdminImportantLinks;