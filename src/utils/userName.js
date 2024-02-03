export function getUserName() {
  const parsedArgument = process.argv[2]?.replace('--username=', '');
  const userName = parsedArgument? parsedArgument : "Unknown user";
  return userName;
}

