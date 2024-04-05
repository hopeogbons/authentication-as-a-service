import Redis from "ioredis"

require("dotenv").config()

const host: string = process.env.REDIS_HOST!
const port: number = Number(process.env.REDIS_PORT)!

// Set up Redis connection to your Redis database
export let redisClient: Redis
export const initializeRedis = () => {
  redisClient = new Redis({
    host,
    port,
  })
  redisClient.on("error", (error) => {
    console.error("Redis Connection Error:", error)
    process.exit(1)
  })
  console.log(`Redis Connected: ${host}:${port}`)
}
