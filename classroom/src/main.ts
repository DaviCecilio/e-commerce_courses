import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import appConfig from '~configs/app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      },
    },
  })

  app.startAllMicroservices().then(() => {
    console.log('[Classroom] Microservice running ! ')
  })

  await app.listen(appConfig.port).then(() => {
    console.log('[Classroom] HTTP server running')
  })
}
bootstrap()
