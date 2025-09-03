import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const API_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

const DemographicsPage = () => {
  const location = useLocation();
  const photoSrc = location.state?.photoSrc;

  const [loading, setLoading] = useState(false);
  const [demographicsData, setDemographicsData] = useState(null);

  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedRaceProb, setSelectedRaceProb] = useState(null);

  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedAgeProb, setSelectedAgeProb] = useState(null);
  const [selectedgender, setSelectedgender] = useState(null);
  const [selectedgenderProb, setSelectedgenderProb] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("race");

  // Helper to get top prediction from an object
  const getTopPrediction = (obj) =>
    Object.entries(obj).reduce((a, b) => (b[1] > a[1] ? b : a));

  const sortByValueDesc = (obj) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1]);

  useEffect(() => {
    if (!photoSrc) return;

    const analyzeImage = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: photoSrc.split(",")[1] }),
        });

        const data = await response.json();
        console.log("AI Response:", data);
        setDemographicsData(data);

        if (data.success && data.data?.race) {
          const [topRace, topRaceProb] = getTopPrediction(data.data.race);
          setSelectedRace(topRace);
          setSelectedRaceProb(topRaceProb);

          const [topAge, topAgeProb] = getTopPrediction(data.data.age);
          setSelectedAge(topAge);
          setSelectedAgeProb(topAgeProb);
          const [topgender, topGenderProb] = getTopPrediction(data.data.gender);
          setSelectedgender(selectedgender);
          setSelectedgenderProb(selectedgenderProb);
        }
      } catch (err) {
        console.error("Error calling API:", err);
      } finally {
        setLoading(false);
      }
    };

    analyzeImage();
  }, [photoSrc]);

  if (!photoSrc) return <div>No photo provided. Go back and capture one.</div>;
  if (!demographicsData) return <div>Analyzing image...</div>;
  if (!demographicsData.success)
    return <div>Error: {demographicsData.message}</div>;

  const { age, gender, race } = demographicsData.data;
  const [topGender] = getTopPrediction(gender);

  return (
    <div className="page-container">
      {/* Title */}
      <div className="title-section">
        <div className="subtitle">A.I. ANALYSIS</div>
        <h1 className="main-title">DEMOGRAPHICS</h1>
        <div className="subtitle-gray">PREDICTED RACE, AGE & GENDER</div>
      </div>

      <div className="content">
        {/* Left Info Panel */}
        <div className="info-panel">
          <div
            className={`info-box ${selectedCategory === "race" ? "dark" : ""}`}
            onClick={() => setSelectedCategory("race")}
          >
            {selectedRace} <br />
            <span className="info-label">RACE</span>
          </div>

          <div
            className={`info-box ${selectedCategory === "age" ? "dark" : ""}`}
            onClick={() => setSelectedCategory("age")}
          >
            {selectedAge} <br />
            <span className="info-label">AGE</span>
          </div>

          <div
            className={`info-box ${
              selectedCategory === "gender" ? "dark" : ""
            }`}
            onClick={() => setSelectedCategory("gender")}
          >
            {selectedgender?.toUpperCase()} <br />
            <span className="info-label">SEX</span>
          </div>
        </div>

        {/* Chart */}
        <div className="chart-wrapper">
         <div className="selected-category-label">
         {selectedCategory === "gender" && selectedgender?.toUpperCase()}
         {selectedCategory === "race" && selectedRace}
         {selectedCategory === "age" && selectedAge}
         </div>

         <div className="content-selected">{}</div> 
          {(selectedCategory === "race" || selectedCategory === "age"|| selectedCategory==="gender") ? (
            
            <svg className="chart" viewBox="0 0 36 36">
              <path
                className="circle-bg"
                strokeWidth="0.4"
                fill="none"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle-progress"
                strokeWidth="0.4"
                strokeDasharray={`${
                  selectedCategory === "race"
                    ? (selectedRaceProb * 100).toFixed(2)
                    : (selectedCategory === "age"?
                      (selectedAgeProb * 100).toFixed(2)
                    :(selectedgenderProb*100).toFixed(2))
                },100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20" className="chart-text" textAnchor="middle">
                {selectedCategory === "race"
                    ? (selectedRaceProb * 100).toFixed(2)
                    : (selectedCategory === "age"?
                      (selectedAgeProb * 100).toFixed(2)
                    :(selectedgenderProb*100).toFixed(2))
  }
                %
              </text>
            </svg>
          ) : (
            <div className="chart-placeholder">Select RACE or AGE to view chart</div>
          )}
        </div>

        {/* Table Panel */}
        <div className="table-panel">
          <div className="table-section">
            <div className="table-header">
              <span>{selectedCategory.toUpperCase()}</span>
              <span>A.I. CONFIDENCE</span>
            </div>
            <div className="table-body">
              {/* Race Table */}
              {selectedCategory === "race" &&
                sortByValueDesc(race).map(([label, value]) => (
                  <div key={label} className="table-row">
                    <button
                      className={`btn_submit ${
                        selectedRace === label ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedRace(label);
                        setSelectedRaceProb(value);
                      }}
                    >
                      <span className="box_diamond" />
                      <span>{label}</span>
                      <span className="value-text">
                        {(value * 100).toFixed(1)}%
                      </span>
                    </button>
                  </div>
                ))}

              {/* Age Table */}
              {selectedCategory === "age" &&
                sortByValueDesc(age).map(([label, value]) => (
                  <div key={label} className="table-row">
                    <button
                      className={`btn_submit ${
                        selectedAge === label ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedAge(label);
                        setSelectedAgeProb(value);
                      }}
                    >
                      <span className="box_diamond" />
                      <span>{label}</span>
                      <span className="value-text">
                        {(value * 100).toFixed(1)}%
                      </span>
                    </button>
                  </div>
                ))}
                 {/* sex Table */}
                              {selectedCategory === "sex" &&
                sortByValueDesc(age).map(([label, value]) => (
                  <div key={label} className="table-row">
                    <button
                      className={`btn_submit ${
                        selectedAge === label ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedAge(label);
                        setSelectedAgeProb(value);
                      }}
                    >
                      <span className="box_diamond" />
                      <span>{label}</span>
                      <span className="value-text">
                        {(value * 100).toFixed(1)}%
                      </span>
                    </button>
                  </div>
                ))}

              {/* Gender Table */}
              {selectedCategory === "gender" &&
                sortByValueDesc(gender).map(([label, value]) => (
                  <div key={label} className="table-row">
                   <button
                      className={`btn_submit ${
                        selectedgender === label ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedgender(label);
                        setSelectedgenderProb(value);
                      }}
                    >
                      <span className="box_diamond" />
                      <span>{label.toUpperCase()}</span>
                      <span className="value-text">
                        {(value * 100).toFixed(1)}%
                      </span>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemographicsPage;