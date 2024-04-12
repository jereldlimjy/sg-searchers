import { NextRequest, NextResponse } from "next/server";
const wordsearch = require("wordsearch");

export async function GET(
    req: NextRequest,
    res: NextResponse<{ message: string }>
) {
    const search = wordsearch(["jereld", "tim"], 10, 10);

    return NextResponse.json(search);
}
