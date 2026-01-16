import AppointmentConfirmation from "@/components/modules/Patient/PatientAppointment/AppointmentConfirmation";
import { getDoctorById } from "@/services/admin/doctorManagement";
import { getScheduleById } from "@/services/admin/schedulesManagement";
import { IDoctor } from "@/types/doctor.interface";
import { ISchedule } from "@/types/schedule.interface";
import { notFound } from "next/navigation";

interface BookAppointmentPageProps {
  params: {
    doctorId: string;
    scheduleId: string;
  };
}

export default async function BookAppointmentPage({
  params,
}: BookAppointmentPageProps) {
  const { doctorId, scheduleId } = params;

  const [doctorResponse, scheduleResponse] = await Promise.all([
    getDoctorById(doctorId),
    getScheduleById(scheduleId),
  ]);

  if (!doctorResponse.success || !scheduleResponse.success) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AppointmentConfirmation
        doctor={doctorResponse.data}
        schedule={scheduleResponse.data}
      />
    </div>
  );
}
