"use server";
import { cookies } from "next/headers";

export const logOut = async () => {
  cookies().set("token", "");
};
