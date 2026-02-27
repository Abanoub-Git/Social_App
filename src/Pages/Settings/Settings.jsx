import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import toast from "react-hot-toast";
import { Button, Input, Form } from "@heroui/react";
import { axiosInterceptos } from "../../Shared/axiosInterceptors/axiosInterceptors";
import { Key } from "iconsax-reactjs";

const schema = zod.object({
    currentPassword: zod.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,"Enter Valid Password"),
    password: zod.string("At least 8 characters with uppercase, lowercase, number").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,"Enter Valid Password"),
    rePassword: zod.string(),
    }).refine((data) => data.password === data.rePassword, {
        message: "Passwords do not match",
        path: ["rePassword"],
    });


    export default function Settings() {
    const {handleSubmit,register,formState: { errors },} = useForm({
        defaultValues: {
        currentPassword: "",
        password: "",
        rePassword: "",
        },resolver: zodResolver(schema),
        mode: "all",
    });


    //change password calling api
    async function changePassword(data) {
        const payload = {password: data.currentPassword,newPassword: data.password,};
        await toast.promise(
        axiosInterceptos.patch("users/change-password", payload),
        {
            loading: "Updating password...",
            success: (res) => {
            const newToken = res?.data?.token;
            if (newToken) localStorage.setItem("token", newToken);
            return res?.data?.message;
            },
            error: (err) =>
            err?.response?.data?.error ||
            err?.response?.data?.message ||
            "Something went wrong",
        }
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-600/30 to-white flex justify-center items-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10">
            <div className="flex items-center gap-4 mb-8">
            <div className="bg-emerald-100 p-3 rounded-full">
                <Key size="24" className="text-emerald-800" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">
                Change Password
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                Keep your account secure by using a strong password.
                </p>
            </div>
            </div>
            <Form
            onSubmit={handleSubmit(changePassword)}
            className="space-y-6"
            >
            <Input
                {...register("currentPassword")}
                type="password"
                label="Current password"
                placeholder="Enter current password"
                autoComplete="current-password"
                isInvalid={!!errors.currentPassword}
                errorMessage={errors.currentPassword?.message}
                size="lg"
            />
                <Input
                {...register("password")}
                type="password"
                label="New password"
                placeholder="Enter new password"
                autoComplete="new-password"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                size="lg"
                />
            <Input
                {...register("rePassword")}
                type="password"
                label="Confirm new password"
                placeholder="Re-enter new password"
                autoComplete="new-password"
                isInvalid={!!errors.rePassword}
                errorMessage={errors.rePassword?.message}
                size="lg"
            />
            <Button
                type="submit"
                className="w-full h-12 text-white font-semibold bg-emerald-800 hover:opacity-90 transition rounded-xl"
            >
                Update password
            </Button>
            </Form>
        </div>
        </div>
    );
}
