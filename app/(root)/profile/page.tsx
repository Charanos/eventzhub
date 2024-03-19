import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { SearchParamProps } from "@/types";
import { Button } from "@/components/ui/button";
import Collection from "@/components/shared/Collection";
import { IOrder } from "@/lib/database/models/order.model";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.ordersPage) || 1;
  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

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

        <section className="wrapper my-8">
          <Collection
            limit={3}
            page={ordersPage}
            data={orderedEvents}
            urlParamName="ordersPage"
            collectionType="My_Tickets"
            totalPages={orders?.totalPages}
            emptyTitle="No Event Ticket Purchased Yet"
            emptyStateSubText="No worries - Plenty of exciting events to explore!"
          />
        </section>
      </section>

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
            limit={3}
            page={eventsPage}
            urlParamName="eventsPage"
            data={organizedEvents?.data}
            collectionType="Events_Organized"
            totalPages={organizedEvents?.totalPages}
            emptyTitle="You Haven't Created Any Events Yet"
            emptyStateSubText="You can create some right now!"
          />
        </section>
      </section>
    </>
  );
};

export default ProfilePage;
