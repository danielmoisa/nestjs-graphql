import { ConfigFactory } from "@nestjs/config";

const configuration = {
    clientUrl: process.env.CLIENT_URL,
    apolloPlaygroundUrl: process.env.APOLLO_PLAYGROUND_URL,
    jwtSecret: process.env.JWT_SECRET,
    stripePrivateKey: process.env.STRIPE_PRIVATE_KEY,
}

const configFunction: ConfigFactory = () => configuration;
export default configFunction;