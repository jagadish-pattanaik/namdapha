import React, { useEffect, useState } from "react";
import CustomSidebar from "../components/CustomSidebar";
import { Card } from "../components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Loader2, Plus, Trash2, Pencil, GripVertical, CheckCircle, XCircle, Mail } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../components/ui/alert-dialog";
import { toast } from "sonner";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";

const HC_API = "/api/house-council";
const RC_API = "/api/regional-coordinators";

const hcDefault = { name: "", position: "", image: "", description: "", email: "" };
const rcDefault = { name: "", region: "", image: "", description: "", email: "" };

const glassToast = (message: string, type: "success" | "error" | "info" = "info") => {
  toast(
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-lg bg-white/60 border shadow-lg border-purple-200/40`}>
      {type === "success" && <CheckCircle className="text-green-500" size={22} />}
      {type === "error" && <XCircle className="text-red-500" size={22} />}
      {type === "info" && <Pencil className="text-purple-500" size={22} />}
      <span className={`font-semibold text-base ${type === "error" ? "text-red-700" : type === "success" ? "text-green-700" : "text-purple-700"}`}>
        {message}
      </span>
    </div>,
    { duration: 2500 }
  );
};

const regionOptions = [
  "North Zone",
  "South Zone",
  "West Zone",
  "East Zone",
  "Central Zone",
  "Northeast Zone",
  "Punjab Region",
  "Kerala Region",
  "Gujarat Region",
  "Rajasthan Region"
];

const AdminHouseCouncil: React.FC = () => {
  const [mode, setMode] = useState<"" | "houseCouncil" | "regionalCoordinators">(""); // Default is empty string

  // House Council state
  const [hcMembers, setHcMembers] = useState<any[]>([]);
  const [hcLoading, setHcLoading] = useState(true);
  const [hcForm, setHcForm] = useState(hcDefault);
  const [hcEditingId, setHcEditingId] = useState<number | null>(null);
  const [hcShowConfirm, setHcShowConfirm] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

  // Regional Coordinator state
  const [rcMembers, setRcMembers] = useState<any[]>([]);
  const [rcLoading, setRcLoading] = useState(true);
  const [rcForm, setRcForm] = useState(rcDefault);
  const [rcEditingId, setRcEditingId] = useState<number | null>(null);
  const [rcShowConfirm, setRcShowConfirm] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Fetch data
  useEffect(() => {
    fetch(HC_API)
      .then(res => res.json())
      .then(data => {
        setHcMembers(data);
        setHcLoading(false);
      });
    fetch(RC_API)
      .then(res => res.json())
      .then(data => {
        setRcMembers(data);
        setRcLoading(false);
      });
  }, []);

  // House Council handlers
  const handleHcSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hcForm.name || !hcForm.position) return glassToast("Name and Position required!", "error");
    let updated;
    if (hcEditingId !== null) {
      updated = hcMembers.map(m => m.id === hcEditingId ? { ...hcForm, id: hcEditingId } : m);
      glassToast("Member updated!", "success");
    } else {
      const newId = hcMembers.length ? Math.max(...hcMembers.map(m => m.id)) + 1 : 1;
      updated = [{ ...hcForm, id: newId }, ...hcMembers];
      glassToast("Member added!", "success");
    }
    setHcMembers(updated);
    setHcForm(hcDefault);
    setHcEditingId(null);
    await fetch(HC_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
  };
  const handleHcEdit = (member: any) => {
    setMode("houseCouncil"); // Automatically show House Leadership form
    setHcEditingId(member.id);
    setHcForm({ name: member.name, position: member.position, image: member.image, description: member.description, email: member.email });
    glassToast("Edit mode activated!", "info");
  };
  const handleHcDelete = async (id: number) => {
    const updated = hcMembers.filter(m => m.id !== id);
    setHcMembers(updated);
    await fetch(HC_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
    glassToast("Member deleted!", "error");
    setHcShowConfirm({ open: false, id: null });
    setHcForm(hcDefault);
    setHcEditingId(null);
  };
  const handleHcDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = hcMembers.findIndex(m => m.id === active.id);
      const newIndex = hcMembers.findIndex(m => m.id === over.id);
      const newOrder = arrayMove(hcMembers, oldIndex, newIndex);
      setHcMembers(newOrder);
      fetch(HC_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      glassToast("Order updated!", "success");
    }
  };

  // Regional Coordinator handlers
  const handleRcSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rcForm.name || !rcForm.region) return glassToast("Name and Region required!", "error");
    let updated;
    if (rcEditingId !== null) {
      updated = rcMembers.map(m => m.id === rcEditingId ? { ...rcForm, id: rcEditingId } : m);
      glassToast("Coordinator updated!", "success");
    } else {
      const newId = rcMembers.length ? Math.max(...rcMembers.map(m => m.id)) + 1 : 1;
      updated = [{ ...rcForm, id: newId }, ...rcMembers];
      glassToast("Coordinator added!", "success");
    }
    setRcMembers(updated);
    setRcForm(rcDefault);
    setRcEditingId(null);
    await fetch(RC_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
  };
  const handleRcEdit = (member: any) => {
    setMode("regionalCoordinators"); // Automatically show Regional Coordinator form
    setRcEditingId(member.id);
    setRcForm({ name: member.name, region: member.region, image: member.image, description: member.description, email: member.email });
    glassToast("Edit mode activated!", "info");
  };
  const handleRcDelete = async (id: number) => {
    const updated = rcMembers.filter(m => m.id !== id);
    setRcMembers(updated);
    await fetch(RC_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
    glassToast("Coordinator deleted!", "error");
    setRcShowConfirm({ open: false, id: null });
    setRcForm(rcDefault);
    setRcEditingId(null);
  };
  const handleRcDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = rcMembers.findIndex(m => m.id === active.id);
      const newIndex = rcMembers.findIndex(m => m.id === over.id);
      const newOrder = arrayMove(rcMembers, oldIndex, newIndex);
      setRcMembers(newOrder);
      fetch(RC_API, {
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
      <main className={`flex-1 flex justify-start items-start py-12 px-2 transition-all duration-500 ${sidebarCollapsed ? "ml-24" : "ml-72"}`}>
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-extrabold mb-8 text-muted-foreground text-left">Manage House Council Page</h1>
          
          {/* House Council Form */}
          <Card className="p-6 mb-8 rounded-2xl border border-border bg-white/80">
            {/* Heading */}
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">
              {mode === "regionalCoordinators"
                ? "Add Member for Regional Coordinator"
                : mode === "houseCouncil"
                ? "Add Member for House Leadership"
                : "Add Member"}
            </h2>
            {/* Select Category - always visible */}
            <div className="mb-4">
              <Select value={mode} onValueChange={v => setMode(v as any)}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="houseCouncil">House Leadership</SelectItem>
                  <SelectItem value="regionalCoordinators">Regional Coordinators</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* By default, show the full Regional Coordinator form until a category is selected */}
            {mode === "" && (
              <form className="flex flex-col gap-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Name"
                    value={rcForm.name}
                    onChange={e => setRcForm({ ...rcForm, name: e.target.value })}
                    required
                  />
                  <Select
                    value={rcForm.region}
                    onValueChange={value => setRcForm({ ...rcForm, region: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regionOptions.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Image URL"
                    value={rcForm.image}
                    onChange={e => setRcForm({ ...rcForm, image: e.target.value })}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={rcForm.email}
                    onChange={e => setRcForm({ ...rcForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <Textarea
                    placeholder="Description"
                    value={rcForm.description}
                    onChange={e => setRcForm({ ...rcForm, description: e.target.value })}
                    className="md:col-span-4 min-h-[60px]"
                    disabled
                  />
                </div>
                <div className="flex gap-2 justify-start">
                  <Button type="button" variant="default" className="flex gap-1 items-center" disabled>
                    Add
                  </Button>
                </div>
              </form>
            )}
            {/* Show the correct form when a category is selected */}
            {mode === "houseCouncil" && (
              <form onSubmit={handleHcSubmit} className="flex flex-col gap-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Name"
                    value={hcForm.name}
                    onChange={e => setHcForm({ ...hcForm, name: e.target.value })}
                    required
                  />
                  <Select
                    value={hcForm.position}
                    onValueChange={value => setHcForm({ ...hcForm, position: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="House Secretary">House Secretary</SelectItem>
                      <SelectItem value="Deputy Secretary">Deputy Secretary</SelectItem>
                      <SelectItem value="Harshita Dudeja">Web Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Image URL"
                    value={hcForm.image}
                    onChange={e => setHcForm({ ...hcForm, image: e.target.value })}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={hcForm.email}
                    onChange={e => setHcForm({ ...hcForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <Textarea
                    placeholder="Description"
                    value={hcForm.description}
                    onChange={e => setHcForm({ ...hcForm, description: e.target.value })}
                    className="md:col-span-4 min-h-[60px]"
                    required
                  />
                </div>
                <div className="flex gap-2 justify-start">
                  <Button type="submit" variant="default" className="flex gap-1 items-center">
                    {hcEditingId !== null ? <Pencil size={16} /> : <Plus size={16} />}
                    {hcEditingId !== null ? "Update" : "Add"}
                  </Button>
                  {hcEditingId !== null && (
                    <Button type="button" variant="outline" onClick={() => { setHcForm(hcDefault); setHcEditingId(null); }}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            )}
            {mode === "regionalCoordinators" && (
              <form onSubmit={handleRcSubmit} className="flex flex-col gap-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Name"
                    value={rcForm.name}
                    onChange={e => setRcForm({ ...rcForm, name: e.target.value })}
                    required
                  />
                  <Select
                    value={rcForm.region}
                    onValueChange={value => setRcForm({ ...rcForm, region: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regionOptions.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Image URL"
                    value={rcForm.image}
                    onChange={e => setRcForm({ ...rcForm, image: e.target.value })}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={rcForm.email}
                    onChange={e => setRcForm({ ...rcForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <Textarea
                    placeholder="Description"
                    value={rcForm.description}
                    onChange={e => setRcForm({ ...rcForm, description: e.target.value })}
                    className="md:col-span-4 min-h-[60px]"
                    disabled
                  />
                </div>
                <div className="flex gap-2 justify-start">
                  <Button type="submit" variant="default" className="flex gap-1 items-center">
                    {rcEditingId !== null ? <Pencil size={16} /> : <Plus size={16} />}
                    {rcEditingId !== null ? "Update" : "Add"}
                  </Button>
                  {rcEditingId !== null && (
                    <Button type="button" variant="outline" onClick={() => { setRcForm(rcDefault); setRcEditingId(null); }}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            )}
          </Card>
          {/* House Council Table */}
          <Card className="p-6 rounded-2xl border border-border bg-white/80">
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">House Leadership</h2>
            {hcLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin" /> Loading...
              </div>
            ) : (
              <Table className="w-full">
                <TableCaption>Manage your council members. Drag to reorder, edit, or delete.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead style={{ width: 140, minWidth: 140 }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hcMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No council members found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleHcDragEnd}>
                      <SortableContext items={hcMembers.map(m => m.id)} strategy={verticalListSortingStrategy}>
                        {hcMembers.map(member => (
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
                                <TableCell>{member.position}</TableCell>
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
                                      onClick={() => handleHcEdit(member)}
                                    >
                                      Edit
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          size="sm"
                                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition"
                                          onClick={() => setHcShowConfirm({ open: true, id: member.id })}
                                        >
                                          Delete
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent open={hcShowConfirm.open && hcShowConfirm.id === member.id}>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle className="text-red-600">Confirm Delete</AlertDialogTitle>
                                          <AlertDialogDescription className="text-muted-foreground">
                                            Are you sure you want to delete this member? This action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel
                                            className="bg-muted text-muted-foreground hover:bg-gray-200 px-4 py-2 rounded font-semibold transition"
                                            onClick={() => setHcShowConfirm({ open: false, id: null })}
                                          >
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition"
                                            onClick={() => handleHcDelete(member.id)}
                                          >
                                            Yes, Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
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
            )}
          </Card>
          {/* Regional Coordinators Table */}
          <Card className="p-6 rounded-2xl border border-border bg-white/80 mt-8">
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">Regional Coordinators</h2>
            {rcLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin" /> Loading...
              </div>
            ) : (
              <Table className="w-full">
                <TableCaption>Manage your regional coordinators. Drag to reorder, edit, or delete.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead style={{ width: 140, minWidth: 140 }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rcMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No regional coordinators found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleRcDragEnd}>
                      <SortableContext items={rcMembers.map(m => m.id)} strategy={verticalListSortingStrategy}>
                        {rcMembers.map(member => (
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
                                <TableCell>{member.region}</TableCell>
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
                                      onClick={() => handleRcEdit(member)}
                                    >
                                      Edit
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          size="sm"
                                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition"
                                          onClick={() => setRcShowConfirm({ open: true, id: member.id })}
                                        >
                                          Delete
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent open={rcShowConfirm.open && rcShowConfirm.id === member.id}>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle className="text-red-600">Confirm Delete</AlertDialogTitle>
                                          <AlertDialogDescription className="text-muted-foreground">
                                            Are you sure you want to delete this coordinator? This action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel
                                            className="bg-muted text-muted-foreground hover:bg-gray-200 px-4 py-2 rounded font-semibold transition"
                                            onClick={() => setRcShowConfirm({ open: false, id: null })}
                                          >
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition"
                                            onClick={() => handleRcDelete(member.id)}
                                          >
                                            Yes, Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
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
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminHouseCouncil;

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
