"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";

type Bien = {
  id: string;
  reference: string;
  title: string;
  type: string;
  transactionType: string;
  status: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  country: string;
  image: string;
  description: string;
};

const mockBiens: Bien[] = [
  { id: "1", reference: "BN-001", title: "Appartement F4 Mermoz", type: "APPARTEMENT", transactionType: "LOCATION", status: "DISPONIBLE", price: 350000, surface: 120, rooms: 4, bedrooms: 3, bathrooms: 2, address: "Rue MZ-42, Mermoz", city: "Dakar", country: "Sénégal", image: "", description: "Bel appartement F4 avec vue sur mer, entièrement rénové." },
  { id: "2", reference: "BN-002", title: "Villa Almadies avec piscine", type: "VILLA", transactionType: "VENTE", status: "DISPONIBLE", price: 185000000, surface: 350, rooms: 6, bedrooms: 5, bathrooms: 4, address: "Zone Almadies", city: "Dakar", country: "Sénégal", image: "", description: "Villa de luxe avec piscine, jardin, et vue panoramique." },
  { id: "3", reference: "BN-003", title: "Studio meublé Plateau", type: "STUDIO", transactionType: "LOCATION", status: "LOUE", price: 150000, surface: 35, rooms: 1, bedrooms: 1, bathrooms: 1, address: "Av. Léopold Sédar Senghor", city: "Dakar", country: "Sénégal", image: "", description: "Studio entièrement meublé et équipé, idéal pour expatrié." },
  { id: "4", reference: "BN-004", title: "Terrain 500m² Diamniadio", type: "TERRAIN", transactionType: "VENTE", status: "DISPONIBLE", price: 25000000, surface: 500, rooms: 0, bedrooms: 0, bathrooms: 0, address: "Zone industrielle", city: "Diamniadio", country: "Sénégal", image: "", description: "Terrain viabilisé dans la nouvelle ville de Diamniadio." },
  { id: "5", reference: "BN-005", title: "Local commercial Médina", type: "LOCAL_COMMERCIAL", transactionType: "LOCATION", status: "DISPONIBLE", price: 500000, surface: 80, rooms: 2, bedrooms: 0, bathrooms: 1, address: "Rue 12, Médina", city: "Dakar", country: "Sénégal", image: "", description: "Local commercial bien situé, forte fréquentation." },
  { id: "6", reference: "BN-006", title: "Appartement F3 Sacré-Cœur", type: "APPARTEMENT", transactionType: "LOCATION", status: "SOUS_COMPROMIS", price: 250000, surface: 85, rooms: 3, bedrooms: 2, bathrooms: 1, address: "Sacré-Cœur 3", city: "Dakar", country: "Sénégal", image: "", description: "F3 lumineux dans résidence sécurisée." },
  { id: "7", reference: "BN-007", title: "Maison R+1 Thiès", type: "MAISON", transactionType: "VENTE", status: "VENDU", price: 45000000, surface: 200, rooms: 5, bedrooms: 4, bathrooms: 3, address: "Quartier Diakhao", city: "Thiès", country: "Sénégal", image: "", description: "Maison R+1 avec garage et terrasse." },
  { id: "8", reference: "BN-008", title: "Immeuble R+3 Grand Yoff", type: "IMMEUBLE", transactionType: "VENTE", status: "DISPONIBLE", price: 320000000, surface: 600, rooms: 12, bedrooms: 8, bathrooms: 8, address: "Grand Yoff", city: "Dakar", country: "Sénégal", image: "", description: "Immeuble de rapport R+3 avec 8 appartements." },
];

const typeLabels: Record<string, string> = {
  APPARTEMENT: "Appartement",
  MAISON: "Maison",
  VILLA: "Villa",
  LOCAL_COMMERCIAL: "Local commercial",
  TERRAIN: "Terrain",
  IMMEUBLE: "Immeuble",
  BUREAU: "Bureau",
  STUDIO: "Studio",
};

const statusLabels: Record<string, string> = {
  DISPONIBLE: "Disponible",
  SOUS_COMPROMIS: "Sous compromis",
  LOUE: "Loué",
  VENDU: "Vendu",
  ARCHIVE: "Archivé",
};

const statusVariants: Record<string, "success" | "warning" | "default" | "destructive" | "secondary"> = {
  DISPONIBLE: "success",
  SOUS_COMPROMIS: "warning",
  LOUE: "default",
  VENDU: "secondary",
  ARCHIVE: "secondary",
};

function formatPrice(price: number, transactionType: string): string {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(0)}M FCFA`;
  }
  if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K FCFA`;
  }
  return `${price} FCFA`;
}

export default function BiensPage() {
  const [biens, setBiens] = useState<Bien[]>(mockBiens);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterTransaction, setFilterTransaction] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBien, setNewBien] = useState({
    title: "",
    type: "APPARTEMENT",
    transactionType: "LOCATION",
    price: "",
    surface: "",
    rooms: "",
    bedrooms: "",
    bathrooms: "",
    address: "",
    city: "",
    description: "",
  });

  const filtered = biens.filter((b) => {
    const matchSearch = `${b.title} ${b.address} ${b.city} ${b.reference}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchType = filterType === "all" || b.type === filterType;
    const matchTx = filterTransaction === "all" || b.transactionType === filterTransaction;
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchType && matchTx && matchStatus;
  });

  const handleAddBien = () => {
    const bien: Bien = {
      id: String(biens.length + 1),
      reference: `BN-${String(biens.length + 1).padStart(3, "0")}`,
      title: newBien.title,
      type: newBien.type,
      transactionType: newBien.transactionType,
      status: "DISPONIBLE",
      price: parseInt(newBien.price) || 0,
      surface: parseInt(newBien.surface) || 0,
      rooms: parseInt(newBien.rooms) || 0,
      bedrooms: parseInt(newBien.bedrooms) || 0,
      bathrooms: parseInt(newBien.bathrooms) || 0,
      address: newBien.address,
      city: newBien.city,
      country: "Sénégal",
      image: "",
      description: newBien.description,
    };
    setBiens([bien, ...biens]);
    setIsDialogOpen(false);
    setNewBien({ title: "", type: "APPARTEMENT", transactionType: "LOCATION", price: "", surface: "", rooms: "", bedrooms: "", bathrooms: "", address: "", city: "", description: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Catalogue des biens</h1>
          <p className="text-muted-foreground">{filtered.length} biens trouvés</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau bien
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Disponibles", count: biens.filter((b) => b.status === "DISPONIBLE").length, color: "text-green-600" },
          { label: "Loués", count: biens.filter((b) => b.status === "LOUE").length, color: "text-navy-300" },
          { label: "Vendus", count: biens.filter((b) => b.status === "VENDU").length, color: "text-gray-600" },
          { label: "En cours", count: biens.filter((b) => b.status === "SOUS_COMPROMIS").length, color: "text-yellow-600" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-4 pb-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtres */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un bien..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {Object.entries(typeLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterTransaction} onValueChange={setFilterTransaction}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Transaction" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="LOCATION">Location</SelectItem>
            <SelectItem value="VENTE">Vente</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            {Object.entries(statusLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex border rounded-md">
          <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("grid")}><Grid3X3 className="h-4 w-4" /></Button>
          <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("list")}><List className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Grille de biens */}
      {viewMode === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((bien) => (
            <Card key={bien.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-navy-50 to-navy-100 dark:from-navy-800 dark:to-navy-700 flex items-center justify-center relative">
                <span className="text-4xl opacity-30">🏠</span>
                <div className="absolute top-2 left-2">
                  <Badge variant={statusVariants[bien.status]}>{statusLabels[bien.status]}</Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-white/80 dark:bg-gray-900/80">
                    {bien.transactionType === "VENTE" ? "Vente" : "Location"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs text-muted-foreground">{bien.reference}</p>
                  <Badge variant="outline" className="text-[10px]">{typeLabels[bien.type]}</Badge>
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-1">{bien.title}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3" /> {bien.city}
                </div>
                <p className="text-lg font-bold text-primary mb-2">
                  {formatPrice(bien.price, bien.transactionType)}
                  {bien.transactionType === "LOCATION" && <span className="text-xs font-normal text-muted-foreground">/mois</span>}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {bien.surface > 0 && (
                    <span className="flex items-center gap-1"><Maximize className="h-3 w-3" />{bien.surface}m²</span>
                  )}
                  {bien.bedrooms > 0 && (
                    <span className="flex items-center gap-1"><Bed className="h-3 w-3" />{bien.bedrooms} ch.</span>
                  )}
                  {bien.bathrooms > 0 && (
                    <span className="flex items-center gap-1"><Bath className="h-3 w-3" />{bien.bathrooms} sdb</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Réf.</th>
                  <th className="text-left p-3 font-medium">Bien</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Ville</th>
                  <th className="text-left p-3 font-medium">Prix</th>
                  <th className="text-left p-3 font-medium">Surface</th>
                  <th className="text-left p-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((bien) => (
                  <tr key={bien.id} className="border-b hover:bg-muted/50 cursor-pointer">
                    <td className="p-3 text-muted-foreground">{bien.reference}</td>
                    <td className="p-3 font-medium">{bien.title}</td>
                    <td className="p-3"><Badge variant="outline">{typeLabels[bien.type]}</Badge></td>
                    <td className="p-3">{bien.city}</td>
                    <td className="p-3 font-semibold text-primary">{formatPrice(bien.price, bien.transactionType)}</td>
                    <td className="p-3">{bien.surface}m²</td>
                    <td className="p-3"><Badge variant={statusVariants[bien.status]}>{statusLabels[bien.status]}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Dialog nouveau bien */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Nouveau bien</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Titre du bien</Label>
              <Input value={newBien.title} onChange={(e) => setNewBien({ ...newBien, title: e.target.value })} placeholder="Ex: Appartement F3 Mermoz" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={newBien.type} onValueChange={(v) => setNewBien({ ...newBien, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(typeLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Transaction</Label>
                <Select value={newBien.transactionType} onValueChange={(v) => setNewBien({ ...newBien, transactionType: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOCATION">Location</SelectItem>
                    <SelectItem value="VENTE">Vente</SelectItem>
                    <SelectItem value="LOCATION_VENTE">Location-vente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Prix (FCFA)</Label>
                <Input type="number" value={newBien.price} onChange={(e) => setNewBien({ ...newBien, price: e.target.value })} placeholder="350000" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2"><Label>Surface (m²)</Label><Input type="number" value={newBien.surface} onChange={(e) => setNewBien({ ...newBien, surface: e.target.value })} /></div>
              <div className="space-y-2"><Label>Pièces</Label><Input type="number" value={newBien.rooms} onChange={(e) => setNewBien({ ...newBien, rooms: e.target.value })} /></div>
              <div className="space-y-2"><Label>Chambres</Label><Input type="number" value={newBien.bedrooms} onChange={(e) => setNewBien({ ...newBien, bedrooms: e.target.value })} /></div>
              <div className="space-y-2"><Label>SDB</Label><Input type="number" value={newBien.bathrooms} onChange={(e) => setNewBien({ ...newBien, bathrooms: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Adresse</Label><Input value={newBien.address} onChange={(e) => setNewBien({ ...newBien, address: e.target.value })} placeholder="Adresse complète" /></div>
              <div className="space-y-2"><Label>Ville</Label><Input value={newBien.city} onChange={(e) => setNewBien({ ...newBien, city: e.target.value })} placeholder="Dakar" /></div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={newBien.description} onChange={(e) => setNewBien({ ...newBien, description: e.target.value })} placeholder="Description du bien..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleAddBien} disabled={!newBien.title}>Ajouter le bien</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
