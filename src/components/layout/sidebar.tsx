"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Building2,
  LayoutDashboard,
  Users,
  Home,
  FileText,
  Wrench,
  TrendingUp,
  Settings,
  Building,
  Receipt,
  ClipboardList,
  PieChart,
} from "lucide-react";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Contacts CRM", href: "/dashboard/crm/contacts", icon: Users },
  { name: "Pipeline", href: "/dashboard/crm/pipeline", icon: TrendingUp },
  { name: "Catalogue biens", href: "/dashboard/biens", icon: Home },
  { name: "Gestion locative", href: "/dashboard/locatif", icon: FileText },
  { name: "Baux", href: "/dashboard/locatif/baux", icon: ClipboardList },
  { name: "Quittances", href: "/dashboard/locatif/quittances", icon: Receipt },
  { name: "Travaux", href: "/dashboard/locatif/travaux", icon: Wrench },
  { name: "Transactions", href: "/dashboard/transactions", icon: TrendingUp },
  { name: "Syndic", href: "/dashboard/syndic", icon: Building },
  { name: "Finance", href: "/dashboard/finance", icon: PieChart },
  { name: "Paramètres", href: "/dashboard/parametres", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-navy-500 flex flex-col">
      <div className="p-6 border-b border-navy-400/30">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Building2 className="h-7 w-7 text-orange-brand" />
          <span className="text-xl font-bold text-white">ImmoGestion</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-orange-brand/15 text-orange-brand"
                      : "text-navy-100 hover:bg-navy-400/30 hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-navy-400/30">
        <p className="text-xs text-navy-200">ImmoGestion v1.0</p>
      </div>
    </aside>
  );
}
