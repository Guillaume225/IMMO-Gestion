"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Filter, Download, Upload, Phone, Mail } from "lucide-react";

type Contact = {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  pipelineStage: string;
  score: number;
  createdAt: string;
};

const mockContacts: Contact[] = [
  { id: "1", type: "ACHETEUR", firstName: "Amadou", lastName: "Diallo", email: "amadou.diallo@email.com", phone: "+221 77 123 4567", city: "Dakar", pipelineStage: "QUALIFIE", score: 75, createdAt: "2026-03-15" },
  { id: "2", type: "LOCATAIRE", firstName: "Fatou", lastName: "Ndiaye", email: "fatou.ndiaye@email.com", phone: "+221 78 234 5678", city: "Dakar", pipelineStage: "VISITE_PLANIFIEE", score: 60, createdAt: "2026-03-14" },
  { id: "3", type: "PROPRIETAIRE", firstName: "Moussa", lastName: "Sow", email: "moussa.sow@email.com", phone: "+221 76 345 6789", city: "Thiès", pipelineStage: "SIGNE", score: 90, createdAt: "2026-03-10" },
  { id: "4", type: "VENDEUR", firstName: "Aissatou", lastName: "Ba", email: "aissatou.ba@email.com", phone: "+221 77 456 7890", city: "Saint-Louis", pipelineStage: "OFFRE", score: 85, createdAt: "2026-03-08" },
  { id: "5", type: "PROSPECT", firstName: "Ibrahima", lastName: "Fall", email: "ibrahima.fall@email.com", phone: "+221 78 567 8901", city: "Dakar", pipelineStage: "NOUVEAU", score: 30, createdAt: "2026-03-18" },
  { id: "6", type: "ACHETEUR", firstName: "Mariama", lastName: "Diop", email: "mariama.diop@email.com", phone: "+221 76 678 9012", city: "Dakar", pipelineStage: "QUALIFIE", score: 65, createdAt: "2026-03-12" },
  { id: "7", type: "LOCATAIRE", firstName: "Ousmane", lastName: "Kane", email: "ousmane.kane@email.com", phone: "+221 77 789 0123", city: "Mbour", pipelineStage: "SIGNE", score: 95, createdAt: "2026-02-20" },
  { id: "8", type: "PROSPECT", firstName: "Khady", lastName: "Mbaye", email: "khady.mbaye@email.com", phone: "+221 78 890 1234", city: "Dakar", pipelineStage: "NOUVEAU", score: 20, createdAt: "2026-03-19" },
];

const typeLabels: Record<string, string> = {
  ACHETEUR: "Acheteur",
  LOCATAIRE: "Locataire",
  PROPRIETAIRE: "Propriétaire",
  VENDEUR: "Vendeur",
  PROSPECT: "Prospect",
};

const stageLabels: Record<string, string> = {
  NOUVEAU: "Nouveau",
  QUALIFIE: "Qualifié",
  VISITE_PLANIFIEE: "Visite planifiée",
  OFFRE: "Offre",
  SIGNE: "Signé",
  PERDU: "Perdu",
};

const stageVariants: Record<string, "default" | "secondary" | "destructive" | "success" | "warning" | "outline"> = {
  NOUVEAU: "secondary",
  QUALIFIE: "default",
  VISITE_PLANIFIEE: "warning",
  OFFRE: "warning",
  SIGNE: "success",
  PERDU: "destructive",
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    type: "PROSPECT",
    city: "",
    notes: "",
  });

  const filteredContacts = contacts.filter((c) => {
    const matchSearch =
      `${c.firstName} ${c.lastName} ${c.email} ${c.phone} ${c.city}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchType = filterType === "all" || c.type === filterType;
    return matchSearch && matchType;
  });

  const handleAddContact = () => {
    const contact: Contact = {
      id: String(contacts.length + 1),
      ...newContact,
      pipelineStage: "NOUVEAU",
      score: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setContacts([contact, ...contacts]);
    setIsDialogOpen(false);
    setNewContact({ firstName: "", lastName: "", email: "", phone: "", type: "PROSPECT", city: "", notes: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contacts CRM</h1>
          <p className="text-muted-foreground">
            Gérez vos prospects, acheteurs, locataires et propriétaires
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importer CSV
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau contact
          </Button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-5 gap-4">
        {Object.entries(typeLabels).map(([key, label]) => {
          const count = contacts.filter((c) => c.type === key).length;
          return (
            <Card key={key} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setFilterType(filterType === key ? "all" : key)}>
              <CardContent className="pt-4 pb-4">
                <p className="text-sm text-muted-foreground">{label}s</p>
                <p className="text-2xl font-bold">{count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filtres */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {Object.entries(typeLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tableau */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Étape</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id} className="cursor-pointer">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {contact.firstName[0]}{contact.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                        <p className="text-xs text-muted-foreground">{contact.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{typeLabels[contact.type]}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{contact.city}</TableCell>
                  <TableCell>
                    <Badge variant={stageVariants[contact.pipelineStage]}>
                      {stageLabels[contact.pipelineStage]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            contact.score >= 70 ? "bg-green-500" : contact.score >= 40 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${contact.score}%` }}
                        />
                      </div>
                      <span className="text-sm">{contact.score}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{contact.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog nouveau contact */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nouveau contact</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prénom</Label>
                <Input
                  value={newContact.firstName}
                  onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
                  placeholder="Prénom"
                />
              </div>
              <div className="space-y-2">
                <Label>Nom</Label>
                <Input
                  value={newContact.lastName}
                  onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
                  placeholder="Nom"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Type de contact</Label>
              <Select value={newContact.type} onValueChange={(v) => setNewContact({ ...newContact, type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(typeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  placeholder="email@exemple.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="+221 77 000 0000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Ville</Label>
              <Input
                value={newContact.city}
                onChange={(e) => setNewContact({ ...newContact, city: e.target.value })}
                placeholder="Dakar"
              />
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={newContact.notes}
                onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                placeholder="Notes sur le contact..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleAddContact} disabled={!newContact.firstName || !newContact.lastName}>
              Créer le contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
