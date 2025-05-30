"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Plus, ArrowRight, Crown, UserPlus } from "lucide-react";
import axios from "axios";
import { HTTP_URL } from "../config";
import { useLoading } from "@/hooks/useLoading";

export default function Dashboard() {
  const {startLoading, stopLoading} = useLoading();

  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  // Mock data for available rooms
  const availableRooms = [
    { id: 1, name: "Design Workshop", participants: 3, maxParticipants: 5, host: "Sarah K." },
    { id: 2, name: "Brainstorming Session", participants: 2, maxParticipants: 4, host: "Mike R." },
    { id: 3, name: "Team Planning", participants: 4, maxParticipants: 6, host: "Alex M." },
    { id: 4, name: "Project Ideation", participants: 1, maxParticipants: 5, host: "Emma L." },
    { id: 5, name: "Creative Space", participants: 2, maxParticipants: 4, host: "John D." },
  ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            alert("You are not signed in !!");
            router.push('/signin')
        }
    }, [])

    const handleCreateRoom = async () => {

        if(!roomName){
            alert("Enter a room name");
            return;
        }
        startLoading("Creating room...");
        try{
            const response = await axios.post(`${HTTP_URL}/room`, {
              name: roomName
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data)

          // join the user into the created room
            handleJoinRoom();
        } catch (error) {
            stopLoading();
            console.error("Error creating room:", error);
            alert("Failed to create room. Please try again.");
        }
    };

    const handleJoinRoom = async() => {
        // redirect to the canvas/slug route
        startLoading("Joining room...");
        try{
            await router.push(`/canvas/${roomName}`)
            stopLoading();
        } catch (error) {
            stopLoading();
            console.error("Error joining room:", error);
            alert("Failed to join room. Please try again.");
        }
    }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Background gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(120,20,120,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(120,20,120,0.15),transparent_50%)]"></div>
        <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-fuchsia-900/10 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-fuchsia-900/10 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Create/Join Room Section */}
        <div className="bg-gray-800/40 backdrop-blur-lg p-8 rounded-xl border border-gray-700/50 shadow-xl">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-fuchsia-400 bg-clip-text text-transparent">
            Create or Join a Room
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
              className="flex-grow px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg 
                       focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500
                       placeholder-gray-500 transition-all duration-200"
            />
            
            <div className="flex gap-3">
              <button
                onClick={handleCreateRoom}
                className="flex items-center px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 
                         rounded-lg transition-all duration-200 gap-2 flex-1 sm:flex-initial
                         justify-center shadow-lg shadow-fuchsia-800/20
                         hover:shadow-fuchsia-700/40"
              >
                <Plus className="w-5 h-5" />
                <span>Create</span>
              </button>
              
              <button
                onClick={() => handleJoinRoom()}
                className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 
                         rounded-lg transition-all duration-200 gap-2 flex-1 sm:flex-initial
                         justify-center"
              >
                <ArrowRight className="w-5 h-5" />
                <span>Join</span>
              </button>
            </div>
          </div>
        </div>

        {/* Available Rooms Section */}
        <div className="bg-gray-800/40 backdrop-blur-lg p-8 rounded-xl border border-gray-700/50 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-fuchsia-400" />
            Available Rooms
          </h2>
          
          <div className="grid gap-4">
            {availableRooms.map((room) => (
              <div
                key={room.id}
                className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 
                         hover:border-fuchsia-500/50 transition-all duration-200
                         group"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium group-hover:text-fuchsia-400 transition-colors">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span>{room.host}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{room.participants}/{room.maxParticipants}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleJoinRoom()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 
                             rounded-lg transition-all duration-200"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Join</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}