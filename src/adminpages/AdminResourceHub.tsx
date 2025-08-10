import React, { useState, useEffect } from "react";
import CustomSidebar from "../components/CustomSidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "../components/ui/table";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";

// Define the Resource type
interface Resource {
  id: number;
  title: string;
  description?: string;
  type: string;
  url?: string;
  dateAdded?: string;
  category: string;
  internalPath?: string;
}

const defaultForm: Partial<Resource> = {
  title: "",
  description: "",
  type: "",
  url: "",
  dateAdded: "",
  category: "",
  internalPath: "",
};

const AdminResourceHub: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [form, setForm] = useState<Partial<Resource>>(defaultForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

  useEffect(() => {
    fetch("http://localhost:5050/api/resources")
      .then((res) => res.json())
      .then(setResources);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedResources;
    let actionType;
    if (editingId !== null) {
      updatedResources = resources.map((r) =>
        r.id === editingId ? { ...r, ...form, id: editingId } : r
      );
      actionType = "updated";
    } else {
      const newId = resources.length ? Math.max(...resources.map(r => r.id)) + 1 : 1;
      updatedResources = [...resources, { ...form, id: newId } as Resource];
      actionType = "added";
    }
    fetch('http://localhost:5050/api/resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedResources),
    }).then(() => {
      setResources(updatedResources);
      setForm(defaultForm);
      setEditingId(null);
      toast(`Resource ${actionType} successfully!`, {
        description: `Resource has been ${actionType}.`,
      });
    });
  };

  const handleEdit = (resource: Resource) => {
    setForm(resource);
    setEditingId(resource.id);
  };

  const handleDelete = (id: number) => {
    setShowConfirm({ open: true, id });
  };

  const confirmDelete = () => {
    if (showConfirm.id !== null) {
      const updatedResources = resources.filter((r) => r.id !== showConfirm.id);
      fetch('http://localhost:5050/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedResources),
      }).then(() => {
        setResources(updatedResources);
        setForm(defaultForm);
        setEditingId(null);
        setShowConfirm({ open: false, id: null });
        toast("Resource deleted!", {
          description: "Resource has been successfully deleted.",
          style: { background: "#fee2e2", color: "#991b1b" }, // Optional: destructive styling
        });
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <CustomSidebar />
      <main className="flex-1 flex justify-start items-start ml-4 md:ml-72 py-12 px-2">
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-extrabold mb-8 text-muted-foreground text-left">Resource Hub</h1>
          
          {/* Add/Edit Resource Section */}
          <div className="rounded-2xl border border-border bg-white/80 p-6 sm:p-10 w-full">
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">Add / Edit Resource</h2>
            <Table className="w-full">
              <TableCaption>Manage your resources below. Click "Edit" to modify or "Delete" to remove.</TableCaption>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <input
                      name="title"
                      value={form.title || ""}
                      onChange={handleChange}
                      placeholder="Title"
                      className="w-full p-2 rounded bg-background border border-border text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                  </TableCell>
                  <TableCell>
                    <textarea
                      name="description"
                      value={form.description || ""}
                      onChange={handleChange}
                      placeholder="Description"
                      className="w-full p-2 rounded bg-background border border-border text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                      rows={1}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={form.type || ""}
                      onValueChange={value => setForm({ ...form, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                        <SelectItem value="book">Book</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <input
                      name="url"
                      value={form.url || ""}
                      onChange={handleChange}
                      placeholder="URL"
                      className="w-full p-2 rounded bg-background border border-border text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!form.dateAdded}
                          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.dateAdded
                            ? format(new Date(form.dateAdded), "PPP")
                            : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.dateAdded ? new Date(form.dateAdded) : undefined}
                          onSelect={date =>
                            setForm({ ...form, dateAdded: date ? date.toISOString().slice(0, 10) : "" })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={form.category || ""}
                      onValueChange={value => setForm({ ...form, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                        <SelectItem value="Books">Books</SelectItem>
                        <SelectItem value="Videos">Videos</SelectItem>
                        <SelectItem value="Documents">Documents</SelectItem>
                        <SelectItem value="Links">Links</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <input
                      name="internalPath"
                      value={form.internalPath || ""}
                      onChange={handleChange}
                      placeholder="Internal Path"
                      className="w-full p-2 rounded bg-background border border-border text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded font-bold shadow hover:scale-105 transition w-full sm:w-auto"
                      >
                        {editingId !== null ? "Update" : "Add"}
                      </button>
                      {editingId !== null && (
                        <button
                          onClick={() => { setForm(defaultForm); setEditingId(null); }}
                          className="bg-muted text-muted-foreground hover:bg-gray-200 px-4 py-2 rounded font-semibold shadow transition w-full sm:w-auto"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Gap between sections */}
          <div className="my-8" />

          {/* Existing Resources Section */}
          <div className="rounded-2xl border border-border bg-white/80 p-6 sm:p-10 w-full animate-fade-in-up delay-150">
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">Existing Resources</h2>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[12%]">Title</TableHead>
                  <TableHead className="w-[18%]">Description</TableHead>
                  <TableHead className="w-[10%]">Type</TableHead>
                  <TableHead className="w-[15%]">URL</TableHead>
                  <TableHead className="w-[10%]">Date Added</TableHead>
                  <TableHead className="w-[10%]">Category</TableHead>
                  <TableHead className="w-[13%]">Internal Path</TableHead>
                  <TableHead className="w-[12%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No resources found. Add a resource above!
                    </TableCell>
                  </TableRow>
                ) : (
                  resources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>{resource.title}</TableCell>
                      <TableCell>{resource.description}</TableCell>
                      <TableCell>{resource.type}</TableCell>
                      <TableCell>
                        {resource.url ? (
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{resource.url}</a>
                        ) : ""}
                      </TableCell>
                      <TableCell>{resource.dateAdded}</TableCell>
                      <TableCell>{resource.category}</TableCell>
                      <TableCell>{resource.internalPath}</TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleEdit(resource)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded font-semibold transition w-full sm:w-auto"
                          >
                            Edit
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition w-full sm:w-auto"
                                onClick={() => setShowConfirm({ open: true, id: resource.id })}
                              >
                                Delete
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent open={showConfirm.open && showConfirm.id === resource.id}>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-red-600">Confirm Delete</AlertDialogTitle>
                                <AlertDialogDescription className="text-muted-foreground">
                                  Are you sure you want to delete this resource? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  className="bg-muted text-muted-foreground hover:bg-gray-200 px-4 py-2 rounded font-semibold transition"
                                  onClick={() => setShowConfirm({ open: false, id: null })}
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition"
                                  onClick={confirmDelete}
                                >
                                  Yes, Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminResourceHub;