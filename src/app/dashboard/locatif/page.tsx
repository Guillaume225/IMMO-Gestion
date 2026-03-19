"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Home,
  Wrench,
  Receipt,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { title: "Baux actifs", value: "54", icon: FileText, color: "text-navy-500", bg: "bg-navy-50" },
  { title: "Loyers du mois", value: "16 200 000 FCFA", icon: Receipt, color: "text-green-600", bg: "bg-green-100" },
  { title: "Impayés", value: "1 850 000 FCFA", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
  { title: "Travaux en cours", value: "7", icon: Wrench, color: "text-orange-600", bg: "bg-orange-100" },
];

const recentPayments = [
  { tenant: "Amadou Diallo", bien: "Apt F3 Sacré-Cœur", amount: "250 000 FCFA", status: "PAYEE", date: "15/03/2026" },
  { tenant: "Fatou Ndiaye", bien: "Studio Plateau", amount: "150 000 FCFA", status: "PAYEE", date: "14/03/2026" },
  { tenant: "Ousmane Kane", bien: "Apt F4 Mermoz", amount: "350 000 FCFA", status: "RETARD", date: "01/03/2026" },
  { tenant: "Khady Mbaye", bien: "Local Médina", amount: "500 000 FCFA", status: "EN_ATTENTE", date: "01/03/2026" },
  { tenant: "Seydou Traore", bien: "Villa Almadies", amount: "800 000 FCFA", status: "PAYEE", date: "12/03/2026" },
];

const upcomingBailEvents = [
  { type: "Renouvellement", bien: "Apt 201 Sacré-Cœur", date: "25/03/2026", urgency: "haute" },
  { type: "Fin de bail", bien: "Studio Plateau", date: "01/04/2026", urgency: "moyenne" },
  { type: "Révision loyer", bien: "Local Médina", date: "15/04/2026", urgency: "basse" },
  { type: "État des lieux sortie", bien: "Apt F2 Grand Yoff", date: "30/03/2026", urgency: "haute" },
];

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "destructive" | "secondary" }> = {
  PAYEE: { label: "Payé", variant: "success" },
  EN_ATTENTE: { label: "En attente", variant: "secondary" },
  RETARD: { label: "Retard", variant: "destructive" },
  IMPAYEE: { label: "Impayé", variant: "destructive" },
};

export default function LocatifPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion locative</h1>
          <p className="text-muted-foreground">Vue d&apos;ensemble de votre activité locative</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/locatif/baux">
            <Button variant="outline">Gérer les baux</Button>
          </Link>
          <Link href="/dashboard/locatif/quittances">
            <Button>Quittances du mois</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Derniers paiements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPayments.map((p, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium text-sm">{p.tenant}</p>
                    <p className="text-xs text-muted-foreground">{p.bien}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{p.amount}</p>
                    <Badge variant={statusConfig[p.status].variant} className="text-[10px]">
                      {statusConfig[p.status].label}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Échéances à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingBailEvents.map((e, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      e.urgency === "haute" ? "bg-red-500" : e.urgency === "moyenne" ? "bg-yellow-500" : "bg-green-500"
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{e.type}</p>
                      <p className="text-xs text-muted-foreground">{e.bien}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{e.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Taux d'occupation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Taux d&apos;occupation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Résidence Les Palmiers", occupied: 18, total: 20 },
              { name: "Immeuble Grand Yoff", occupied: 7, total: 8 },
              { name: "Résidence Océan", occupied: 12, total: 15 },
              { name: "Biens individuels", occupied: 11, total: 14 },
            ].map((r) => {
              const rate = Math.round((r.occupied / r.total) * 100);
              return (
                <div key={r.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{r.name}</span>
                    <span className="text-muted-foreground">{r.occupied}/{r.total} ({rate}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${rate >= 90 ? "bg-green-500" : rate >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
