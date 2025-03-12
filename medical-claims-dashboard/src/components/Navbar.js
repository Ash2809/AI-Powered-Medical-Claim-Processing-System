"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <h2>AI Mediclaim</h2>
        <div>
          <Link href="/" style={styles.link}>Home</Link>
          <Link href="/dashboard" style={styles.link}>Dashboard</Link>
          {!user ? (
            <Link href="/login" style={styles.link}>Login</Link>
          ) : (
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "#333",
    color: "#fff",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  navContainer: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  link: {
    color: "#fff",
    marginRight: "15px",
    textDecoration: "none",
    fontSize: "16px"
  },
  button: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
    fontSize: "16px"
  }
};
