"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Phone, Mail } from "lucide-react";

type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: string;
  budget: string;
  agent: string;
  score: number;
};

const stages = [
  { key: "NOUVEAU", label: "Nouveau", color: "bg-gray-100 border-gray-300" },
  { key: "QUALIFIE", label: "Qualifié", color: "bg-navy-50 border-navy-200" },
  { key: "VISITE_PLANIFIEE", label: "Visite planifiée", color: "bg-yellow-50 border-yellow-300" },
  { key: "OFFRE", label: "Offre", color: "bg-orange-50 border-orange-300" },
  { key: "SIGNE", label: "Signé", color: "bg-green-50 border-green-300" },
  { key: "PERDU", label: "Perdu", color: "bg-red-50 border-red-300" },
];

const initialLeads: Record<string, Lead[]> = {
  NOUVEAU: [
    { id: "1", firstName: "Ibrahima", lastName: "Fall", email: "i.fall@email.com", phone: "+221 78 567 8901", type: "ACHETEUR", budget: "25M FCFA", agent: "Agent Diop", score: 30 },
    { id: "2", firstName: "Khady", lastName: "Mbaye", email: "k.mbaye@email.com", phone: "+221 78 890 1234", type: "LOCATAIRE", budget: "150K FCFA/mois", agent: "Agent Sall", score: 20 },
    { id: "8", firstName: "Seydou", lastName: "Traore", email: "s.traore@email.com", phone: "+221 77 111 2233", type: "ACHETEUR", budget: "40M FCFA", agent: "Agent Diop", score: 25 },
  ],
  QUALIFIE: [
    { id: "3", firstName: "Amadou", lastName: "Diallo", email: "a.diallo@email.com", phone: "+221 77 123 4567", type: "ACHETEUR", budget: "35M FCFA", agent: "Agent Diop", score: 75 },
    { id: "4", firstName: "Mariama", lastName: "Diop", email: "m.diop@email.com", phone: "+221 76 678 9012", type: "LOCATAIRE", budget: "200K FCFA/mois", agent: "Agent Sall", score: 65 },
  ],
  VISITE_PLANIFIEE: [
    { id: "5", firstName: "Fatou", lastName: "Ndiaye", email: "f.ndiaye@email.com", phone: "+221 78 234 5678", type: "ACHETEUR", budget: "50M FCFA", agent: "Agent Ba", score: 60 },
  ],
  OFFRE: [
    { id: "6", firstName: "Aissatou", lastName: "Ba", email: "a.ba@email.com", phone: "+221 77 456 7890", type: "VENDEUR", budget: "75M FCFA", agent: "Agent Diop", score: 85 },
  ],
  SIGNE: [
    { id: "7", firstName: "Moussa", lastName: "Sow", email: "m.sow@email.com", phone: "+221 76 345 6789", type: "ACHETEUR", budget: "45M FCFA", agent: "Agent Ba", score: 90 },
  ],
  PERDU: [],
};

export default function PipelinePage() {
  const [pipeline, setPipeline] = useState(initialLeads);
  const [draggedLead, setDraggedLead] = useState<{ lead: Lead; fromStage: string } | null>(null);

  const handleDragStart = (lead: Lead, fromStage: string) => {
    setDraggedLead({ lead, fromStage });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (toStage: string) => {
    if (!draggedLead || draggedLead.fromStage === toStage) return;

    setPipeline((prev) => {
      const updated = { ...prev };
      updated[draggedLead.fromStage] = prev[draggedLead.fromStage].filter(
        (l) => l.id !== draggedLead.lead.id
      );
      updated[toStage] = [...prev[toStage], draggedLead.lead];
      return updated;
    });
    setDraggedLead(null);
  };

  const totalLeads = Object.values(pipeline).flat().length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pipeline de prospection</h1>
          <p className="text-muted-foreground">
            {totalLeads} leads au total — Glissez-déposez pour changer d&apos;étape
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau lead
        </Button>
      </div>

      <div className="grid grid-cols-6 gap-4 overflow-x-auto">
        {stages.map((stage) => (
          <div
            key={stage.key}
            className={`rounded-lg border-2 border-dashed p-3 min-h-[500px] ${stage.color}`}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(stage.key)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">{stage.label}</h3>
              <Badge variant="secondary" className="text-xs">
                {pipeline[stage.key]?.length || 0}
              </Badge>
            </div>

            <div className="space-y-2">
              {pipeline[stage.key]?.map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={() => handleDragStart(lead, stage.key)}
                  className="bg-white dark:bg-gray-900 rounded-lg border p-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-[10px]">
                        {lead.firstName[0]}{lead.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{lead.type}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-primary">{lead.budget}</p>
                    <p className="text-[11px] text-muted-foreground">{lead.agent}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            lead.score >= 70 ? "bg-green-500" : lead.score >= 40 ? "bg-yellow-500" : "bg-red-400"
                          }`}
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{lead.score}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
