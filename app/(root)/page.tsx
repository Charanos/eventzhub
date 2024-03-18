import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";

export default async function Home() {
  const events = await getAllEvents({
    page: 1,
    limit: 6,
    query: "",
    category: "",
  });

  return (
    <>
      <section className="min-h-[95vh] bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10 ">
        <div className="wrapper grid grid-cols-1 gap-x-10 lg:gap-x-10 md:grid-cols-2 gap-y-10 2xl:gap-0 mt-20">
          <div className="flex flex-col justify-center gap-10">
            <h1 className="h1-bold text-black/90 capitalize">
              Unleashing the Power of Connection, One Remarkable Event at a
              Time!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Discover, Connect, and Create Unforgettable Experiences with Ease
              - Where Every Moment Counts!
            </p>
            <Button className="button w-full sm:w-fit" asChild size="lg">
              <Link href="#events" className="uppercase">
                explore now
              </Link>
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <Image
              alt="hero"
              width={1000}
              height={1000}
              src="/assets/images/event2.svg"
              className="max-h-[70vh] object-contain object-right 2xl:max-h-[50vh]"
            />
          </div>
        </div>
      </section>

      <section className="wrapper flex flex-col gap-8 md:gap-12 my-16">
        <h2 className="h2-bold items-center text-center">
          Embark on Unforgettable Journeys: <br /> Explore, Host, Connect.
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          search categoty filter
        </div>

        <Collection
          page={1}
          limit={6}
          totalPages={2}
          data={events?.data}
          urlParamName="allevents"
          collectionType="All_Events"
          emptyTitle="No Events Listed"
          emptyStateSubText="Come Back Later"
        />
      </section>
    </>
  );
}
