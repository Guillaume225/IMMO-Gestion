import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bienSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  type: z.enum(["APPARTEMENT", "MAISON", "VILLA", "LOCAL_COMMERCIAL", "TERRAIN", "IMMEUBLE", "BUREAU", "STUDIO"]),
  transactionType: z.enum(["VENTE", "LOCATION", "LOCATION_VENTE", "VIAGER"]),
  price: z.number().min(0),
  surface: z.number().min(0).optional(),
  rooms: z.number().int().min(0).optional(),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().int().min(0).optional(),
  floor: z.number().int().optional(),
  totalFloors: z.number().int().optional(),
  address: z.string().min(1).max(500),
  city: z.string().min(1).max(100),
  postalCode: z.string().max(20).optional(),
  country: z.string().max(100).default("Sénégal"),
  proprietaireId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.tenantId) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const transactionType = searchParams.get("transactionType");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

    const where: any = { tenantId: session.user.tenantId };
    if (type) where.type = type;
    if (status) where.status = status;
    if (transactionType) where.transactionType = transactionType;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { reference: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
      ];
    }

    const [biens, total] = await Promise.all([
      prisma.bien.findMany({
        where,
        include: { proprietaire: { select: { firstName: true, lastName: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.bien.count({ where }),
    ]);

    return NextResponse.json({ biens, total, page, limit });
  } catch (error) {
    console.error("GET /api/biens error:", error);
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
    const data = bienSchema.parse(body);

    // Generate unique reference
    const count = await prisma.bien.count({ where: { tenantId: session.user.tenantId } });
    const reference = `BN-${String(count + 1).padStart(4, "0")}`;

    const bien = await prisma.bien.create({
      data: {
        ...data,
        reference,
        tenantId: session.user.tenantId,
      },
    });

    return NextResponse.json(bien, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.errors }, { status: 400 });
    }
    console.error("POST /api/biens error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
