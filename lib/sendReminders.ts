import admin from 'firebase-admin';
import { createClient } from '@supabase/supabase-js';
// import { format } from 'date-fns';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON!);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function sendReminders() {
    const now = new Date();
    const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const monthStart = `${monthStr}-01`;

    // get admins (profiles)
    const { data: admins } = await supabase
        .from('profiles')
        .select('id, full_name, fcm_token');

    if (!admins) return;

    for (const adminProfile of admins) {
        const adminId = adminProfile.id;

        // skip if fcm_token undefined
        if (!adminProfile.fcm_token) continue;

        const { data: members } = await supabase
            .from('members')
            .select('id, name, mobile')
            .eq('admin_id', adminId)
            .eq('active', true);

        if (!members) continue;

        const unpaid = [];
        for (const m of members) {
            const { data: cols } = await supabase
                .from('collections')
                .select('id')
                .eq('member_id', m.id)
                .eq('for_month', monthStart);

            if (!cols || cols.length === 0) unpaid.push(m);
        }

        if (unpaid.length > 0) {
            const token: string = adminProfile.fcm_token; // now guaranteed to be string
            const message = {
                token,
                notification: {
                    title: 'Unpaid members reminder',
                    body: `You have ${unpaid.length} unpaid member(s) for ${monthStr}.`
                },
                data: {
                    type: 'unpaid_reminder',
                    month: monthStr,
                    count: String(unpaid.length)
                }
            };

            await admin.messaging().send(message).catch(err => console.error('FCM send error', err));
        }
    }
}
