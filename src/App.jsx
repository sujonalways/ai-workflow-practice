import { useState } from 'react'
import './App.css'

const Icon = ({ name, size = 18 }) => {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    credit: <><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 10h20"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.7 1.2c-.9 1.3-2.3 1.4-2.3 3M12 17h.01"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    camera: <><path d="M14 5h-4L8 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2-2Z"/><circle cx="12" cy="13" r="3"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function App() {
  const [saved, setSaved] = useState(false)
  const [active, setActive] = useState('Profile')
  const [notifications, setNotifications] = useState({ product: true, digest: false, security: true })
  const navItems = [
    { label: 'Overview', icon: 'grid' }, { label: 'Profile', icon: 'user' },
    { label: 'Security', icon: 'shield' }, { label: 'Notifications', icon: 'bell' },
    { label: 'Billing', icon: 'credit' },
  ]
  const toggle = (key) => setNotifications((current) => ({ ...current, [key]: !current[key] }))

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#top" aria-label="Forma home"><span className="brand-mark">f</span><span>forma</span></a>
        <div className="workspace"><div className="workspace-avatar">S</div><div><strong>Studio North</strong><small>Free workspace</small></div><span className="workspace-dots">···</span></div>
        <div className="nav-label">WORKSPACE</div>
        <nav aria-label="Settings navigation">
          {navItems.map((item) => <button key={item.label} className={`nav-link ${active === item.label ? 'selected' : ''}`} onClick={() => setActive(item.label)}><Icon name={item.icon}/><span>{item.label}</span>{item.label === 'Billing' && <Icon name="chevron" size={15}/>}</button>)}
        </nav>
        <div className="sidebar-bottom"><button className="nav-link"><Icon name="help"/><span>Help & support</span></button><div className="user-card"><div className="avatar avatar-small">JD</div><div><strong>Jordan Davis</strong><small>jordan@studionorth.co</small></div><span className="workspace-dots">···</span></div></div>
      </aside>

      <main className="main-area" id="top">
        <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><Icon name="chevron" size={14}/><strong>Settings</strong></div><div className="top-actions"><button className="icon-button" aria-label="Search"><Icon name="search"/></button><button className="help-link"><Icon name="help"/> Help center</button><div className="avatar avatar-top">JD</div></div></header>
        <div className="page-content">
          <div className="page-heading"><div><div className="eyebrow">YOUR WORKSPACE</div><h1>Account settings</h1><p>Manage your personal details and preferences.</p></div><button className="outline-button">View public profile <span>↗</span></button></div>
          <div className="settings-layout">
            <div className="settings-tabs" role="tablist" aria-label="Settings sections">{['Profile', 'Preferences', 'Account'].map((tab) => <button key={tab} role="tab" aria-selected={active === tab} className={active === tab ? 'tab-active' : ''} onClick={() => setActive(tab)}>{tab}</button>)}</div>
            <form className="settings-form" onSubmit={(event) => { event.preventDefault(); setSaved(true); window.setTimeout(() => setSaved(false), 2500) }}>
              <section className="form-section profile-section"><div className="section-heading"><div><h2>Profile information</h2><p>Update your photo and personal details here.</p></div></div>
                <div className="avatar-row"><div className="avatar avatar-large">JD</div><div className="avatar-copy"><strong>Your profile photo</strong><span>This will be shown on your profile.</span></div><button type="button" className="upload-button"><Icon name="camera" size={16}/> Change photo</button><button type="button" className="remove-button">Remove</button></div>
                <div className="field-grid"><label className="field"><span>First name</span><input defaultValue="Jordan" /></label><label className="field"><span>Last name</span><input defaultValue="Davis" /></label><label className="field field-full"><span>Email address</span><div className="input-with-badge"><input type="email" defaultValue="jordan@studionorth.co"/><span className="verified"><i/> Verified</span></div><small>Used for account notifications and sign in.</small></label><label className="field field-full"><span>Bio</span><textarea rows="3" defaultValue="Product designer and creative lead at Studio North."/><small>Brief description for your profile. URLs are hyperlinked.</small></label></div>
              </section>
              <section className="form-section"><div className="section-heading"><div><h2>Personal preferences</h2><p>Customize how Forma works for you.</p></div></div><div className="preference-row"><div><strong>Language</strong><span>Select your preferred language.</span></div><select defaultValue="English (US)"><option>English (US)</option><option>English (UK)</option><option>বাংলা</option><option>Français</option></select></div><div className="preference-row"><div><strong>Time zone</strong><span>Used for dates and notifications.</span></div><select defaultValue="Dhaka (GMT+6)"><option>Dhaka (GMT+6)</option><option>London (GMT+0)</option><option>New York (GMT-5)</option><option>Tokyo (GMT+9)</option></select></div></section>
              <section className="form-section notifications-section"><div className="section-heading"><div><h2>Email notifications</h2><p>Choose the updates you’d like to receive.</p></div></div>{[['product','Product updates','News about features and improvements.'],['digest','Weekly digest','A summary of activity in your workspace.'],['security','Security alerts','Important updates about your account security.']].map(([key,title,description])=><div className="notification-row" key={key}><div><strong>{title}</strong><span>{description}</span></div><button type="button" role="switch" aria-checked={notifications[key]} aria-label={title} className={`switch ${notifications[key] ? 'switch-on' : ''}`} onClick={() => toggle(key)}><span/></button></div>)}</section>
              <footer className="form-footer"><span>Your changes are saved to your account.</span><div><button type="button" className="cancel-button" onClick={() => setSaved(false)}>Cancel</button><button type="submit" className="save-button">{saved ? 'Saved ✓' : 'Save changes'}</button></div></footer>
            </form>
          </div>
          <footer className="page-footer"><span>© 2024 Forma, Inc.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#help">Help</a></div></footer>
        </div>
      </main>
    </div>
  )
}

export default App
