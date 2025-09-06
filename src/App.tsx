import { Button } from "@headlessui/react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis eligendi sint quasi, laudantium minus, voluptatem
      libero porro animi recusandae repellendus amet tempora voluptatibus ab beatae? Voluptatibus ullam optio velit nam?
      <Button className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500">
        Save changes
      </Button>
    </div>
  );

  // return (
  //   <Routes>
  //     <Route path="/" element={<Login />} />
  //     <Route element={<Layout />}>
  //       <Route path="/documents" element={<Documents />} />
  //     </Route>
  //   </Routes>
  // );
}

export default App;
