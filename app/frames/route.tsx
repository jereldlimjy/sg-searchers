/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx: any) => {
    return {
        image: <div tw="flex">Welcome to SG Searchers {":)"}</div>,
        buttons: [
            <Button action="post" target="/frames/getStarted">
                Let's go!
            </Button>,
        ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;
