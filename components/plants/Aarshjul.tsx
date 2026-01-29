import { PlantCard } from "./PlantCard";

type Plant = {
  _id: string;
  title: string;
  slug: { current: string };
  image?: {
    asset: { _ref: string };
    alt?: string;
  };
  description?: string;
  seasons?: string[];
  flowering?: string[];
  harvest?: string[];
  themes?: string[];
  plantType?: {
    _id: string;
    title: string;
    slug: { current: string };
  };
};

interface AarshjulProps {
  plants: Plant[];
}

const SEASONS = {
  spring: {
    key: "spring",
    title: "Vår",
    subtitle: "Mars – Mai",
    months: ["03", "04", "05"],
    gradient: "from-green-50 to-emerald-50",
    accent: "bg-green-600",
    textAccent: "text-green-700",
  },
  summer: {
    key: "summer",
    title: "Sommer",
    subtitle: "Juni – August",
    months: ["06", "07", "08"],
    gradient: "from-yellow-50 to-amber-50",
    accent: "bg-amber-500",
    textAccent: "text-amber-700",
  },
  autumn: {
    key: "autumn",
    title: "Høst",
    subtitle: "September – November",
    months: ["09", "10", "11"],
    gradient: "from-orange-50 to-red-50",
    accent: "bg-orange-600",
    textAccent: "text-orange-700",
  },
  winter: {
    key: "winter",
    title: "Vinter",
    subtitle: "Desember – Februar",
    months: ["12", "01", "02"],
    gradient: "from-blue-50 to-slate-50",
    accent: "bg-blue-600",
    textAccent: "text-blue-700",
  },
} as const;

function groupPlantsBySeason(plants: Plant[]) {
  const grouped: Record<string, Plant[]> = {
    spring: [],
    summer: [],
    autumn: [],
    winter: [],
  };

  plants.forEach((plant) => {
    const seasons = Array.isArray(plant.seasons) ? plant.seasons : [];
    const flowering = Array.isArray(plant.flowering) ? plant.flowering : [];

    // Grupper etter planting-sesong
    seasons.forEach((season) => {
      if (grouped[season]) {
        grouped[season].push(plant);
      }
    });

    // Hvis ingen sesong, grupper etter blomstringsmåned
    if (!seasons.length && flowering.length) {
      flowering.forEach((month) => {
        Object.values(SEASONS).forEach((season) => {
          if (season.months.includes(month) && !grouped[season.key].includes(plant)) {
            grouped[season.key].push(plant);
          }
        });
      });
    }
  });

  return grouped;
}

export function Aarshjul({ plants }: AarshjulProps) {
  const grouped = groupPlantsBySeason(plants);

  return (
    <div className="space-y-12">
      {Object.values(SEASONS).map((season) => {
        const seasonPlants = grouped[season.key];
        if (!seasonPlants.length) return null;

        const [featured, ...rest] = seasonPlants;
        const secondary = rest.slice(0, 3);
        const remaining = rest.slice(3, 7);

        return (
          <section
            key={season.key}
            className={`rounded-2xl bg-gradient-to-br ${season.gradient} p-6 md:p-8`}
          >
            {/* Sesong-header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-1 h-12 rounded-full ${season.accent}`} />
              <div>
                <h2 className={`text-2xl md:text-3xl font-bold ${season.textAccent}`}>
                  {season.title}
                </h2>
                <p className="text-sm text-[var(--color-text-light)]">{season.subtitle}</p>
              </div>
            </div>

            {/* Magasin-grid */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
              {/* Featured plante - stor */}
              {featured && (
                <div className="md:col-span-4">
                  <PlantCard plant={featured} variant="featured" className="h-full min-h-[280px]" />
                </div>
              )}

              {/* Sekundære planter - stack */}
              {secondary.length > 0 && (
                <div className="md:col-span-2 flex flex-col gap-4">
                  {secondary.map((plant) => (
                    <PlantCard key={plant._id} plant={plant} variant="compact" />
                  ))}
                </div>
              )}

              {/* Flere planter - horisontal rad */}
              {remaining.length > 0 && (
                <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {remaining.map((plant) => (
                    <PlantCard key={plant._id} plant={plant} variant="default" />
                  ))}
                </div>
              )}
            </div>

            {/* Vis alle-lenke */}
            {seasonPlants.length > 8 && (
              <div className="mt-6 text-center">
                <span className={`text-sm font-medium ${season.textAccent}`}>
                  + {seasonPlants.length - 8} flere planter
                </span>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
