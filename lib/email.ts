/**
 * Email Utility
 * Handles email sending for booking confirmations
 */

import nodemailer from 'nodemailer';

export interface BookingEmailData {
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  destination: string;
  customDestination?: string;
  airline?: string;
  flightNumber?: string;
  vehicleType: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  specialRequests?: string;
  estimatedPrice: string;
  bookingReference?: string;
  paymentStatus: 'paid' | 'reserved';
  paymentReference?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Create email transporter
 */
const createTransporter = () => {
  // For Gmail, you can use OAuth2 or App Password
  // For other providers, adjust accordingly
  const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const emailPort = parseInt(process.env.EMAIL_PORT || '587');
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const emailFrom = process.env.EMAIL_FROM || emailUser;

  if (!emailUser || !emailPassword) {
    console.warn('Email credentials not configured. Emails will not be sent.');
    return null;
  }

  return nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailPort === 465, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
};

/**
 * Generate HTML email template for booking confirmation
 */
const generateBookingEmailHTML = (data: BookingEmailData): string => {
  const vehicleName = 
    data.vehicleType === 'economy' ? 'Sedan' :
    data.vehicleType === 'executive' ? 'Mini SUV' :
    data.vehicleType === 'suv' ? 'Premium SUV' :
    'Executive Van';

  const paymentStatusText = data.paymentStatus === 'paid' 
    ? '✅ Payment Confirmed' 
    : '⏳ Payment Pending (Reservation Only)';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation - Quarhire</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0074C8 0%, #0097F2 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">QUARHIRE</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Beyond Arrival</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #0A0A0A; margin: 0 0 20px 0; font-size: 24px;">Booking Confirmation</h2>
              
              <p style="color: #2B2F35; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Dear ${data.name},
              </p>
              
              <p style="color: #2B2F35; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Thank you for choosing Quarhire! Your ${data.paymentStatus === 'paid' ? 'booking has been confirmed' : 'reservation has been received'}.
              </p>

              <!-- Status Badge -->
              <div style="background-color: ${data.paymentStatus === 'paid' ? '#10b981' : '#f59e0b'}; color: #ffffff; padding: 12px 20px; border-radius: 6px; margin: 0 0 30px 0; text-align: center; font-weight: bold;">
                ${paymentStatusText}
              </div>

              <!-- Booking Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafb; border-radius: 8px; padding: 20px; margin: 0 0 30px 0;">
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #0A0A0A;">Booking Reference:</strong>
                    <span style="color: #2B2F35; margin-left: 10px;">${data.bookingReference || 'N/A'}</span>
                  </td>
                </tr>
                ${data.paymentReference ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #0A0A0A;">Payment Reference:</strong>
                    <span style="color: #2B2F35; margin-left: 10px;">${data.paymentReference}</span>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #0A0A0A;">Pickup Date & Time:</strong>
                    <span style="color: #2B2F35; margin-left: 10px;">${data.date} at ${data.time}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #0A0A0A;">Pickup Location:</strong>
                    <span style="color: #2B2F35; margin-left: 10px;">${data.pickupLocation}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #0A0A0A;">Destination:</strong>
                    <span style="color: #2B2F35; margin-left: 10px;">${data.customDestination || data.destination}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #0A0A0A;">Vehicle Type:</strong>
                    <span style="color: #2B2F35; margin-left: 10px;">${vehicleName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #0A0A0A;">Passengers:</strong>
                    <span style="color: #2B2F35; margin-left: 10px;">${data.passengers}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #0A0A0A;">Luggage:</strong>
                    <span style="color: #2B2F35; margin-left: 10px;">${data.luggage}</span>
                  </td>
                </tr>
                ${data.airline ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #0A0A0A;">Airline:</strong>
                    <span style="color: #2B2F35; margin-left: 10px;">${data.airline}</span>
                  </td>
                </tr>
                ` : ''}
                ${data.flightNumber ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #0A0A0A;">Flight Number:</strong>
                    <span style="color: #2B2F35; margin-left: 10px;">${data.flightNumber}</span>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #0A0A0A;">Estimated Price:</strong>
                    <span style="color: #0074C8; font-size: 18px; font-weight: bold; margin-left: 10px;">${data.estimatedPrice}</span>
                  </td>
                </tr>
              </table>

              ${data.specialRequests ? `
              <!-- Special Requests -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 0 0 30px 0;">
                <strong style="color: #0A0A0A; display: block; margin-bottom: 8px;">Special Requests:</strong>
                <p style="color: #2B2F35; margin: 0; font-size: 14px;">${data.specialRequests}</p>
              </div>
              ` : ''}

              <!-- Contact Information -->
              <div style="background-color: #e0f2fe; border-left: 4px solid #0074C8; padding: 15px; border-radius: 4px; margin: 0 0 30px 0;">
                <strong style="color: #0A0A0A; display: block; margin-bottom: 10px;">Need Help?</strong>
                <p style="color: #2B2F35; margin: 5px 0; font-size: 14px;">📞 Phone: <a href="tel:+233240665648" style="color: #0074C8; text-decoration: none;">+233 240 665 648</a></p>
                <p style="color: #2B2F35; margin: 5px 0; font-size: 14px;">💬 WhatsApp: <a href="https://wa.me/233240665648" style="color: #0074C8; text-decoration: none;">Chat with us</a></p>
              </div>

              ${data.paymentStatus === 'reserved' ? `
              <!-- Payment Reminder -->
              <div style="background-color: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 0 0 30px 0; text-align: center;">
                <p style="color: #0A0A0A; margin: 0 0 10px 0; font-weight: bold; font-size: 16px;">⏰ Payment Pending</p>
                <p style="color: #2B2F35; margin: 0; font-size: 14px;">Please complete your payment to confirm your booking. We'll contact you shortly to arrange payment.</p>
              </div>
              ` : ''}

              <p style="color: #2B2F35; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                We look forward to serving you!
              </p>
              
              <p style="color: #2B2F35; font-size: 14px; line-height: 1.6; margin: 10px 0 0 0;">
                Best regards,<br>
                <strong>The Quarhire Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0A0A0A; padding: 20px; text-align: center;">
              <p style="color: #ffffff; margin: 0; font-size: 12px;">© 2025 Quarhire. All rights reserved.</p>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 12px;">Powered by Doctor Barn Tech</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

/**
 * Generate admin notification email HTML
 */
const generateAdminNotificationHTML = (data: BookingEmailData): string => {
  const vehicleName = 
    data.vehicleType === 'economy' ? 'Sedan' :
    data.vehicleType === 'executive' ? 'Mini SUV' :
    data.vehicleType === 'suv' ? 'Premium SUV' :
    'Executive Van';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking - Quarhire</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0074C8 0%, #0097F2 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">NEW BOOKING RECEIVED</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Quarhire Booking System</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: ${data.paymentStatus === 'paid' ? '#10b981' : '#f59e0b'}; color: #ffffff; padding: 12px 20px; border-radius: 6px; margin: 0 0 30px 0; text-align: center; font-weight: bold;">
                ${data.paymentStatus === 'paid' ? '✅ PAID' : '⏰ RESERVATION (Payment Pending)'}
              </div>

              <!-- Booking Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafb; border-radius: 8px; padding: 20px; margin: 0 0 30px 0;">
                <tr>
                  <td colspan="2" style="padding: 8px 0; border-bottom: 1px solid #DDE2E9;">
                    <strong style="color: #0A0A0A; font-size: 16px;">Customer Information</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; width: 40%;"><strong style="color: #0A0A0A;">Name:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Email:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;"><a href="mailto:${data.email}" style="color: #0074C8;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Phone:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;"><a href="tel:${data.phone}" style="color: #0074C8;">${data.phone}</a></td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 20px 0 8px 0; border-top: 1px solid #DDE2E9; border-bottom: 1px solid #DDE2E9; margin-top: 15px;">
                    <strong style="color: #0A0A0A; font-size: 16px;">Booking Details</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Booking Reference:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35; font-weight: bold;">${data.bookingReference || 'N/A'}</td>
                </tr>
                ${data.paymentReference ? `
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Payment Reference:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35; font-weight: bold;">${data.paymentReference}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Pickup Date & Time:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;">${data.date} at ${data.time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Pickup Location:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;">${data.pickupLocation}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Destination:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;">${data.customDestination || data.destination}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Vehicle Type:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;">${vehicleName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Passengers:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;">${data.passengers}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Luggage:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;">${data.luggage}</td>
                </tr>
                ${data.airline ? `
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Airline:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;">${data.airline}</td>
                </tr>
                ` : ''}
                ${data.flightNumber ? `
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Flight Number:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;">${data.flightNumber}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Estimated Price:</strong></td>
                  <td style="padding: 8px 0; color: #0074C8; font-size: 18px; font-weight: bold;">${data.estimatedPrice}</td>
                </tr>
                ${data.specialRequests ? `
                <tr>
                  <td colspan="2" style="padding: 15px 0 8px 0; border-top: 1px solid #DDE2E9;">
                    <strong style="color: #0A0A0A;">Special Requests:</strong>
                    <p style="color: #2B2F35; margin: 8px 0 0 0; font-size: 14px;">${data.specialRequests}</p>
                  </td>
                </tr>
                ` : ''}
              </table>

              <p style="color: #2B2F35; font-size: 14px; line-height: 1.6; margin: 0;">
                Please process this booking accordingly.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0A0A0A; padding: 20px; text-align: center;">
              <p style="color: #ffffff; margin: 0; font-size: 12px;">© 2025 Quarhire. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

/**
 * Send booking confirmation email to customer and admin notification separately
 */
export const sendBookingEmail = async (data: BookingEmailData): Promise<{ customerSent: boolean; adminSent: boolean }> => {
  const result = { customerSent: false, adminSent: false };
  
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.warn('Email transporter not available. Skipping email send.');
      return result;
    }

    const emailFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@quarhire.com';
    const adminEmail = process.env.ADMIN_EMAIL;

    // Send confirmation email to customer
    try {
      const customerMailOptions = {
        from: `Quarhire <${emailFrom}>`,
        to: data.email,
        subject: `Booking ${data.paymentStatus === 'paid' ? 'Confirmation' : 'Reservation'} - ${data.bookingReference || 'Quarhire'}`,
        html: generateBookingEmailHTML(data),
        text: `
Booking ${data.paymentStatus === 'paid' ? 'Confirmation' : 'Reservation'}

Dear ${data.name},

Thank you for choosing Quarhire! Your ${data.paymentStatus === 'paid' ? 'booking has been confirmed' : 'reservation has been received'}.

Booking Details:
- Booking Reference: ${data.bookingReference || 'N/A'}
${data.paymentReference ? `- Payment Reference: ${data.paymentReference}\n` : ''}
- Pickup Date & Time: ${data.date} at ${data.time}
- Pickup Location: ${data.pickupLocation}
- Destination: ${data.customDestination || data.destination}
- Vehicle Type: ${data.vehicleType === 'economy' ? 'Sedan' : data.vehicleType === 'executive' ? 'Mini SUV' : data.vehicleType === 'suv' ? 'Premium SUV' : 'Executive Van'}
- Passengers: ${data.passengers}
- Luggage: ${data.luggage}
${data.airline ? `- Airline: ${data.airline}\n` : ''}${data.flightNumber ? `- Flight Number: ${data.flightNumber}\n` : ''}
- Estimated Price: ${data.estimatedPrice}
${data.specialRequests ? `- Special Requests: ${data.specialRequests}\n` : ''}

${data.paymentStatus === 'reserved' ? '\n⏰ Payment Pending: Please complete your payment to confirm your booking.\n' : ''}

Need Help?
Phone: +233 240 665 648
WhatsApp: https://wa.me/233240665648

Best regards,
The Quarhire Team
        `.trim(),
      };

      const customerInfo = await transporter.sendMail(customerMailOptions);
      console.log('Customer confirmation email sent:', customerInfo.messageId);
      result.customerSent = true;
    } catch (error) {
      console.error('Error sending customer email:', error);
    }

    // Send notification email to admin
    if (adminEmail) {
      try {
        const adminMailOptions = {
          from: `Quarhire <${emailFrom}>`,
          to: adminEmail,
          subject: `New Booking ${data.paymentStatus === 'paid' ? '(Paid)' : '(Reservation)'} - ${data.bookingReference || 'Quarhire'}`,
          html: generateAdminNotificationHTML(data),
          text: `
New Booking Received

${data.paymentStatus === 'paid' ? '✅ PAID' : '⏰ RESERVATION (Payment Pending)'}

Customer Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}

Booking Details:
- Booking Reference: ${data.bookingReference || 'N/A'}
${data.paymentReference ? `- Payment Reference: ${data.paymentReference}\n` : ''}
- Pickup Date & Time: ${data.date} at ${data.time}
- Pickup Location: ${data.pickupLocation}
- Destination: ${data.customDestination || data.destination}
- Vehicle Type: ${data.vehicleType === 'economy' ? 'Sedan' : data.vehicleType === 'executive' ? 'Mini SUV' : data.vehicleType === 'suv' ? 'Premium SUV' : 'Executive Van'}
- Passengers: ${data.passengers}
- Luggage: ${data.luggage}
${data.airline ? `- Airline: ${data.airline}\n` : ''}${data.flightNumber ? `- Flight Number: ${data.flightNumber}\n` : ''}
- Estimated Price: ${data.estimatedPrice}
${data.specialRequests ? `- Special Requests: ${data.specialRequests}\n` : ''}
          `.trim(),
        };

        const adminInfo = await transporter.sendMail(adminMailOptions);
        console.log('Admin notification email sent:', adminInfo.messageId);
        result.adminSent = true;
      } catch (error) {
        console.error('Error sending admin email:', error);
      }
    } else {
      console.warn('ADMIN_EMAIL not configured. Skipping admin notification.');
    }

    return result;
  } catch (error) {
    console.error('Error in sendBookingEmail:', error);
    return result;
  }
};

/**
 * Generate contact form email HTML for admin
 */
const generateContactFormHTML = (data: ContactFormData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission - Quarhire</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0074C8 0%, #0097F2 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">NEW CONTACT FORM SUBMISSION</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Quarhire Contact Form</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafb; border-radius: 8px; padding: 20px; margin: 0 0 30px 0;">
                <tr>
                  <td colspan="2" style="padding: 8px 0; border-bottom: 1px solid #DDE2E9; margin-bottom: 15px;">
                    <strong style="color: #0A0A0A; font-size: 16px;">Contact Information</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; width: 30%;"><strong style="color: #0A0A0A;">Name:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Email:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35;"><a href="mailto:${data.email}" style="color: #0074C8;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong style="color: #0A0A0A;">Subject:</strong></td>
                  <td style="padding: 8px 0; color: #2B2F35; font-weight: bold;">${data.subject}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 20px 0 8px 0; border-top: 1px solid #DDE2E9; margin-top: 15px;">
                    <strong style="color: #0A0A0A; font-size: 16px;">Message</strong>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 15px 0 8px 0;">
                    <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border-left: 4px solid #0074C8;">
                      <p style="color: #2B2F35; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <div style="background-color: #e0f2fe; border-left: 4px solid #0074C8; padding: 15px; border-radius: 4px; margin: 0 0 30px 0;">
                <p style="color: #0A0A0A; margin: 0; font-size: 14px; font-weight: bold;">Quick Actions:</p>
                <p style="color: #2B2F35; margin: 8px 0 0 0; font-size: 14px;">
                  📧 <a href="mailto:${data.email}" style="color: #0074C8; text-decoration: none;">Reply to ${data.name}</a>
                </p>
              </div>

              <p style="color: #2B2F35; font-size: 14px; line-height: 1.6; margin: 0;">
                Please respond to this inquiry as soon as possible.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0A0A0A; padding: 20px; text-align: center;">
              <p style="color: #ffffff; margin: 0; font-size: 12px;">© 2025 Quarhire. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

/**
 * Send contact form email to admin
 */
export const sendContactFormEmail = async (data: ContactFormData): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.warn('Email transporter not available. Skipping email send.');
      return false;
    }

    const emailFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@quarhire.com';
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.warn('ADMIN_EMAIL not configured. Cannot send contact form email.');
      return false;
    }

    const mailOptions = {
      from: `Quarhire Contact Form <${emailFrom}>`,
      to: adminEmail,
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      html: generateContactFormHTML(data),
      text: `
New Contact Form Submission

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Subject: ${data.subject}

Message:
${data.message}

---
Reply to: ${data.email}
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact form email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return false;
  }
};

