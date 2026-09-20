import { useState } from "react";

function TrackComplaint() {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  // All PaveTrack complaint stages
  const stages = [
    {
      name: "Reported",
      description: "Complaint submitted successfully",
    },
    {
      name: "Verified",
      description: "Complaint is being verified",
    },
    {
      name: "Assigned",
      description: "Complaint assigned to contractor",
    },
    {
      name: "Work Started",
      description: "Repair work will begin",
    },
    {
      name: "Repair Submitted",
      description: "Contractor submits repair evidence",
    },
    {
      name: "AI Verified",
      description: "Repair evidence is checked",
    },
    {
      name: "Closed",
      description: "Complaint successfully resolved",
    },
  ];

  const handleTrack = () => {
    setError("");
    setComplaint(null);

    const savedComplaint = localStorage.getItem("pavetrackComplaint");

    if (!savedComplaint) {
      setError("No complaint found. Please submit a complaint first.");
      return;
    }

    const data = JSON.parse(savedComplaint);

    if (
      complaintId.trim().toUpperCase() !== data.id.toUpperCase()
    ) {
      setError("Complaint ID not found. Please check your ID.");
      return;
    }

    setComplaint(data);
  };

  // Find the current stage number
  const currentStage = complaint
    ? stages.findIndex((stage) => stage.name === complaint.status)
    : -1;

  return (
    <div className="page">

      <h1>Track your Complaint</h1>

      <p>
        Enter your complaint ID to view the latest status and updates.
      </p>

      <div className="track-box">

        <input
          type="text"
          placeholder="PTH-2026-00125"
          value={complaintId}
          onChange={(e) => setComplaintId(e.target.value)}
        />

        <button type="button" onClick={handleTrack}>
          🔍 Track
        </button>

      </div>

      {error && (
        <div className="error-box">
          ❌ {error}
        </div>
      )}

      {complaint && (
        <div className="complaint-card">

          <div>

            <h2>Complaint ID</h2>

            <h2>{complaint.id}</h2>

            <p>
              <strong>Location:</strong>{" "}
              {complaint.location}
            </p>

            <p>
              <strong>Severity:</strong>{" "}
              {complaint.severity}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {complaint.description || "No description provided"}
            </p>

            <p>
              <strong>Submitted:</strong>{" "}
              {complaint.date}
            </p>

          </div>

          {/* Dynamic Status Timeline */}

          <div className="status-timeline">

            {stages.map((stage, index) => {

              const isCompleted = index < currentStage;
              const isCurrent = index === currentStage;

              return (
                <div key={stage.name}>

                  <div
                    className={`timeline-step ${
                      isCompleted || isCurrent ? "active" : ""
                    }`}
                  >

                    <div className="timeline-dot">
                      {isCompleted
                        ? "✓"
                        : isCurrent
                        ? "●"
                        : index + 1}
                    </div>

                    <div>
                      <strong>{stage.name}</strong>

                      <p>{stage.description}</p>
                    </div>

                  </div>

                  {index < stages.length - 1 && (
                    <div
                      className={`timeline-line ${
                        index < currentStage ? "completed-line" : ""
                      }`}
                    ></div>
                  )}

                </div>
              );
            })}

          </div>

        </div>
      )}

    </div>
  );
}

export default TrackComplaint;