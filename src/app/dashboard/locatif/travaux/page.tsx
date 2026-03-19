"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Wrench, AlertCircle, CheckCircle2, Clock } from "lucide-react";

type Travail = {
  id: string;
  title: string;
  bien: string;
  categorie: string;
  prestataire: string;
  cout: number | null;
  status: string;
  dateOuverture: string;
  dateResolution: string | null;
  description: string;
};

const mockTravaux: Travail[] = [
  { id: "1", title: "Fuite d'eau salle de bain", bien: "Apt F3 Sacré-Cœur", categorie: "Plomberie", prestataire: "Plombier Diop", cout: 45000, status: "EN_COURS", dateOuverture: "2026-03-15", dateResolution: null, description: "Fuite au niveau du joint du lavabo." },
  { id: "2", title: "Panne climatisation", bien: "Villa Almadies", categorie: "Climatisation", prestataire: "Froid Service", cout: null, status: "OUVERT", dateOuverture: "2026-03-18", dateResolution: null, description: "Climatiseur salon ne refroidit plus." },
  { id: "3", title: "Remplacement serrure porte", bien: "Studio Plateau", categorie: "Serrurerie", prestataire: "Serrurier Express", cout: 25000, status: "RESOLU", dateOuverture: "2026-03-10", dateResolution: "2026-03-12", description: "Serrure cassée, remplacement complet." },
  { id: "4", title: "Peinture chambre", bien: "Apt F4 Mermoz", categorie: "Peinture", prestataire: "Peintre Ba", cout: 80000, status: "RESOLU", dateOuverture: "2026-02-20", dateResolution: "2026-02-28", description: "Remise en état peinture chambre principale." },
  { id: "5", title: "Problème électrique cuisine", bien: "Local Médina", categorie: "Électricité", prestataire: "", cout: null, status: "OUVERT", dateOuverture: "2026-03-19", dateResolution: null, description: "Prises qui sautent dans la cuisine." },
  { id: "6", title: "Infiltration toiture", bien: "Immeuble Grand Yoff", categorie: "Étanchéité", prestataire: "Étanche Pro", cout: 350000, status: "EN_COURS", dateOuverture: "2026-03-01", dateResolution: null, description: "Infiltration d'eau au dernier étage." },
  { id: "7", title: "Débouchage canalisation", bien: "Apt F2 Grand Yoff", categorie: "Plomberie", prestataire: "Plombier Diop", cout: 15000, status: "RESOLU", dateOuverture: "2026-03-05", dateResolution: "2026-03-05", description: "Canalisation bouchée dans la salle de bain." },
];

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "destructive" | "secondary"; icon: any }> = {
  OUVERT: { label: "Ouvert", variant: "destructive", icon: AlertCircle },
  EN_COURS: { label: "En cours", variant: "warning", icon: Clock },
  RESOLU: { label: "Résolu", variant: "success", icon: CheckCircle2 },
  ANNULE: { label: "Annulé", variant: "secondary", icon: AlertCircle },
};

function formatMontant(n: number | null) {
  if (n === null) return "—";
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}

export default function TravauxPage() {
  const [travaux, setTravaux] = useState(mockTravaux);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filtered = travaux.filter((t) => {
    const match = `${t.title} ${t.bien} ${t.categorie} ${t.prestataire}`.toLowerCase().includes(search.toLowerCase());
    const status = filterStatus === "all" || t.status === filterStatus;
    return match && status;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des travaux</h1>
          <p className="text-muted-foreground">Tickets de maintenance et interventions</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}><Plus className="h-4 w-4 mr-2" />Nouveau ticket</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Object.entries(statusConfig).filter(([k]) => k !== "ANNULE").map(([key, config]) => {
          const count = travaux.filter((t) => t.status === key).length;
          return (
            <Card key={key} className="cursor-pointer" onClick={() => setFilterStatus(key === filterStatus ? "all" : key)}>
              <CardContent className="pt-4 pb-4 flex items-center gap-3">
                <config.icon className={`h-5 w-5 ${
                  key === "OUVERT" ? "text-red-500" : key === "EN_COURS" ? "text-yellow-500" : "text-green-500"
                }`} />
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">{config.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un travail..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {Object.entries(statusConfig).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Bien</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prestataire</TableHead>
                <TableHead>Coût</TableHead>
                <TableHead>Ouvert le</TableHead>
                <TableHead>Résolu le</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id} className="cursor-pointer">
                  <TableCell>
                    <div>
                      <p className="font-medium">{t.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{t.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{t.bien}</TableCell>
                  <TableCell><Badge variant="outline">{t.categorie}</Badge></TableCell>
                  <TableCell>{t.prestataire || "Non assigné"}</TableCell>
                  <TableCell>{formatMontant(t.cout)}</TableCell>
                  <TableCell className="text-sm">{t.dateOuverture}</TableCell>
                  <TableCell className="text-sm">{t.dateResolution || "—"}</TableCell>
                  <TableCell><Badge variant={statusConfig[t.status].variant}>{statusConfig[t.status].label}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Nouveau ticket de maintenance</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2"><Label>Titre</Label><Input placeholder="Ex: Fuite d'eau salle de bain" /></div>
            <div className="space-y-2"><Label>Bien concerné</Label><Input placeholder="Sélectionner un bien..." /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select defaultValue="Plomberie">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Plomberie", "Électricité", "Peinture", "Serrurerie", "Climatisation", "Étanchéité", "Autre"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Prestataire</Label><Input placeholder="Nom du prestataire" /></div>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Décrivez le problème..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
            <Button>Créer le ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
