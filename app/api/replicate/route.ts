import { NextResponse } from "next/server";
import Replicate from "replicate";

const REMOVE_BG_MODEL = "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003";

export async function POST(request: Request) {
    // 1. Get the request data (in JSON format) from the client
    const req = await request.json();

    // 2. Initialize the replicate object with our Replicate API token
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN as string,
    });

    // 3. Run the Replicate's model (to remove background) and get the output image
    const output = await replicate.run(REMOVE_BG_MODEL, {
        input: { image: req.image }
    });

    // 4. Check if output is NULL then return error back to the client
    if (!output) {
        console.log("Something went wrong.");
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }

    // 5. Otherwise, we show output in the console (SERVER side)
    // and return output back to client
    console.log("OUTPUT: ", output);
    return NextResponse.json({ output }, { status: 201 });

}