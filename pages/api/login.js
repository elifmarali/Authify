import { initMongoose } from "../../libs/mongoose";
import Users from "../../models/User";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

const getUser = async (email, password) => {
  try {
    const user = await Users.findOne({ email }).exec();
    if (!user) return null;

    // Şifreyi bcrypt ile doğrulama
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  } catch (error) {
    console.error("MongoDB hata:", error);
    return null;
  }
};

export default async function POST(req, res) {
  try {
    await initMongoose();

    // Tam URL oluştur
    const referer = req.headers.referer || `http://${req.headers.host}${req.url}`;
    const fullUrl = new URL(referer);
    const nextUrl = fullUrl.searchParams.get("next") || "/"; // Default yönlendirme URL'si

    const { email, password } = req.body;
    const currentUser = await getUser(email, password);

    if (!currentUser) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const token = await new SignJWT({
      name: currentUser.name,
      surname: currentUser.surname,
      username: currentUser.username,
      email: currentUser.email,
      password: currentUser.password,
      role: currentUser.role,
      admin: currentUser.admin,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7200s")
      .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET_KEY));

    // Cookie'yi ekleyelim
    res.setHeader(
      "Set-Cookie",
      `token=${token}; Path=/; Max-Age=7200; Secure=${
        process.env.NODE_ENV === "production"
      }; SameSite=Strict`
    );

    // Yönlendirme URL'sini JSON yanıtında döndür
    return res.status(200).json({
      message: "Login successful",
      token,
      success: true,
      redirect: nextUrl, // Yönlendirme URL'sini buradan dönüyoruz
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}
