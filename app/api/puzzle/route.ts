import { NextRequest, NextResponse } from "next/server";
const wordSearch = require("@blex41/word-search");
// const wordsearch = require("wordsearch");

export async function GET(
    req: NextRequest,
    res: NextResponse<{ message: string }>
) {
    const options = {
        cols: 10,
        rows: 10,
        disabledDirections: ["N", "W", "NW", "SW"],
        dictionary: [
            "kiasu",
            "blur",
            "atas",
            "shiok",
            "lepak",
            "sabo",
            "hawker",
            "aiyah",
            "ahbeng",
            "sotong",
        ],
        maxWords: 20,
        backwardsProbability: 0.3,
        upperCase: false,
        diacritics: true,
    };

    const ws = new wordSearch(options);

    return NextResponse.json(ws);
}
