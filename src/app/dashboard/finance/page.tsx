"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp, TrendingDown, DollarSign, BarChart3,
  FileText, Download, ArrowUpRight, ArrowDownRight,
} from "lucide-react";

function fmt(n: number) { return new Intl.NumberFormat("fr-FR").format(n); }

const kpis = {
  caTotal: 48500000,
  caTrend: 12.5,
  commissions: 4350000,
  commissionsTrend: 8.2,
  loyersPerçus: 16200000,
  loyersTrend: -2.1,
  chargesRecouvrees: 9800000,
  chargesTrend: 15.3,
  tauxOccupation: 92,
  delaiMoyenVente: 45,
  tauxRecouvrement: 87,
};

const mockFactures = [
  { id: "F-2026-001", client: "M. Diop Abdoulaye", objet: "Honoraires gestion locative", montant: 150000, date: "2026-03-01", echeance: "2026-03-31", statut: "Payée" },
  { id: "F-2026-002", client: "Mme Ndiaye Fatou", objet: "Commission vente Villa Almadies", montant: 3100000, date: "2026-02-20", echeance: "2026-03-20", statut: "En attente" },
  { id: "F-2026-003", client: "SCI Sahel Invest", objet: "Honoraires syndic T1", montant: 480000, date: "2026-01-05", echeance: "2026-01-31", statut: "Payée" },
  { id: "F-2026-004", client: "M. Sow Ousmane", objet: "Frais état des lieux", montant: 75000, date: "2026-03-10", echeance: "2026-04-10", statut: "En retard" },
  { id: "F-2026-005", client: "Entreprise BTP Sénégal", objet: "Honoraires gestion locative", montant: 250000, date: "2026-03-15", echeance: "2026-04-15", statut: "En attente" },
];

const monthlyData = [
  { mois: "Oct 2025", revenus: 7200000, depenses: 3100000 },
  { mois: "Nov 2025", revenus: 8100000, depenses: 2800000 },
  { mois: "Déc 2025", revenus: 6500000, depenses: 4200000 },
  { mois: "Jan 2026", revenus: 9200000, depenses: 3600000 },
  { mois: "Fév 2026", revenus: 8800000, depenses: 2900000 },
  { mois: "Mar 2026", revenus: 8700000, depenses: 3200000 },
];

const depenseCategories = [
  { categorie: "Maintenance & Travaux", montant: 4800000, pct: 38 },
  { categorie: "Charges copropriété", montant: 3200000, pct: 25 },
  { categorie: "Assurances", montant: 1900000, pct: 15 },
  { categorie: "Frais administratifs", montant: 1500000, pct: 12 },
  { categorie: "Divers", montant: 1300000, pct: 10 },
];

export default function FinancePage() {
  const [periode, setPeriode] = useState("trimestre");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Finance & Reporting</h1>
          <p className="text-muted-foreground">Tableau de bord financier et facturation</p>
        </div>
        <div className="flex gap-2">
          <Select value={periode} onValueChange={setPeriode}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mois">Ce mois</SelectItem>
              <SelectItem value="trimestre">Ce trimestre</SelectItem>
              <SelectItem value="annee">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Exporter</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-green-100"><DollarSign className="h-5 w-5 text-green-600" /></div>
              <div className={`flex items-center text-sm ${kpis.caTrend > 0 ? "text-green-600" : "text-red-600"}`}>
                {kpis.caTrend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {Math.abs(kpis.caTrend)}%
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">{fmt(kpis.caTotal)} FCFA</p>
            <p className="text-sm text-muted-foreground">Chiffre d&apos;affaires total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-navy-50"><TrendingUp className="h-5 w-5 text-navy-500" /></div>
              <div className={`flex items-center text-sm ${kpis.commissionsTrend > 0 ? "text-green-600" : "text-red-600"}`}>
                {kpis.commissionsTrend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {Math.abs(kpis.commissionsTrend)}%
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">{fmt(kpis.commissions)} FCFA</p>
            <p className="text-sm text-muted-foreground">Commissions ventes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-orange-100"><BarChart3 className="h-5 w-5 text-orange-600" /></div>
              <div className={`flex items-center text-sm ${kpis.loyersTrend > 0 ? "text-green-600" : "text-red-600"}`}>
                {kpis.loyersTrend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {Math.abs(kpis.loyersTrend)}%
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">{fmt(kpis.loyersPerçus)} FCFA</p>
            <p className="text-sm text-muted-foreground">Loyers perçus</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-purple-100"><FileText className="h-5 w-5 text-purple-600" /></div>
              <div className={`flex items-center text-sm ${kpis.chargesTrend > 0 ? "text-green-600" : "text-red-600"}`}>
                {kpis.chargesTrend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {Math.abs(kpis.chargesTrend)}%
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">{fmt(kpis.chargesRecouvrees)} FCFA</p>
            <p className="text-sm text-muted-foreground">Charges recouvrées</p>
          </CardContent>
        </Card>
      </div>

      {/* Indicateurs clés */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-4xl font-bold text-primary">{kpis.tauxOccupation}%</p>
            <p className="text-sm text-muted-foreground mt-1">Taux d&apos;occupation</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${kpis.tauxOccupation}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-4xl font-bold text-primary">{kpis.delaiMoyenVente}j</p>
            <p className="text-sm text-muted-foreground mt-1">Délai moyen de vente</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-4xl font-bold text-primary">{kpis.tauxRecouvrement}%</p>
            <p className="text-sm text-muted-foreground mt-1">Taux de recouvrement</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${kpis.tauxRecouvrement}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenus">
        <TabsList>
          <TabsTrigger value="revenus">Revenus & Dépenses</TabsTrigger>
          <TabsTrigger value="factures">Factures</TabsTrigger>
          <TabsTrigger value="depenses">Ventilation dépenses</TabsTrigger>
        </TabsList>

        <TabsContent value="revenus" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Évolution mensuelle</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mois</TableHead>
                    <TableHead className="text-right">Revenus</TableHead>
                    <TableHead className="text-right">Dépenses</TableHead>
                    <TableHead className="text-right">Résultat net</TableHead>
                    <TableHead>Marge</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyData.map((m) => {
                    const net = m.revenus - m.depenses;
                    const marge = ((net / m.revenus) * 100).toFixed(1);
                    return (
                      <TableRow key={m.mois}>
                        <TableCell className="font-medium">{m.mois}</TableCell>
                        <TableCell className="text-right text-green-600">{fmt(m.revenus)} FCFA</TableCell>
                        <TableCell className="text-right text-red-600">{fmt(m.depenses)} FCFA</TableCell>
                        <TableCell className="text-right font-bold">{fmt(net)} FCFA</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${marge}%` }} />
                            </div>
                            <span className="text-sm text-muted-foreground">{marge}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factures" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Factures</CardTitle>
                <Button size="sm"><FileText className="h-4 w-4 mr-2" />Nouvelle facture</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Numéro</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Objet</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFactures.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className="font-medium">{f.id}</TableCell>
                      <TableCell>{f.client}</TableCell>
                      <TableCell>{f.objet}</TableCell>
                      <TableCell className="text-right font-medium">{fmt(f.montant)} FCFA</TableCell>
                      <TableCell>{new Date(f.date).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>{new Date(f.echeance).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>
                        <Badge variant={f.statut === "Payée" ? "success" : f.statut === "En retard" ? "destructive" : "warning"}>
                          {f.statut}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="depenses" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Ventilation des dépenses</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {depenseCategories.map((d) => (
                  <div key={d.categorie} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{d.categorie}</span>
                      <span className="text-muted-foreground">{fmt(d.montant)} FCFA ({d.pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-primary h-3 rounded-full transition-all" style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
