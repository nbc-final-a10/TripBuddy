
export async function getUserClient(initialBuddy: any): Promise<any | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/buddy`, {
        method: "GET",
        next: {
            tags: ["user"],
        },
        // cache: "no-store",
    });

    if (!response.ok) {
        return initialBuddy;
    }

    const data = await response.json();

    const buddy = data.data.user;

    return buddy;
}
