import 'dotenv/config'
import { createTransport } from 'nodemailer'
import {z} from 'zod'

const emailCredentialSchema = z.object({
  host: z.string(),
  port: z.number(),
  username: z.string(),
  password: z.string(),
  clientId: z.string(),
  clientSecret: z.string(),
  refreshToken: z.string(),
  accessToken: z.string(),
})


async function main() {
  try { 
    const emailCredential = emailCredentialSchema.parse({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      username: process.env.SMTP_USERNAME,
      password: process.env.SMTP_PASSWORD,
      clientId: process.env.OAUTH2_CLIENT_ID,
      clientSecret: process.env.OAUTH2_CLIENT_SECRET,
      refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
      accessToken: process.env.OAUTH2_ACCESS_TOKEN,
    }) 

    const transporter = createTransport({ 
      service: 'Office365',
      host: emailCredential.host,
      port: emailCredential.port,
      secure: false,
      auth: {
        type: 'OAuth2',
        user: emailCredential.username,
        clientId: emailCredential.clientId,
        clientSecret: emailCredential.clientSecret,
        refreshToken: emailCredential.refreshToken,
        accessToken: emailCredential.accessToken,
      }
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
