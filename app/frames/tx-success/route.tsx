import { frames } from "../frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx: any) => {
    return {
        image: (
            <div tw="flex">
                <span>Tx success!</span>
            </div>
        ),
        buttons: [
            <Button action="link" target="/">
                View Leaderboard
            </Button>,
        ],
        state: {},
    };
});
