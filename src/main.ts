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

    const transporter = createTransport({ 
      host: emailCredential.host,
      port: emailCredential.port,
      secure: false,
      auth: {
        user: emailCredential.username,
        pass: emailCredential.password,
      }
    })

    const info = await transporter.sendMail({
      from: emailCredential.username,
      to: ['anggit.ginanjar.dev@gmail.com', 'anggitmg.tkjb@gmail.com'].join(','),
      subject: 'Hello hello hello!!!!!!',
      text: 'Hello!',
      html: '<h1>Hello!</h1>'
    })

    console.log(`message sent: ${info.messageId}`)
  } catch (err) {
    console.log(err)
  }
}

main()
