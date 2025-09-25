// pages/api/unpaid.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../lib/supabaseServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { admin_id, month } = req.query; // month in format 'YYYY-MM' or '2025-09'
    if (!admin_id || !month) return res.status(400).json({ error: 'admin_id and month required' });

    // convert to first day for for_month comparison
    const monthStart = `${String(month)}-01`;

    const unpaidQuery = `
    select m.*
    from members m
    left join collections c on c.member_id = m.id and c.for_month = $1
    where m.admin_id = $2 and m.active = true and c.id is null
  `;

    const { data, error } = await supabaseServer.rpc('sql', { sql: unpaidQuery }).match(() => ({}));
    // easier approach below with supabase-js:
    const { data: members, error: e2 } = await supabaseServer
        .from('members')
        .select('*, collections(id)')
        .eq('admin_id', admin_id)
        .eq('active', true);

    if (e2) return res.status(500).json({ error: e2.message });

    // filter members without collections for monthStart
    const unpaid = (members as any[]).filter(m => {
        const has = (m.collections || []).some((c: any) => c.for_month && c.for_month.startsWith(monthStart));
        return !has;
    });

    res.json({ unpaid });
}
