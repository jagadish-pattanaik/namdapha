import React, { useState, useEffect, useRef } from "react";
import CustomSidebar from "../components/CustomSidebar";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { CheckCircle, XCircle, Edit2, Trash2 } from "lucide-react";
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
import { differenceInHours, parseISO } from "date-fns";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
// import { glassToast } from "../lib/toast";
import { toast as glassToast } from "sonner";

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
  createdAt?: string; // Add createdAt here
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
  const [section, setSection] = useState<"" | "upcoming" | "past">("");
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
    glassToast("Visibility updated!", "success");
  };

  // When adding a new past event, add a createdAt timestamp
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedEvents;
    let actionType;
    let imageUrl = form.imageUrl || "";
    if (form.imagePoster && typeof form.imagePoster !== "string") {
      // Upload the image to your server or a cloud service here and get the URL
      // For demo, we'll just use a placeholder
      imageUrl = "https://via.placeholder.com/600x400?text=Uploaded+Image";
    }

    if (section === "upcoming") {
      const addedBy = user?.fullName || user?.emailAddress || "Unknown";
      if (editingId !== null) {
        updatedEvents = upcomingEvents.map(ev =>
          ev.id === editingId ? { ...ev, ...form, id: editingId, addedBy, imageUrl } : ev
        );
        actionType = "updated";
      } else {
        const newId = upcomingEvents.length ? Math.max(...upcomingEvents.map(ev => ev.id)) + 1 : 1;
        // Add new event at the start of the array
        updatedEvents = [{ ...form, id: newId, addedBy, imageUrl } as Event, ...upcomingEvents];
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
        glassToast(`Upcoming event ${actionType}!`, "success");
      });
    } else {
      const addedBy = user?.fullName || user?.emailAddress || "Unknown";
      if (editingId !== null) {
        updatedEvents = pastEvents.map(ev =>
          ev.id === editingId ? { ...ev, ...form, id: editingId, addedBy, imageUrl } : ev
        );
        actionType = "updated";
      } else {
        const newId = pastEvents.length ? Math.max(...pastEvents.map(ev => ev.id)) + 1 : 1;
        // Add new event at the start of the array with createdAt timestamp
        updatedEvents = [
          { ...form, id: newId, addedBy, createdAt: new Date().toISOString(), imageUrl } as Event,
          ...pastEvents,
        ];
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
        glassToast(`Past event ${actionType}!`, "success");
      });
    }
  };

  const handleEdit = (event: Event, type: "upcoming" | "past") => {
    setForm(event);
    setEditingId(event.id);
    setSection(type);
    glassToast("Edit mode activated!", "info");
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
          glassToast("Upcoming event deleted!", "error");
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
          glassToast("Past event deleted!", "error");
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
    glassToast(`${field} is disabled for Past Event.`, "info");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <CustomSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`flex-1 flex justify-start items-start py-12 px-2 transition-all duration-500 ${sidebarCollapsed ? "ml-24" : "ml-72"}`}>
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-extrabold mb-8 text-muted-foreground text-left">Events</h1>
          
          {/* Add/Edit Event Section */}
          <div className="rounded-2xl border border-border bg-white/80 p-6 sm:p-10 w-full mb-8">
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">
              {section === ""
                ? "Add / Edit Events"
                : section === "upcoming"
                  ? "Add / Edit Upcoming Event"
                  : "Add / Edit Past Event"
              }
            </h2>
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 gap-4 mb-4" aria-disabled={section === ""}>
                {/* Event Type Selector */}
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={section}
                    onValueChange={value => setSection(value as "" | "upcoming" | "past")}
                  >
                    <SelectTrigger className="w-full p-2 rounded bg-background border border-border text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming Event</SelectItem>
                      <SelectItem value="past">Past Event</SelectItem>
                    </SelectContent>
                  </Select>
                  <div />
                </div>

                {/* Title & Meet Link */}
                <div className="flex gap-4">
                  <div className="flex flex-col flex-1">
                    <Label htmlFor="title" className="mb-1">Event Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={form.title || ""}
                      onChange={e => {
                        if (section === "") {
                          alert("Please select an event type first.");
                          return;
                        }
                        handleChange(e);
                      }}
                      placeholder="Title"
                      required
                      disabled={section === ""}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <Label htmlFor="meetLink" className="mb-1">G-Meet Link</Label>
                    <Input
                      id="meetLink"
                      name="meetLink"
                      value={form.meetLink || ""}
                      onChange={e => {
                        if (section === "") {
                          alert("Please select an event type first.");
                          return;
                        }
                        handleChange(e);
                      }}
                      placeholder="Meet Link"
                      disabled={section === "" || section === "past"}
                      onClick={section === "past" ? () => handleDisabledFieldClick("Meet Link") : undefined}
                    />
                  </div>
                </div>

                {/* Date, Starting Time, Ending Time, Platform, Category */}
                <div className="flex gap-4 mt-4">
                  <div className="flex flex-col flex-1">
                    <Label className="mb-1">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!form.date}
                          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                          disabled={section === ""}
                          onClick={() => {
                            if (section === "") {
                              alert("Please select an event type first.");
                            }
                          }}
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
                          onSelect={date => {
                            if (section === "") {
                              alert("Please select an event type first.");
                              return;
                            }
                            setForm({
                              ...form,
                              date: date
                                ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                                : ""
                            });
                          }}
                          initialFocus
                          disabled={section === "" ? { before: new Date(1900, 0, 1), after: new Date(3000, 0, 1) } : section === "past"
                            ? { after: new Date() }
                            : undefined
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col flex-1">
                    <Label htmlFor="time" className="mb-1">Starting Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={form.time || ""}
                      onChange={e => {
                        if (section === "") {
                          alert("Please select an event type first.");
                          return;
                        }
                        handleChange(e);
                      }}
                      placeholder="Starting Time"
                      disabled={section === "" || section === "past"}
                      onClick={section === "past" ? () => handleDisabledFieldClick("Starting Time") : undefined}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <Label htmlFor="endTime" className="mb-1">Ending Time</Label>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={form.endTime || ""}
                      onChange={e => {
                        if (section === "") {
                          alert("Please select an event type first.");
                          return;
                        }
                        handleChange(e);
                      }}
                      placeholder="Ending Time"
                      disabled={section === "" || section === "past"}
                      onClick={section === "past" ? () => handleDisabledFieldClick("Ending Time") : undefined}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <Label className="mb-1">Platform</Label>
                    <Select
                      value={form.location || ""}
                      onValueChange={value => {
                        if (section === "") {
                          alert("Please select an event type first.");
                          return;
                        }
                        setForm({ ...form, location: value });
                      }}
                      disabled={section === ""}
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
                  </div>
                  <div className="flex flex-col flex-1">
                    <Label className="mb-1">Category</Label>
                    <Select
                      value={form.category || ""}
                      onValueChange={value => {
                        if (section === "") {
                          alert("Please select an event type first.");
                          return;
                        }
                        setForm({ ...form, category: value });
                      }}
                      disabled={section === ""}
                    >
                      <SelectTrigger className="w-full p-2 rounded bg-background border border-border text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paradox">Paradox</SelectItem>
                        <SelectItem value="Academics">Academics</SelectItem>
                        <SelectItem value="Student Activity">Student Activity</SelectItem>
                        <SelectItem value="Guest Speaker Sessions">Guest Speaker Sessions</SelectItem>
                        <SelectItem value="Revision Sessions">Revision Sessions</SelectItem>
                        <SelectItem value="Offline Meetups">Offline Meetups</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Poster Upload and Link */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex flex-col flex-1">
                    <Label className="mb-1">Upload Event Poster</Label>
                    <Input
                      type="file"
                      name="imagePoster"
                      accept="image/*"
                      onChange={e => {
                        if (section === "") {
                          alert("Please select an event type first.");
                          return;
                        }
                        setForm({ ...form, imagePoster: e.target.files?.[0] });
                      }}
                      placeholder="Upload poster thumbnail"
                      disabled={section === ""}
                    />
                  </div>
                  <span className="mx-2 font-semibold text-muted-foreground">or</span>
                  <div className="flex flex-col flex-1">
                    <Label className="mb-1">Paste Event Poster URL</Label>
                    <Input
                      name="imageUrl"
                      value={form.imageUrl || ""}
                      onChange={e => {
                        if (section === "") {
                          alert("Please select an event type first.");
                          return;
                        }
                        handleChange(e);
                      }}
                      placeholder="Paste image link (URL)"
                      disabled={section === ""}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col mt-4">
                  <Label className="mb-1">Description</Label>
                  <Textarea
                    name="description"
                    value={form.description || ""}
                    onChange={e => {
                      if (section === "") {
                        alert("Please select an event type first.");
                        return;
                      }
                      handleChange(e);
                    }}
                    placeholder="Description"
                    rows={2}
                    disabled={section === ""}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded font-bold shadow hover:scale-105 transition"
                  disabled={section === ""}
                >
                  {editingId !== null ? "Update" : "Add"}
                </Button>
                {editingId !== null && (
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-muted text-muted-foreground hover:bg-gray-200 px-4 py-2 rounded font-semibold shadow transition"
                    onClick={() => { setForm(defaultForm); setEditingId(null); }}
                    disabled={section === ""}
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
                                      glassToast("Visibility updated!", "success");
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
                      {pastEvents.map(event => {
                        // Check if event is newly added (within 48 hours)
                        const isNew = event.createdAt && differenceInHours(new Date(), parseISO(event.createdAt)) < 48;
                        return (
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
                                  {isNew && (
                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold border border-green-300 animate-pulse animate-blink">
                                      Newly Added
                                    </span>
                                  )}
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
                        );
                      })}
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

