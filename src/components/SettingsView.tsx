export default function SettingsView() {
  return (
    <div className="page-content">
      <h2>Settings</h2>
      <div className="settings-section">
        <h3>Profile</h3>
        <div className="settings-card">
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Full Name</span>
              <span className="setting-value">John Doe</span>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Email</span>
              <span className="setting-value">john@example.com</span>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Role</span>
              <span className="setting-value">Administrator</span>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Preferences</h3>
        <div className="settings-card">
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Notifications</span>
              <span className="setting-desc">Receive email notifications for new tasks</span>
            </div>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Dark Mode</span>
              <span className="setting-desc">Switch to dark theme</span>
            </div>
            <label className="toggle">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
