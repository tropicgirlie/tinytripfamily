import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import familyFitHandler from "./api/ai/family-fit.js";

function jsonResponse(res: { statusCode?: number; setHeader: (key: string, value: string) => void; end: (body: string) => void }) {
  return {
    setHeader: res.setHeader.bind(res),
    status(statusCode: number) {
      res.statusCode = statusCode;
      return this;
    },
    json(payload: unknown) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(payload));
    },
  };
}

function readRequestBody(req: { on: (event: string, callback: (chunk?: Buffer) => void) => void }) {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => {
      if (chunk) chunks.push(chunk);
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve({});
      }
    });
  });
}

function localApiPlugin(): Plugin {
  return {
    name: "family-trip-local-api",
    configureServer(server) {
      server.middlewares.use("/api/ai/family-fit", async (req, res) => {
        const body = await readRequestBody(req);
        await familyFitHandler(
          {
            method: req.method,
            body,
          },
          jsonResponse(res),
        );
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.GEMINI_API_KEY = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY;
  process.env.GEMINI_MODEL = process.env.GEMINI_MODEL || env.GEMINI_MODEL;

  return {
  plugins: [react(), localApiPlugin()],
  server: {
    port: 8080,
    open: true,
  },
  };
});
