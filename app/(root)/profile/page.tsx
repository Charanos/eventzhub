import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Collection from "@/components/shared/Collection";
import { getEventsByUser } from "@/lib/actions/event.actions";

const ProfilePage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <>
      {/* my tickets  */}
      <section className="py-5 bg-primary-50 bg-dotted-pattern bg-cover bg-center md:py-10 mt-20">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">my tickets</h3>

          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events" className="uppercase">
              explore more events
            </Link>
          </Button>
        </div>
      </section>

      {/* <section className="wrapper my-8">
        <Collection
          page={1}
          limit={3}
          totalPages={2}
          data={events?.data}
          urlParamName='ordersPage'
          collectionType="My_Tickets"
          emptyTitle="No Event Ticket Purchased Yet"
          emptyStateSubText="No worries - Plenty of exciting events to explore!"
        />
      </section> */}

      {/* events organized */}
      <section className="py-5 bg-primary-50 bg-dotted-pattern bg-cover bg-center md:py-10 mt-20">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">events organized</h3>

          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create" className="uppercase">
              create new event
            </Link>
          </Button>
        </div>

        <section className="wrapper my-8">
          <Collection
            page={1}
            limit={6}
            totalPages={2}
            urlParamName="eventsPage"
            data={organizedEvents?.data}
            collectionType="Events_Organized"
            emptyTitle="You Haven't Created Any Events Yet"
            emptyStateSubText="You can create some right now!"
          />
        </section>
      </section>
    </>
  );
};

export default ProfilePage;
