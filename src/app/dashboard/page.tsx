"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Home,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
} from "lucide-react";

const stats = [
  {
    title: "Contacts actifs",
    value: "248",
    change: "+12 ce mois",
    icon: Users,
    color: "text-navy-500",
    bg: "bg-navy-50",
  },
  {
    title: "Biens en catalogue",
    value: "89",
    change: "14 disponibles",
    icon: Home,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Baux actifs",
    value: "54",
    change: "3 expirent bientôt",
    icon: FileText,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "CA du mois",
    value: "2 450 000",
    change: "+18% vs mois dernier",
    icon: DollarSign,
    color: "text-orange-600",
    bg: "bg-orange-100",
    suffix: " FCFA",
  },
];

const recentActivities = [
  { id: 1, text: "Nouveau bail signé — Apt 302, Résidence Les Palmiers", time: "Il y a 2h", type: "success" },
  { id: 2, text: "Retard de paiement — M. Diallo, Loyer Mars 2026", time: "Il y a 3h", type: "warning" },
  { id: 3, text: "Visite planifiée — Villa Mermoz pour Mme Ndiaye", time: "Il y a 5h", type: "info" },
  { id: 4, text: "Nouveau lead — Prospect via Expat-Dakar", time: "Il y a 6h", type: "info" },
  { id: 5, text: "Quittance émise — Loyer Mars 2026 pour 12 baux", time: "Hier", type: "success" },
  { id: 6, text: "Ticket maintenance — Fuite d'eau, Apt 105", time: "Hier", type: "warning" },
];

const upcomingTasks = [
  { id: 1, text: "Relance loyer impayé — M. Fall", due: "Aujourd'hui", priority: "haute" },
  { id: 2, text: "Visite bien — 14h, Villa Almadies", due: "Aujourd'hui", priority: "moyenne" },
  { id: 3, text: "Renouvellement bail — Apt 201", due: "Demain", priority: "haute" },
  { id: 4, text: "Envoi CRG — Propriétaire Sow", due: "Dans 2 jours", priority: "basse" },
  { id: 5, text: "AG Copropriété — Résidence Océan", due: "Dans 5 jours", priority: "moyenne" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d&apos;ensemble de votre activité immobilière</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value}
                {stat.suffix && <span className="text-sm font-normal">{stat.suffix}</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Activités récentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activités récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  {activity.type === "success" && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  )}
                  {activity.type === "warning" && (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  )}
                  {activity.type === "info" && (
                    <Clock className="h-5 w-5 text-navy-300 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tâches à venir */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tâches à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                        task.priority === "haute"
                          ? "bg-red-500"
                          : task.priority === "moyenne"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm">{task.text}</p>
                      <p className="text-xs text-muted-foreground">{task.due}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      task.priority === "haute"
                        ? "destructive"
                        : task.priority === "moyenne"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline rapide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pipeline de prospection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {[
              { stage: "Nouveau", count: 18, color: "bg-gray-200" },
              { stage: "Qualifié", count: 12, color: "bg-navy-100" },
              { stage: "Visite", count: 8, color: "bg-yellow-200" },
              { stage: "Offre", count: 5, color: "bg-orange-200" },
              { stage: "Signé", count: 3, color: "bg-green-200" },
              { stage: "Perdu", count: 7, color: "bg-red-200" },
            ].map((stage) => (
              <div key={stage.stage} className="text-center">
                <div className={`rounded-lg p-4 ${stage.color} mb-2`}>
                  <span className="text-2xl font-bold">{stage.count}</span>
                </div>
                <span className="text-sm font-medium">{stage.stage}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
