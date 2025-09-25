// pages/api/save-fcm.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../lib/supabaseServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();
    const { user_id, fcm_token } = req.body;
    if (!user_id || !fcm_token) return res.status(400).json({ error: 'user_id and fcm_token required' });

    const { data, error } = await supabaseServer
        .from('profiles')
        .upsert({ id: user_id, fcm_token }, { onConflict: 'id' })
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json({ profile: data });
}
