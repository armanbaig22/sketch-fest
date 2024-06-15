'use client';
import { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { HiOutlineCursorClick } from 'react-icons/hi';
import Link from 'next/link';
import Draggable from 'react-draggable';

export default function PrivatePage() {
  const [roomId, setRoomId] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-50 to-white">
      <Draggable handle=".handle">
        <div className="flex flex-col items-center bg-slate-50 p-8 rounded-lg shadow-lg relative">
          <div className="handle absolute top-2 right-2 cursor-move">
            <HiOutlineCursorClick size={14} />
          </div>
          <Link href="/" className="absolute top-2 left-2">
            <FiChevronLeft className="text-gray-500 hover:text-gray-700" size={24} />
          </Link>
          <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            Private Room
          </h1>
          <input
            type="text"
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="p-2 border rounded mb-4 w-64 text-center"
          />
          <div className="flex space-x-4">
            <button className="bg-indigo-500 text-white px-6 py-3 rounded hover:bg-indigo-600">
              Join Room
            </button>
            <button className="bg-indigo-500 text-white px-6 py-3 rounded hover:bg-indigo-600">
              Create Room
            </button>
          </div>
        </div>
      </Draggable>
    </div>
  );
}