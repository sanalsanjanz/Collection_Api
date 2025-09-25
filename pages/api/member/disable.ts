// pages/api/member/disable.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../../lib/supabaseServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') return res.status(405).end();
    const { member_id, active } = req.body;
    if (!member_id) return res.status(400).json({ error: 'member_id required' });

    const { data, error } = await supabaseServer
        .from('members')
        .update({ active })
        .eq('id', member_id)
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json({ member: data });
}
