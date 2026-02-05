const verificationEmail = (userName: string) => ({
  // Plain text version
  text: `
Hello ${userName},

We’ve successfully received your documents for verification.
Thank you for submitting them.

What happens next?
Our team is currently reviewing your documents. This process usually takes 24–48 hours, depending on verification volume.

Important notes:
- Please make sure the documents you submitted are clear and valid
- If additional information is required, we’ll contact you via this email
- No further action is needed from you at this time

Once your verification is complete, you’ll receive another email with the result.

If you have any questions, feel free to reply to this email or contact our support team.

Thanks for your patience and cooperation.

Best regards,
TigerIt Verification Team
TigerIt Delivery
  `,

  // HTML version
  html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 6px;">
      
      <h2 style="color: #222;">Hello ${userName},</h2>

      <p>
        We’ve successfully received your documents for verification.<br />
        Thank you for submitting them.
      </p>
      <h3 style="margin-top: 24px; color: #333;">What happens next?</h3>
      <p>
        Our team is currently reviewing your documents. This process usually takes
        <strong>24–48 hours</strong>, depending on verification volume.
      </p>

      <h3 style="margin-top: 24px; color: #333;">Important notes:</h3>
      <ul style="padding-left: 18px;">
        <li>Please make sure the documents you submitted are <strong>clear and valid</strong></li>
        <li>If additional information is required, we’ll contact you via this email</li>
        <li>No further action is needed from you at this time</li>
      </ul>

      <p style="margin-top: 24px;">
        Once your verification is complete, you’ll receive another email with the result.
      </p>

      <p>
        If you have any questions, feel free to reply to this email or contact our support team.
      </p>

      <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 14px; color: #555;">
        Thanks for your patience and cooperation.<br /><br />
        <strong>TigerIt Verification Team</strong><br />
        TigerIt Delivery
      </p>
    </div>
  </div>
  `,
})
const transactionEmail = (userName: string, orderId?: string | null) => ({
  // Plain text version
  text: `
Hello ${userName},

Thank you for your recent ${orderId ? 'order' : 'top-up'}.
${orderId ? `Order ID: ${orderId}` : ''}

Your balance has been updated. You can now enjoy our services.

If you have any questions, feel free to reply to this email.

Thanks,
TigerIt Delivery Team
  `,

  // HTML version
  html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 6px;">
      
      <h2 style="color: #222;">Hello ${userName},</h2>

      <p style="font-size: 16px; color: #333;">
        Thank you for your recent ${orderId ? 'order' : 'top-up'}. Your transaction was successful ✅
      </p>

      ${orderId ? `
      <div style="background-color: #f1f1f1; padding: 16px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0; font-size: 16px;"><strong>Order ID:</strong> ${orderId}</p>
      </div>
      ` : ''}

      <p style="font-size: 16px; color: #333;">
        Your balance has been updated and is now ready for use.
      </p>

      <p style="font-size: 16px; color: #333;">
        If you have any questions, feel free to reply to this email or contact our support team.
      </p>

      <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 14px; color: #555;">
        Thanks for using TigerIt Delivery.<br />
        <strong>TigerIt Delivery Team</strong>
      </p>
    </div>
  </div>
  `
})


const businessOrderNotification = (businessName: string, orderId: string) => ({
  // Plain text version
  text: `
Hello ${businessName},

You have received a new order!
Order ID: ${orderId}

Please log in to your dashboard to view the order details and start processing.

Thanks,
TigerIt Delivery Team
  `,

  // HTML version
  html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 6px;">
      
      <h2 style="color: #222;">Hello ${businessName},</h2>

      <p style="font-size: 16px; color: #333;">
        You have received a new order! 📦
      </p>

      <div style="background-color: #f1f1f1; padding: 16px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0; font-size: 16px;"><strong>Order ID:</strong> ${orderId}</p>
      </div>

      <p style="font-size: 16px; color: #333;">
        Please log in to your dashboard to view the order details and start processing it as soon as possible.
      </p>

      <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 14px; color: #555;">
        Thanks for being part of TigerIt Delivery.<br />
        <strong>TigerIt Delivery Team</strong>
      </p>
    </div>
  </div>
  `
})

export { verificationEmail, transactionEmail, businessOrderNotification }