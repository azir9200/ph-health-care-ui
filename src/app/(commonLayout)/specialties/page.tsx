import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface";
import { HeartPulse, Brain, Bone, Baby, Stethoscope } from "lucide-react";
import React from "react";
import Link from "next/link";
import SpecialistIntro from "@/components/modules/Home/SpecialistIntro";

const iconMap: Record<string, React.ElementType> = {
  cardiology: HeartPulse,
  neurology: Brain,
  orthopedic: Bone,
  pediatric: Baby,
};

const Specialities = async () => {
  const result = await getSpecialities();
  const specialists: ISpecialty[] = result.data ?? [];

  return (
    <section className="py-8 md:py-8">
      <SpecialistIntro />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            Our Specialties
          </h2>
          <p className="text-muted-foreground mt-3">
            Access to medical experts across all major specialties.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {specialists.map((specialty) => {
            const Icon = iconMap[specialty.icon?.toLowerCase()] || Stethoscope;

            return (
              <Link
                key={specialty.id}
                href={`/consultation?specialty=${encodeURIComponent(
                  specialty.title.toLowerCase(),
                )}`}
                className="block"
              >
                <Card
                  className={cn(
                    "group cursor-pointer transition-all duration-300",
                    "hover:shadow-xl hover:-translate-y-1",
                  )}
                >
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <div
                      className={cn(
                        "mb-4 flex h-16 w-16 items-center justify-center rounded-full",
                        "bg-primary/10 text-primary",
                        "group-hover:bg-primary group-hover:text-primary-foreground",
                        "transition-colors duration-300",
                      )}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3 className="text-lg font-semibold">{specialty.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Empty state */}
        {specialists.length === 0 && (
          <p className="text-center text-muted-foreground mt-12">
            No specialties available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default Specialities;
