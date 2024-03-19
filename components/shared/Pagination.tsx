"use client";

import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  totalPages: number;
  page: number;
  urlParamName?: string;
};

const Pagination = ({
  page,
  totalPages,
  urlParamName = "page",
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const newUrl = formUrlQuery({
        key: urlParamName,
        value: newPage.toString(),
        params: searchParams.toString(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={page <= 1}
        onClick={() => handleClick(page - 1)}
      >
        Previous
      </Button>
      <Button
        size="lg"
        className="w-28"
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => handleClick(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
