import React, { useState, useEffect } from "react";
import CustomSidebar from "../components/CustomSidebar";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { glassToast } from "../lib/toast";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../components/ui/table";
import { Loader2, Pencil, Plus, Trash2, GripVertical, Mail } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TEAM_CATEGORIES = [
  { value: "webOps", label: "Web-ops Team" },
  { value: "prTeam", label: "PR Team" },
  { value: "outreach", label: "Outreach Team" },
];

const API_MAP = {
  webOps: "/api/web-ops-team",
  prTeam: "/api/pr-team",
  outreach: "/api/outreach-team",
};

const defaultForm = {
  name: "",
  role: "",
  image: "",
  description: "",
  email: "",
};

const AdminTeams: React.FC = () => {
  const [category, setCategory] = useState<"" | "webOps" | "prTeam" | "outreach">("");
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [webOps, setWebOps] = useState<any[]>([]);
  const [prTeam, setPrTeam] = useState<any[]>([]);
  const [outreach, setOutreach] = useState<any[]>([]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetch(API_MAP.webOps).then((res) => res.json()).then(setWebOps);
    fetch(API_MAP.prTeam).then((res) => res.json()).then(setPrTeam);
    fetch(API_MAP.outreach).then((res) => res.json()).then(setOutreach);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    const api = API_MAP[category];
    let data;
    if (editingId !== null) {
      data = [...getCurrentList()].map((m) =>
        m.id === editingId ? { ...form, id: editingId } : m
      );
    } else {
      const newId = Date.now();
      data = [...getCurrentList(), { ...form, id: newId }];
    }
    fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      glassToast(editingId ? "Member updated!" : "Member added!", "success");
      setForm(defaultForm);
      setEditingId(null);
      fetch(api)
        .then((res) => res.json())
        .then((list) => {
          if (category === "webOps") setWebOps(list);
          if (category === "prTeam") setPrTeam(list);
          if (category === "outreach") setOutreach(list);
        });
    });
  };

  const handleEdit = (cat: "webOps" | "prTeam" | "outreach", member: any) => {
    setCategory(cat);
    setForm(member);
    setEditingId(member.id);
  };

  const handleDelete = (cat: "webOps" | "prTeam" | "outreach", id: number) => {
    const api = API_MAP[cat];
    const data = getList(cat).filter((m) => m.id !== id);
    fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      glassToast("Member deleted!", "success");
      fetch(api)
        .then((res) => res.json())
        .then((list) => {
          if (cat === "webOps") setWebOps(list);
          if (cat === "prTeam") setPrTeam(list);
          if (cat === "outreach") setOutreach(list);
        });
    });
  };

  function getCurrentList() {
    if (category === "webOps") return webOps;
    if (category === "prTeam") return prTeam;
    if (category === "outreach") return outreach;
    return [];
  }
  function getList(cat: "webOps" | "prTeam" | "outreach") {
    if (cat === "webOps") return webOps;
    if (cat === "prTeam") return prTeam;
    if (cat === "outreach") return outreach;
    return [];
  }

  // Drag-and-drop sortable row component
  interface SortableRowRenderProps {
    attributes: Record<string, any>;
    listeners: Record<string, any>;
  }
  const SortableRow: React.FC<{ id: number; children: (p: SortableRowRenderProps) => React.ReactNode }> = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    return (
      <TableRow
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        className={`${isDragging ? "bg-purple-50/70 shadow-inner" : ""}`}
      >
        {children({ attributes, listeners })}
      </TableRow>
    );
  };

  const handleWebOpsDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = webOps.findIndex(m => m.id === active.id);
      const newIndex = webOps.findIndex(m => m.id === over.id);
      const newOrder = arrayMove(webOps, oldIndex, newIndex);
      setWebOps(newOrder);
      fetch(API_MAP.webOps, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      glassToast("Order updated!", "success");
    }
  };
  const handlePrTeamDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = prTeam.findIndex(m => m.id === active.id);
      const newIndex = prTeam.findIndex(m => m.id === over.id);
      const newOrder = arrayMove(prTeam, oldIndex, newIndex);
      setPrTeam(newOrder);
      fetch(API_MAP.prTeam, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      glassToast("Order updated!", "success");
    }
  };
  const handleOutreachDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = outreach.findIndex(m => m.id === active.id);
      const newIndex = outreach.findIndex(m => m.id === over.id);
      const newOrder = arrayMove(outreach, oldIndex, newIndex);
      setOutreach(newOrder);
      fetch(API_MAP.outreach, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      glassToast("Order updated!", "success");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <CustomSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main
        className={`flex-1 flex justify-start items-start py-12 px-2 transition-all duration-500 ${
          sidebarCollapsed ? "ml-24" : "ml-72"
        }`}
      >
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-extrabold mb-8 text-muted-foreground text-left">
            Manage Teams Page
          </h1>
          <Card className="p-6 mb-8 rounded-2xl border bg-background">
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">
              {category === "webOps"
                ? "Add Member for Web-ops Team"
                : category === "prTeam"
                ? "Add Member for PR Team"
                : category === "outreach"
                ? "Add Member for Outreach Team"
                : "Add Member"}
            </h2>
            <div className="mb-4">
              <Select value={category} onValueChange={(v) => setCategory(v as any)}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select Team Category" />
                </SelectTrigger>
                <SelectContent>
                  {TEAM_CATEGORIES.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mb-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => {
                    if (!category) {
                      alert("Please select a category first.");
                      return;
                    }
                    setForm({ ...form, name: e.target.value });
                  }}
                  required
                  disabled={!category}
                />
                <Input
                  placeholder="Role"
                  value={form.role}
                  onChange={(e) => {
                    if (!category) {
                      alert("Please select a category first.");
                      return;
                    }
                    setForm({ ...form, role: e.target.value });
                  }}
                  required
                  disabled={!category}
                />
                <Input
                  placeholder="Image URL"
                  value={form.image}
                  onChange={(e) => {
                    if (!category) {
                      alert("Please select a category first.");
                      return;
                    }
                    setForm({ ...form, image: e.target.value });
                  }}
                  disabled={!category}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    if (!category) {
                      alert("Please select a category first.");
                      return;
                    }
                    setForm({ ...form, email: e.target.value });
                  }}
                  required
                  disabled={!category}
                />
              </div>
              <Textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => {
                  if (!category) {
                    alert("Please select a category first.");
                    return;
                  }
                  setForm({ ...form, description: e.target.value });
                }}
                className="min-h-[60px]"
                required
                disabled={!category}
              />
              <div className="flex gap-2 justify-start">
                <Button
                  type="submit"
                  variant="default"
                  disabled={!category}
                >
                  {editingId !== null ? "Update" : "Add"}
                </Button>
                {editingId !== null && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setForm(defaultForm);
                      setEditingId(null);
                    }}
                    disabled={!category}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>
          {/* Team Tables */}
          <>
            <Card className="p-6 rounded-2xl border bg-background mb-8">
              <h2 className="text-xl font-bold mb-4 text-muted-foreground">Web-ops Team</h2>
              <Table className="w-full">
                <TableCaption>Manage your Web-ops team members. Drag to reorder, edit, or delete.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead style={{ width: 140, minWidth: 140 }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webOps.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No members found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleWebOpsDragEnd}>
                      <SortableContext items={webOps.map(m => m.id)} strategy={verticalListSortingStrategy}>
                        {webOps.map(member => (
                          <SortableRow key={member.id} id={member.id}>
                            {({ attributes, listeners }) => (
                              <>
                                <TableCell className="flex items-center">
                                  <span
                                    {...attributes}
                                    {...listeners}
                                    className="mr-2 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-purple-600 transition-colors"
                                    title="Drag to reorder"
                                  >
                                    <GripVertical size={16} />
                                  </span>
                                  {member.name}
                                </TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell>
                                  {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-12 h-12 rounded object-cover" />
                                  ) : (
                                    <span className="text-muted-foreground">No image</span>
                                  )}
                                </TableCell>
                                <TableCell>{member.description}</TableCell>
                                <TableCell>
                                  {member.email ? (
                                    <a href={`mailto:${member.email}`} title={`Email ${member.name}`}>
                                      <Mail size={20} className="text-purple-600 hover:text-purple-800 transition-colors cursor-pointer" />
                                    </a>
                                  ) : (
                                    <span className="text-muted-foreground">—</span>
                                  )}
                                </TableCell>
                                <TableCell style={{ width: 140, minWidth: 140 }}>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded font-semibold transition"
                                      onClick={() => handleEdit("webOps", member)}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition"
                                      onClick={() => handleDelete("webOps", member.id)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </TableCell>
                              </>
                            )}
                          </SortableRow>
                        ))}
                      </SortableContext>
                    </DndContext>
                  )}
                </TableBody>
              </Table>
            </Card>
            <Card className="p-6 rounded-2xl border bg-background mb-8">
              <h2 className="text-xl font-bold mb-4 text-muted-foreground">PR Team</h2>
              <Table className="w-full">
                <TableCaption>Manage your PR team members. Drag to reorder, edit, or delete.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead style={{ width: 140, minWidth: 140 }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prTeam.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No members found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handlePrTeamDragEnd}>
                      <SortableContext items={prTeam.map(m => m.id)} strategy={verticalListSortingStrategy}>
                        {prTeam.map(member => (
                          <SortableRow key={member.id} id={member.id}>
                            {({ attributes, listeners }) => (
                              <>
                                <TableCell className="flex items-center">
                                  <span
                                    {...attributes}
                                    {...listeners}
                                    className="mr-2 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-pink-600 transition-colors"
                                    title="Drag to reorder"
                                  >
                                    <GripVertical size={16} />
                                  </span>
                                  {member.name}
                                </TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell>
                                  {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-12 h-12 rounded object-cover" />
                                  ) : (
                                    <span className="text-muted-foreground">No image</span>
                                  )}
                                </TableCell>
                                <TableCell>{member.description}</TableCell>
                                <TableCell>
                                  {member.email ? (
                                    <a href={`mailto:${member.email}`} title={`Email ${member.name}`}>
                                      <Mail size={20} className="text-pink-600 hover:text-pink-800 transition-colors cursor-pointer" />
                                    </a>
                                  ) : (
                                    <span className="text-muted-foreground">—</span>
                                  )}
                                </TableCell>
                                <TableCell style={{ width: 140, minWidth: 140 }}>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded font-semibold transition"
                                      onClick={() => handleEdit("prTeam", member)}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition"
                                      onClick={() => handleDelete("prTeam", member.id)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </TableCell>
                              </>
                            )}
                          </SortableRow>
                        ))}
                      </SortableContext>
                    </DndContext>
                  )}
                </TableBody>
              </Table>
            </Card>
            <Card className="p-6 rounded-2xl border bg-background mb-8">
              <h2 className="text-xl font-bold mb-4 text-muted-foreground">Outreach Team</h2>
              <Table className="w-full">
                <TableCaption>Manage your Outreach team members. Drag to reorder, edit, or delete.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead style={{ width: 140, minWidth: 140 }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outreach.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No members found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleOutreachDragEnd}>
                      <SortableContext items={outreach.map(m => m.id)} strategy={verticalListSortingStrategy}>
                        {outreach.map(member => (
                          <SortableRow key={member.id} id={member.id}>
                            {({ attributes, listeners }) => (
                              <>
                                <TableCell className="flex items-center">
                                  <span
                                    {...attributes}
                                    {...listeners}
                                    className="mr-2 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-orange-600 transition-colors"
                                    title="Drag to reorder"
                                  >
                                    <GripVertical size={16} />
                                  </span>
                                  {member.name}
                                </TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell>
                                  {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-12 h-12 rounded object-cover" />
                                  ) : (
                                    <span className="text-muted-foreground">No image</span>
                                  )}
                                </TableCell>
                                <TableCell>{member.description}</TableCell>
                                <TableCell>
                                  {member.email ? (
                                    <a href={`mailto:${member.email}`} title={`Email ${member.name}`}>
                                      <Mail size={20} className="text-orange-600 hover:text-orange-800 transition-colors cursor-pointer" />
                                    </a>
                                  ) : (
                                    <span className="text-muted-foreground">—</span>
                                  )}
                                </TableCell>
                                <TableCell style={{ width: 140, minWidth: 140 }}>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded font-semibold transition"
                                      onClick={() => handleEdit("outreach", member)}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition"
                                      onClick={() => handleDelete("outreach", member.id)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </TableCell>
                              </>
                            )}
                          </SortableRow>
                        ))}
                      </SortableContext>
                    </DndContext>
                  )}
                </TableBody>
              </Table>
            </Card>
          </>
        </div>
      </main>
    </div>
  );
};

export default AdminTeams;