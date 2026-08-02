import { FileText, ShieldCheck, Wrench, AlertTriangle, CreditCard, Scale } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Terms")({
  component: TermsPage,
});

 function TermsPage() {
  const updated = "August 2, 2026";

  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content:
        "By accessing or using Magnetic Repair, you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use our website or services.",
    },
    {
      icon: Wrench,
      title: "Repair Services",
      content:
        "Repair estimates are provided in good faith but may change after a full diagnosis. We will contact you before carrying out any additional repairs that increase the quoted price.",
    },
    {
      icon: CreditCard,
      title: "Payments",
      content:
        "Payments may be made using supported payment methods including M-Pesa, bank transfer, card payments, or cash where applicable. Devices may remain in our possession until outstanding balances are cleared.",
    },
    {
      icon: ShieldCheck,
      title: "Warranty",
      content:
        "Unless otherwise stated, repairs include a standard 30-day workmanship warranty covering the repaired component only. Physical damage, liquid damage, misuse, software modifications, or unrelated faults are not covered.",
    },
    {
      icon: AlertTriangle,
      title: "Customer Responsibilities",
      content:
        "Customers are responsible for backing up their data before submitting a device for repair. Magnetic Repair is not liable for data loss that may occur during diagnostics or repair.",
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      content:
        "To the maximum extent permitted by law, Magnetic Repair shall not be liable for indirect, incidental, or consequential damages arising from the use of our services.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <FileText className="h-10 w-10 text-green-500" />
          </div>

          <h1 className="text-5xl font-bold">Terms of Service</h1>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using Magnetic Repair's
            website, repair services, or customer portal.
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            Last Updated: {updated}
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <div
                key={section.title}
                className="rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-green-500/10 p-3">
                    <Icon className="h-6 w-6 text-green-500" />
                  </div>

                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>

                <p className="leading-7 text-muted-foreground">
                  {section.content}
                </p>
              </div>
            );
          })}

          <div className="rounded-2xl border bg-green-500/5 p-6">
            <h2 className="mb-3 text-xl font-semibold">
              Device Collection
            </h2>

            <p className="text-muted-foreground leading-7">
              Customers are encouraged to collect completed repairs promptly.
              Devices left uncollected for an extended period may incur storage
              charges where permitted by law. We will make reasonable attempts
              to contact the customer before taking further action.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-3 text-xl font-semibold">
              Contact
            </h2>

            <p className="text-muted-foreground">
              Questions regarding these Terms may be submitted through the
              Contact page or by emailing your official support address.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}