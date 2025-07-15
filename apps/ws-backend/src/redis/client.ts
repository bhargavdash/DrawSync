import { Redis } from 'ioredis'


const redis = new Redis("rediss://default:AYZAAAIjcDFkZTFlZDEwNjJjYmE0NzQzOGFiYWU0MzI5MzI2ZjhkNHAxMA@right-ray-34368.upstash.io:6379");

const pub = new Redis("rediss://default:AYZAAAIjcDFkZTFlZDEwNjJjYmE0NzQzOGFiYWU0MzI5MzI2ZjhkNHAxMA@right-ray-34368.upstash.io:6379");

const sub = new Redis("rediss://default:AYZAAAIjcDFkZTFlZDEwNjJjYmE0NzQzOGFiYWU0MzI5MzI2ZjhkNHAxMA@right-ray-34368.upstash.io:6379");

pub.on("connect", () => console.log("Redis Pub client is connected"))
sub.on("connect", () => console.log("Redis Sub client is connected"))

redis.on("connect", () => console.log("Redis Main client is connected"))

export default {redis, pub, sub}