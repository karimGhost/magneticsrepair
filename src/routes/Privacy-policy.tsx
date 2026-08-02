import {
  Lock,
  Database,
  User,
  Bell,
  Shield,
  Eye,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Privacy-policy")({
  component: PrivacyPolicyPage,
});

  function PrivacyPolicyPage() {
  const updated = "August 2, 2026";

  const items = [
    {
      icon: User,
      title: "Information We Collect",
      text:
        "We may collect your name, email address, phone number, account information, repair details, messages, uploaded files or photos, and payment-related information required to provide our services.",
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      text:
        "Your information is used to create accounts, manage repair requests, communicate repair updates, process payments, improve our services, provide AI-powered assistance, and comply with legal obligations.",
    },
    {
      icon: Shield,
      title: "Data Security",
      text:
        "We implement reasonable technical and organizational safeguards to protect your information from unauthorized access, alteration, or disclosure.",
    },
    {
      icon: Bell,
      title: "Notifications",
      text:
        "We may send service updates, repair notifications, appointment reminders, security alerts, and account-related communications.",
    },
    {
      icon: Eye,
      title: "Your Rights",
      text:
        "You may request access to your personal information, request corrections, or request deletion of your account where legally permitted.",
    },
    {
      icon: Lock,
      title: "Cookies",
      text:
        "We may use cookies and similar technologies to improve website functionality, maintain sessions, analyze usage, and enhance user experience.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <Shield className="h-10 w-10 text-green-500" />
          </div>

          <h1 className="text-5xl font-bold">
            Privacy Policy
          </h1>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Your privacy matters. This policy explains what information we
            collect, why we collect it, and how we protect it.
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            Last Updated: {updated}
          </p>
        </div>

        <div className="space-y-6">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-green-500/10 p-3">
                    <Icon className="h-6 w-6 text-green-500" />
                  </div>

                  <h2 className="text-xl font-semibold">
                    {item.title}
                  </h2>
                </div>

                <p className="leading-7 text-muted-foreground">
                  {item.text}
                </p>
              </div>
            );
          })}

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-3 text-xl font-semibold">
              Third-Party Services
            </h2>

            <p className="text-muted-foreground leading-7">
              Our platform may use trusted third-party providers including
              Supabase for authentication and data storage, Google Sign-In for
              authentication, payment providers such as M-Pesa or card payment
              services where enabled, and AI services to assist users with
              repair-related questions.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-3 text-xl font-semibold">
              Changes to this Policy
            </h2>

            <p className="text-muted-foreground leading-7">
              We may update this Privacy Policy periodically. Continued use of
              our services after changes become effective constitutes acceptance
              of the revised policy.
            </p>
          </div>

          <div className="rounded-2xl border bg-green-500/5 p-6">
            <h2 className="mb-3 text-xl font-semibold">
              Contact Us
            </h2>

            <p className="text-muted-foreground">
              If you have questions regarding this Privacy Policy or your
              personal information, please contact Magnetic Repair using the
              contact details provided within the application.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}