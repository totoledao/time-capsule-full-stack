import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { createWriteStream, unlinkSync } from "node:fs";
import { extname, resolve } from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { networkInterfaces } from "os";

const pump = promisify(pipeline);
const netInterfaces = networkInterfaces();

export async function uploadRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.post("/upload", async (request, response) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // 5MB
      },
    });

    if (!upload) {
      return response
        .status(400)
        .send({ success: false, error: "Must upload a file" });
    }

    const mimetypeRegex = /^(image|video)\/[a-zA-Z0-9]+/;
    const isValidFileFormart = mimetypeRegex.test(upload.mimetype);

    if (!isValidFileFormart) {
      return response
        .status(400)
        .send({ success: false, error: "File must be an image or video" });
    }

    const fileID = randomUUID();
    const fileExtension = extname(upload.filename);
    const fileName = `${fileID}${fileExtension}`;

    const writeStream = createWriteStream(
      resolve(__dirname, "../../uploads/", fileName)
    );

    await pump(upload.file, writeStream);

    if (upload.file.truncated) {
      unlinkSync(resolve(__dirname, "../../uploads/", fileName));
      return response
        .status(400)
        .send({ success: false, error: "File must be smaller than 5MB" });
    }

    let hostUrl = request.protocol.concat("://").concat(request.hostname);
    if (hostUrl.includes("localhost")) {
      const [{ address }] = Object.values(netInterfaces).flatMap(
        (netInterface) => {
          if (netInterface) {
            return netInterface.filter(
              (prop) => prop.family === "IPv4" && !prop.internal
            );
          } else {
            return {
              address: "localhost",
            };
          }
        }
      );
      hostUrl = hostUrl.replace("localhost", address);
    }
    const fileUrl = new URL(`/uploads/${fileName}`, hostUrl).toString();

    return { success: true, url: fileUrl };
  });
}
