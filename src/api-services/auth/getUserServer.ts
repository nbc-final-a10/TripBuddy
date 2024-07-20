import { cookies } from "next/headers";

export async function getUserServer(): Promise<any | null> {
    const cookieStore = cookies();
    const cookiesArray = cookieStore.getAll();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/buddy`, {
        method: "GET",
        next: {
            tags: ["user"],
        },
        // cache: "no-store",
        headers: {
            Cookie: cookiesArray.map((cookie) => `${cookie.name}=${cookie.value}`).join(";"),
        },
    });

    if (!response.ok) {
        const error = await response.json();

        const message = error.data.user;
        if (message === "Auth session missing!") {
            return null;
        }
    }

    const data = await response.json();

    const buddy = data.data.user;

    return buddy;
}
