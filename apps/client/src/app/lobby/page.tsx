"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ArrowRight } from "lucide-react";
import axios from "axios";
import { HTTP_URL } from "../config";
import { useLoading } from "@/hooks/useLoading";

export default function Dashboard() {
  const { startLoading, stopLoading } = useLoading();

  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
    }
  }, [router]);

  const handleCreateRoom = async () => {
    setError(null);
    if (!roomName.trim()) {
      setError("Give the room a name first.");
      return;
    }
    startLoading("Creating room...");
    try {
      await axios.post(
        `${HTTP_URL}/room`,
        { name: roomName },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      await handleJoinRoom();
    } catch {
      setError("Couldn't create that room. It may already exist.");
      stopLoading();
    }
  };

  const handleJoinRoom = async () => {
    setError(null);
    if (!roomName.trim()) {
      setError("Enter a room name to join.");
      return;
    }
    startLoading("Joining room...");
    try {
      await router.push(`/canvas/${roomName}`);
    } catch {
      setError("Couldn't join that room.");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-ink)">
      <div className="max-w-lg mx-auto px-6 py-20">
        <h1 className="text-2xl font-semibold text-(--color-ink)">Start drawing</h1>
        <p className="mt-1.5 text-sm text-(--color-ink-muted)">
          Create a new room, or join one someone already shared with you.
        </p>

        <div className="mt-8 bg-(--color-surface-recessed) p-6 rounded-lg border border-(--color-line)">
          <label htmlFor="room-name" className="block text-sm font-medium text-(--color-ink)">
            Room name
          </label>
          <input
            id="room-name"
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="wireframe-review"
            className="mt-1.5 block w-full px-3.5 py-2.5 bg-(--color-bg) border border-(--color-line) rounded-md text-sm text-(--color-ink) placeholder-(--color-ink-muted) transition-colors focus:outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)"
          />

          {error && (
            <p role="alert" className="mt-3 text-sm text-(--color-pen-coral)">
              {error}
            </p>
          )}

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCreateRoom}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-(--color-accent) text-(--color-bg) text-sm font-medium hover:brightness-110 transition-[filter] flex-1"
            >
              <Plus className="w-4 h-4" />
              Create room
            </button>
            <button
              onClick={handleJoinRoom}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-(--color-line) text-(--color-ink) text-sm font-medium hover:bg-(--color-surface) transition-colors flex-1"
            >
              <ArrowRight className="w-4 h-4" />
              Join room
            </button>
          </div>
        </div>

        <p className="mt-4 text-xs text-(--color-ink-muted)">
          A room name is its address — share the same name with anyone you want drawing alongside you.
        </p>
      </div>
    </div>
  );
}
