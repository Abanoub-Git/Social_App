import { Image, Input, Spinner } from "@heroui/react";
import { useContext } from "react";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import { useForm } from "react-hook-form";
import { Camera, Send } from "iconsax-reactjs";
import useCreateComment from "../../Hooks/useCreateComment/useCreateComment";

export default function CreateComment({ id }) {
  const { userData } = useContext(AuthUserContext);
  const { handleSubmit, register, reset, watch } = useForm({
    defaultValues: { content: "" },
  });

  const contentValue = watch("content");

  const {
    handleSubmitComment,
    handleImageChange,
    removeImage,
    preview,
    isPending,
    isDisabled,
  } = useCreateComment(id, reset, contentValue);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitComment)}
      className="flex flex-col gap-3 mt-3"
    >
      <div className="flex items-center gap-3">
        <Image
          src={userData?.photo}
          className="rounded-full"
          width={35}
          height={35}
        />
        <Input
          {...register("content")}
          placeholder="Write a comment..."
          className="flex-1"
          radius="full"
          size="md"
        />
        <label className="text-emerald-800 font-semibold bg-emerald-300/50 cursor-pointer rounded-full p-1.5 hover:bg-emerald-300/70">
          <Input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
            className="hidden"
          />
          <Camera size={18} />
        </label>
        <button
          type="submit"
          disabled={isDisabled}
          className={`text-white font-semibold text-sm rounded-full p-2 transition ${
            isDisabled
              ? "bg-emerald-800/50 cursor-not-allowed"
              : "bg-emerald-800 hover:bg-emerald-900 cursor-pointer"
          }`}
        >
          {isPending ? <Spinner size="sm" color="white" className="px-0.5"/> : <Send size={20} />}
        </button>
      </div>
      {preview && (
        <div className="relative w-fit">
          <img
            src={preview}
            className="rounded-xl max-h-40"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 cursor-pointer bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </form>
  );
}