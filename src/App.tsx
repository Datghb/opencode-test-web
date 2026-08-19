import { useState, useEffect } from 'react';
import './App.css';
import SettingsView from './components/SettingsView';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due: string;
  priority: string;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Design new landing page',
    description: 'Create wireframes and mockups',
    status: 'Completed',
    due: 'Aug 15, 2026',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Implement authentication flow',
    description: 'Login and signup pages',
    status: 'In Progress',
    due: 'Aug 20, 2026',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Fix navigation bug on mobile',
    description: 'Sidebar not closing',
    status: 'Overdue',
    due: 'Aug 10, 2026',
    priority: 'High',
  },
  {
    id: 4,
    title: 'Update API documentation',
    description: 'Add new endpoints',
    status: 'In Progress',
    due: 'Aug 25, 2026',
    priority: 'Low',
  },
  {
    id: 5,
    title: 'Deploy version 2.0 to production',
    description: 'Release new features',
    status: 'Completed',
    due: 'Aug 12, 2026',
    priority: 'Medium',
  },
];

function App() {
  const [activeView, setActiveView] = useState('overview');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'In Progress',
    priority: 'Medium'
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      due: 'Today',
      priority: newTask.priority,
    };
    setTasks([task, ...tasks]);
    setNewTask({ title: '', description: '', status: 'In Progress', priority: 'Medium' });
    setIsModalOpen(false);
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'Completed' ? 'In Progress' : 'Completed';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span>TaskFlow</span>
        </div>
        
        <nav className="sidebar-nav">
          <a 
            href="#" 
            className={activeView === 'overview' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveView('overview'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Overview
          </a>
          <a 
            href="#" 
            className={activeView === 'tasks' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveView('tasks'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Tasks
          </a>
          <a 
            href="#" 
            className={activeView === 'settings' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveView('settings'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Settings
          </a>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-avatar">JD</div>
          <div className="user-info">
            <span className="user-name">John Doe</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </aside>
      
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <h1>{activeView === 'overview' ? 'Overview' : activeView === 'tasks' ? 'All Tasks' : 'Settings'}</h1>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <div className="header-avatar">JD</div>
          </div>
        </header>
        
        <div className="dashboard-content">
          {activeView === 'overview' && (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon total">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>Total Tasks</h3>
                    <p>{tasks.length}</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon completed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>Completed</h3>
                    <p>{tasks.filter(t => t.status === 'Completed').length}</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon in-progress">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>In Progress</h3>
                    <p>{tasks.filter(t => t.status === 'In Progress').length}</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon overdue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>Overdue</h3>
                    <p>{tasks.filter(t => t.status === 'Overdue').length}</p>
                  </div>
                </div>
              </div>
              
              <div className="task-list-section">
                <div className="section-header">
                  <h2>Recent Tasks</h2>
                  <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    New Task
                  </button>
                </div>
                
                <div className="task-list">
                  {tasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="task-item">
                      <div className="task-checkbox">
                        <input 
                          type="checkbox" 
                          id={`task-${task.id}`} 
                          checked={task.status === 'Completed'}
                          onChange={() => handleToggleComplete(task.id)}
                        />
                      </div>
                      <div className="task-details">
                        <h4 className={task.status === 'Completed' ? 'completed-title' : ''}>
                          {task.title}
                        </h4>
                        <p className="task-desc">{task.description}</p>
                        <div className="task-meta">
                          <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                            {task.status}
                          </span>
                          <span className="task-due">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            {task.due}
                          </span>
                        </div>
                      </div>
                      <div className={`priority-badge ${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeView === 'tasks' && (
            <div className="task-list-section">
              <div className="section-header">
                <h2>All Tasks</h2>
                <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  New Task
                </button>
              </div>
              
              <div className="task-list">
                {tasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <div className="task-checkbox">
                      <input 
                        type="checkbox" 
                        id={`task-${task.id}`} 
                        checked={task.status === 'Completed'}
                        onChange={() => handleToggleComplete(task.id)}
                      />
                    </div>
                    <div className="task-details">
                      <h4 className={task.status === 'Completed' ? 'completed-title' : ''}>
                        {task.title}
                      </h4>
                      <p className="task-desc">{task.description}</p>
                      <div className="task-meta">
                        <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                          {task.status}
                        </span>
                        <span className="task-due">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {task.due}
                        </span>
                      </div>
                    </div>
                    <div className={`priority-badge ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'settings' && <SettingsView />}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create New Task</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input 
                  type="text" 
                  id="title" 
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description" 
                  rows={3}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Enter task description"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select 
                    id="status"
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select 
                    id="priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
