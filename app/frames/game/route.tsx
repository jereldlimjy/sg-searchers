import { frames } from "../frames";
import { Button } from "frames.js/next";

const getPuzzle = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/puzzle");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const POST = frames(async (ctx: any) => {
    const puzzle = await getPuzzle();

    console.log(puzzle);

    return {
        image: (
            <div tw="flex">
                <span>Gameplay page</span>

                <div tw="flex p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md">
                    <div tw="flex grid grid-cols-5 gap-1">
                        {puzzle.map((row: string[], rowIndex: number) =>
                            row.map((cell: string, colIndex: number) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    tw="flex w-10 h-10 flex justify-center items-center bg-gray-200 text-lg font-semibold rounded"
                                >
                                    {cell}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        ),
        buttons: [
            <Button action="post" target="/game">
                Submit
            </Button>,
            <Button action="post" target="/submit">
                Give up liao
            </Button>,
        ],
        state: {},
    };
});
