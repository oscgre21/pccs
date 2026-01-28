/**
 * Donation Service - Database operations for donations
 */

import { prisma } from './prisma';
import { PaymentStatus, PaymentProvider, DonationFrequency, Donation, DonationType } from '@prisma/client';

export interface CreateDonationInput {
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  comment?: string;
  amount: number;
  orderNumber: string;
  donationTypeId: string;
  // New fields for multi-provider support
  paymentProvider?: PaymentProvider;
  frequency?: DonationFrequency;
  stripeSessionId?: string;
}

export interface UpdateDonationStatusInput {
  orderNumber: string;
  status: PaymentStatus;
  // Azul-specific fields
  authorizationCode?: string;
  azulOrderId?: string;
  rrn?: string;
  isoCode?: string;
  // Stripe-specific fields
  stripePaymentIntentId?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  nextPaymentDate?: Date;
  // Common fields
  responseCode?: string;
  responseMessage?: string;
  errorDescription?: string;
  validationErrors?: string[];
  rawProviderResponse?: object;
}

/**
 * Create a new donation record with PENDING status
 */
export async function createDonation(
  input: CreateDonationInput
): Promise<Donation> {
  const donation = await prisma.donation.create({
    data: {
      donorName: input.donorName,
      donorEmail: input.donorEmail,
      donorPhone: input.donorPhone,
      comment: input.comment,
      amount: input.amount,
      orderNumber: input.orderNumber,
      donationTypeId: input.donationTypeId,
      status: PaymentStatus.PENDING,
      // Multi-provider support
      paymentProvider: input.paymentProvider || PaymentProvider.AZUL,
      frequency: input.frequency || DonationFrequency.ONE_TIME,
      stripeSessionId: input.stripeSessionId,
    },
    include: {
      donationType: true,
    },
  });

  // Create initial status history
  await prisma.paymentStatusHistory.create({
    data: {
      donationId: donation.id,
      newStatus: PaymentStatus.PENDING,
      reason: `Donation initiated via ${input.paymentProvider || 'AZUL'}`,
    },
  });

  return donation;
}

/**
 * Update donation status and create history record
 */
export async function updateDonationStatus(
  input: UpdateDonationStatusInput
): Promise<Donation> {
  const donation = await prisma.donation.findUnique({
    where: { orderNumber: input.orderNumber },
  });

  if (!donation) {
    throw new Error(`Donation not found: ${input.orderNumber}`);
  }

  const previousStatus = donation.status;

  // Determine timestamp field to update
  const timestampUpdate: Record<string, Date> = {};
  if (input.status === PaymentStatus.APPROVED) {
    timestampUpdate.approvedAt = new Date();
  } else if (input.status === PaymentStatus.DECLINED) {
    timestampUpdate.declinedAt = new Date();
  } else if (input.status === PaymentStatus.CANCELLED) {
    timestampUpdate.cancelledAt = new Date();
  }

  const updatedDonation = await prisma.donation.update({
    where: { orderNumber: input.orderNumber },
    data: {
      status: input.status,
      // Azul-specific fields
      authorizationCode: input.authorizationCode,
      azulOrderId: input.azulOrderId,
      rrn: input.rrn,
      isoCode: input.isoCode,
      // Stripe-specific fields
      stripePaymentIntentId: input.stripePaymentIntentId,
      stripeSubscriptionId: input.stripeSubscriptionId,
      stripeCustomerId: input.stripeCustomerId,
      nextPaymentDate: input.nextPaymentDate,
      // Common fields
      responseCode: input.responseCode,
      responseMessage: input.responseMessage,
      errorDescription: input.errorDescription,
      validationErrors: input.validationErrors || [],
      rawProviderResponse: input.rawProviderResponse as object | undefined,
      ...timestampUpdate,
    },
    include: {
      donationType: true,
    },
  });

  // Create status history record
  await prisma.paymentStatusHistory.create({
    data: {
      donationId: donation.id,
      previousStatus,
      newStatus: input.status,
      reason: input.responseMessage || input.errorDescription,
      metadata: input.rawProviderResponse as object | undefined,
    },
  });

  return updatedDonation;
}

/**
 * Get donation by ID
 */
export async function getDonationById(id: string) {
  return prisma.donation.findUnique({
    where: { id },
    include: {
      donationType: true,
      statusHistory: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

/**
 * Get donation by order number
 */
export async function getDonationByOrderNumber(orderNumber: string) {
  return prisma.donation.findUnique({
    where: { orderNumber },
    include: {
      donationType: true,
      statusHistory: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

/**
 * Get all donations with filtering
 */
export async function getDonations(params: {
  status?: PaymentStatus;
  donorEmail?: string;
  limit?: number;
  offset?: number;
}) {
  return prisma.donation.findMany({
    where: {
      status: params.status,
      donorEmail: params.donorEmail,
    },
    include: {
      donationType: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: params.limit,
    skip: params.offset,
  });
}

/**
 * Get or create donation types
 */
export async function ensureDonationTypes(): Promise<DonationType[]> {
  const types = [
    // Original donation types
    {
      name: 'School Supplies',
      description: 'Útiles Escolares',
      amount: 25.00,
    },
    {
      name: 'Sponsor a Child',
      description: 'Apadrinar un Niño',
      amount: 100.00,
    },
    {
      name: 'General Donation',
      description: 'Donación General',
      amount: 50.00,
    },
    {
      name: 'Infrastructure',
      description: 'Infraestructura',
      amount: 250.00,
    },
    {
      name: 'Scholarships',
      description: 'Becas',
      amount: 100.00,
    },
    // Sponsorship Impact Panel levels
    {
      name: 'School Materials',
      description: 'Provide essential school materials for students',
      amount: 50.00,
    },
    {
      name: 'School Meals',
      description: 'Feed students for one month',
      amount: 150.00,
    },
    {
      name: 'English & Technology Resources',
      description: 'Support language learning and technology access',
      amount: 500.00,
    },
    {
      name: 'Classroom Materials for a Year',
      description: 'Equip a classroom with necessary materials for an entire year',
      amount: 2000.00,
    },
    {
      name: 'Sponsor One Student (Full Year)',
      description: 'Cover all expenses for one student for a full academic year',
      amount: 7000.00,
    },
    {
      name: 'Sponsor One Teacher\'s Annual Salary',
      description: 'Support a qualified teacher for one year',
      amount: 18000.00,
    },
    {
      name: 'Build or Expand PCCS Schools',
      description: 'Major infrastructure development for PCCS schools in the Dominican Republic',
      amount: 100000.00,
    },
    // Student Service Payment Types
    {
      name: 'Student Inscription',
      description: 'Inscripción de Estudiante',
      amount: 0.00,
    },
    {
      name: 'Student Re-Inscription',
      description: 'Re-inscripción de Estudiante',
      amount: 0.00,
    },
    {
      name: 'Student Monthly Tuition',
      description: 'Mensualidad Escolar',
      amount: 0.00,
    },
  ];

  const results: DonationType[] = [];

  for (const type of types) {
    const upserted = await prisma.donationType.upsert({
      where: { name: type.name },
      update: {}, // Don't update existing records, only create new ones
      create: type,
    });
    results.push(upserted);
  }

  return results;
}

/**
 * Get all active donation types
 */
export async function getActiveDonationTypes(): Promise<DonationType[]> {
  return prisma.donationType.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  });
}

/**
 * Get donation type by service ID
 */
export async function getDonationTypeByServiceId(serviceId: string): Promise<DonationType | null> {
  const mapping: Record<string, string> = {
    'inscription': 'Student Inscription',
    'reInscription': 'Student Re-Inscription',
    'monthlyTuition': 'Student Monthly Tuition',
  };

  const typeName = mapping[serviceId];
  if (!typeName) return null;

  return prisma.donationType.findUnique({
    where: { name: typeName },
  });
}

/**
 * Get donation by Stripe Session ID
 */
export async function getDonationByStripeSessionId(sessionId: string) {
  return prisma.donation.findFirst({
    where: { stripeSessionId: sessionId },
    include: {
      donationType: true,
      statusHistory: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

/**
 * Get donation by Stripe Payment Intent ID
 */
export async function getDonationByStripePaymentIntent(paymentIntentId: string) {
  return prisma.donation.findUnique({
    where: { stripePaymentIntentId: paymentIntentId },
    include: {
      donationType: true,
      statusHistory: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

/**
 * Get donation by Stripe Subscription ID
 */
export async function getDonationByStripeSubscription(subscriptionId: string) {
  return prisma.donation.findUnique({
    where: { stripeSubscriptionId: subscriptionId },
    include: {
      donationType: true,
      statusHistory: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

/**
 * Get donations by payment provider
 */
export async function getDonationsByProvider(params: {
  provider: PaymentProvider;
  status?: PaymentStatus;
  limit?: number;
  offset?: number;
}) {
  return prisma.donation.findMany({
    where: {
      paymentProvider: params.provider,
      status: params.status,
    },
    include: {
      donationType: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: params.limit,
    skip: params.offset,
  });
}
