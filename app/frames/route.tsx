/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx: any) => {
    return {
        image: <div tw="flex">Welcome to Lion City Search </div>,
        buttons: [
            <Button action="post" target="/game">
                Play Game!
            </Button>,
            <Button action="link" target="/">
                View Leaderboard
            </Button>,
        ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;
