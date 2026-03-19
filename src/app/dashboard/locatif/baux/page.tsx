"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Search, FileText, AlertCircle } from "lucide-react";

type Bail = {
  id: string;
  locataire: string;
  bien: string;
  type: string;
  dateDebut: string;
  dateFin: string;
  loyerMensuel: number;
  charges: number;
  depotGarantie: number;
  status: string;
};

const mockBaux: Bail[] = [
  { id: "1", locataire: "Amadou Diallo", bien: "Apt F3 Sacré-Cœur", type: "NU", dateDebut: "2025-01-01", dateFin: "2027-12-31", loyerMensuel: 250000, charges: 30000, depotGarantie: 500000, status: "ACTIF" },
  { id: "2", locataire: "Fatou Ndiaye", bien: "Studio Plateau", type: "MEUBLE", dateDebut: "2025-06-01", dateFin: "2026-05-31", loyerMensuel: 150000, charges: 20000, depotGarantie: 300000, status: "ACTIF" },
  { id: "3", locataire: "Ousmane Kane", bien: "Apt F4 Mermoz", type: "NU", dateDebut: "2024-03-01", dateFin: "2026-02-28", loyerMensuel: 350000, charges: 40000, depotGarantie: 700000, status: "EXPIRE" },
  { id: "4", locataire: "Khady Mbaye", bien: "Local Médina", type: "COMMERCIAL", dateDebut: "2025-09-01", dateFin: "2028-08-31", loyerMensuel: 500000, charges: 50000, depotGarantie: 1500000, status: "ACTIF" },
  { id: "5", locataire: "Seydou Traore", bien: "Villa Almadies", type: "MEUBLE", dateDebut: "2025-07-01", dateFin: "2026-06-30", loyerMensuel: 800000, charges: 100000, depotGarantie: 1600000, status: "ACTIF" },
  { id: "6", locataire: "Mariama Diop", bien: "Apt F2 Grand Yoff", type: "NU", dateDebut: "2024-01-01", dateFin: "2025-12-31", loyerMensuel: 180000, charges: 25000, depotGarantie: 360000, status: "RESILIE" },
];

const typeLabels: Record<string, string> = { NU: "Nu", MEUBLE: "Meublé", COMMERCIAL: "Commercial", SAISONNIER: "Saisonnier" };
const statusLabels: Record<string, string> = { ACTIF: "Actif", RENOUVELE: "Renouvelé", RESILIE: "Résilié", EXPIRE: "Expiré" };
const statusVariants: Record<string, "success" | "warning" | "destructive" | "secondary"> = { ACTIF: "success", RENOUVELE: "success", RESILIE: "destructive", EXPIRE: "warning" };

function formatMontant(n: number) { return new Intl.NumberFormat("fr-FR").format(n) + " FCFA"; }

export default function BauxPage() {
  const [baux, setBaux] = useState(mockBaux);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filtered = baux.filter((b) => {
    const match = `${b.locataire} ${b.bien}`.toLowerCase().includes(search.toLowerCase());
    const status = filterStatus === "all" || b.status === filterStatus;
    return match && status;
  });

  const totalLoyers = baux.filter((b) => b.status === "ACTIF").reduce((s, b) => s + b.loyerMensuel, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des baux</h1>
          <p className="text-muted-foreground">{baux.filter((b) => b.status === "ACTIF").length} baux actifs — Total loyers : {formatMontant(totalLoyers)}/mois</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}><Plus className="h-4 w-4 mr-2" />Nouveau bail</Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un bail..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {Object.entries(statusLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Locataire</TableHead>
                <TableHead>Bien</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Loyer</TableHead>
                <TableHead>Charges</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((bail) => (
                <TableRow key={bail.id} className="cursor-pointer">
                  <TableCell className="font-medium">{bail.locataire}</TableCell>
                  <TableCell>{bail.bien}</TableCell>
                  <TableCell><Badge variant="outline">{typeLabels[bail.type]}</Badge></TableCell>
                  <TableCell className="text-sm">{bail.dateDebut}</TableCell>
                  <TableCell className="text-sm">{bail.dateFin}</TableCell>
                  <TableCell className="font-semibold">{formatMontant(bail.loyerMensuel)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatMontant(bail.charges)}</TableCell>
                  <TableCell><Badge variant={statusVariants[bail.status]}>{statusLabels[bail.status]}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Nouveau bail</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2"><Label>Locataire</Label><Input placeholder="Sélectionner un contact..." /></div>
            <div className="space-y-2"><Label>Bien</Label><Input placeholder="Sélectionner un bien..." /></div>
            <div className="space-y-2">
              <Label>Type de bail</Label>
              <Select defaultValue="NU">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(typeLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Date début</Label><Input type="date" /></div>
              <div className="space-y-2"><Label>Date fin</Label><Input type="date" /></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2"><Label>Loyer (FCFA)</Label><Input type="number" placeholder="250000" /></div>
              <div className="space-y-2"><Label>Charges (FCFA)</Label><Input type="number" placeholder="30000" /></div>
              <div className="space-y-2"><Label>Dépôt garantie</Label><Input type="number" placeholder="500000" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
            <Button>Créer le bail</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
