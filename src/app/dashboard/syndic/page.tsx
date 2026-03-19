"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, CalendarDays, Receipt, Plus, Search } from "lucide-react";

type Copropriete = {
  id: string;
  nom: string;
  adresse: string;
  nbLots: number;
  budgetAnnuel: number;
  syndic: string;
};

type Coproprietaire = {
  id: string;
  nom: string;
  copropriete: string;
  lots: string;
  quotePart: number;
  solde: number;
};

type AG = {
  id: string;
  copropriete: string;
  date: string;
  type: string;
  statut: string;
  quorum: number | null;
};

type AppelCharge = {
  id: string;
  copropriete: string;
  trimestre: string;
  montantTotal: number;
  recouvert: number;
  statut: string;
};

const mockCoproprietes: Copropriete[] = [
  { id: "1", nom: "Résidence Les Palmiers", adresse: "Mermoz, Dakar", nbLots: 24, budgetAnnuel: 18000000, syndic: "Agence Immo Plus" },
  { id: "2", nom: "Immeuble Sahel", adresse: "Plateau, Dakar", nbLots: 16, budgetAnnuel: 9600000, syndic: "Agence Immo Plus" },
  { id: "3", nom: "Résidence Teranga", adresse: "Almadies, Dakar", nbLots: 32, budgetAnnuel: 28800000, syndic: "Agence Immo Plus" },
];

const mockCoproprietaires: Coproprietaire[] = [
  { id: "1", nom: "M. Diop Abdoulaye", copropriete: "Résidence Les Palmiers", lots: "A1, A2", quotePart: 8.5, solde: -250000 },
  { id: "2", nom: "Mme Ndiaye Fatou", copropriete: "Résidence Les Palmiers", lots: "B4", quotePart: 4.2, solde: 0 },
  { id: "3", nom: "SCI Sahel Invest", copropriete: "Immeuble Sahel", lots: "C1, C2, C3", quotePart: 18.8, solde: -1200000 },
  { id: "4", nom: "M. Sow Ousmane", copropriete: "Résidence Teranga", lots: "D6", quotePart: 3.1, solde: 0 },
];

const mockAGs: AG[] = [
  { id: "1", copropriete: "Résidence Les Palmiers", date: "2026-06-15", type: "Ordinaire", statut: "Planifiée", quorum: null },
  { id: "2", copropriete: "Immeuble Sahel", date: "2026-03-20", type: "Extraordinaire", statut: "Terminée", quorum: 72 },
  { id: "3", copropriete: "Résidence Teranga", date: "2026-04-10", type: "Ordinaire", statut: "Terminée", quorum: 65 },
];

const mockAppels: AppelCharge[] = [
  { id: "1", copropriete: "Résidence Les Palmiers", trimestre: "T1 2026", montantTotal: 4500000, recouvert: 3600000, statut: "En cours" },
  { id: "2", copropriete: "Immeuble Sahel", trimestre: "T1 2026", montantTotal: 2400000, recouvert: 2400000, statut: "Soldé" },
  { id: "3", copropriete: "Résidence Teranga", trimestre: "T1 2026", montantTotal: 7200000, recouvert: 4800000, statut: "En cours" },
];

function fmt(n: number) { return new Intl.NumberFormat("fr-FR").format(n); }

export default function SyndicPage() {
  const [search, setSearch] = useState("");

  const totalLots = mockCoproprietes.reduce((s, c) => s + c.nbLots, 0);
  const totalBudget = mockCoproprietes.reduce((s, c) => s + c.budgetAnnuel, 0);
  const totalImpayes = mockCoproprietaires.reduce((s, c) => s + Math.abs(Math.min(c.solde, 0)), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Syndic & Copropriétés</h1>
          <p className="text-muted-foreground">Gestion des copropriétés et charges communes</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Nouvelle copropriété</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-navy-50"><Building className="h-5 w-5 text-navy-500" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Copropriétés</p>
              <p className="text-2xl font-bold">{mockCoproprietes.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100"><Users className="h-5 w-5 text-green-600" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Lots gérés</p>
              <p className="text-2xl font-bold">{totalLots}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100"><Receipt className="h-5 w-5 text-orange-600" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Budget annuel total</p>
              <p className="text-2xl font-bold">{fmt(totalBudget)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100"><CalendarDays className="h-5 w-5 text-red-600" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Impayés charges</p>
              <p className="text-2xl font-bold text-destructive">{fmt(totalImpayes)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="coproprietes">
        <TabsList>
          <TabsTrigger value="coproprietes">Copropriétés</TabsTrigger>
          <TabsTrigger value="coproprietaires">Copropriétaires</TabsTrigger>
          <TabsTrigger value="ag">Assemblées Générales</TabsTrigger>
          <TabsTrigger value="charges">Appels de charges</TabsTrigger>
        </TabsList>

        <TabsContent value="coproprietes" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockCoproprietes.map((c) => (
                  <Card key={c.id} className="border shadow-sm">
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{c.nom}</h3>
                          <p className="text-sm text-muted-foreground">{c.adresse}</p>
                        </div>
                        <Badge variant="secondary">{c.nbLots} lots</Badge>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm">Budget annuel : <span className="font-semibold">{fmt(c.budgetAnnuel)} FCFA</span></p>
                        <p className="text-sm text-muted-foreground">Syndic : {c.syndic}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coproprietaires" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Copropriété</TableHead>
                    <TableHead>Lots</TableHead>
                    <TableHead className="text-right">Quote-part</TableHead>
                    <TableHead className="text-right">Solde</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCoproprietaires.map((cp) => (
                    <TableRow key={cp.id}>
                      <TableCell className="font-medium">{cp.nom}</TableCell>
                      <TableCell>{cp.copropriete}</TableCell>
                      <TableCell>{cp.lots}</TableCell>
                      <TableCell className="text-right">{cp.quotePart} %</TableCell>
                      <TableCell className={`text-right font-medium ${cp.solde < 0 ? "text-destructive" : "text-green-600"}`}>
                        {cp.solde < 0 ? `-${fmt(Math.abs(cp.solde))}` : fmt(cp.solde)} FCFA
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ag" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Copropriété</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Quorum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAGs.map((ag) => (
                    <TableRow key={ag.id}>
                      <TableCell className="font-medium">{ag.copropriete}</TableCell>
                      <TableCell>{new Date(ag.date).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>{ag.type}</TableCell>
                      <TableCell>
                        <Badge variant={ag.statut === "Terminée" ? "success" : "warning"}>{ag.statut}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{ag.quorum ? `${ag.quorum}%` : "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charges" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Copropriété</TableHead>
                    <TableHead>Trimestre</TableHead>
                    <TableHead className="text-right">Montant total</TableHead>
                    <TableHead className="text-right">Recouvré</TableHead>
                    <TableHead>Progression</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAppels.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{a.copropriete}</TableCell>
                      <TableCell>{a.trimestre}</TableCell>
                      <TableCell className="text-right">{fmt(a.montantTotal)} FCFA</TableCell>
                      <TableCell className="text-right">{fmt(a.recouvert)} FCFA</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${(a.recouvert / a.montantTotal) * 100}%` }} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={a.statut === "Soldé" ? "success" : "warning"}>{a.statut}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
