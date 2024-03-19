import { auth } from "@clerk/nextjs";
import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);

  return (
    <>
      <section className="w-full bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center flex items-center justify-center sm:text-left uppercase mt-20">
          update event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          type="Update"
          event={event}
          userId={userId}
          eventId={event._id}
        />
      </div>
    </>
  );
};

export default UpdateEvent;
