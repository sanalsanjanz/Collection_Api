// pages/api/members.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../lib/supabaseServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { admin_id } = req.query;
    if (!admin_id) return res.status(400).json({ error: 'admin_id required' });

    const { data, error } = await supabaseServer
        .from('members')
        .select('*')
        .eq('admin_id', admin_id)
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json({ members: data });
}
