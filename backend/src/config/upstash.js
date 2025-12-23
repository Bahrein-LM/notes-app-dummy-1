import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from 'dotenv';

dotenv.config();

// this file to handle rate limit that related to "UPSTASH"

// create a ratelimiter that allows 10 request per-20s
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(), // with "Redis" features by accessing the "fromEnv", automatically detect the variabel from env files of what it needs
    limiter: Ratelimit.slidingWindow(10, "20 s"), // setup the ratelimit 
}) 

export default rateLimit;