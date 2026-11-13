p = r"D:\BraeNova_Projects\PNG Power Services\server\index.js"
s = open(p, encoding='utf-8').read()
# Add import for notifications
s = s.replace("import fs from 'fs'", "import fs from 'fs'\nimport { sendNotification } from './notifications.js'")
# Update the notification endpoint to attempt sending
old = """    // In production, this would trigger actual SMS/email sending
    console.log(`Notification queued: ${channel} to ${recipientType}`)
    await logEvent('notification', result.insertId, 'queued', req.user.id, 'Notification queued', { channel, template })
    res.status(201).json({ id: result.insertId, deliveryState: 'pending' })"""
new = """    // Attempt to send via provider
    const recipient = recipientType === 'reporter' ? 'reporter' : `user:${userId}`
    const sendResult = await sendNotification(channel, recipient, template, { message: template })
    const deliveryState = sendResult.success ? 'sent' : 'failed'
    await pool.query('UPDATE notifications SET delivery_state = ?, sent_at = NOW() WHERE id = ?', [deliveryState, result.insertId])
    await logEvent('notification', result.insertId, deliveryState, req.user.id, `Notification ${deliveryState}`, { channel, template, provider: sendResult.provider })
    res.status(201).json({ id: result.insertId, deliveryState })"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
