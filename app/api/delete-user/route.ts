import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        console.log("Deleting user:", userId);
        console.log("SUPABASE_SERVICE_ROLE_KEY exists:", !!supabaseServiceRoleKey);

        if (!supabaseServiceRoleKey) {
            return NextResponse.json({ error: "Service role key is missing in environment variables" }, { status: 500 });
        }

        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            supabaseServiceRoleKey
        );

        const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

        if (error) {
            console.error("Supabase Admin Delete Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error("Account deletion API error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}
