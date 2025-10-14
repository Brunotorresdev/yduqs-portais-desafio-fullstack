import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from '@prisma/client';

type ClientInput = CreateClientDto & {
  accepted_terms: boolean;
  accepted_whatsapp_updates: boolean;
};

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(clientData: ClientInput): Promise<Client> {
    const existingClient = await this.prisma.client.findUnique({
      where: { identifier: clientData.identifier },
    });

    if (existingClient) {
      return existingClient;
    }

    return this.prisma.client.create({
      data: clientData,
    });
  }
}