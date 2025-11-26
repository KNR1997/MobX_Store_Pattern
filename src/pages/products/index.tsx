import { useStores } from "@/providers/StoresProvider";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useEffect } from "react";

export default function Products() {
  const { courses } = useStores();

  useEffect(() => {
    const course = courses.get("c6395ed8-4671-4bac-89a0-cd5405867e4b");
    console.log("course found: ", course);
  }, []);

  return (
    <div>
      <h2>Products Page</h2>

      <NextLink href="/courses" className="w-full h-12 md:w-auto md:ms-6">
        <span>Redirect to Courses</span>
      </NextLink>
    </div>
  );
}
