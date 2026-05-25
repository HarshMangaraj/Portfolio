import app from "../dist/server/index.js";

export const config = {
  runtime: "nodejs",
};

function getRequestUrl(req: any) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host;
  return new URL(req.url, `${protocol}://${host}`);
}

export default async function handler(req: any, res: any) {
  const url = getRequestUrl(req);
  const request = new Request(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : req,
  });

  const response = await app.fetch(request);

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "transfer-encoding") return;
    res.setHeader(key, value);
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer);
}
