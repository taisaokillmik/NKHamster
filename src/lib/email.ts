// Email notification service structure
// This file provides the structure for email notifications
// To use this, you need to install an email provider like Resend or SendGrid

interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private apiKey: string | null = null;
  private fromEmail: string = "noreply@hamsternhaminh.vn";
  private fromName: string = "NK Hamster";

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.EMAIL_API_KEY || null;
    this.fromEmail = process.env.EMAIL_FROM || this.fromEmail;
    this.fromName = process.env.EMAIL_FROM_NAME || this.fromName;
  }

  async sendEmail(template: EmailTemplate): Promise<{ success: boolean; error?: string }> {
    if (!this.apiKey) {
      console.warn("Email API key not configured. Email would be sent:", template);
      return { success: false, error: "Email service not configured" };
    }

    try {
      // Example implementation with Resend (uncomment and install @resend/node)
      // const { Resend } = require("@resend/node");
      // const resend = new Resend(this.apiKey);
      // await resend.emails.send({
      //   from: `${this.fromName} <${this.fromEmail}>`,
      //   to: template.to,
      //   subject: template.subject,
      //   html: template.html,
      // });

      // Example implementation with SendGrid (uncomment and install @sendgrid/mail)
      // const sgMail = require("@sendgrid/mail");
      // sgMail.setApiKey(this.apiKey);
      // await sgMail.send({
      //   to: template.to,
      //   from: this.fromEmail,
      //   subject: template.subject,
      //   html: template.html,
      // });

      console.log("Email sent successfully to:", template.to);
      return { success: true };
    } catch (error) {
      console.error("Failed to send email:", error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  }

  async sendOrderConfirmation(
    customerName: string,
    customerEmail: string,
    orderId: number,
    total: number,
    items: Array<{ name: string; quantity: number; price: number }>
  ): Promise<{ success: boolean; error?: string }> {
    const itemsHtml = items
      .map((item) => `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${item.price.toLocaleString()}đ</td></tr>`)
      .join("");

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">🐹 NK Hamster</h1>
        </div>
        <div style="padding: 30px; background: #fff; border: 1px solid #eee; border-top: none;">
          <h2 style="color: #92400e; margin-top: 0;">Xác nhận đơn hàng #${orderId}</h2>
          <p>Chào <strong>${customerName}</strong>,</p>
          <p>Cảm ơn bạn đã đặt hàng tại NK Hamster. Đơn hàng của bạn đã được ghi nhận thành công.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #fef3c7;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #f59e0b;">Sản phẩm</th>
                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #f59e0b;">Số lượng</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #f59e0b;">Giá</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Tổng cộng:</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; color: #d97706;">${total.toLocaleString()}đ</td>
              </tr>
            </tfoot>
          </table>
          
          <p style="color: #666; font-size: 14px;">Chúng tôi sẽ liên hệ với bạn qua số điện thoại để xác nhận đơn hàng trong thời gian sớm nhất.</p>
          <p style="color: #666; font-size: 14px;">Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua:</p>
          <p style="color: #666; font-size: 14px;">📞 0900 123 456 | ✉️ info@hamsternhaminh.vn</p>
        </div>
        <div style="background: #fef3c7; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #92400e;">
          © 2025 NK Hamster. All rights reserved.
        </div>
      </div>
    `;

    return this.sendEmail({
      to: customerEmail,
      subject: `Xác nhận đơn hàng #${orderId} - NK Hamster`,
      html,
    });
  }

  async sendOrderStatusUpdate(
    customerEmail: string,
    orderId: number,
    status: string
  ): Promise<{ success: boolean; error?: string }> {
    const statusMessages: Record<string, string> = {
      confirmed: "đã được xác nhận",
      shipping: "đang được giao",
      completed: "đã hoàn thành",
      cancelled: "đã bị hủy",
    };

    const statusMessage = statusMessages[status] || status;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">🐹 NK Hamster</h1>
        </div>
        <div style="padding: 30px; background: #fff; border: 1px solid #eee; border-top: none;">
          <h2 style="color: #92400e; margin-top: 0;">Cập nhật đơn hàng #${orderId}</h2>
          <p>Đơn hàng của bạn <strong>${statusMessage}</strong>.</p>
          <p style="color: #666; font-size: 14px;">Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua:</p>
          <p style="color: #666; font-size: 14px;">📞 0900 123 456 | ✉️ info@hamsternhaminh.vn</p>
        </div>
        <div style="background: #fef3c7; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #92400e;">
          © 2025 NK Hamster. All rights reserved.
        </div>
      </div>
    `;

    return this.sendEmail({
      to: customerEmail,
      subject: `Cập nhật đơn hàng #${orderId} - NK Hamster`,
      html,
    });
  }
}

// Singleton instance
export const emailService = new EmailService();
