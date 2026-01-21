import Image from "next/image";
import doctor1 from "../../../assets/images/doctor1.png";
import doctor2 from "../../../assets/images/doctor2.png";
import doctor3 from "../../../assets/images/doctor3.png";
import stethoscope from "../../../assets/images/Stetoscope.png";
import appointment from "../../../assets/images/appointment-icon.png";
import { Button } from "@/components/ui/button";
import { Brain, Baby } from "lucide-react";
import Link from "next/link";
const SpecialistIntro = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-24 flex flex-col lg:flex-row gap-12">
        {/* LEFT CONTENT */}
        <div className="relative flex-2">
          {/* Grid Background */}  
          <div className="absolute -top-[90px] -left-[120px] w-[700px] -z-10">
            <Image src={stethoscope} alt="grid background" />
          </div>  

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Healthier Hearts  
          </h1>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Come From
          </h1>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-primary">
            Preventive Care
          </h1>

          <p className="mt-6 text-muted-foreground max-w-xl">
            The built environment can encourage physical activity. Better
            visibility of stairs stimulates people to take them instead of the
            lift. Promoting walking or bicycling even for short distances helps
            incorporate physical activity into a daily routine.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href={"/consultation"}>
              <Button size="lg">
                <Image
                  src={appointment}
                  alt="appointment"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Make Appointment
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative flex-1 flex justify-center">
          {/* Arrow */}
          <div className="absolute left-[200px] -top-[30px]">
            <Brain className="w-10 h-10 text-primary opacity-70" />
          </div>

          <div className="flex gap-4">
            <div className="mt-10">
              <Image
                src={doctor1}
                width={240}
                height={380}
                alt="doctor 1"
                className="rounded-lg"
              />
            </div>
            <div>
              <Image
                src={doctor2}
                width={240}
                height={350}
                alt="doctor 2"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Doctor 3 */}
          <div className="absolute top-[350px] left-[100px]">
            <Image
              src={doctor3}
              width={300}
              height={300}
              alt="doctor 3"
              className="rounded-xl"
            />
          </div>

          {/* Stethoscope */}
          <div className="absolute -bottom-[50px] right-0 -z-10">
            <Image
              src={stethoscope}
              width={180}
              height={180}
              alt="stethoscope"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialistIntro;
