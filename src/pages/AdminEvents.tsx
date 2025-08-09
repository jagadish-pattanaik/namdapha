import React, { useState, useEffect, useRef } from "react";
import CustomSidebar from "../components/CustomSidebar";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
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
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { format } from "date-fns";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  time?: string; // Add time here
  location: string;
  category: string;
  addedBy: string;
  visible?: boolean;
};

const defaultForm: Partial<Event> = {
  title: "",
  description: "",
  date: "",
  time: "", // Add time here
  location: "",
  category: "",
  addedBy: "",
  visible: true,
};

const AdminEvents: React.FC = () => {
  const { user } = useUser();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<Partial<Event>>(defaultForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [section, setSection] = useState<"upcoming" | "past">("upcoming");
  const [showConfirm, setShowConfirm] = useState<{ open: boolean; id: number | null; type: "upcoming" | "past" | null }>({ open: false, id: null, type: null });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const disabledInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://localhost:5050/api/upcoming-events").then(res => res.json()).then(setUpcomingEvents);
    fetch("http://localhost:5050/api/past-events").then(res => res.json()).then(setPastEvents);
  }, []);

  useEffect(() => {
    const moveExpiredEvents = () => {
      const now = new Date();
      const stillUpcoming: Event[] = [];
      const newlyPast: Event[] = [...pastEvents];

      upcomingEvents.forEach(ev => {
        // Combine date and time for comparison
        const eventDateTime = new Date(`${ev.date}T${ev.time || "00:00"}`);
        if (eventDateTime < now) {
          newlyPast.push(ev);
        } else {
          stillUpcoming.push(ev);
        }
      });

      // Only update if something changed
      if (stillUpcoming.length !== upcomingEvents.length) {
        setUpcomingEvents(stillUpcoming);
        setPastEvents(newlyPast);

        // Update backend
        fetch("http://localhost:5050/api/upcoming-events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stillUpcoming),
        });
        fetch("http://localhost:5050/api/past-events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newlyPast),
        });
      }
    };

    // Run on mount and every minute
    moveExpiredEvents();
    const interval = setInterval(moveExpiredEvents, 60000);
    return () => clearInterval(interval);
  }, [upcomingEvents, pastEvents]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggleVisible = (id: number) => {
    const updated = pastEvents.map(ev =>
      ev.id === id ? { ...ev, visible: !ev.visible } : ev
    );
    setPastEvents(updated);
    fetch("http://localhost:5050/api/past-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    toast("Visibility updated!");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedEvents;
    let actionType;
    if (section === "upcoming") {
      const addedBy = user?.fullName || user?.emailAddress || "Unknown";
      if (editingId !== null) {
        updatedEvents = upcomingEvents.map(ev =>
          ev.id === editingId ? { ...ev, ...form, id: editingId, addedBy } : ev
        );
        actionType = "updated";
      } else {
        const newId = upcomingEvents.length ? Math.max(...upcomingEvents.map(ev => ev.id)) + 1 : 1;
        updatedEvents = [...upcomingEvents, { ...form, id: newId, addedBy } as Event];
        actionType = "added";
      }
      fetch("http://localhost:5050/api/upcoming-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvents),
      }).then(() => {
        setUpcomingEvents(updatedEvents);
        setForm(defaultForm);
        setEditingId(null);
        toast(`Upcoming event ${actionType}!`);
      });
    } else {
      const addedBy = user?.fullName || user?.emailAddress || "Unknown";
      if (editingId !== null) {
        updatedEvents = pastEvents.map(ev =>
          ev.id === editingId ? { ...ev, ...form, id: editingId, addedBy } : ev
        );
        actionType = "updated";
      } else {
        const newId = pastEvents.length ? Math.max(...pastEvents.map(ev => ev.id)) + 1 : 1;
        updatedEvents = [...pastEvents, { ...form, id: newId, addedBy } as Event];
        actionType = "added";
      }
      fetch("http://localhost:5050/api/past-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvents),
      }).then(() => {
        setPastEvents(updatedEvents);
        setForm(defaultForm);
        setEditingId(null);
        toast(`Past event ${actionType}!`);
      });
    }
  };

  const handleEdit = (event: Event, type: "upcoming" | "past") => {
    setForm(event);
    setEditingId(event.id);
    setSection(type);
  };

  // Update handleDelete to use confirmation dialog
  const handleDelete = (id: number, type: "upcoming" | "past") => {
    setShowConfirm({ open: true, id, type });
  };

  const confirmDelete = () => {
    if (showConfirm.id !== null && showConfirm.type) {
      if (showConfirm.type === "upcoming") {
        const updatedEvents = upcomingEvents.filter(ev => ev.id !== showConfirm.id);
        fetch("http://localhost:5050/api/upcoming-events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEvents),
        }).then(() => {
          setUpcomingEvents(updatedEvents);
          setForm(defaultForm);
          setEditingId(null);
          toast("Upcoming event deleted!");
          setShowConfirm({ open: false, id: null, type: null });
        });
      } else {
        const updatedEvents = pastEvents.filter(ev => ev.id !== showConfirm.id);
        fetch("http://localhost:5050/api/past-events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEvents),
        }).then(() => {
          setPastEvents(updatedEvents);
          setForm(defaultForm);
          setEditingId(null);
          toast("Past event deleted!");
          setShowConfirm({ open: false, id: null, type: null });
        });
      }
    }
  };

  const handleDragEnd = (event: any, type: "upcoming" | "past") => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      if (type === "upcoming") {
        const oldIndex = upcomingEvents.findIndex(ev => ev.id === active.id);
        const newIndex = upcomingEvents.findIndex(ev => ev.id === over.id);
        const newOrder = arrayMove(upcomingEvents, oldIndex, newIndex);
        setUpcomingEvents(newOrder);
        fetch("http://localhost:5050/api/upcoming-events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder),
        });
      } else {
        const oldIndex = pastEvents.findIndex(ev => ev.id === active.id);
        const newIndex = pastEvents.findIndex(ev => ev.id === over.id);
        const newOrder = arrayMove(pastEvents, oldIndex, newIndex);
        setPastEvents(newOrder);
        fetch("http://localhost:5050/api/past-events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder),
        });
      }
    }
  };

  const handleDisabledFieldClick = (field: string) => {
    toast(`${field} is disabled for Past Event.`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <CustomSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`flex-1 flex justify-start items-start py-12 px-2 transition-all duration-500 ${sidebarCollapsed ? "ml-24" : "ml-72"}`}>
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-extrabold mb-8 text-muted-foreground text-left">Events Admin</h1>
          
          {/* Add/Edit Event Section */}
          <div className="rounded-2xl border border-border bg-white/80 p-6 sm:p-10 w-full mb-8">
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">
              {section === "upcoming" ? "Add / Edit Upcoming Event" : "Add / Edit Past Event"}
            </h2>
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 gap-4 mb-4">
                {/* Event Type Selector (half width, no default selected) */}
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={section || ""}
                    onValueChange={value => setSection(value as "upcoming" | "past")}
                  >
                    <SelectTrigger className="w-full p-2 rounded bg-background border border-border text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming Event</SelectItem>
                      <SelectItem value="past">Past Event</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Empty cell for alignment */}
                  <div />
                </div>

                {/* Title (half width) */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="title"
                    value={form.title || ""}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full p-2 rounded bg-background border border-border text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    required
                  />
                  {/* Empty cell for alignment, or you can add something else here */}
                  <div />
                </div>

                {/* Date, Platform, Time, Category in a single row */}
                <div className="grid grid-cols-4 gap-4">
                  {/* Date Picker */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!form.date}
                        className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.date
                          ? format(new Date(form.date), "PPP")
                          : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={form.date ? new Date(form.date) : undefined}
                        onSelect={date =>
                          setForm({
                            ...form,
                            date: date
                              ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                              : ""
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  {/* Platform Selector */}
                  <Select
                    value={form.location || ""}
                    onValueChange={value => setForm({ ...form, location: value })}
                  >
                    <SelectTrigger className="w-full p-2 rounded bg-background border border-border text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Google Meet">Google Meet</SelectItem>
                      <SelectItem value="Zoom">Zoom</SelectItem>
                      <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
                      <SelectItem value="Physical Location">Physical Location</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Time Input */}
                  <input
                    name="time"
                    type="time"
                    value={form.time || ""}
                    onChange={handleChange}
                    placeholder="Time"
                    className={`w-full p-2 rounded border border-border text-muted-foreground placeholder:text-muted-foreground focus:outline-none transition
                      ${section === "past"
                        ? "bg-gray-200 cursor-not-allowed opacity-70"
                        : "bg-background focus:ring-2 focus:ring-purple-500"
                      }`}
                    disabled={section === "past"}
                    onClick={section === "past" ? () => handleDisabledFieldClick("Time") : undefined}
                  />

                  {/* Category Input */}
                  <input
                    name="category"
                    value={form.category || ""}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full p-2 rounded bg-background border border-border text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    required
                  />
                </div>

                {/* Image Poster and Meet Link in a single row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Image Poster Upload */}
                  <input
                    type="file"
                    name="imagePoster"
                    accept="image/*"
                    onChange={e => setForm({ ...form, imagePoster: e.target.files?.[0] })}
                    className="w-full p-2 rounded bg-background border border-border text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="Upload poster thumbnail"
                  />

                  {/* Meet Link */}
                  <input
                    name="meetLink"
                    value={form.meetLink || ""}
                    onChange={handleChange}
                    placeholder="Meet Link"
                    className={`w-full p-2 rounded border border-border text-muted-foreground placeholder:text-muted-foreground focus:outline-none transition
                      ${section === "past"
                        ? "bg-gray-200 cursor-not-allowed opacity-70"
                        : "bg-background focus:ring-2 focus:ring-purple-500"
                      }`}
                    disabled={section === "past"}
                    onClick={section === "past" ? () => handleDisabledFieldClick("Meet Link") : undefined}
                  />
                </div>

                {/* Description (full width) */}
                <Textarea
                  name="description"
                  value={form.description || ""}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full p-2 rounded bg-background border border-border text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  rows={2}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded font-bold shadow hover:scale-105 transition">
                  {editingId !== null ? "Update" : "Add"}
                </Button>
                {editingId !== null && (
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-muted text-muted-foreground hover:bg-gray-200 px-4 py-2 rounded font-semibold shadow transition"
                    onClick={() => { setForm(defaultForm); setEditingId(null); }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>

          <Separator className="my-8" />

          {/* Upcoming Events Table */}
          <div className="rounded-2xl border border-border bg-white/80 p-6 sm:p-10 w-full mb-8 animate-fade-in-up">
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">Upcoming Events</h2>
            <Table className="w-full">
              <TableCaption>Manage your upcoming events below. Toggle visibility to show/hide on website.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead> {/* Add this */}
                  <TableHead>Location</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Added By</TableHead> {/* Add this */}
                  <TableHead style={{ width: 90, minWidth: 90 }} className="text-center">Visible</TableHead>
                  <TableHead style={{ width: 140, minWidth: 140 }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No upcoming events found.
                    </TableCell>
                  </TableRow>
                ) : (
                  <DndContext collisionDetection={closestCenter} onDragEnd={e => handleDragEnd(e, "upcoming")}>
                    <SortableContext items={upcomingEvents.map(ev => ev.id)} strategy={verticalListSortingStrategy}>
                      {upcomingEvents.map(event => (
                        <SortableRow key={event.id} id={event.id}>
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
                                {event.title}
                              </TableCell>
                              <TableCell>{event.date}</TableCell>
                              <TableCell>{event.time}</TableCell>
                              <TableCell>{event.location}</TableCell>
                              <TableCell>{event.description}</TableCell>
                              <TableCell>{event.category}</TableCell>
                              <TableCell>{event.addedBy}</TableCell>
                              <TableCell className="text-center" style={{ width: 90, minWidth: 90 }}>
                                <label className="flex flex-col items-center justify-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={event.visible !== false}
                                    onChange={() => {
                                      const updated = upcomingEvents.map(ev =>
                                        ev.id === event.id ? { ...ev, visible: !ev.visible } : ev
                                      );
                                      setUpcomingEvents(updated);
                                      fetch("http://localhost:5050/api/upcoming-events", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify(updated),
                                      });
                                      toast("Visibility updated!");
                                    }}
                                    className="accent-purple-600 w-5 h-5 mb-1"
                                  />
                                </label>
                              </TableCell>
                              <TableCell style={{ width: 140, minWidth: 140 }}>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded font-semibold transition"
                                    onClick={() => handleEdit(event, "upcoming")}
                                  >
                                    Edit
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition"
                                        onClick={() => handleDelete(event.id, "upcoming")}
                                      >
                                        Delete
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent open={showConfirm.open && showConfirm.id === event.id && showConfirm.type === "upcoming"}>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle className="text-red-600">Confirm Delete</AlertDialogTitle>
                                        <AlertDialogDescription className="text-muted-foreground">
                                          Are you sure you want to delete this event? This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel
                                          className="bg-muted text-muted-foreground hover:bg-gray-200 px-4 py-2 rounded font-semibold transition"
                                          onClick={() => setShowConfirm({ open: false, id: null, type: null })}
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
                            </>
                          )}
                        </SortableRow>
                      ))}
                    </SortableContext>
                  </DndContext>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Past Events Table */}
          <div className="rounded-2xl border border-border bg-white/80 p-6 sm:p-10 w-full animate-fade-in-up delay-150">
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">Past Events</h2>
            <Table className="w-full">
              <TableCaption>Manage your past events below. Toggle visibility to show/hide on website.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead> {/* Add this */}
                  <TableHead>Location</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Added By</TableHead> {/* Add this */}
                  <TableHead style={{ width: 90, minWidth: 90 }} className="text-center">Visible</TableHead>
                  <TableHead style={{ width: 140, minWidth: 140 }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No past events found.
                    </TableCell>
                  </TableRow>
                ) : (
                  <DndContext collisionDetection={closestCenter} onDragEnd={e => handleDragEnd(e, "past")}>
                    <SortableContext items={pastEvents.map(ev => ev.id)} strategy={verticalListSortingStrategy}>
                      {pastEvents.map(event => (
                        <SortableRow key={event.id} id={event.id}>
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
                                {event.title}
                              </TableCell>
                              <TableCell>{event.date}</TableCell>
                              <TableCell>{event.time}</TableCell>
                              <TableCell>{event.location}</TableCell>
                              <TableCell>{event.description}</TableCell>
                              <TableCell>{event.category}</TableCell>
                              <TableCell>{event.addedBy}</TableCell> {/* Add this */}
                              <TableCell className="text-center" style={{ width: 90, minWidth: 90 }}>
                                <label className="flex flex-col items-center justify-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={event.visible !== false}
                                    onChange={() => handleToggleVisible(event.id)}
                                    className="accent-purple-600 w-5 h-5 mb-1"
                                  />
                                </label>
                              </TableCell>
                              <TableCell style={{ width: 140, minWidth: 140 }}>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded font-semibold transition"
                                    onClick={() => handleEdit(event, "past")}
                                  >
                                    Edit
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition"
                                        onClick={() => handleDelete(event.id, "past")}
                                      >
                                        Delete
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent open={showConfirm.open && showConfirm.id === event.id && showConfirm.type === "past"}>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle className="text-red-600">Confirm Delete</AlertDialogTitle>
                                        <AlertDialogDescription className="text-muted-foreground">
                                          Are you sure you want to delete this event? This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel
                                          className="bg-muted text-muted-foreground hover:bg-gray-200 px-4 py-2 rounded font-semibold transition"
                                          onClick={() => setShowConfirm({ open: false, id: null, type: null })}
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
                            </>
                          )}
                        </SortableRow>
                      ))}
                    </SortableContext>
                  </DndContext>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEvents;

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