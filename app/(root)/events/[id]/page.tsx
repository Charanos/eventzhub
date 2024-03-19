import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import Collection from "@/components/shared/Collection";
import CheckoutButton from "@/components/shared/CheckoutButton";
import { SearchParamProps } from "@/types";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    eventId: event._id,
    categoryId: event.category._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid mt-20 grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            width={700}
            height={700}
            alt="event image"
            className="h-full w-full min-h-[300px] object-contain object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="uppercase p-bold-20 rounded-full bg-green-500/10 px-5 py-1 grid place-content-center text-green-700">
                    {event.isFree ? "free" : `$${event.price}`}
                  </p>

                  <p className="p-medium-16 rounded-full uppercase bg-orange-500/10 px-4 py-2.5 text-orange-500">
                    {event.category.name}
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    {event.organizer.firstName} {event.organizer?.lastName}
                  </span>
                </p>
              </div>
            </div>

            {/* checkout button  */}
            <CheckoutButton event={event} />

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="\assets\icons\calendar.svg"
                  alt="calender"
                  width={32}
                  height={32}
                />

                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p className="">
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>

                  <p className="">
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="\assets\icons\location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />

                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600 capitalize">
                what to expect
              </p>
              <p className="p-mediumm-16 lg:p-regular-18">
                {event.description}
              </p>
              <p className="p-mediumm-16 lg:p-regular-18 truncate text-primary-500 hover:underline hover:cursor-pointer">
                {event.url}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* events from the same category  */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold capitalize">related events</h2>
        <Collection
          limit={3}
          data={relatedEvents?.data}
          collectionType="All_Events"
          emptyTitle="No Events Listed"
          page={searchParams.page as string}
          emptyStateSubText="Come Back Later"
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetails;
