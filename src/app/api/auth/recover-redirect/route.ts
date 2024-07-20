import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function POST(req: Request) {
    if (!req.body) redirect('/login');

    const { email } = await req.json();

    console.log('recover-redirect 에서 받은 이메일 =>', email);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });

    if (error) {
        console.log('recover-redirect 에서 에러 발생 =>', error);
        redirect('/');
    }
    revalidatePath('/recover');
    redirect('/recover');
}
