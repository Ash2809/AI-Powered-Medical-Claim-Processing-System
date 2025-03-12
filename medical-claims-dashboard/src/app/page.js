// src/app/page.js
export default function HomePage() {
    return (
      <div className="container">
        <h1>Welcome to the Medical Claims Dashboard</h1>
        <p>This is the home page.</p>
        <a href="/dashboard">
          <button className="button">Go to Dashboard</button>
        </a>
      </div>
    );
  }
  