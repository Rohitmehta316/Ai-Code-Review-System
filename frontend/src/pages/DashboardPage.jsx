import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  ArrowUpRight,
  Bug,
  Code2,
  FileCode2,
  Plus,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Empty, Score, Spinner } from "../components/ui.jsx";
import { useAuth } from "../lib/AuthContext.jsx";
import { api, getError } from "../lib/api.js";
export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null),
    [recent, setRecent] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  useEffect(() => {
    api
      .get("/reviews/stats")
      .then(({ data }) => {
        setStats(data.stats);
        setRecent(data.recentReviews);
      })
      .catch((e) => setError(getError(e)))
      .finally(() => setLoading(false));
  }, []);
  const chart = (stats?.byLanguage || []).map((x) => ({
    language: x._id,
    reviews: x.count,
  }));
  return (
    <div>
      <section className="page-heading">
        <div>
          <small>YOUR PRIVATE REVIEW WORKSPACE</small>
          <h1>Welcome back, {user?.name?.split(" ")[0]}</h1>
          <p>
            Keep your code thoughtful. Start a review whenever you’re ready.
          </p>
        </div>
        <Link to="/app/review" className="button button-primary">
          <Plus size={16} /> New code review
        </Link>
      </section>
      {error && <div className="form-error">{error}</div>}
      {loading ? (
        <div className="loading">
          <Spinner text="Loading workspace" />
        </div>
      ) : (
        <>
          <section className="metrics">
            <article>
              <small>
                <FileCode2 size={15} /> Reviews completed
              </small>
              <b>{stats?.totalReviews || 0}</b>
              <span>All reviews in your workspace</span>
            </article>
            <article>
              <small>
                <Bug size={15} /> Potential issues
              </small>
              <b>{stats?.potentialIssues || 0}</b>
              <span>Bugs and security concerns flagged</span>
            </article>
            <article>
              <small>
                <Sparkles size={15} /> Average quality score
              </small>
              <div>
                <Score value={stats?.averageScore || 0} small />
                <span>
                  Across your
                  <br />
                  reviewed snippets
                </span>
              </div>
            </article>
          </section>
          <section className="dashboard-grid">
            <article className="surface">
              <header className="surface-title">
                <div>
                  <small>LANGUAGE MIX</small>
                  <h2>Review activity</h2>
                </div>
                <span>All time</span>
              </header>
              {chart.length ? (
                <div className="chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chart}>
                      <defs>
                        <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="#ad96ff"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor="#ad96ff"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="var(--border)" vertical={false} />
                      <XAxis
                        dataKey="language"
                        tick={{ fill: "var(--muted)", fontSize: 10 }}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fill: "var(--muted)", fontSize: 10 }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          color: "var(--text)",
                        }}
                      />
                      <Area
                        dataKey="reviews"
                        stroke="#ad96ff"
                        fill="url(#fill)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <Empty
                  title="Your activity starts here"
                  copy="Complete reviews to see a breakdown by language."
                  action={
                    <Link to="/app/review">
                      Start a review <ArrowRight size={14} />
                    </Link>
                  }
                />
              )}
            </article>
            <article className="surface">
              <header className="surface-title">
                <div>
                  <small>LATEST WORK</small>
                  <h2>Recent reviews</h2>
                </div>
                <Link to="/app/history">
                  See history <ArrowUpRight size={14} />
                </Link>
              </header>
              {recent.length ? (
                <div className="recent-list">
                  {recent.map((r) => (
                    <Link
                      className="recent-row"
                      key={r._id}
                      to={`/app/review/${r._id}`}
                    >
                      <span>
                        <Code2 size={15} />
                      </span>
                      <div>
                        <b>{r.title}</b>
                        <small>
                          {r.language} ·{" "}
                          {new Date(r.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <strong>{r.qualityScore}</strong>
                    </Link>
                  ))}
                </div>
              ) : (
                <Empty
                  title="No reviews yet"
                  copy="Create your first review and reports will appear here."
                  action={
                    <Link to="/app/review" className="button button-outline">
                      Start a review
                    </Link>
                  }
                />
              )}
            </article>
          </section>
          <div className="dashboard-tip">
            <ShieldAlert size={16} />
            <span>
              <b>Human review still matters.</b> Verify findings and test code
              changes before merging.
            </span>
          </div>
        </>
      )}
    </div>
  );
}
