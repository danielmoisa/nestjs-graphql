import { ConfigFactory } from "@nestjs/config";

const configuration = {
    clientUrl: process.env.CLIENT_URL ?? "http://localshot:3000",
    jwtSecret: process.env.JWT_SECRET,
    apolloPlaygroundUrl: process.env.APOLLO_PLAYGROUND_URL,
    stripePrivateKey: process.env.STRIPE_PRIVATE_KEY,
}

const configFunction: ConfigFactory = () => configuration;
export default configFunction;