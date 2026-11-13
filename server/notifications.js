// Notification provider stubs
// In production, these would integrate with actual SMS/email providers

export async function sendSMS(phone, message) {
  console.log('[SMS] To: ' + phone + ' - ' + message)
  return { success: true, provider: 'stub' }
}

export async function sendEmail(email, subject, body) {
  console.log('[EMAIL] To: ' + email + ' - Subject: ' + subject)
  return { success: true, provider: 'stub' }
}

export async function sendNotification(channel, recipient, template, data) {
  switch (channel) {
    case 'sms':
      return sendSMS(recipient, (data && data.message) || template)
    case 'email':
      return sendEmail(recipient, (data && data.subject) || template, (data && data.body) || '')
    case 'in_app':
      console.log('[IN_APP] To: ' + recipient + ' - ' + template)
      return { success: true, provider: 'in_app' }
    default:
      return { success: false, error: 'Unknown channel' }
  }
}
