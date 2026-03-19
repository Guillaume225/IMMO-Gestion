"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Settings, Users, Building2, CreditCard, Shield, Plus, Pencil, Trash2, Save,
} from "lucide-react";

type User = {
  id: string;
  nom: string;
  email: string;
  role: string;
  statut: string;
  dernierAcces: string;
};

const mockUsers: User[] = [
  { id: "1", nom: "Admin Principal", email: "admin@immplus.sn", role: "ADMIN", statut: "Actif", dernierAcces: "2026-03-15 14:30" },
  { id: "2", nom: "Agent Diop", email: "diop@immplus.sn", role: "AGENT", statut: "Actif", dernierAcces: "2026-03-15 11:45" },
  { id: "3", nom: "Agent Sall", email: "sall@immplus.sn", role: "AGENT", statut: "Actif", dernierAcces: "2026-03-14 16:20" },
  { id: "4", nom: "Comptable Ba", email: "ba@immplus.sn", role: "COMPTABLE", statut: "Actif", dernierAcces: "2026-03-15 09:00" },
  { id: "5", nom: "Stagiaire Ndiaye", email: "ndiaye@immplus.sn", role: "VIEWER", statut: "Inactif", dernierAcces: "2026-02-28 17:00" },
];

const roleLabels: Record<string, string> = {
  ADMIN: "Administrateur",
  AGENT: "Agent commercial",
  COMPTABLE: "Comptable",
  VIEWER: "Consultation",
};

const roleColors: Record<string, "default" | "secondary" | "destructive" | "success" | "warning"> = {
  ADMIN: "destructive",
  AGENT: "default",
  COMPTABLE: "warning",
  VIEWER: "secondary",
};

export default function ParametresPage() {
  const [agencyName, setAgencyName] = useState("Immo Plus Sénégal");
  const [agencyEmail, setAgencyEmail] = useState("contact@immplus.sn");
  const [agencyPhone, setAgencyPhone] = useState("+221 33 123 45 67");
  const [agencyAddress, setAgencyAddress] = useState("123 Avenue Bourguiba, Dakar");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Configuration de votre agence et gestion des accès</p>
      </div>

      <Tabs defaultValue="agence">
        <TabsList>
          <TabsTrigger value="agence"><Building2 className="h-4 w-4 mr-2" />Agence</TabsTrigger>
          <TabsTrigger value="utilisateurs"><Users className="h-4 w-4 mr-2" />Utilisateurs</TabsTrigger>
          <TabsTrigger value="abonnement"><CreditCard className="h-4 w-4 mr-2" />Abonnement</TabsTrigger>
          <TabsTrigger value="securite"><Shield className="h-4 w-4 mr-2" />Sécurité</TabsTrigger>
        </TabsList>

        {/* Agence Tab */}
        <TabsContent value="agence" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Informations de l&apos;agence</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agencyName">Nom de l&apos;agence</Label>
                  <Input id="agencyName" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agencyEmail">Email</Label>
                  <Input id="agencyEmail" type="email" value={agencyEmail} onChange={(e) => setAgencyEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agencyPhone">Téléphone</Label>
                  <Input id="agencyPhone" value={agencyPhone} onChange={(e) => setAgencyPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agencyAddress">Adresse</Label>
                  <Input id="agencyAddress" value={agencyAddress} onChange={(e) => setAgencyAddress(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Devise</Label>
                  <Select defaultValue="XOF">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XOF">FCFA (XOF)</SelectItem>
                      <SelectItem value="XAF">FCFA (XAF)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fuseau horaire</Label>
                  <Select defaultValue="Africa/Dakar">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Dakar">Afrique/Dakar (GMT+0)</SelectItem>
                      <SelectItem value="Africa/Douala">Afrique/Douala (GMT+1)</SelectItem>
                      <SelectItem value="Africa/Abidjan">Afrique/Abidjan (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end"><Button><Save className="h-4 w-4 mr-2" />Enregistrer</Button></div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader><CardTitle>Personnalisation</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Logo de l&apos;agence</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <p className="text-muted-foreground text-sm">Glissez votre logo ici ou cliquez pour parcourir</p>
                    <Button variant="outline" size="sm" className="mt-2">Choisir un fichier</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Couleur principale</Label>
                  <div className="flex gap-2">
                    {["#2563eb", "#059669", "#d97706", "#dc2626", "#7c3aed", "#0891b2"].map((c) => (
                      <button key={c} className="w-8 h-8 rounded-full border-2 border-transparent hover:border-gray-400 transition-colors" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Utilisateurs Tab */}
        <TabsContent value="utilisateurs" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <Button size="sm"><Plus className="h-4 w-4 mr-2" />Inviter un utilisateur</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernier accès</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">{u.nom.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{u.nom}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={roleColors[u.role]}>{roleLabels[u.role]}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={u.statut === "Actif" ? "success" : "secondary"}>{u.statut}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{u.dernierAcces}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader><CardTitle>Rôles & Permissions</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(roleLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{label}</p>
                      <p className="text-sm text-muted-foreground">
                        {key === "ADMIN" && "Accès complet à toutes les fonctionnalités"}
                        {key === "AGENT" && "Gestion des contacts, biens et transactions"}
                        {key === "COMPTABLE" && "Gestion financière, quittances et factures"}
                        {key === "VIEWER" && "Consultation uniquement, aucune modification"}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Configurer</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Abonnement Tab */}
        <TabsContent value="abonnement" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Votre abonnement</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Plan Pro</h3>
                    <Badge variant="success">Actif</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Facturé mensuellement • Prochain renouvellement le 15 avril 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">40 000 FCFA</p>
                  <p className="text-sm text-muted-foreground">/ mois</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Utilisateurs</p>
                  <p className="text-xl font-bold">5 / 10</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "50%" }} />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Biens gérés</p>
                  <p className="text-xl font-bold">87 / 200</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "43.5%" }} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { nom: "Starter", prix: "15 000", biens: "50 biens", users: "3 utilisateurs", current: false },
                  { nom: "Pro", prix: "40 000", biens: "200 biens", users: "10 utilisateurs", current: true },
                  { nom: "Business", prix: "100 000", biens: "Illimité", users: "Illimité", current: false },
                ].map((plan) => (
                  <Card key={plan.nom} className={plan.current ? "border-primary border-2" : ""}>
                    <CardContent className="pt-4 text-center space-y-2">
                      {plan.current && <Badge variant="default" className="mb-2">Plan actuel</Badge>}
                      <h3 className="font-bold text-lg">{plan.nom}</h3>
                      <p className="text-2xl font-bold">{plan.prix} <span className="text-sm font-normal">FCFA/mois</span></p>
                      <p className="text-sm text-muted-foreground">{plan.biens}</p>
                      <p className="text-sm text-muted-foreground">{plan.users}</p>
                      <Button variant={plan.current ? "outline" : "default"} size="sm" className="w-full">
                        {plan.current ? "Plan actuel" : "Changer"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sécurité Tab */}
        <TabsContent value="securite" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Journal d&apos;audit</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Détails</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { date: "15/03/2026 14:30", user: "Admin Principal", action: "Connexion", detail: "Connexion réussie depuis 197.159.x.x" },
                    { date: "15/03/2026 11:45", user: "Agent Diop", action: "Création bien", detail: "Villa 4 chambres - Almadies (REF-0089)" },
                    { date: "15/03/2026 10:20", user: "Comptable Ba", action: "Émission quittance", detail: "Quittance Mars 2026 - Bail B-2024-012" },
                    { date: "14/03/2026 16:20", user: "Agent Sall", action: "Modification contact", detail: "Mise à jour stage pipeline → OFFRE_ACHAT" },
                    { date: "14/03/2026 09:15", user: "Admin Principal", action: "Invitation utilisateur", detail: "Invitation envoyée à ndiaye@immplus.sn" },
                  ].map((log, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm">{log.date}</TableCell>
                      <TableCell className="font-medium text-sm">{log.user}</TableCell>
                      <TableCell><Badge variant="secondary">{log.action}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.detail}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader><CardTitle>Sécurité du compte</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Authentification à deux facteurs (2FA)</p>
                  <p className="text-sm text-muted-foreground">Ajoutez une couche de sécurité supplémentaire</p>
                </div>
                <Button variant="outline">Activer</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Sessions actives</p>
                  <p className="text-sm text-muted-foreground">2 sessions actives actuellement</p>
                </div>
                <Button variant="outline">Gérer</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Politique de mots de passe</p>
                  <p className="text-sm text-muted-foreground">Minimum 8 caractères, 1 majuscule, 1 chiffre</p>
                </div>
                <Button variant="outline">Configurer</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
