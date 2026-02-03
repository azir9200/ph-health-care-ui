import { Button } from "@/components/ui/button";
import { IDoctor } from "@/types/doctor.interface";
import { getDoctors } from "@/services/admin/doctorManagement";
import DoctorCard from "../Consultation/DoctorCard";
import Link from "next/link";
export const revalidate = 8;
const TopRatedDoctors = async () => {
  const doctorsResult = await getDoctors();
  const doctors: IDoctor[] = doctorsResult.data;

  const topRatedDoctors = doctors
    ?.filter((doctor) => typeof doctor.averageRating === "number")
    .sort((a, b) => b.averageRating! - a.averageRating!)
    .slice(0, 3);

  return (
    <section className="bg-blue-50/50 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            Our Top Rated Doctors
          </h2>
          <p className="text-muted-foreground mt-4">
            Access to medical experts from various specialties, ready to provide
            you with top-notch medical services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {topRatedDoctors?.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/consultation">
            <Button size="lg">View All Doctors</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
