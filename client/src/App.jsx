import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./App.css";

export default function App() {
  const [data, setData] = useState(null);
  const [active, setActive] = useState("dawnmc");

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/api/modpacks")
      .then(res => setData(res.data));
  }, []);

  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="app">

      {/* Moving Light Streak */}
      <div className="light-streak"></div>

      {/* Particle Background */}
      <div className="particles"></div>

      <h1 className="logo">DawnMC</h1>

      {/* Tabs */}
      <div className="tabs">
        {["dawnmc", "lightspeed", "minigames"].map(tab => (
          <button
            key={tab}
            className={active === tab ? "active" : ""}
            onClick={() => setActive(tab)}
          >
            {tab.toUpperCase()}
            {active === tab && <motion.div layoutId="underline" className="underline" />}
          </button>
        ))}
      </div>

      {active !== "minigames" && (
        <motion.div
          className="card glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>{data[active].name}</h2>
          <p>{data[active].description}</p>

          <div className="details">
            <span>Version {data[active].version}</span>
            <span>Minecraft {data[active].minecraft}</span>
            <span>{data[active].size}</span>
          </div>

          <a href={data[active].download} className="btn">
            Download
          </a>
        </motion.div>
      )}

      {active === "minigames" && (
        <motion.div
          className="grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {data.minigames.map((g, i) => (
            <div key={i} className="mini glass">
              <h3>{g.name}</h3>
              <a href={g.download} className="btn small">Download</a>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}