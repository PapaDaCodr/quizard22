import { auth } from "@clerk/nextjs/server"

const adminIds = [
  "user_2jjxH3U6PB11mk13H0bIpAHbWAC",
  "user_2mLr5UX10wNDBcbbveiIi7QuwGP",
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
