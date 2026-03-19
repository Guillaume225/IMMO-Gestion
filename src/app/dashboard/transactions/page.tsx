"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Search, TrendingUp, FileText, DollarSign } from "lucide-react";

type Transaction = {
  id: string;
  bien: string;
  contact: string;
  agent: string;
  type: string;
  stage: string;
  prixDemande: number;
  prixFinal: number | null;
  commission: number | null;
  dateMandat: string;
};

const mockTransactions: Transaction[] = [
  { id: "1", bien: "Villa Almadies", contact: "Aissatou Ba", agent: "Agent Diop", type: "VENTE", stage: "OFFRE_ACHAT", prixDemande: 185000000, prixFinal: null, commission: null, dateMandat: "2026-01-15" },
  { id: "2", bien: "Apt F4 Mermoz", contact: "Amadou Diallo", agent: "Agent Sall", type: "VENTE", stage: "COMPROMIS", prixDemande: 65000000, prixFinal: 62000000, commission: 3100000, dateMandat: "2025-12-01" },
  { id: "3", bien: "Terrain Diamniadio", contact: "Moussa Sow", agent: "Agent Ba", type: "VENTE", stage: "ACTE_FINAL", prixDemande: 25000000, prixFinal: 25000000, commission: 1250000, dateMandat: "2025-10-15" },
  { id: "4", bien: "Maison R+1 Thiès", contact: "Ibrahima Fall", agent: "Agent Diop", type: "VENTE", stage: "VISITES", prixDemande: 45000000, prixFinal: null, commission: null, dateMandat: "2026-02-20" },
  { id: "5", bien: "Immeuble Grand Yoff", contact: "Seydou Traore", agent: "Agent Sall", type: "VENTE", stage: "MANDAT_RECU", prixDemande: 320000000, prixFinal: null, commission: null, dateMandat: "2026-03-10" },
];

const stageLabels: Record<string, string> = {
  MANDAT_RECU: "Mandat reçu",
  VISITES: "Visites",
  OFFRE_ACHAT: "Offre d'achat",
  COMPROMIS: "Compromis",
  ACTE_FINAL: "Acte final",
  ANNULEE: "Annulée",
};

const stageColors: Record<string, string> = {
  MANDAT_RECU: "bg-gray-100 border-gray-300",
  VISITES: "bg-navy-50 border-navy-200",
  OFFRE_ACHAT: "bg-yellow-100 border-yellow-300",
  COMPROMIS: "bg-orange-100 border-orange-300",
  ACTE_FINAL: "bg-green-100 border-green-300",
  ANNULEE: "bg-red-100 border-red-300",
};

const stageVariants: Record<string, "default" | "secondary" | "destructive" | "success" | "warning"> = {
  MANDAT_RECU: "secondary",
  VISITES: "default",
  OFFRE_ACHAT: "warning",
  COMPROMIS: "warning",
  ACTE_FINAL: "success",
  ANNULEE: "destructive",
};

function formatPrice(n: number) { return new Intl.NumberFormat("fr-FR").format(n); }

export default function TransactionsPage() {
  const [transactions] = useState(mockTransactions);
  const [search, setSearch] = useState("");

  const stages = ["MANDAT_RECU", "VISITES", "OFFRE_ACHAT", "COMPROMIS", "ACTE_FINAL"];

  const caRealise = transactions
    .filter((t) => t.stage === "ACTE_FINAL" && t.commission)
    .reduce((s, t) => s + (t.commission || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions & Ventes</h1>
          <p className="text-muted-foreground">Suivi du cycle de vente de vos mandats</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Nouvelle transaction</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-navy-50"><FileText className="h-5 w-5 text-navy-500" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Mandats en cours</p>
              <p className="text-2xl font-bold">{transactions.filter((t) => t.stage !== "ACTE_FINAL" && t.stage !== "ANNULEE").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100"><TrendingUp className="h-5 w-5 text-green-600" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Ventes conclues</p>
              <p className="text-2xl font-bold">{transactions.filter((t) => t.stage === "ACTE_FINAL").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100"><DollarSign className="h-5 w-5 text-orange-600" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Commissions réalisées</p>
              <p className="text-2xl font-bold">{formatPrice(caRealise)} FCFA</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline de vente visuel */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Pipeline de vente</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3">
            {stages.map((stage) => {
              const items = transactions.filter((t) => t.stage === stage);
              return (
                <div key={stage} className={`rounded-lg border-2 border-dashed p-3 min-h-[300px] ${stageColors[stage]}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm">{stageLabels[stage]}</h3>
                    <Badge variant="secondary" className="text-xs">{items.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {items.map((tx) => (
                      <div key={tx.id} className="bg-white dark:bg-gray-900 rounded-lg border p-3 shadow-sm">
                        <p className="font-medium text-sm">{tx.bien}</p>
                        <p className="text-xs text-muted-foreground">{tx.contact}</p>
                        <p className="text-sm font-bold text-primary mt-1">{formatPrice(tx.prixDemande)} FCFA</p>
                        <p className="text-[11px] text-muted-foreground mt-1">{tx.agent}</p>
                      </div>
                    ))}
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
