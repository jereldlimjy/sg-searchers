import { createFrames } from "frames.js/next";
import { farcasterHubContext } from "frames.js/middleware";
import * as dotenv from "dotenv";

dotenv.config();

export const frames: any = createFrames({
    basePath: "/frames",
    middleware: [
        farcasterHubContext({
            ...(process.env.NODE_ENV === "production"
                ? {
                      hubHttpUrl: "https://hubs.airstack.xyz",
                      hubRequestOptions: {
                          headers: {
                              "x-airstack-hubs": process.env
                                  .AIRSTACK_API_KEY as string,
                          },
                      },
                  }
                : {
                      hubHttpUrl: "http://localhost:3010/hub",
                  }),
        }),
    ],
});
