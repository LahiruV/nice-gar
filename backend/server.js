const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const authRoutes = require("./routes/auth");
const commonRoutes = require("./routes/common");
const employeeRoutes = require("./routes/employee");
const leaveRoutes = require("./routes/leave");
const packageRoutes = require("./routes/package");

const app = express();
const PORT = process.env.PORT || 4500;

// === Middleware ===
app.use(cors({ origin: "*", methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], credentials: false }));
app.use(helmet()); // secure headers
app.use(compression()); // gzip compression
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
app.use(session({
    secret: "eventease_secret", // static secret since no .env requested
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 } // 1h
}));
app.use(express.static(path.join(__dirname, "public"), {
    maxAge: "1d", // cache static files
    etag: true
}));

// === API Routes ===
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/common", commonRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/package-out-requests", packageRoutes);

// === Swagger UI ===
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, {
    explorer: true
}));

// === Main Entry ===
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// === 404 Handler ===
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Endpoint not found" });
});

// === Global Error Handler ===
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});

// === Start Server ===
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 Swagger UI available at http://localhost:${PORT}/api-docs`);
});
