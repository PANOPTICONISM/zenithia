export const validateRecaptcha = async (token: string): Promise<boolean> => {
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${token}`,
    {
      method: "POST",
    }
  );

  const recaptchaData = await recaptchaResponse.json();
  return recaptchaData.success;
};
