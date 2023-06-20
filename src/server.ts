import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

main().catch(err => errorLogger.error(err))

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Server is connected succeflly')

    app.listen(config.port, () => {
      logger.info('server is running on the ', config.port)
    })
  } catch (err) {
    errorLogger.error('Server not connected', err)
  }
}
