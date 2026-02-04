import React, { useState } from 'react';
import { Reel, ReelData } from './components/Reel';
import { useInView } from 'react-intersection-observer';
import { PlusSquare, Search, Home, User } from 'lucide-react';

const REELS_DATA: ReelData[] = [
  {
    id: '1',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1766878777970-8c7adb08a211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBtb3ZpZSUyMHNjZW5lJTIwZGFyayUyMG1vb2R5fGVufDF8fHx8MTc3MDE2ODQ1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    username: 'indiefilmaker',
    description: 'The forest scene from my latest short film "Echoes". Shot on BMPCC 4K. #cinematography #shortfilm',
    likes: 1204,
    comments: 45,
    shares: 12,
    songName: 'Original Score - Echoes Theme'
  },
  {
    id: '2',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1716827172097-940849ba4a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFlc3RoZXRpYyUyMHZlcnRpY2FsJTIwbmlnaHR8ZW58MXx8fHwxNzcwMTY4NDU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    username: 'night_shoots',
    description: 'Urban aesthetics at 3AM. The city never sleeps, and neither do we. 🌃 #nightlife #urban',
    likes: 8500,
    comments: 120,
    shares: 430,
    songName: 'Midnight City - Ambient Mix'
  },
  {
    id: '3',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1586167339028-89d9dc57b9a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9ydCUyMGZpbG0lMjB2ZXJ0aWNhbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDE2ODQ1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    username: 'travel_lens',
    description: 'Journey through the mountains. Sometimes you just have to get lost to find yourself. 🏔️',
    likes: 342,
    comments: 12,
    shares: 5,
    songName: 'Wanderlust - Acoustic'
  },
  {
    id: '4',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1766878777970-8c7adb08a211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBtb3ZpZSUyMHNjZW5lJTIwZGFyayUyMG1vb2R5fGVufDF8fHx8MTc3MDE2ODQ1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    username: 'scifi_lab',
    description: 'Testing new VFX for the upcoming project. What do you think of the color grade?',
    likes: 15600,
    comments: 890,
    shares: 2100,
    songName: 'Cyberpunk Beats - Synthwave'
  }
];

const ReelWrapper = ({ data }: { data: ReelData }) => {
  const { ref, inView } = useInView({
    threshold: 0.6, // Needs to be 60% visible to play
  });

  return (
    <div ref={ref} className="h-full w-full snap-start">
      <Reel data={data} isActive={inView} />
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="bg-black h-screen w-full flex justify-center text-white overflow-hidden">
      {/* Mobile-first Container (max-width for desktop view) */}
      <div className="w-full md:max-w-[400px] h-full relative flex flex-col bg-black border-x border-gray-800">
        
        {/* Top Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 pt-6 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
          <h1 className="text-xl font-bold font-serif tracking-wide pointer-events-auto">FilmReels</h1>
          <div className="pointer-events-auto">
             <Search className="w-6 h-6" />
          </div>
        </div>

        {/* Feed Container */}
        <div className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
          {REELS_DATA.map((reel) => (
            <div key={reel.id} className="h-full w-full">
              <ReelWrapper data={reel} />
            </div>
          ))}
          
          {/* End of Feed Placeholder */}
          <div className="h-full w-full snap-start flex flex-col items-center justify-center bg-gray-900 text-gray-400 p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">You're all caught up!</h2>
            <p>Check back later for more short films.</p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="h-16 bg-black border-t border-gray-800 flex justify-between items-center px-6 z-30">
          <button 
            onClick={() => setActiveTab('home')}
            className={`p-2 ${activeTab === 'home' ? 'text-white' : 'text-gray-500'}`}
          >
            <Home size={24} fill={activeTab === 'home' ? "currentColor" : "none"} />
          </button>
          
          <button 
            onClick={() => setActiveTab('explore')}
            className={`p-2 ${activeTab === 'explore' ? 'text-white' : 'text-gray-500'}`}
          >
            <Search size={24} />
          </button>

          <button 
            onClick={() => setActiveTab('create')}
            className="p-2 text-white"
          >
            <PlusSquare size={32} />
          </button>

          <button 
            onClick={() => setActiveTab('inbox')}
            className={`p-2 ${activeTab === 'inbox' ? 'text-white' : 'text-gray-500'}`}
          >
            <div className="relative">
               {/* Just a mock icon for activity/inbox */}
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`p-2 ${activeTab === 'profile' ? 'text-white' : 'text-gray-500'}`}
          >
            <User size={24} fill={activeTab === 'profile' ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
