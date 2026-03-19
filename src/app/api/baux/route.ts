import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bailSchema = z.object({
  type: z.enum(["NU", "MEUBLE", "COMMERCIAL", "SAISONNIER"]),
  dateDebut: z.string().transform((s) => new Date(s)),
  dateFin: z.string().optional().transform((s) => (s ? new Date(s) : undefined)),
  loyerMensuel: z.number().min(0),
  charges: z.number().min(0).default(0),
  depotGarantie: z.number().min(0).default(0),
  jourPaiement: z.number().int().min(1).max(31).default(1),
  bienId: z.string().min(1),
  locataireId: z.string().min(1),
  proprietaireId: z.string().min(1),
  notesSpeciales: z.string().max(5000).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.tenantId) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const bienId = searchParams.get("bienId");

    const where: any = { tenantId: session.user.tenantId };
    if (status) where.status = status;
    if (bienId) where.bienId = bienId;

    const baux = await prisma.bail.findMany({
      where,
      include: {
        bien: { select: { title: true, reference: true, address: true } },
        locataire: { select: { firstName: true, lastName: true, email: true, phone: true } },
        proprietaire: { select: { firstName: true, lastName: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(baux);
  } catch (error) {
    console.error("GET /api/baux error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.tenantId) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();
    const data = bailSchema.parse(body);

    // Verify that bien, locataire and proprietaire belong to same tenant
    const [bien, locataire, proprietaire] = await Promise.all([
      prisma.bien.findFirst({ where: { id: data.bienId, tenantId: session.user.tenantId } }),
      prisma.contact.findFirst({ where: { id: data.locataireId, tenantId: session.user.tenantId } }),
      prisma.contact.findFirst({ where: { id: data.proprietaireId, tenantId: session.user.tenantId } }),
    ]);

    if (!bien || !locataire || !proprietaire) {
      return NextResponse.json({ error: "Bien, locataire ou propriétaire non trouvé" }, { status: 404 });
    }

    const bail = await prisma.bail.create({
      data: {
        ...data,
        tenantId: session.user.tenantId,
      },
    });

    // Update bien status to LOUE
    await prisma.bien.update({
      where: { id: data.bienId },
      data: { status: "LOUE" },
    });

    return NextResponse.json(bail, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.errors }, { status: 400 });
    }
    console.error("POST /api/baux error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
