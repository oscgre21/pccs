/**
 * Donation Service - Database operations for donations
 */

import { prisma } from './prisma';
import { PaymentStatus, Donation, DonationType } from '@prisma/client';

export interface CreateDonationInput {
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  comment?: string;
  amount: number;
  orderNumber: string;
  donationTypeId: string;
}

export interface UpdateDonationStatusInput {
  orderNumber: string;
  status: PaymentStatus;
  authorizationCode?: string;
  azulOrderId?: string;
  rrn?: string;
  isoCode?: string;
  responseCode?: string;
  responseMessage?: string;
  errorDescription?: string;
  validationErrors?: string[];
  rawAzulResponse?: Record<string, any>;
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
      reason: 'Donation initiated',
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
  const timestampUpdate: any = {};
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
      authorizationCode: input.authorizationCode,
      azulOrderId: input.azulOrderId,
      rrn: input.rrn,
      isoCode: input.isoCode,
      responseCode: input.responseCode,
      responseMessage: input.responseMessage,
      errorDescription: input.errorDescription,
      validationErrors: input.validationErrors || [],
      rawAzulResponse: input.rawAzulResponse,
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
      metadata: input.rawAzulResponse,
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
