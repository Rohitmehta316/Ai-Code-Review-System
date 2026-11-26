import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  GitPullRequest,
  LockKeyhole,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Brand } from "../components/ui.jsx";

const items = [
  [
    "Find the edge cases",
    "Catch overlooked assumptions and logic bugs before they reach production.",
    ScanSearch,
  ],
  [
    "Review with security in mind",
    "Spot risky patterns and get practical ways to make code safer.",
    ShieldCheck,
  ],
  [
    "Understand what to improve",
    "Get readable explanations and a cleaner example to compare.",
    WandSparkles,
  ],
];

const primaryBtnStyle = {
  backgroundColor: "#ffffff",
  color: "#090d16",
  border: "1px solid rgba(255, 255, 255, 0.25)",
  fontWeight: 600,
  whiteSpace: "nowrap",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
};

export default function LandingPage() {
  return (
    <div className="marketing min-h-screen">
      <nav className="marketing-nav wrap">
        <Brand />
        <div>
          <a href="#features">Features</a>
          <a href="#steps">How it works</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/login" style={{ whiteSpace: "nowrap" }}>
            Log in
          </Link>
          <Link
            to="/register"
            className="button button-primary"
            style={primaryBtnStyle}
          >
            <span>Get started</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </nav>

      <section className="hero wrap">
        <div>
          <small className="eyebrow">AI CODE REVIEW, WITH CLARITY</small>
          <h1>
            Ship better code.
            <br />
            <span>Know why it’s better.</span>
          </h1>
          <p>
            Get thoughtful feedback on bugs, security, quality, and
            performance—with clear explanations that help you make the call.
          </p>
          <div className="hero-actions">
            <Link
              to="/register"
              className="button button-primary button-large"
              style={primaryBtnStyle}
            >
              <span>Start your first review</span>
              <ArrowRight size={16} />
            </Link>
            <a
              className="button button-ghost button-large"
              href="#steps"
              style={{ whiteSpace: "nowrap" }}
            >
              See how it works
            </a>
          </div>
          <div className="hero-proof">
            <span>JS</span>
            <span>TS</span>
            <span>PY</span>
            <span>JV</span>
            <small>JavaScript, TypeScript, Python, and Java</small>
          </div>
        </div>

        <div className="hero-visual">
          <div className="editor-window">
            <div className="editor-head">
              <span>● ● ●</span>
              <b>order-check.js</b>
              <span>
                <GitPullRequest size={13} /> review
              </span>
            </div>
            <pre>
              <i>01</i> <em>function</em> canCheckout(order) {"{"}
              <br />
              <i>02</i> <em>const</em> total = order.items.reduce(
              <br />
              <i>03</i> (sum, item) =&gt; sum + item.price, 0
              <br />
              <i>04</i> );
              <br />
              <i>05</i> <em>return</em> total &lt; order.budget;
              <br />
              <i>06</i> {"}"}
            </pre>
            <div className="demo-finding">
              <Sparkles size={14} />
              <span>
                <b>Possible edge case</b>
                <small>Validate each item’s price before adding.</small>
              </span>
              <label>medium</label>
            </div>
            <div className="editor-foot">
              <span>
                <i /> Review complete
              </span>
              <span>
                Score <b>91</b>
              </span>
            </div>
          </div>
          <div className="float-note">
            <Check size={15} />
            <span>
              <b>Clear, actionable feedback</b>
              <small>3 suggestions to explore</small>
            </span>
          </div>
          <div className="float-lock">
            <LockKeyhole size={14} /> Your code is never executed
          </div>
        </div>
      </section>

      <section className="stack-strip wrap">
        <b>BUILT FOR YOUR STACK</b>
        <span>JavaScript</span>
        <span>TypeScript</span>
        <span>Python</span>
        <span>Java</span>
      </section>

      <section className="features" id="features">
        <div className="wrap">
          <small className="eyebrow">MORE SIGNAL, LESS NOISE</small>
          <h2>
            A second set of eyes
            <br />
            that helps you see more.
          </h2>
          <p className="section-copy">
            Feedback should do more than flag a line. It should help you
            understand what to do next.
          </p>
          <div className="feature-grid">
            {items.map(([title, copy, Icon]) => (
              <article key={title}>
                <span>
                  <Icon size={20} />
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <a href="#steps">
                  Learn more <ArrowUpRight size={14} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="steps wrap" id="steps">
        <div>
          <small className="eyebrow">A SIMPLE, USEFUL LOOP</small>
          <h2>
            From code
            <br />
            to clarity.
          </h2>
          <p>
            Review a snippet in minutes. Keep the suggestions you trust and learn
            from the ones you don’t.
          </p>
          <Link
            className="button button-primary"
            to="/register"
            style={primaryBtnStyle}
          >
            <span>Try your first review</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="step-list">
          <article>
            <b>01</b>
            <div>
              <h3>Add the code you want reviewed</h3>
              <p>Paste a function or snippet and select its language.</p>
            </div>
            <Code2 size={17} />
          </article>
          <article>
            <b>02</b>
            <div>
              <h3>Get a careful AI analysis</h3>
              <p>See bugs, security concerns, and quality suggestions.</p>
            </div>
            <Sparkles size={17} />
          </article>
          <article>
            <b>03</b>
            <div>
              <h3>Learn, improve, move forward</h3>
              <p>Read the reasoning and compare an improved example.</p>
            </div>
            <Check size={17} />
          </article>
        </div>
      </section>

      <section className="closing wrap">
        <div>
          <small className="eyebrow">YOUR NEXT COMMIT, WITH MORE CONFIDENCE</small>
          <h2>
            Make your next review
            <br />a little more thoughtful.
          </h2>
        </div>
        <Link
          to="/register"
          className="button button-light"
          style={primaryBtnStyle}
        >
          <span>Create your account</span>
          <ArrowRight size={15} />
        </Link>
      </section>

      <footer className="footer wrap">
        <Brand />
        <span>AI findings are suggestions. Verify and test each change.</span>
        <small>© {new Date().getFullYear()} AI Code Review System</small>
      </footer>
    </div>
  );
}
