"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Download, Send, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

type Quittance = {
  id: string;
  locataire: string;
  bien: string;
  periode: string;
  montantLoyer: number;
  montantCharges: number;
  montantTotal: number;
  montantPaye: number;
  datePaiement: string | null;
  status: string;
};

const mockQuittances: Quittance[] = [
  { id: "1", locataire: "Amadou Diallo", bien: "Apt F3 Sacré-Cœur", periode: "Mars 2026", montantLoyer: 250000, montantCharges: 30000, montantTotal: 280000, montantPaye: 280000, datePaiement: "15/03/2026", status: "PAYEE" },
  { id: "2", locataire: "Fatou Ndiaye", bien: "Studio Plateau", periode: "Mars 2026", montantLoyer: 150000, montantCharges: 20000, montantTotal: 170000, montantPaye: 170000, datePaiement: "14/03/2026", status: "PAYEE" },
  { id: "3", locataire: "Ousmane Kane", bien: "Apt F4 Mermoz", periode: "Mars 2026", montantLoyer: 350000, montantCharges: 40000, montantTotal: 390000, montantPaye: 0, datePaiement: null, status: "RETARD" },
  { id: "4", locataire: "Khady Mbaye", bien: "Local Médina", periode: "Mars 2026", montantLoyer: 500000, montantCharges: 50000, montantTotal: 550000, montantPaye: 0, datePaiement: null, status: "EN_ATTENTE" },
  { id: "5", locataire: "Seydou Traore", bien: "Villa Almadies", periode: "Mars 2026", montantLoyer: 800000, montantCharges: 100000, montantTotal: 900000, montantPaye: 900000, datePaiement: "12/03/2026", status: "PAYEE" },
  { id: "6", locataire: "Ibrahima Fall", bien: "Apt F2 Fann", periode: "Mars 2026", montantLoyer: 200000, montantCharges: 25000, montantTotal: 225000, montantPaye: 100000, datePaiement: "18/03/2026", status: "PARTIELLE" },
  { id: "7", locataire: "Amadou Diallo", bien: "Apt F3 Sacré-Cœur", periode: "Février 2026", montantLoyer: 250000, montantCharges: 30000, montantTotal: 280000, montantPaye: 280000, datePaiement: "05/02/2026", status: "PAYEE" },
  { id: "8", locataire: "Ousmane Kane", bien: "Apt F4 Mermoz", periode: "Février 2026", montantLoyer: 350000, montantCharges: 40000, montantTotal: 390000, montantPaye: 390000, datePaiement: "10/02/2026", status: "PAYEE" },
];

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "destructive" | "secondary"; icon: any }> = {
  PAYEE: { label: "Payée", variant: "success", icon: CheckCircle2 },
  EN_ATTENTE: { label: "En attente", variant: "secondary", icon: Clock },
  RETARD: { label: "Retard", variant: "destructive", icon: AlertTriangle },
  IMPAYEE: { label: "Impayée", variant: "destructive", icon: AlertTriangle },
  PARTIELLE: { label: "Partielle", variant: "warning", icon: Clock },
};

function formatMontant(n: number) { return new Intl.NumberFormat("fr-FR").format(n); }

export default function QuittancesPage() {
  const [quittances] = useState(mockQuittances);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPeriode, setFilterPeriode] = useState("Mars 2026");

  const filtered = quittances.filter((q) => {
    const match = `${q.locataire} ${q.bien}`.toLowerCase().includes(search.toLowerCase());
    const status = filterStatus === "all" || q.status === filterStatus;
    const periode = filterPeriode === "all" || q.periode === filterPeriode;
    return match && status && periode;
  });

  const totalDu = filtered.reduce((s, q) => s + q.montantTotal, 0);
  const totalPaye = filtered.reduce((s, q) => s + q.montantPaye, 0);
  const totalImpaye = totalDu - totalPaye;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quittances de loyer</h1>
          <p className="text-muted-foreground">Suivi des paiements et émission des quittances</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Send className="h-4 w-4 mr-2" />Envoyer rappels</Button>
          <Button><Download className="h-4 w-4 mr-2" />Générer quittances</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-muted-foreground">Total dû</p>
            <p className="text-2xl font-bold">{formatMontant(totalDu)} FCFA</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-muted-foreground">Total encaissé</p>
            <p className="text-2xl font-bold text-green-600">{formatMontant(totalPaye)} FCFA</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-muted-foreground">Reste à percevoir</p>
            <p className="text-2xl font-bold text-red-600">{formatMontant(totalImpaye)} FCFA</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterPeriode} onValueChange={setFilterPeriode}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes périodes</SelectItem>
            <SelectItem value="Mars 2026">Mars 2026</SelectItem>
            <SelectItem value="Février 2026">Février 2026</SelectItem>
            <SelectItem value="Janvier 2026">Janvier 2026</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            {Object.entries(statusConfig).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
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
                <TableHead>Période</TableHead>
                <TableHead>Loyer</TableHead>
                <TableHead>Charges</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payé</TableHead>
                <TableHead>Date paiement</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-medium">{q.locataire}</TableCell>
                  <TableCell>{q.bien}</TableCell>
                  <TableCell>{q.periode}</TableCell>
                  <TableCell>{formatMontant(q.montantLoyer)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatMontant(q.montantCharges)}</TableCell>
                  <TableCell className="font-semibold">{formatMontant(q.montantTotal)}</TableCell>
                  <TableCell className={q.montantPaye >= q.montantTotal ? "text-green-600" : "text-red-600"}>{formatMontant(q.montantPaye)}</TableCell>
                  <TableCell className="text-sm">{q.datePaiement || "—"}</TableCell>
                  <TableCell><Badge variant={statusConfig[q.status].variant}>{statusConfig[q.status].label}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {q.status === "PAYEE" && <Button variant="ghost" size="sm"><Download className="h-3 w-3" /></Button>}
                      {(q.status === "RETARD" || q.status === "EN_ATTENTE") && <Button variant="ghost" size="sm"><Send className="h-3 w-3" /></Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
