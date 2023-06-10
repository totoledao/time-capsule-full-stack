import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";
import { extname, resolve } from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pump = promisify(pipeline);

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
      return response.status(400).send({ error: "Must upload a file" });
    }
    const mimetypeRegex = /^(image|video)\/[a-zA-Z0-9]+/;
    const isValidFileFormart = mimetypeRegex.test(upload.mimetype);

    if (!isValidFileFormart) {
      return response
        .status(400)
        .send({ error: "File must be a image or video" });
    }

    const fileID = randomUUID();
    const fileExtension = extname(upload.filename);
    const fileName = `${fileID}${fileExtension}`;

    const writeStream = createWriteStream(
      resolve(__dirname, "../../uploads/", fileName)
    );

    await pump(upload.file, writeStream);

    const hostUrl = request.protocol.concat("://").concat(request.hostname);
    const fileUrl = new URL(`/uploads/${fileName}`, hostUrl).toString();

    return { success: true, url: fileUrl };
  });
}