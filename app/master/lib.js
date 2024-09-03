"use server";
import axios from "axios";
import { SuccessMessage, ErrorMessage } from "@/globals/swal";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { MASTER_AUTH } from "@/globals/ENDPOINTS";

const secretKey = "AIAHKINS123";
const key = new TextEncoder().encode(secretKey);

export async function encrpyt(item) {
  return await new SignJWT(item)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function login(username, password) {
  try {
    const res = await axios.get(MASTER_AUTH, {
      params: {
        operation: "login",
        json: JSON.stringify({
          username: username,
          password: password,
        }),
      },
    });

    console.log("Called master_login");

    if (res.status === 200) {
      if (res.data !== null && res.data.success) {
        const userData = {
          firstname: res.data.success.m_name,
          lastname: res.data.success.m_lname,
          email: res.data.success.m_email,
          username: res.data.success.m_uname,
          user_id: res.data.success.mid,
          image: res.data.success.user_image,
        };

        const expiration = new Date(Date.now() + 5000 * 60 * 1000);
        const session = await encrpyt({ user: userData, expiration });

        cookies().set("session", session, {
          expires: expiration,
          httpOnly: true,
        });
        return { success: true, message: "Login successful" };
      } else {
        console.log("Error?");
        return { success: false, message: JSON.stringify(res.data.error) };
      }
    } else {
      return { success: false, message: res.statusText };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Oopps something is not right" };
  }
}

export async function getSession() {
  const session = cookies().get("session")?.value;

  if (!session) {
    return null;
  }

  return await decrypt(session);
}

export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;

  if (!session) {
    return null;
  }

  const parsedData = await decrypt(session);

  parsedData.exp = new Date(Date.now() + 10 * 1000);

  const res = NextResponse.next();

  res.cookies.set({
    name: "session",
    value: await encrpyt(parsedData),
    httpOnly: true,
    expires: parsedData.exp,
  });

  return res;
}

export async function logout() {
  cookies().set("session", "", { maxAge: -1, path: "/" });

  return {
    redirect: {
      destination: "/master",
      permanent: false,
    },
  };
}
