const corsOptions = {
  origin: [
    "http://localhost:8100", // Frontend en desarrollo
    "https://star-wiki-app-frontend.vercel.app/inicio", //Frontend en producción,
  ],
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  optionsSuccessStatus: 200,
  maxAge: 86400, // 24 horas
};

module.exports = { corsOptions };
