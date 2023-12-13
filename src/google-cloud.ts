import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

export const SECRET_MANAGER = new SecretManagerServiceClient();

export const retrieveSecret = async (secretId: string) => {
  const [version] = await SECRET_MANAGER.accessSecretVersion({
    name: secretId,
  });
  return version.payload.data.toString();
};

export const loadDatabaseSecrets = async () => {
  return {
    DB_HOST: retrieveSecret(process.env.DB_HOST_SECRET),
    DB_NAME: retrieveSecret(process.env.DB_NAME_SECRET),
    DB_USER: retrieveSecret(process.env.DB_USER_SECRET),
    DB_PASS: retrieveSecret(process.env.DB_PASS_SECRET),
  };
};
