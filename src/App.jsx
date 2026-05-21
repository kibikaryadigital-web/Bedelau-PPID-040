import { useState, useEffect, useMemo } from "react";
import logoSapa from "./assets/logo-sapa.png";
import ornamenSulur from "./assets/ornamen-sulur.png";
import ornamenSulur2 from "./assets/ornamen-sulur2.png";
import ornamenMotif from "./assets/ornamen-motif.png";

const STORAGE_KEY = "sapa_feedback";

const COLORS = {
  bg: "#f8fbff",
  white: "#ffffff",
  primary: "#0f3d91",
  primarySoft: "#edf4ff",
  border: "#dbeafe",
  text: "#1f2937",
  textSoft: "#6b7280",
  gold: "#d4af37",
};

function App() {
  const [selectedMood, setSelectedMood] =
    useState("");

  const [comment, setComment] =
    useState("");

  const [feedbacks, setFeedbacks] =
    useState([]);

  // LOAD STORAGE
  useEffect(() => {
    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setFeedbacks(JSON.parse(saved));
    }
  }, []);

  // SAVE STORAGE
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(feedbacks)
    );
  }, [feedbacks]);

  // TOTAL
  const totalFeedback =
    feedbacks.length;

  const sangatPuas = useMemo(() => {
    return feedbacks.filter(
      (item) =>
        item.mood === "Sangat Puas"
    ).length;
  }, [feedbacks]);

  const puas = useMemo(() => {
    return feedbacks.filter(
      (item) => item.mood === "Puas"
    ).length;
  }, [feedbacks]);

  const tidakPuas = useMemo(() => {
    return feedbacks.filter(
      (item) =>
        item.mood === "Tidak Puas"
    ).length;
  }, [feedbacks]);

  // SUBMIT
  function handleSubmit() {
    if (!selectedMood) {
      alert(
        "Silakan pilih tingkat kepuasan."
      );
      return;
    }

    const newFeedback = {
      id: Date.now(),
      mood: selectedMood,
      comment,
      date: new Date().toLocaleString(
        "id-ID"
      ),
    };

    setFeedbacks([
      newFeedback,
      ...feedbacks,
    ]);
fetch("https://script.google.com/macros/s/AKfycbwokSjIE-mSC8OqnUh4GsdxAMxlAATVIel7J9Nk2PgpQnBOzqiaT2YLAEIpJklPmZeH/exec", {
method: "POST",
body: JSON.stringify(newFeedback),
})
.catch((err) =>
console.error(err)
)
    alert(
      "Terima kasih atas feedback Anda."
    );

    setSelectedMood("");
    setComment("");
  }

  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: "100vh",
        padding: "24px 16px 80px",
        fontFamily:
          "'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: COLORS.white,
            borderRadius: "32px",
            padding: "18px 18px 22px",
            border: `1px solid ${COLORS.border}`,
            marginBottom: "20px",
            textAlign: "center",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.05)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* ORNAMEN */}
          {/* ORNAMEN KIRI ATAS */}
<img
  src={ornamenSulur}
  alt="Ornamen Melayu"
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "75px",
    opacity: 0.85,
    pointerEvents: "none",
  }}
/>

{/* ORNAMEN KANAN BAWAH */}
<img
  src={ornamenSulur2}
  alt="Ornamen Melayu"
  style={{
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "80px",
    opacity: 0.85,
    pointerEvents: "none",
  }}
/>

          <img
            src={logoSapa}
            alt="Logo SAPA"
            style={{
              width: "135px",
              marginBottom: "6px",
            }}
          />

          <h1
            style={{
              margin: 0,
              color: COLORS.primary,
              fontSize: "24px",
              fontWeight: "800",
              lineHeight: "1.1",
            }}
          >
            SAPA PPID 040
          </h1>

          <div
            style={{
              marginTop: "4px",
              color: COLORS.textSoft,
              lineHeight: "1.7",
              fontSize: "15px",
            }}
          >
            Sistem Saran, Aduan,
            dan Kepuasan
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "inline-block",
              background:
                "linear-gradient(135deg,#d4af37,#f4d03f)",
              color: "#1f2937",
              padding:
                "8px 18px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            Kantor Wilayah DJP Riau
          </div>
        </div>

        {/* FORM */}
        <div
          style={{
            background: COLORS.white,
            borderRadius: "28px",
            padding: "22px 18px",
            border: `1px solid ${COLORS.border}`,
            marginBottom: "20px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "800",
              color: COLORS.primary,
              marginBottom: "22px",
              textAlign: "center",
            }}
          >
            Bagaimana pengalaman
            layanan Anda hari ini?
          </div>

          {/* MOOD */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr 1fr",
              gap: "14px",
              marginBottom: "24px",
            }}
          >
            {[
              {
                emoji: "😃👍",
                label: "Sangat Puas",
              },
              {
                emoji: "🙂",
                label: "Puas",
              },
              {
                emoji: "😞",
                label: "Tidak Puas",
              },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() =>
                  setSelectedMood(
                    item.label
                  )
                }
                style={{
                  cursor: "pointer",
                  border:
                    selectedMood ===
                    item.label
                      ? `3px solid ${COLORS.primary}`
                      : `1px solid ${COLORS.border}`,
                  background:
                    selectedMood ===
                    item.label
                      ? COLORS.primarySoft
                      : "#fff",
                  borderRadius:
                    "24px",
                  padding: "16px 8px",
                  textAlign:
                    "center",
                  transition:
                    "0.2s",
                }}
              >
                <div
                  style={{
                    fontSize: "34px",
                  }}
                >
                  {item.emoji}
                </div>

                <div
                  style={{
                    marginTop: "4px",
                    fontWeight: "700",
                    color:
                      COLORS.primary,
                    fontSize: "14px",
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* TEXTAREA */}
          <textarea
            placeholder="Tuliskan saran atau masukan Anda..."
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            style={{
              width: "100%",
              minHeight: "120px",
              borderRadius: "20px",
              border:
                "1px solid #d1d5db",
              padding: "16px",
              fontSize: "16px",
              resize: "none",
              outline: "none",
              boxSizing:
                "border-box",
              marginBottom: "20px",
            }}
          />

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              border: "none",
              borderRadius: "20px",
              padding: "16px",
              background:
                "linear-gradient(135deg,#0f3d91,#2563eb)",
              color: "white",
              fontSize: "20px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow:
                "0 10px 20px rgba(37,99,235,0.25)",
            }}
          >
            📨 Kirim Feedback
          </button>
        </div>

        {/* DASHBOARD */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "14px",
            marginBottom: "20px",
          }}
        >
<div style={dashboardCard}>

  {/* ORNAMEN */}
  <img
    src={ornamenMotif}
    alt="Ornamen"
    style={{
      position: "absolute",
      bottom: 0,
      right: 0,
      width: "40px",
      opacity: 0.9,
      pointerEvents: "none",
    }}
  />

  <div style={dashboardNumber}>
              {totalFeedback}
            </div>

            <div style={dashboardLabel}>
              Total Feedback
            </div>
          </div>

<div style={dashboardCard}>

  {/* ORNAMEN */}
  <img
    src={ornamenMotif}
    alt="Ornamen"
    style={{
      position: "absolute",
      bottom: 0,
      right: 0,
      width: "40px",
      opacity: 0.9,
      pointerEvents: "none",
    }}
  />

            <div style={dashboardNumber}>
              😃👍 {sangatPuas}
            </div>

            <div style={dashboardLabel}>
              Sangat Puas
            </div>
          </div>

<div style={dashboardCard}>

  {/* ORNAMEN */}
  <img
    src={ornamenMotif}
    alt="Ornamen"
    style={{
      position: "absolute",
      bottom: 0,
      right: 0,
      width: "40px",
      opacity: 0.9,
      pointerEvents: "none",
    }}
  />

            <div style={dashboardNumber}>
              🙂 {puas}
            </div>

            <div style={dashboardLabel}>
              Puas
            </div>
          </div>

<div style={dashboardCard}>

  {/* ORNAMEN */}
  <img
    src={ornamenMotif}
    alt="Ornamen"
    style={{
      position: "absolute",
      bottom: 0,
      right: 0,
      width: "40px",
      opacity: 0.9,
      pointerEvents: "none",
    }}
  />

            <div style={dashboardNumber}>
              😞 {tidakPuas}
            </div>

            <div style={dashboardLabel}>
              Tidak Puas
            </div>
          </div>
        </div>

        {/* FEEDBACK LIST */}
        <div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "800",
              color: COLORS.primary,
              marginBottom: "14px",
            }}
          >
            💬 Feedback Terbaru
          </div>

{feedbacks.length ===
  0 && (
  <div style={emptyCard}>

    {/* ORNAMEN */}
    <img
      src={ornamenSulur2}
      alt="Ornamen"
      style={{
        position: "absolute",
        bottom: "-2px",
        right: "-2px",
        width: "120px",
        opacity: 0.9,
        pointerEvents: "none",
      }}
    />

    <div
      style={{
        position: "relative",
        zIndex: 2,
      }}
    >
      Belum ada feedback.
    </div>

  </div>
)}

          {feedbacks.map((item) => (
            <div
              key={item.id}
              style={feedbackCard}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  marginBottom:
                    "10px",
                }}
              >
                <div
                  style={{
                    fontWeight:
                      "800",
                    color:
                      COLORS.primary,
                  }}
                >
                  {item.mood}
                </div>

                <div
                  style={{
                    fontSize:
                      "12px",
                    color:
                      COLORS.textSoft,
                  }}
                >
                  {item.date}
                </div>
              </div>

              <div
                style={{
                  color:
                    COLORS.text,
                  lineHeight:
                    "1.6",
                }}
              >
                {item.comment ||
                  "Tidak ada komentar."}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const dashboardCard = {
  background: "#fff",
  borderRadius: "24px",
  padding: "24px",
  border: "1px solid #dbeafe",
  textAlign: "center",
  boxShadow:
    "0 6px 18px rgba(0,0,0,0.05)",
  position: "relative",
  overflow: "hidden",
};

const dashboardNumber = {
  fontSize: "30px",
  fontWeight: "800",
  color: "#0f3d91",
};

const dashboardLabel = {
  marginTop: "8px",
  color: "#6b7280",
  fontSize: "14px",
};

const emptyCard = {
  background: "#fff",
  borderRadius: "20px",
  padding: "24px",
  textAlign: "center",
  color: "#6b7280",
  border: "1px solid #dbeafe",
  position: "relative",
  overflow: "hidden",
};

const feedbackCard = {
  background: "#fff",
  borderRadius: "22px",
  padding: "20px",
  border: "1px solid #dbeafe",
  marginBottom: "14px",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.04)",
};

export default App;