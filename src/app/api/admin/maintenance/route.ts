import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { toggleMaintenanceMode } from "@/db";

export async function POST() {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        return NextResponse.json(
            { message: "Sign In Required" },
            { status: 401 },
        );
    }

    if (!user.admin) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const maintenance = await toggleMaintenanceMode();

    return NextResponse.json({ maintenance });
}
