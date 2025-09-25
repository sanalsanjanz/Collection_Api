import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../lib/supabaseServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();
    const { admin_id, name, mobile, email, role = 'member', active = true } = req.body;

    if (!admin_id || !name) return res.status(400).json({ error: 'admin_id and name required' });

    const { data, error } = await supabaseServer
        .from('members')
        .insert([{ admin_id, name, mobile, email, role, active }])
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ member: data });
}
