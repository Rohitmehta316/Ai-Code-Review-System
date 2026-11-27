import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
import { Brand, Spinner } from "../components/ui.jsx";
import { useAuth } from "../lib/AuthContext.jsx";
import { api, getError } from "../lib/api.js";

export default function AuthPage({ mode }) {
  const signup = mode === "register";
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [visible, setVisible] = useState(false),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);

  const { signIn } = useAuth(),
    navigate = useNavigate(),
    location = useLocation();

  const justRegistered = !signup && location.state?.registered;

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (signup && name.trim().length < 2)
      return setError("Enter a name with at least two characters.");
    if (signup && password.length < 10)
      return setError("Use at least 10 characters for your password.");
    setBusy(true);
    try {
      const { data } = await api.post(
        `/auth/${mode}`,
        signup ? { name: name.trim(), email, password } : { email, password },
      );

      if (signup) {
        setName("");
        setPassword("");
        navigate("/login", { state: { registered: true } });
        return;
      }

      signIn(data.token, data.user);
      navigate("/app");
    } catch (e) {
      setError(getError(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-layout min-h-screen">
      <aside className="auth-aside">
        <Brand light />
        <div>
          <span className="quote-mark">“</span>
          <h2>
            Code review should leave you with more clarity than you started
            with.
          </h2>
          <p>Thoughtful feedback for the work you care about shipping.</p>
          <small>
            <Sparkles size={14} /> Private workspace · Clear explanations
          </small>
        </div>
        <small>AI Code Review System</small>
      </aside>
      <main className="auth-main">
        <header>
          <Link to="/">
            <ArrowLeft size={14} /> Back home
          </Link>
          <span>
            {signup ? "Already have an account?" : "New here?"}{" "}
            <Link to={signup ? "/login" : "/register"}>
              {signup ? "Log in" : "Create account"}
            </Link>
          </span>
        </header>
        <section className="auth-card">
          <span className="auth-icon">
            <Sparkles size={17} />
          </span>
          <h1>{signup ? "Create your account" : "Welcome back"}</h1>
          <p>
            {signup
              ? "Your next code review starts here."
              : "Sign in to return to your reviews."}
          </p>
          <form onSubmit={submit}>
            {justRegistered && !error && (
              <div className="form-success" role="status">
                Account created successfully. Please sign in.
              </div>
            )}
            {signup && (
              <label>
                Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  required
                />
              </label>
            )}
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={254}
                autoComplete="email"
                required
              />
            </label>
            <label>
              Password
              <div className="password-wrap">
                <input
                  type={visible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={signup ? "new-password" : "current-password"}
                  minLength={signup ? 10 : 1}
                  maxLength={128}
                  required
                />
                <button
                  type="button"
                  aria-label={visible ? "Hide password" : "Show password"}
                  onClick={() => setVisible((v) => !v)}
                >
                  {visible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>
            {signup && (
              <small className="hint">Use at least 10 characters.</small>
            )}
            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}
            <button className="button button-primary submit" disabled={busy}>
              {busy ? (
                <Spinner text="Please wait" />
              ) : (
                <>
                  {signup ? "Create account" : "Sign in"}{" "}
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
          {signup && (
            <p className="fine-print">
              AI findings are suggestions. Review them manually before using
              changes.
            </p>
          )}
        </section>
        <footer>
          Your code is sent securely for analysis and is never executed.
        </footer>
      </main>
    </div>
  );
}
