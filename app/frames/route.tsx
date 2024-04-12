/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { Merlion } from "../components/Merlion";
import { PuzzleBackground } from "../components/PuzzleBackground";

const handleRequest = frames(async (ctx: any) => {
    return {
        image: (
            <div tw="w-full h-full justify-center items-center flex flex-col relative">
                <div tw="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
                <div tw="flex absolute top-0 left-0 w-full h-full">
                    <PuzzleBackground />
                </div>
                <div tw="flex absolute top-20 left-100">
                    <Merlion />
                </div>
                {/* Ensure the red background covers the top half of the container */}
                <span tw="grow absolute top-120 text-5xl bg-white">
                    Lion City Search
                </span>
            </div>
        ),
        buttons: [
            <Button action="post" target="/frames/game">
                Play Game!
            </Button>,
            // TO CHANGE
            <Button action="link" target="https://sg-searchers.vercel.app">
                View Leaderboard
            </Button>,
        ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;
