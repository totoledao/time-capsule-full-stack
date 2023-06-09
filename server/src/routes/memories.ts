import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/memories", async (request) => {
    const memories = await prisma.memory.findMany({
      where: { userId: request.user.sub },
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

  app.get("/memories/:id", async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return response.status(401).send({
        success: false,
        error: "The memory you are trying to access is not set to public",
      });
    }

    return memory;
  });

  app.post("/memories", async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub,
      },
    });

    return memory;
  });

  app.put("/memories/:id", async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });
    const { id } = paramsSchema.parse(request.params);
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

    let memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    if (memory.userId !== request.user.sub) {
      return response.status(401).send();
    }

    memory = await prisma.memory.update({
      where: { id },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    });

    return memory;
  });

  app.delete("/memories/:id", async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    if (memory.userId !== request.user.sub) {
      return response.status(401).send();
    }

    await prisma.memory.delete({
      where: { id },
    });

    return "success";
  });
}
