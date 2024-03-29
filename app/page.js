import { Suspense } from "react";
import Form from "./addTodoForm"
import Todos from "./Todos";

export default async function Home() {

  return (
    <div className="container">
      <Form />

      <Suspense fallback={<div>Loading...</div>}>
        <Todos />
      </Suspense>
    </div>
  );
}
