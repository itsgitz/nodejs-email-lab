import 'dotenv/config'
import { createTransport } from 'nodemailer'
import {z} from 'zod'

const emailCredentialSchema = z.object({
  host: z.string(),
  port: z.number(),
  username: z.string(),
  password: z.string(),
})


async function main() {
  try { 
    const emailCredential = emailCredentialSchema.parse({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      username: process.env.SMTP_USERNAME,
      password: process.env.SMTP_PASSWORD,
    }) 

    console.log(emailCredential)

    const transporter = createTransport({ 
      host: emailCredential.host,
      port: emailCredential.port,
      secure: false,
      auth: {
        user: emailCredential.username,
        pass: emailCredential.password,
      },
      tls: {
        ciphers: 'SSLv3'
      },
      logger: true,
      debug: true
    })

    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });


    const info = await transporter.sendMail({
      from: emailCredential.username,
      to: ['anggit.ginanjar.dev@gmail.com', 'anggitmg.tkjb@gmail.com', 'galih@finnet.co.id'].join(','),
      subject: 'Hello hello hello!!!!!!',
      text: 'Hello!',
      html: '<h1>Hello! SMTP AUTHENTICATED!</h1>'
    })

    console.log(`message sent: ${info.messageId}`)
  } catch (err) {
    console.log(err)
  }
}

main()
