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
    database: {
      host: await retrieveSecret(process.env.DB_HOST_SECRET),
      name: await retrieveSecret(process.env.DB_NAME_SECRET),
      user: await retrieveSecret(process.env.DB_USER_SECRET),
      pass: await retrieveSecret(process.env.DB_PASS_SECRET),
    }
  };
};
