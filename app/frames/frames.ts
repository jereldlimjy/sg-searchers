import { createFrames } from "frames.js/next";
import { farcasterHubContext } from "frames.js/middleware";

export const frames: any = createFrames({
    basePath: "/frames",
    middleware: [
        farcasterHubContext({
            hubHttpUrl: "https://hub-api.neynar.com",
            hubRequestOptions: {
                headers: {
                    api_key: process.env.NEYNAR_API_KEY || "",
                },
            },
        }),
    ],
});
