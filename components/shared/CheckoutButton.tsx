"use client";

import Link from "next/link";
import Checkout from "./Checkout";
import { Button } from "../ui/button";
import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventStarted = new Date(event.startDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {/* cannot buy events that have already begun  */}
      {hasEventStarted ? (
        <p className="py-2 text-red-600 uppercase">
          tickets for this event are no longer available for purchase!
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full " size="lg">
              <Link href="/sign-in">Sign in to purchase your ticket</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
