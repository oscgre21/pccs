import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Processing - PCCS',
  description: 'Processing your donation payment',
};

export default function StripeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
