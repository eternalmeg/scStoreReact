export default function StartupLoader({ message = "Starting server..." }) {
    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100vw", height: "100vh",
            background: "rgba(255,255,255,0.92)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
        }}>
            <div className="spinner" style={{
                width: "50px",
                height: "50px",
                border: "6px solid #ddd",
                borderTopColor: "#f0a500",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
            }} />

            <h2 style={{ marginTop: "20px", fontWeight: "500", color: "#444" }}>
                {message}
            </h2>

            <p style={{ color: "#666", marginTop: "8px" }}>
                This may take 10–20 seconds on free hosting.
            </p>

            <style>
                {`@keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }`}
            </style>
        </div>
    );
}
