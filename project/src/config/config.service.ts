import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
    [prop: string]: string;
}

export class ConfigService {

    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    /**
     * validateInput
     *
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     *
     * @param {EnvConfig} envConfig
     * @returns {EnvConfig}
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {

        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),
            PORT: Joi.number().default(3000),
            MONGO_HOST: Joi.string().default('127.0.0.1'),
            MONGO_USER: Joi.string().default('root'),
            MONGO_PASS: Joi.string().default('q1w2e3r4'),
            MONGO_DATABASE: Joi.string().default('nest'),
            MONGO_PORT: Joi.number().default(27017),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;

    }// end validateInput

    /**
     * config
     * @returns {any}
     */
    get config(): any {
        return this.envConfig;
    }// end config

}