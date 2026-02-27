import {Card,CardBody,CardHeader,Avatar,Textarea,} from "@heroui/react";
import { useContext, useRef, useState } from "react";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import AppButton from "../../Shared/AppButton/AppButton";
import {Image as ImageIcon,EmojiHappy,CloseCircle,GlobalEdit,} from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreatePost() {
  const { userData } = useContext(AuthUserContext);
  const imageUpload = useRef();
  const queryClient = useQueryClient();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      body: "",
    },
  });

  // Image Upload
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  // Remove Image
  function removeImage() {
    setImage(null);
    setPreview(null);
    imageUpload.current.value = ""; 
  }

  // Send Post api
  function sendPost(data) {
    const formData = new FormData();
    formData.append("body", data.body);
    if (image) formData.append("image", image);
    return axios.post(
      `${import.meta.env.VITE_BASE_URL}posts`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: sendPost,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      reset();
      removeImage();
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.error || "Something went wrong"
      );
    },
  });

  return (
    <Card className="bg-white shadow-md rounded-2xl">
      <CardHeader className="flex items-center gap-3 pb-0">
        <Avatar src={userData?.photo} size="md" className="size-12 me-1.5" />
        <div>
          <h4 className="font-semibold text-gray-800 capitalize">
            {userData?.name}
          </h4>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block mt-1 -ms-2">
            <GlobalEdit size="16" className="inline-block mr-1" />
            Public
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-4">
        <form onSubmit={handleSubmit(mutate)}>
          <Textarea
            {...register("body")}
            placeholder={`What's on your mind, ${userData?.name}?`}
            minRows={4}
            classNames={{
              inputWrapper: "bg-gray-50 border border-gray-200",
            }}
          />
          {preview && (
            <div className="relative mt-4">
              <img
                src={preview}
                alt="preview"
                className="rounded-xl w-full max-h-96 object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-1 hover:bg-black transition"
              >
                <CloseCircle size="22" />
              </button>
            </div>
          )}
          <div className="border-t border-black/50 my-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-gray-600">
              <div
                onClick={() => imageUpload.current.click()}
                className="flex items-center gap-2 cursor-pointer hover:text-green-600"
              >
                <ImageIcon size="20" />
                <span className="text-sm">Photo/video</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-500">
                <EmojiHappy size="20" />
                <span className="text-sm">Feeling/activity</span>
              </div>
            </div>
            <AppButton
              type="submit"
              isLoading={isPending}
              className="bg-emerald-700 text-white px-6"
            >
              Post
            </AppButton>
          </div>
        </form>
        <input type="file" ref={imageUpload} onChange={handleImageUpload} className="hidden" />
      </CardBody>
    </Card>
  );
}
