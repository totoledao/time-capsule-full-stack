import axios from "axios";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    });
    const { code } = await bodySchema.parse(request.body);

    // Get access token
    const accessTokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      null,
      {
        headers: {
          Accept: "application/json",
        },
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
      }
    );
    const { access_token } = accessTokenResponse.data;

    // Use access token to get user data
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    });
    const userData = userSchema.parse(userResponse.data);

    // Check if user already exists, otherwise create user
    let user = await prisma.user.findUnique({
      where: { githubId: userData.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userData.id,
          login: userData.login,
          name: userData.name,
          avatarUrl: userData.avatar_url,
        },
      });
    }

    // Generate JWT
    const token = app.jwt.sign(
      // public user data
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      // token config
      {
        sub: user.id,
        expiresIn: "30 days",
      }
    );

    return {
      token,
    };
  });
}
