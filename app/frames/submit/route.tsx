import { frames } from "../frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx: any) => {
    return {
        image: (
            <div tw="flex">
                <span>Your score: xxx</span>
            </div>
        ),
        buttons: [
            <Button
                action="tx"
                target="/txdata/publish"
                post_url={"/tx-success"}
            >
                Publish to Leaderboard
            </Button>,
        ],
        state: {},
    };
});
