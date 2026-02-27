import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import * as zod from "zod";
import AppButton from "../../Shared/AppButton/AppButton";
import {Profile,User,Sms,Key,Lock,Calendar} from "iconsax-reactjs";

const schema = zod
  .object({
    name: zod.string("Name Must Be Text").regex(/[a-zA-Z][a-zA-Z ]{3,19}/, "Enter Valiad Name").nonempty("Name is Required"),
    username: zod.string("Username must be text").regex(/^[a-zA-Z][a-zA-Z ]{3,20}$/,"enter a valid username").nonempty("Username is required"),
    email: zod.email("Email not valid"),
    password: zod.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"Enter Valid Password"),
    rePassword: zod.string(),
    dateOfBirth: zod.coerce.date().refine(function (value) {
          const today = new Date();
          const age = today.getFullYear() - value.getFullYear();
          if (age > 18) {
            return true;
          }
          return false;
        },
        {
          error: "User Age Must Be Above 18 years old",
        }).transform(function (value) {
        return value.toLocaleDateString("en-CA");
        }),
        gender: zod.enum(["male", "female"]), //bta5od mne array of string
        }).refine(function ({ password, rePassword }) { //bdl value.pass w value.rePass
          if (password == rePassword) {
            return true;
          }
          return false;
          },
          {
            error: "Password and Confirm Password Should Be Same",
            path: ["rePassword"], //3shan my3rdsh alerror fehom kolhom
          });

export default function Register() {
  const myNavigate = useNavigate()
  const [isloading, setIsLoading] = useState(false);
  //3shan m3mlsh kza wa7da a3ml destruct
  const {handleSubmit,register,formState: { errors },setError,watch,control} = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "all",
    resolver: zodResolver(schema),
  });

  async function sendUserRegister(x) {
    setIsLoading(true);
    await toast.promise(
      axios.post(`${import.meta.env.VITE_BASE_URL}users/signup`, x),
      {
        loading: "Saving...",
        success: function (msgs) {
          myNavigate('/login')
          return <p className="text-green-600">{msgs.data.message}</p>;
        },
        error: function (msgs) {
          return <p className="text-red-600">{msgs.response.data.error}</p>;
        },
      },
    );
    setIsLoading(false);
  }


  return (
  <>
    <title>Registeration Page | 88</title>
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100">
      <div className="hidden md:flex flex-col justify-center items-center bg-linear-to-br from-cyan-500 via-teal-500 to-emerald-500 text-white p-12 relative overflow-hidden">
        <div className="bg-white/20 backdrop-blur-md size-30 flex items-center justify-center rounded-3xl text-5xl font-bold shadow-2xl mb-6">
          88
        </div>
        <h1 className="text-5xl font-bold mb-6 text-center leading-tight">
          Join The Future <br /> Of Social Connection
        </h1>
        <p className="text-lg text-center max-w-md opacity-90">
          Share moments, connect with friends, and discover a world built around you.
        </p>
        <div className="absolute -top-12 right-0 opacity-10 text-[180px] font-extrabold select-none">
          Social
        </div>
        <div className="absolute -bottom-12 left-0 opacity-10 text-[180px] font-extrabold select-none">
          Social
        </div>
      </div>


      <div className="flex justify-center items-center p-6">
        <Form
          onSubmit={handleSubmit(sendUserRegister)}
          className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-2xl border border-gray-200 transition-all duration-300"
        >
          <div className="md:hidden w-full">
            <div className="text-emerald-700 text-3xl font-bold text-center">
              88 <span className="text-emerald-600">Platform</span>
            </div>
          </div>
          <p className="text-lg text-center text-gray-500 mb-5">
            Share moments, connect with friends, and discover a world built around you.
          </p>
          <h2 className="text-2xl hidden md:text-4xl md:block font-bold text-center mb-6 text-gray-800">
            Create Account
          </h2>
          {/* Name */}
          <Input
            {...register("name")}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            label="Name"
            labelPlacement="outside"
            placeholder="Enter your name"
            startContent={
              <Profile
                size="18"
                className="text-gray-400 transition group-focus-within:text-emerald-600 group-focus-within:scale-110"
              />
            }
            classNames={{
              inputWrapper:
                "bg-gray-100 hover:bg-gray-200 focus-within:bg-white transition group",
              label: errors.name ? "text-red-500" : "text-gray-700",
            }}
          />
          {/* Username */}
          <Input
            {...register("username")}
            isInvalid={!!errors.username}
            errorMessage={errors.username?.message}
            label="User Name"
            labelPlacement="outside"
            placeholder="Enter your username"
            startContent={
              <User
                size="18"
                className="text-gray-400 transition group-focus-within:text-emerald-600 group-focus-within:scale-110"
              />
            }
            classNames={{
              inputWrapper:
                "bg-gray-100 hover:bg-gray-200 focus-within:bg-white transition group",
              label: errors.username ? "text-red-500" : "text-gray-700",
            }}
          />
          {/* Email */}
          <Input
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            type="email"
            startContent={
              <Sms
                size="18"
                className="text-gray-400 transition group-focus-within:text-emerald-600 group-focus-within:scale-110"
              />
            }
            classNames={{
              inputWrapper:
                "bg-gray-100 hover:bg-gray-200 focus-within:bg-white transition group",
              label: errors.email ? "text-red-500" : "text-gray-700",
            }}
          />
          {/* Password */}
          <Input
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            label="Password"
            labelPlacement="outside"
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password"
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
          {/* Confirm Password */}
          <Input
            {...register("rePassword")}
            isInvalid={!!errors.rePassword}
            errorMessage={errors.rePassword?.message}
            label="Confirm Password"
            labelPlacement="outside"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm your password"
            startContent={
              <Lock
                size="18"
                className="text-gray-400 transition group-focus-within:text-emerald-600 group-focus-within:scale-110"
              />
            }
            classNames={{
              inputWrapper:
                "bg-gray-100 hover:bg-gray-200 focus-within:bg-white transition group",
              label: errors.rePassword ? "text-red-500" : "text-gray-700",
            }}
          />
          {/* Date */}
          <Input
            {...register("dateOfBirth")}
            isInvalid={!!errors.dateOfBirth}
            errorMessage={errors.dateOfBirth?.message}
            label="Date Of Birth"
            labelPlacement="outside"
            type="date"
            startContent={
              <Calendar
                size="18"
                className="text-gray-400 transition group-focus-within:text-emerald-600 group-focus-within:scale-110"
              />
            }
            classNames={{
              inputWrapper:
                "bg-gray-100 hover:bg-gray-200 focus-within:bg-white transition group",
              label: errors.dateOfBirth ? "text-red-500" : "text-gray-700",
            }}
          />
          {/* Gender */}
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                selectedKeys={[field.value]}
                label="Gender"
                labelPlacement="outside"
                placeholder="Select your gender"
                startContent={
                  <User size="18" className="text-gray-400" />
                }
                classNames={{
                  trigger:
                    "bg-gray-100 hover:bg-gray-200 focus:bg-white transition",
                  label: "text-gray-700",
                }}
              >
                <SelectItem key={"male"}>Male</SelectItem>
                <SelectItem key={"female"}>Female</SelectItem>
              </Select>
            )}
          />
          {/* Buttons */}
          <div className="flex flex-col gap-2 w-full mt-4">
            <AppButton
              type="submit"
              isLoading={isloading}
              className="rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition duration-200 bg-emerald-700 text-white"
            >
              Create Account
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-800/70 font-semibold hover:underline hover:text-emerald-600"
            >
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  </>
);}
