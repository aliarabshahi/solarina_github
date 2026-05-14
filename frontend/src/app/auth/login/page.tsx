// login/page.tsx

import LoginForm from "../components/LoginForm";
import AuthBanner from "../components/AuthBanner";

export default function LoginPage() {
  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        flex
      "
    >
      <AuthBanner />

      <div
        className="
          flex-1
          flex
          items-center
          justify-center
          px-6
          py-10
        "
      >
        <LoginForm />
      </div>
    </div>
  );
}
