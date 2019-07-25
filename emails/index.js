import mail from '@sendgrid/mail';
import Email from 'email-templates';
import path from 'path';
import T from '../src/utils/T';

class EmailSender {
  static async sendMail(template, recipient, subject, data) {
    mail.setApiKey(process.env.SENDGRID_API_KEY);

    const email = new Email({
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: path.join(__dirname, './')
        }
      }
    });

    const result = await email.render(template, data);

    const mailData = {
      from: { email: `${process.env.EMAIL_SENDER}`, name: T.health_up },
      to: recipient,
      subject,
      html: result
    };

    if (process.env.NODE_ENV !== 'test') {
      return mail.send(mailData);
    }
  }
}

export default EmailSender;
