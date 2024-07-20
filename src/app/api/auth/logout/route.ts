import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

export async function DELETE() {
    const supabase = createClient();

    await supabase.auth.signOut();

    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
}
