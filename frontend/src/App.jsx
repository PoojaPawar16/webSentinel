import { useMemo, useState } from "react";
import "./App.css";

const websites = [
  {
    id: 1,
    name: "Marketing Site",
    url: "https://acme.example",
    owner: "Maya Chen",
    status: "Healthy",
    score: 94,
    lcp: "1.8s",
    cls: "0.04",
    inp: "116ms",
    uptime: "99.98%",
    trend: [74, 78, 82, 84, 81, 88, 91, 94],
  },
  {
    id: 2,
    name: "Checkout App",
    url: "https://shop.example",
    owner: "Jordan Lee",
    status: "Warning",
    score: 78,
    lcp: "2.7s",
    cls: "0.09",
    inp: "194ms",
    uptime: "99.83%",
    trend: [86, 83, 84, 80, 77, 74, 76, 78],
  },
  {
    id: 3,
    name: "Docs Portal",
    url: "https://docs.example",
    owner: "Ari Patel",
    status: "Critical",
    score: 61,
    lcp: "4.1s",
    cls: "0.18",
    inp: "286ms",
    uptime: "98.91%",
    trend: [72, 69, 70, 68, 64, 63, 59, 61],
  },
];

const alerts = [
  {
    title: "LCP regression",
    site: "Docs Portal",
    detail: "Largest Contentful Paint exceeded 4s on mobile.",
    tone: "danger",
  },
  {
    title: "Report ready",
    site: "Marketing Site",
    detail: "Weekly executive PDF was generated successfully.",
    tone: "good",
  },
  {
    title: "Budget warning",
    site: "Checkout App",
    detail: "JavaScript transfer size is 88 KB over budget.",
    tone: "warn",
  },
];

const reports = [
  "Executive summary",
  "Technical audit",
  "SEO and accessibility",
  "Historical comparison",
];

function App() {
  const [selectedId, setSelectedId] = useState(websites[0].id);
  const [device, setDevice] = useState("Mobile");
  const [url, setUrl] = useState("https://acme.example");

  const selected = useMemo(
    () => websites.find((site) => site.id === selectedId),
    [selectedId],
  );

  const averageScore = Math.round(
    websites.reduce((sum, site) => sum + site.score, 0) / websites.length,
  );

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Primary">
        <div className="brand">
          <div className="brand-mark">WS</div>
          <div>
            <strong>WebSentinel</strong>
            <span>Performance command center</span>
          </div>
        </div>

        <nav className="nav-list">
          {[
            "Dashboard",
            "Websites",
            "Performance",
            "Reports",
            "History",
            "Alerts",
            "Users",
            "Exports",
          ].map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>

        <section className="mini-panel">
          <span className="eyebrow">Current Plan</span>
          <strong>Growth monitoring</strong>
          <p>14 websites, 5 users, hourly checks</p>
        </section>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">Page Speed Insights plus operations</span>
            <h1>Website performance monitoring and reporting</h1>
          </div>
          <div className="user-chip">
            <span>MC</span>
            <div>
              <strong>Maya Chen</strong>
              <small>Admin</small>
            </div>
          </div>
        </header>

        <section className="analyze-strip" aria-label="Website analysis form">
          <label htmlFor="website-url">Website URL</label>
          <input
            id="website-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
          />
          <div className="segmented" aria-label="Device">
            {["Mobile", "Desktop"].map((item) => (
              <button
                className={device === item ? "active" : ""}
                key={item}
                onClick={() => setDevice(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <button className="primary-button" type="button">
            Analyze
          </button>
        </section>

        <section className="metric-grid" id="dashboard">
          <MetricCard label="Average score" value={averageScore} suffix="/100" />
          <MetricCard label="Sites monitored" value={websites.length} />
          <MetricCard label="Open alerts" value={alerts.length} />
          <MetricCard label="Reports generated" value="128" />
        </section>

        <section className="content-grid">
          <div className="panel wide" id="performance">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Performance Analysis</span>
                <h2>{selected.name}</h2>
              </div>
              <StatusBadge status={selected.status} />
            </div>

            <div className="score-layout">
              <div className="score-ring" style={{ "--score": selected.score }}>
                <span>{selected.score}</span>
                <small>{device}</small>
              </div>
              <div className="vitals-grid">
                <Vital label="LCP" value={selected.lcp} note="Loading" />
                <Vital label="CLS" value={selected.cls} note="Stability" />
                <Vital label="INP" value={selected.inp} note="Interaction" />
                <Vital label="Uptime" value={selected.uptime} note="Availability" />
              </div>
            </div>

            <div className="chart" aria-label="Historical performance chart">
              {selected.trend.map((point, index) => (
                <span
                  key={`${point}-${index}`}
                  style={{ height: `${point}%` }}
                  title={`Run ${index + 1}: ${point}`}
                />
              ))}
            </div>
          </div>

          <div className="panel" id="alerts">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Alert and Notification</span>
                <h2>Signal inbox</h2>
              </div>
            </div>
            <div className="alert-list">
              {alerts.map((alert) => (
                <article className={`alert ${alert.tone}`} key={alert.title}>
                  <strong>{alert.title}</strong>
                  <span>{alert.site}</span>
                  <p>{alert.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel" id="websites">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Website Management</span>
                <h2>Monitored properties</h2>
              </div>
            </div>
            <div className="site-list">
              {websites.map((site) => (
                <button
                  className={selectedId === site.id ? "site active" : "site"}
                  key={site.id}
                  onClick={() => {
                    setSelectedId(site.id);
                    setUrl(site.url);
                  }}
                  type="button"
                >
                  <span>
                    <strong>{site.name}</strong>
                    <small>{site.url}</small>
                  </span>
                  <b>{site.score}</b>
                </button>
              ))}
            </div>
          </div>

          <div className="panel" id="reports">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Report Generation</span>
                <h2>Export packages</h2>
              </div>
            </div>
            <div className="report-list">
              {reports.map((report) => (
                <label key={report}>
                  <input defaultChecked type="checkbox" />
                  <span>{report}</span>
                </label>
              ))}
            </div>
            <button className="secondary-button" type="button">
              Generate report
            </button>
          </div>

          <div className="panel" id="users">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">User Management</span>
                <h2>Team access</h2>
              </div>
            </div>
            <table>
              <tbody>
                {[
                  ["Maya Chen", "Admin", "All sites"],
                  ["Jordan Lee", "Analyst", "Checkout App"],
                  ["Ari Patel", "Viewer", "Docs Portal"],
                ].map(([name, role, scope]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{role}</td>
                    <td>{scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel" id="history">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">History and Analysis</span>
                <h2>Recent audits</h2>
              </div>
            </div>
            <ol className="timeline">
              <li>
                <strong>09:00</strong>
                <span>Mobile audit completed for Marketing Site</span>
              </li>
              <li>
                <strong>08:00</strong>
                <span>Checkout App dropped below performance budget</span>
              </li>
              <li>
                <strong>07:00</strong>
                <span>Docs Portal generated critical regression alert</span>
              </li>
            </ol>
          </div>
        </section>
      </section>
    </main>
  );
}

function MetricCard({ label, value, suffix = "" }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>
        {value}
        <small>{suffix}</small>
      </strong>
    </article>
  );
}

function StatusBadge({ status }) {
  return <span className={`status ${status.toLowerCase()}`}>{status}</span>;
}

function Vital({ label, value, note }) {
  return (
    <article className="vital">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

export default App;
