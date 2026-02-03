import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface";
import { HeartPulse, Brain, Bone, Baby, Stethoscope } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  cardiology: HeartPulse,
  neurology: Brain,
  orthopedic: Bone,
  pediatric: Baby,
  default: Stethoscope,
};

const Specialities = async () => {
  const result = await getSpecialities();
  const specialists: ISpecialty[] = result.data;

  return (
    <section className="py-24 mt-24 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Our Specialist
            </h2>
            <p className="text-muted-foreground max-w-md mt-2">
              Access to medical experts across all major specialities.
            </p>
          </div>
          <a
            href="/specialties"
            className="text-primary font-semibold hover:underline mt-4 sm:mt-0"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists?.map((specialist) => {
            const Icon =
              iconMap[specialist.icon?.toLowerCase()] || iconMap.default;

            return (
              <Card
                key={specialist?.id}
                className={cn(
                  "text-center cursor-pointer transition-all duration-300",
                  "hover:shadow-lg hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground",
                )}
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{specialist?.title}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Specialities;
