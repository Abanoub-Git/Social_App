import { PacmanLoader } from "react-spinners";

export default function Loading() {
  return (
    <>
    <div className="bg-gray-400 fixed top-0 bottom-0 z-50 start-0 end-0 flex justify-center items-center">
        <PacmanLoader color="white" size={100} />
    </div>
    </>
  )
}
