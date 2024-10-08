"use client";

import { useState, useEffect } from 'react';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HiOutlineCursorClick } from "react-icons/hi";
import { IoMdReturnLeft } from 'react-icons/io';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slice'; 

import axios from 'axios';

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    generateRandomAvatar();
  }, []);

  const generateRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    const newAvatar = createAvatar(adventurer, {
      seed: randomSeed,
    });
    const svg = newAvatar.toString();
    setAvatar(svg);
  };

  const avatarAnimationVariants = {
    shake: {
      rotate: [-10, 10, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const dispatch = useDispatch();
  
  const handlePlay = async () => {
    if (username.trim() === '') {
      alert('Please enter a username');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/play/', { username, avatar });
      const roomId = response.data.room_id;
  
      // Dispatch the username and avatar to Redux store
      dispatch(setUser({ username, avatar}));
  
      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-50 to-white">
      <div className="flex flex-col items-center bg-slate-50 p-8 rounded-lg shadow-lg relative">
        <h1 className="text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 font-cursive">
          Sketch Fest
        </h1>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded mb-4 w-64 text-center"
        />
        <div className="relative pl-12 pr-12 pt-4 pb-4">
          <button
            onClick={() => generateRandomAvatar()}
            className="mr-8 absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white px-2 py-2 rounded-full hover:bg-indigo-600"
          >
            <FiChevronLeft />
          </button>
          <motion.div
            variants={avatarAnimationVariants}
            animate="shake"
            className="mb-6"
          >
            <div
              dangerouslySetInnerHTML={{ __html: avatar }}
              className="w-24 h-24 rounded-full border"
            />
          </motion.div>
          <button
            onClick={() => generateRandomAvatar()}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white px-2 py-2 rounded-full hover:bg-indigo-600"
          >
            <FiChevronRight />
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <button className="bg-indigo-500 text-white px-6 py-3 rounded hover:bg-indigo-600" onClick={handlePlay}>
            Play!
          </button>
          <Link href="/private">
            <button className="bg-indigo-500 text-white px-6 py-3 rounded hover:bg-indigo-600">
              Private Room
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
