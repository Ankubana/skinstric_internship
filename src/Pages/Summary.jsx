import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const data = {
    race: "Middle eastern",
    age: "50-59",
    sex: "Male",
    confidence: [
      { race: "Middle eastern", value: 56 },
      { race: "Black", value: 23 },
      { race: "Southeast asian", value: 13 },
      { race: "South asian", value: 5 },
      { race: "White", value: 0 },
      { race: "Latino hispanic", value: 0 },
      { race: "East asian", value: 0 },
    ],
  };
  return (
    <div>
      <header className="header">
        <strong>SKINSTRIC</strong> [ INTRO ]
        <br />
        <br />
        <div>A.I. ANALYSIS</div>
        <h1>DEMOGRAPHICS</h1>
        <div>PREDICTED RACE & AGE</div>
      </header>

      <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="highlight">{data.race}<br />RACE</div>
          <div>{data.age}<br />AGE</div>
          <div>{data.sex.toUpperCase()}<br />SEX</div>
        </div>

        {/* Main */}
        <div className="main">
          <h2>{data.race}</h2>
          <div className="circle">
            <span>{data.confidence[0].value}%</span>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <table>
            <tbody>
              {data.confidence.map((item, index) => (
                <tr
                  key={index}
                  className={index === 0 ? "highlight-row" : ""}
                >
                  <td>{item.race}</td>
                  <td>{item.value}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;