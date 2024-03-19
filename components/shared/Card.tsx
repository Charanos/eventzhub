import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { formatDateTime } from "@/lib/utils";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { IEvent } from "@/lib/database/models/event.model";

type CardProps = {
  event: IEvent;
  hidePrice: boolean;
  hasOrderLink: boolean;
};

const Card = ({ event, hidePrice, hasOrderLink }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer?._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white/65 backdrop-blur-sm shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50/55 bg-cover bg-no-repeat bg-center text-grey-500"
      />

      {/* is event creator  */}
      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white/40 p-2 shadow-sm transition-all hover:bg-white/80 ">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="\assets\icons\edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-4 md:gap-5 p-5">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="uppercase p-semibold-14 w-min rounded-full bg-green-100 py-1 px-4 text-green-600">
              {event.isFree ? "free" : `$${event.price}`}
            </span>

            <p className="uppercase p-semibold-14 w-max rounded-full bg-orange-500/10 py-1 px-4 text-orange-600">
              {event.category.name}
            </p>
          </div>
        )}

        <p className="p-medium-16 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <Link href={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 text-1 text-black">
            {event.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            By: {event.organizer.firstName} {event.organizer?.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500 uppercase">order details</p>
              <Image
                src="\assets\icons\arrow.svg"
                alt="arrow"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
