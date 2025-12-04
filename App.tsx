
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import Frosty from './components/FrostAI';
import Profile from './components/Profile';
import Settings from './components/Settings';
import StatusWidget from './components/StatusWidget';
import DiscordPopup from './components/DiscordPopup';
import Browser from './components/Browser';
import Hero from './components/Hero';
import { GAMES } from './constants';
import { Game } from './types';
import { Icons } from './components/Icon';
import { IntroAnimation } from './components/IntroAnimation';

// Snow Component
const Snow = () => {
  const snowflakes = useMemo(() => Array.from({ length: 50 }).map((_, i) => {
    const direction = Math.random() > 0.5 ? 'animate-fall-right' : 'animate-fall-left';
    return {
      id: i,
      left: `${Math.random() * 100}%`,
      animationName: direction,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 10}s`,
      opacity: Math.random() * 0.3 + 0.1,
      size: Math.random() * 3 + 1 + 'px'
    };
  }), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={`absolute bg-white rounded-full ${flake.animationName}`}
          style={{
            left: flake.left,
            top: '-20px',
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

// Section Component for Horizontal Scrolling
interface SectionProps {
  title: string;
  icon: React.ElementType;
  games: Game[];
  onGameClick: (game: Game) => void;
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  color?: string;
}

const GameSection: React.FC<SectionProps> = ({ title, icon: Icon, games, onGameClick, favorites, toggleFavorite, color = "text-white" }) => {
  if (games.length === 0) return null;

  return (
    <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
             <Icon size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        <button className="text-sm font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
          View All <Icons.ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
        </button>
      </div>
      
      <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar snap-x px-2 -mx-2">
        {games.map((game) => (
          <div key={game.id} className="min-w-[280px] sm:min-w-[320px] snap-center">
            <GameCard 
              game={game} 
              onClick={onGameClick}
              isFavorite={favorites.has(game.id)}
              onToggleFavorite={() => toggleFavorite(game.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showDiscordPopup, setShowDiscordPopup] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [showFrosty, setShowFrosty] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isGamingStarted, setIsGamingStarted] = useState(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>('dark');
  const [snowEnabled, setSnowEnabledState] = useState(true);
  const [customMouseEnabled, setCustomMouseEnabledState] = useState(true);
  const gamesSectionRef = useRef<HTMLDivElement>(null);
  
  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('icy_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setThemeState(settings.theme || 'dark');
      setSnowEnabledState(settings.snow !== undefined ? settings.snow : true);
      setCustomMouseEnabledState(settings.customMouse !== undefined ? settings.customMouse : true);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  // Apply custom mouse setting to document
  useEffect(() => {
    if (!customMouseEnabled) {
      document.body.classList.add('no-custom-mouse');
    } else {
      document.body.classList.remove('no-custom-mouse');
    }
  }, [customMouseEnabled]);

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    const settings = JSON.parse(localStorage.getItem('icy_settings') || '{}');
    localStorage.setItem('icy_settings', JSON.stringify({ ...settings, theme: newTheme }));
  };

  const setSnowEnabled = (enabled: boolean) => {
    setSnowEnabledState(enabled);
    const settings = JSON.parse(localStorage.getItem('icy_settings') || '{}');
    localStorage.setItem('icy_settings', JSON.stringify({ ...settings, snow: enabled }));
  };

  const setCustomMouseEnabled = (enabled: boolean) => {
    setCustomMouseEnabledState(enabled);
    const settings = JSON.parse(localStorage.getItem('icy_settings') || '{}');
    localStorage.setItem('icy_settings', JSON.stringify({ ...settings, customMouse: enabled }));
  };
  
  // Favorites State with LocalStorage
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('icy_favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('icy_favorites', JSON.stringify(Array.from(favorites)));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  }, [favorites]);

  const toggleFavorite = (gameId: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(gameId)) {
        newFavs.delete(gameId);
      } else {
        newFavs.add(gameId);
      }
      return newFavs;
    });
  };

  const handleStartGaming = () => {
    setIsGamingStarted(true);
    setTimeout(() => {
        gamesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Featured Games Logic
  const featuredGame = useMemo(() => GAMES.find(g => g.title.includes("1v1")) || GAMES[0], []);
  const carouselGames = useMemo(() => GAMES.filter(g => g.category !== 'Apps').slice(0, 6), []);
  
  // Derived Lists
  const favoriteGamesList = useMemo(() => GAMES.filter(g => favorites.has(g.id)), [favorites]);
  const recommendedGamesList = useMemo(() => GAMES.filter(g => g.isHot || g.isNew), []);

  // Filter Logic based on Tabs
  const displayedGames = useMemo(() => {
    if (activeTab === 'apps') {
        return GAMES.filter(g => g.category === 'Apps');
    }
    if (activeTab === 'games') {
        return GAMES.filter(g => g.category !== 'Apps');
    }
    // Home shows specific sections, but if we need a raw list (search etc), we default to all games excluding apps for now
    return GAMES.filter(g => g.category !== 'Apps');
  }, [activeTab]);

  // View Switcher Logic
  if (showFrosty) {
    return <Frosty onBack={() => setShowFrosty(false)} />;
  }

  if (showProfile) {
    return <Profile onBack={() => setShowProfile(false)} />;
  }

  if (showSettings) {
    return (
      <Settings 
        onBack={() => setShowSettings(false)}
        onThemeChange={setTheme}
        onSnowToggle={setSnowEnabled}
        onMouseToggle={setCustomMouseEnabled}
      />
    );
  }

  if (activeGame) {
    return <GamePlayer game={activeGame} onBack={() => setActiveGame(null)} />;
  }

  return (
    <div className={`flex h-screen ${theme === 'light' ? 'bg-white text-black' : 'bg-[#050505] text-white'} font-sans overflow-hidden selection:bg-cyan-500 selection:text-black`}>
      {/* Intro Animation */}
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

      {/* Discord Popup */}
      {showDiscordPopup && <DiscordPopup onClose={() => setShowDiscordPopup(false)} />}

      {/* Snow - Only show if enabled */}
      {snowEnabled && <Snow />}
      
      {/* Sidebar - Fixed Left */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onProfileClick={() => setShowProfile(true)}
        onSettingsClick={() => setShowSettings(true)}
        onFrostyClick={() => setShowFrosty(true)}
      />

      {/* Main Content - Right Side */}
      <div className={`flex-1 flex flex-col ml-20 h-full relative z-10 transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Top Bar (Minimal) */}
        <div className="absolute top-0 right-0 p-6 z-30 flex gap-4">
            {/* Search placeholder */}
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 scroll-smooth">
            <div className="max-w-[1600px] mx-auto space-y-12 pb-24">
                
                {/* Home View */}
                {activeTab === 'home' && (
                    <>
                        {/* Hero Section */}
                        <Hero 
                            featuredGame={featuredGame} 
                            carouselGames={carouselGames} 
                            onPlay={setActiveGame}
                            onStartGaming={handleStartGaming}
                        />

                        {/* Games Content - Only visible after clicking Start Gaming */}
                        {isGamingStarted && (
                            <div ref={gamesSectionRef} className="space-y-16 pt-8">
                                
                                {/* Favorites Section */}
                                {favoriteGamesList.length > 0 && (
                                    <GameSection 
                                        title="Favorites" 
                                        icon={Icons.Heart} 
                                        color="text-red-500"
                                        games={favoriteGamesList} 
                                        onGameClick={setActiveGame}
                                        favorites={favorites}
                                        toggleFavorite={toggleFavorite}
                                    />
                                )}

                                {/* Recommended Section */}
                                <GameSection 
                                    title="Recommended" 
                                    icon={Icons.Star} 
                                    color="text-yellow-400"
                                    games={recommendedGamesList} 
                                    onGameClick={setActiveGame}
                                    favorites={favorites}
                                    toggleFavorite={toggleFavorite}
                                />

                                {/* Popular / All Games Grid */}
                                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                                    <div className="flex items-center justify-between mb-6 px-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white/5 text-cyan-400">
                                                <Icons.Gamepad size={24} />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white">All Games</h2>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                        {displayedGames.map((game) => (
                                            <GameCard 
                                                key={game.id} 
                                                game={game} 
                                                onClick={setActiveGame}
                                                isFavorite={favorites.has(game.id)}
                                                onToggleFavorite={() => toggleFavorite(game.id)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Apps Section */}
                                <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                                    <div className="mb-6 mt-16 flex items-center justify-center gap-3 px-2 border-t border-cyan-500/20 pt-12">
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/30"></div>
                                        <Icons.LayoutGrid size={28} className="text-cyan-400 animate-pulse" />
                                        <h2 className="text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 tracking-wider drop-shadow-lg uppercase">Apps & Tools</h2>
                                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/30"></div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                        {GAMES.filter(g => g.category === 'Apps').map((game) => (
                                            <GameCard 
                                                key={game.id} 
                                                game={game} 
                                                onClick={setActiveGame}
                                                isFavorite={favorites.has(game.id)}
                                                onToggleFavorite={() => toggleFavorite(game.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Games / Apps Views (Direct navigation from sidebar) */}
                {(activeTab === 'games' || activeTab === 'apps') && (
                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-white mb-8 capitalize">{activeTab}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                            {displayedGames.map((game) => (
                                <GameCard 
                                    key={game.id} 
                                    game={game} 
                                    onClick={setActiveGame}
                                    isFavorite={favorites.has(game.id)}
                                    onToggleFavorite={() => toggleFavorite(game.id)}
                                />
                            ))}
                        </div>
                     </div>
                )}

                {/* Browser View Placeholder */}
                {activeTab === 'browser' && (
                    <Browser />
                )}

            </div>
        </main>

        {/* Status Widget (Bottom Left) */}
        {activeTab === 'home' && <StatusWidget />}

      </div>
    </div>
  );
}

export default App;
