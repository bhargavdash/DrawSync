import { Redis } from 'ioredis'

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379"

const redis = new Redis(REDIS_URL);

const pub = new Redis(REDIS_URL);

const sub = new Redis(REDIS_URL);

pub.on("connect", () => console.log("Redis Pub client is connected"))
sub.on("connect", () => console.log("Redis Sub client is connected"))

redis.on("connect", () => console.log("Redis Main client is connected"))

export default {redis, pub, sub}