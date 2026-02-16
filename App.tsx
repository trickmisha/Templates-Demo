
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_COMPONENTS } from './constants.tsx';
import { UIComponent, FilterState, Technology, DEFAULT_CATEGORIES, UserSession, UserRole } from './types.ts';
import { CloudDB } from './db.ts';
import Header from './components/Header.tsx';
import SearchBar from './components/SearchBar.tsx';
import FilterSidebar from './components/FilterSidebar.tsx';
import ComponentCard from './components/ComponentCard.tsx';
import ComponentDetails from './components/ComponentDetails.tsx';
import Notification from './components/Notification.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import AuthGate from './components/AuthGate.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [users, setUsers] = useState<UserSession[]>([]);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All',
    technology: Technology.VANILLA
  });
  
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [cloudComponents, setCloudComponents] = useState<UIComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<UIComponent | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; isVisible: boolean }>({
    message: '',
    isVisible: false
  });

  useEffect(() => {
    const initData = async () => {
      try {
        setIsLoading(true);
        
        // Try to fetch users and components, but don't let failure block the app
        const [fetched, initialUsers] = await Promise.all([
          CloudDB.getComponents().catch(() => []),
          CloudDB.getUsers().catch(() => [])
        ]);
        
        setCloudComponents(fetched);
        setUsers(initialUsers);

        // Safe Session Recovery
        const session = sessionStorage.getItem('ui_hub_session');
        if (session && session !== 'undefined') {
          try {
            setCurrentUser(JSON.parse(session));
          } catch (e) {
            sessionStorage.removeItem('ui_hub_session');
          }
        }

        // Load Favs/Cats from local
        const savedFavs = localStorage.getItem('ui_hub_favorites');
        if (savedFavs) setFavorites(JSON.parse(savedFavs));
        const savedCats = localStorage.getItem('ui_hub_categories');
        if (savedCats) setCategories(JSON.parse(savedCats));

      } catch (e) {
        console.error("Critical initialization error:", e);
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, []);

  const allComponents = useMemo(() => {
    const merged = [...cloudComponents, ...MOCK_COMPONENTS];
    return merged.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
  }, [cloudComponents]);

  const filteredComponents = useMemo(() => {
    return allComponents.filter(comp => {
      const query = filters.search.toLowerCase();
      const matchesSearch = comp.name.toLowerCase().includes(query) ||
                            comp.description.toLowerCase().includes(query) ||
                            comp.tags.some(tag => tag.toLowerCase().includes(query));
      
      const matchesCategory = filters.category === 'All' || comp.category === filters.category;
      return matchesSearch && matchesCategory;
    });
  }, [allComponents, filters]);

  const handleAuth = async (username: string) => {
    const existing = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    let loggedUser: UserSession;

    if (existing) {
      loggedUser = { ...existing, lastLogin: new Date().toISOString() };
    } else {
      loggedUser = {
        id: Date.now().toString(),
        username,
        role: username.toLowerCase() === 'mishatrick' ? 'Admin' : 'User',
        lastLogin: new Date().toISOString(),
        publishedCount: 0
      };
    }
    
    await CloudDB.saveUser(loggedUser);
    const updatedUsers = await CloudDB.getUsers();
    setUsers(updatedUsers);
    
    setCurrentUser(loggedUser);
    sessionStorage.setItem('ui_hub_session', JSON.stringify(loggedUser));
  };

  const handleUpdateRole = async (userId: string, role: UserRole) => {
    const userToUpdate = users.find(u => u.id === userId);
    if (userToUpdate) {
      const updated = { ...userToUpdate, role };
      await CloudDB.saveUser(updated);
      const updatedUsers = await CloudDB.getUsers();
      setUsers(updatedUsers);
      if (currentUser?.id === userId) setCurrentUser(updated);
      showNotification(`User role updated to ${role}`);
    }
  };

  const handleAddCategory = (name: string) => {
    if (!categories.includes(name)) {
      const newCats = [...categories, name];
      setCategories(newCats);
      localStorage.setItem('ui_hub_categories', JSON.stringify(newCats));
      showNotification(`Category "${name}" added`);
    }
  };

  const handleDeleteComponent = async (id: string) => {
    await CloudDB.deleteComponent(id);
    const fetched = await CloudDB.getComponents();
    setCloudComponents(fetched);
    showNotification('Asset removed');
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newFavs = favorites.includes(id) 
      ? favorites.filter(favId => favId !== id) 
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('ui_hub_favorites', JSON.stringify(newFavs));
  };

  const handleSaveComponent = async (component: UIComponent) => {
    try {
      await CloudDB.saveComponent(component);
      const fetched = await CloudDB.getComponents();
      setCloudComponents(fetched);
      
      if (currentUser) {
        const updatedUser = { ...currentUser, publishedCount: (currentUser.publishedCount || 0) + 1 };
        await CloudDB.saveUser(updatedUser);
        const updatedUsers = await CloudDB.getUsers();
        setUsers(updatedUsers);
        setCurrentUser(updatedUser);
      }
      
      setIsAdminOpen(false);
      showNotification('Published successfully!');
    } catch (err) {
      showNotification('Error saving component. Check connection.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification('Code copied to clipboard');
  };

  const showNotification = (message: string) => {
    setNotification({ message, isVisible: true });
  };

  if (!currentUser) return <AuthGate onUnlock={handleAuth} />;

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7]">
      <Header 
        onAddClick={() => setIsAdminOpen(true)} 
        isAdmin={currentUser.role === 'Admin'}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />
      
      <main className="flex-1 container mx-auto px-6 py-12">
        <section className="mb-20 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white shadow-sm border border-gray-100 mb-2">
             <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
             </span>
             <span className="text-[11px] font-bold text-gray-900 tracking-tight">
               {isLoading ? 'Syncing...' : (cloudComponents.length > 0 ? 'Cloud Connected' : 'Cloud Library Ready')}
             </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#1d1d1f] tracking-tight leading-[1.05]">
            UI Workspace Hub <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Global Knowledge.</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            Access your shared design library from anywhere. Syncing automatically.
          </p>
          <div className="flex justify-center pt-8">
            <SearchBar 
              value={filters.search} 
              onChange={(search) => setFilters(prev => ({ ...prev, search }))} 
            />
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <FilterSidebar 
              filters={filters} 
              onFilterChange={setFilters} 
              categories={categories}
              onAddCategory={handleAddCategory}
              userRole={currentUser.role}
            />
          </aside>

          <section className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-bold text-[#1d1d1f]">
                  {filters.category === 'All' ? 'Everything' : filters.category}
                </h2>
                <span className="text-sm font-semibold text-gray-300 tracking-tight">{filteredComponents.length} Assets</span>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-gray-100"></div>
                ))}
              </div>
            ) : filteredComponents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredComponents.map(comp => (
                  <div key={comp.id} className="relative group">
                    <ComponentCard 
                      component={comp} 
                      onClick={() => setSelectedComponent(comp)}
                      isFavorite={favorites.includes(comp.id)}
                      onToggleFavorite={(e) => toggleFavorite(e, comp.id)}
                    />
                    {(currentUser.role === 'Admin' || comp.author === currentUser.username) && (
                       <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteComponent(comp.id); }}
                        className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-red-500 hover:text-white shadow-sm"
                        title="Delete from Cloud"
                       >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                         </svg>
                       </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[2.5rem] shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">No results found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => setFilters({ search: '', category: 'All', technology: Technology.VANILLA })}
                  className="mt-8 text-blue-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="py-20 border-t border-gray-100 bg-white">
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">U</span>
            </div>
            <span className="text-sm font-bold tracking-tight uppercase">UI HUB CLOUD</span>
          </div>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">&copy; 2024 Global Shared Assets</p>
        </div>
      </footer>

      {isDashboardOpen && (
        <AdminDashboard 
          users={users} 
          onClose={() => setIsDashboardOpen(false)} 
          onUpdateRole={handleUpdateRole}
        />
      )}

      {isAdminOpen && (
        <AdminPanel 
          categories={categories}
          currentUser={currentUser}
          onClose={() => setIsAdminOpen(false)} 
          onSave={handleSaveComponent} 
        />
      )}

      {selectedComponent && (
        <ComponentDetails 
          component={selectedComponent} 
          onClose={() => setSelectedComponent(null)} 
          onCopy={copyToClipboard}
        />
      )}
      
      <Notification 
        message={notification.message} 
        isVisible={notification.isVisible} 
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))} 
      />
    </div>
  );
};

export default App;
