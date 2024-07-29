import {Navigate, useLoaderData, Await} from "react-router-dom";
import {JSX, Suspense} from "react";
import CustomBackdrop from "../core/CustomBackdrop.tsx";

export default function AuthGuard(
  {
    children,
  }: {
    children: JSX.Element;
  }) {
  const {tokenPromise}: any = useLoaderData();

  return (
    <Suspense fallback={<CustomBackdrop isOpen={true}/>}>
      <Await
        resolve={tokenPromise}
        children={(result) => {
          if (result) {
            return children;
          }
          return <Navigate to="/login" replace={true}/>;
        }
        }
      />
    </Suspense>
  );
}
