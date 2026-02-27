import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import * as zod from "zod";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import { Link } from "react-router";
import AppButton from "../../Shared/AppButton/AppButton";
import { Key, Sms } from "iconsax-reactjs";



const schema = zod.object({
    email: zod.email("Email not valid"),
    password: zod.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"Enter Valid Password")});

export default function Login() {
  const {setUserData} = useContext(AuthUserContext)
  const myNavigate = useNavigate()
  const [isloading, setIsLoading] = useState(false);
  const {handleSubmit,register,formState: { errors },setError,watch,control,} = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(schema),
  });


  // send user login data api call
  async function sendUserLogin(x) {
  try {
    setIsLoading(true);
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}users/signin`,x);
    localStorage.setItem("token", res.data.data.token);
    setUserData(res.data.data.user);
    myNavigate("/");
    toast.success(res.data.message);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Login failed"
    );
  } finally {
    setIsLoading(false);
  }
}


  return (
  <>
    <title>Login Page | 88</title>
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100">

      <div className="hidden md:flex flex-col justify-center items-center bg-linear-to-br from-cyan-500 via-teal-500 to-emerald-500 text-white p-12 relative overflow-hidden">
        <div className="bg-white/20 backdrop-blur-md size-30 flex items-center justify-center rounded-3xl text-5xl font-bold shadow-2xl mb-6">
          88
        </div>
        <h1 className="text-5xl font-bold mb-6 text-center leading-tight">
          Welcome Back <br /> To 88 Platform
        </h1>
        <p className="text-lg text-center max-w-md opacity-90">
          Continue your journey and reconnect with your world.
        </p>
        <div className="absolute -top-12 right-0 opacity-10 text-[110px] font-extrabold select-none">
          Social
        </div>
        <div className="absolute -bottom-12 left-0 opacity-10 text-[110px] font-extrabold select-none">
          Social
        </div>
      </div>

      <div className="flex justify-center items-center p-6">
        <Form
          onSubmit={handleSubmit(sendUserLogin)}
          className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-2xl border border-gray-200 transition-all duration-300"
        >

          <div className="md:hidden w-full mb-4">
            <div className="text-emerald-700 text-3xl font-bold text-center">
              88 <span className="text-emerald-600">Platform</span>
            </div>
          </div>
          <p className="text-lg text-center w-full text-gray-500 mb-5">
            Welcome back! Please enter your details.
          </p>
          <h2 className="text-2xl hidden md:text-4xl md:block font-bold text-center mb-6 text-gray-800">
            Login
          </h2>

          <Input
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            className="mb-3"
            type="email"
            startContent={
              <Sms
                size="18"
                className="text-gray-400  transition group-focus-within:text-emerald-600 group-focus-within:scale-110"
              />
            }
            classNames={{
              inputWrapper:
                "bg-gray-100 hover:bg-gray-200 focus-within:bg-white transition group",
              label: errors.email ? "text-red-500" : "text-gray-700",
            }}
          />

          <Input
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            label="Password"
            labelPlacement="outside"
            autoComplete="new-password"
            placeholder="Enter your password"
            type="password"
            startContent={
              <Key
                size="18"
                className="text-gray-400 transition group-focus-within:text-emerald-600 group-focus-within:scale-110"
              />
            }
            classNames={{
              inputWrapper:
                "bg-gray-100 hover:bg-gray-200 focus-within:bg-white transition group",
              label: errors.password ? "text-red-500" : "text-gray-700",
            }}
          />

          <div className="flex flex-col gap-3 w-full mt-6">
            <AppButton
              type="submit"
              isLoading={isloading}
              className="rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition duration-200 bg-emerald-700 text-white"
            >
              Login
            </AppButton>
            <AppButton
              type="reset"
              variant="flat"
              className="rounded-xl font-semibold"
            >
              Reset
            </AppButton>
          </div>
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-800/70 font-semibold hover:underline hover:text-emerald-600"
            >
              Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
  </>
);}
