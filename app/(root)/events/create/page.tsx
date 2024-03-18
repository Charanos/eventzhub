import { auth } from "@clerk/nextjs";
import EventForm from "@/components/shared/EventForm";

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  // console.log(userId);

  return (
    <>
      <section className="w-full bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center flex items-center justify-center sm:text-left uppercase mt-20">
          create an event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
