import nodemailer from 'nodemailer';
import mailgunTransport from 'nodemailer-mailgun-transport';

import config from '../config/index.js';
import { consoleLogger, errorLogger } from '../config/log.config.js';

/**
 * Mailgun configuration
 */
const mailgunAuth = {
    auth: {
        api_key: config.mailgunApiKey, // Mailgun API key
        domain: config.mailgunDomain   // Mailgun domain
    },
    logger: true,
    debug: true
};

/**
 * Create Nodemailer transport using Mailgun
 */
const transporter = nodemailer.createTransport(
    mailgunTransport(mailgunAuth)
);

/**
 * Send email using Mailgun
 */
const sendMail = async (
    to: string | string[],
    subject: string,
    html: string,
    attachments: any[] = []
): Promise<void> => {
    const mailOptions = {
        from: config.mailSenderName, // Sender name / email
        to,
        subject,
        html,
        attachments
    };

    try {
        const info = await transporter.sendMail(mailOptions);

        consoleLogger.info(
            'Email sent successfully',
            JSON.stringify(info.response, null, 2)
        );
    } catch (error) {
        errorLogger.error('Mail send error', error);
        throw error; // 🔴 IMPORTANT: let error middleware handle this
    }
};

export default sendMail;
