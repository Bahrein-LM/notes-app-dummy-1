
// this file is for specific handle how behaviour should do when the limit comes

import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

    try {
        const rateKey = req.ip || req.headers['x-forwarded-for'] || 'my-limit-key'; // set the fallback if "req.ip" or "req.headers" doesn't exist
        const { success } = await rateLimit.limit(rateKey);

        // console.log("Rate limit :", rateKey, success); // testing key if get read or not

        if (!success) {
            res.status(429).send({
                message: 'Too many requests, please try again later.'
            })
        }

        // use this to test if the rate limit features is active or not
        // console.log("Rate Limit Success: ", success);

        next();
    } catch (error) {
        console.log("Rate Limit Error: ", error);
        next(error);
    }
}

export default rateLimiter;