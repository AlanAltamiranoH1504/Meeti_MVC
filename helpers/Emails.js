import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const confirmacionEmail = async (nombre, email, token) => {

    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    //Envio de email
    const year = new Date().getFullYear();

    await transport.sendMail({
        from: '"Meeti" <no-reply@meeti.com>',
        to: email,
        subject: "Confirma tu cuenta de Meeti",
        text: "Confirma tu cuenta de Meeti",
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50;">Hola ${nombre},</h2>
            <p>Gracias por registrarte en <strong>Meeti</strong>. Tu cuenta está casi lista.</p>
            <p>Solo necesitas confirmar tu cuenta haciendo clic en el siguiente botón:</p>
            <p style="text-align: center;">
                <a href="${process.env.RUTA_BACKEND}/auth/confirmar/${token}" 
                   style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                   Confirmar Cuenta
                </a>
            </p>
            <p style="margin-top: 30px;">Si tú no creaste esta cuenta, puedes ignorar este mensaje.</p>
            <p>¡Saludos!</p>
            <p><strong>Equipo Meeti</strong></p>

            <hr style="margin-top: 40px; margin-bottom: 20px; border: none; border-top: 1px solid #ccc;">
            <p style="font-size: 12px; color: #777; text-align: center;">
                &copy; ${year} Meeti. Todos los derechos reservados.
            </p>
        </div>
    `
    });
}
export {
    confirmacionEmail
}