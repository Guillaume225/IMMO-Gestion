# ImmoGest SaaS — Logiciel de Gestion Immobilière

Plateforme SaaS multi-tenant de gestion immobilière complète, conçue pour les agences immobilières en Afrique francophone.

## Modules

| Module | Description |
|--------|-------------|
| **CRM** | Gestion des contacts, pipeline visuel (Kanban), scoring, historique d'activités |
| **Catalogue de biens** | Fiches détaillées, filtres avancés, vues grille/liste, gestion multi-médias |
| **Gestion locative** | Baux, quittances, suivi des impayés, états des lieux, maintenance |
| **Transactions & Ventes** | Pipeline de vente (Mandat → Acte final), suivi commissions |
| **Syndic & Copropriétés** | Registre copropriétaires, appels de charges, assemblées générales |
| **Finance & Reporting** | CA, commissions, factures, KPIs (taux d'occupation, recouvrement) |
| **Paramètres** | Configuration agence, utilisateurs, rôles, abonnement, sécurité |

## Stack technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **ORM** : Prisma + SQL Server
- **Auth** : NextAuth.js v4 (JWT)
- **UI** : Tailwind CSS + Radix UI (style shadcn/ui)
- **Graphiques** : Recharts
- **Validation** : Zod

## Prérequis

- Node.js ≥ 18
- SQL Server 2019+ (ou Azure SQL)
- npm ou yarn

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Copier les variables d'environnement
cp .env.example .env

# 3. Configurer votre DATABASE_URL dans .env
# DATABASE_URL="sqlserver://localhost:1433;database=immogest;user=sa;password=YourPassword123;trustServerCertificate=true"
# NEXTAUTH_SECRET="votre-secret-ici"
# NEXTAUTH_URL="http://localhost:3000"

# 4. Générer le client Prisma et créer les tables
npx prisma generate
npx prisma db push

# 5. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
src/
├── app/
│   ├── api/              # Routes API (contacts, biens, baux, register, auth)
│   ├── dashboard/
│   │   ├── biens/        # Catalogue immobilier
│   │   ├── crm/          # Contacts & Pipeline
│   │   ├── finance/      # Finance & Reporting
│   │   ├── locatif/      # Baux, quittances, travaux
│   │   ├── parametres/   # Configuration
│   │   ├── syndic/       # Copropriétés
│   │   └── transactions/ # Ventes
│   ├── login/
│   └── register/
├── components/
│   ├── layout/           # Sidebar, Header
│   └── ui/               # Composants réutilisables
├── lib/                  # Prisma, auth, utils, tenant
└── types/                # Types TypeScript
prisma/
└── schema.prisma         # Schéma base de données
```

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL de connexion SQL Server |
| `NEXTAUTH_SECRET` | Secret pour les JWT |
| `NEXTAUTH_URL` | URL de base de l'application |

## Multi-tenant

Chaque agence dispose de son propre espace isolé. L'isolation des données est assurée par un `tenantId` sur chaque requête Prisma. L'inscription crée automatiquement un tenant avec un essai gratuit de 14 jours.

## Licence

Propriétaire — Tous droits réservés.
