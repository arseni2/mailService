import { Injectable, OnModuleInit } from "@nestjs/common";
import { render } from "@react-email/render";
import { createTransport, SendMailOptions, Transporter } from "nodemailer";
import * as React from 'react';
import { ComponentType } from "react";

@Injectable()
export class SmtpService implements OnModuleInit {
    private transporter: Transporter;
    private readonly MAX_RETRIES = 3;
    private readonly RETRY_DELAY = 2000; // 2 секунды между попытками

    constructor() {
        this.initializeTransporter();
    }

    private initializeTransporter() {
        this.transporter = createTransport({
            host: process.env.MAIL_SMTP_HOST,
            port: Number(process.env.MAIL_SMTP_PORT),
            secure: process.env.MAIL_SMTP_PORT === "465",
            auth: {
                user: process.env.MAIL_SMTP_EMAIL,
                pass: process.env.MAIL_SMTP_PASS,
            },
            pool: true,
            //maxConnections: 3,
            socketTimeout: 10000,
            logger: false,
            debug: false,
            tls: {
                rejectUnauthorized: false,
            },
        });
    }

    async onModuleInit() {
        await this.connectWithRetry();
    }

    private async connectWithRetry(retryCount = 0): Promise<void> {
        try {
            await this.transporter.verify();
        } catch (error) {
            console.error(
                `Connection attempt ${retryCount + 1} failed:`,
                error.message,
            );

            if (retryCount < this.MAX_RETRIES) {
                await new Promise((resolve) => setTimeout(resolve, this.RETRY_DELAY));
                this.initializeTransporter();
                return this.connectWithRetry(retryCount + 1);
            }
            throw new Error(`Failed to connect after ${this.MAX_RETRIES} attempts`);
        }
    }

    private async sendMailWithRetry(
        mailOptions: SendMailOptions,
        retryCount = 0,
    ): Promise<any> {
        try {
            return await this.transporter.sendMail(mailOptions);
        } catch (error) {
            if (
                retryCount < this.MAX_RETRIES &&
                (error.code === "ETIMEDOUT" || error.code === "ECONNECTION")
            ) {
                await new Promise((resolve) => setTimeout(resolve, this.RETRY_DELAY));
                return this.sendMailWithRetry(mailOptions, retryCount + 1);
            }
            throw error;
        }
    }

    /**
     * Отправляет электронное письмо, используя react-email шаблон
     * @param sendEmailDto Данные для отправки письма
     * @returns true если письмо успешно отправлено, иначе false
     */
    async send(template: ComponentType<any>, subject: string, dto: any): Promise<boolean> {
        try {
            // Создаем элемент React и рендерим шаблон с данными
            const element = React.createElement(template, { dto });
            const emailHtml = await render(element);

            const mailOptions: SendMailOptions = {
                from: `"${process.env.FRONT_NAME}" <${process.env.MAIL_SMTP_EMAIL}>`,
                to: dto.to,
                subject: subject,
                html: emailHtml,
            }; 

            await this.sendMailWithRetry(mailOptions);

            return true;
        } catch (error) {
            return false;
        }
    }
} 