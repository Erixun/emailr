const validateEmails = (emailCsv: string): string | false => {
  const emails = emailCsv.split(",").map((email) => email.trim());
  const invalidEmails = emails.filter((email) => !validateEmail(email));
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
  return false;
};

const validateEmail = (email: string) => {
  // regex for email validation, \S+ means one or more non-whitespace characters
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export default validateEmails;
