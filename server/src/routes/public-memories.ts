import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function publicMemoriesRoutes(app: FastifyInstance) {
  app.get("/public-memories", async (request) => {
    const memories = await prisma.memory.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "asc" },
    });

    return memories?.map((obj) => ({
      id: obj.id,
      coverUrl: obj.coverUrl,
      excerpt:
        obj?.content?.length > 115
          ? obj?.content?.substring(0, 115)?.concat("...")
          : obj?.content,
      createdAt: obj.createdAt,
    }));
  });

  app.get("/public-memories/:id", async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    if (!memory.isPublic) {
      return response.status(401).send({
        success: false,
        error: "The memory you are trying to access is not set to public",
      });
    }

    return memory;
  });
}
