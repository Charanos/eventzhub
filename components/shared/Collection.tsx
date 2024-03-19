import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import { IEvent } from "@/lib/database/models/event.model";

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  totalPages?: number;
  page: number | string;
  limit: number | string;
  urlParamName?: string;
  emptyStateSubText: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};

const Collection = ({
  data,
  page,
  limit,
  emptyTitle,
  urlParamName,
  collectionType,
  totalPages = 0,
  emptyStateSubText,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hidePrice = collectionType === "My_Tickets";
              const hasOrderLink = collectionType === "Events_Organized";

              return (
                <li key={event._id} className="flex justify-center">
                  <Card
                    event={event}
                    hidePrice={hidePrice}
                    hasOrderLink={hasOrderLink}
                  />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              urlParamName={urlParamName}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-6 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>

          <p className="p-regular-14">{emptyStateSubText}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
