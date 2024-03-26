"use client";
import React, { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import PlusIcon from "@/public/assets/icons/PlusIcon";
import { Checkbox } from "@/components/ui/checkbox";
import CloseIcon from "@/public/assets/icons/CloseIcon";
import CheckBoxIcon from "@/public/assets/icons/CheckboxIcon";
import ImageIcon from "@/public/assets/icons/ImageIcon";
import { userUpdate } from "@/lib/actions/user.actions";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import CalendarIcon from "@/public/assets/icons/CalendarIcon";
import CloudUploadIcon from "@/public/assets/icons/CloudUploadIcon";
import Spinner from "../shared/Spinner";
import { redirect } from "next/navigation";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const formSchema = z.object({
  picture: z.any(),
  name: z.string().min(2).max(50),
  portfolio: z.string().url().min(2).optional(),
  goals: z
    .array(
      z.object({
        checked: z.boolean(),
        text: z.string().min(2).max(50),
      }),
    )
    .min(1, { message: "Please provide at least 1 goal." }),
  levels: z
    .array(
      z.object({
        text: z.string().min(2).max(50),
      }),
    )
    .min(1),
  stack: z.string().min(2).max(50),
  available: z.boolean(),
  start: z
    .date()
    .min(tomorrow, { message: "Start date has to be after today" }),
  end: z.date().min(tomorrow, { message: "End date has to be after today" }),
});

const BoardingForm = ({ step, goToNextStep }: BoardingFormProps) => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imgUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      picture: "",
      name: "",
      portfolio: "",
      goals: [
        {
          checked: false,
          text: "",
        },
      ],
      levels: [
        {
          text: "",
        },
      ],
      stack: "",
      available: false,
      start: tomorrow,
      end: tomorrow,
    },
  });
  const goalFields = useFieldArray({
    control: form.control,
    name: "goals",
  });
  const levelFields = useFieldArray({
    control: form.control,
    name: "levels",
  });

  const handleRemove = (type: string, index: number) => {
    if (type === "goal" && goalFields.fields.length > 1) {
      goalFields.remove(index);
    } else if (type === "level" && levelFields.fields.length > 1) {
      levelFields.remove(index);
    }
  };

  const handleNextStep = async () => {
    const fieldsPerStep = [
      ["picture", "name", "portfolio"] as const,
      ["goals"] as const,
      ["levels", "stack"] as const,
      ["available", "start", "end"] as const,
    ];

    const isValid = await form.trigger(fieldsPerStep[step]);
    if (isValid) goToNextStep();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      console.log(imgUrl, "URL in onSubmit");
      const updateRes = await userUpdate(values, imgUrl);
      console.log(updateRes, "Update response in boarding form");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    redirect("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-4">
        {step === 0 && (
          <>
            <h2 className="h2-bold p-0 text-light-300">Basic Information</h2>
            <div className="flex items-center justify-start gap-2">
              <div className="flex size-[100px] items-center justify-center rounded bg-dark-700 p-3">
                {imagePreview ? (
                  <div className="md:max-w-[200px]">
                    <CldImage
                      src={imagePreview}
                      alt="Image you uploaded for your profile picture"
                      className="rounded-full"
                      width={200}
                      height={200}
                    />
                  </div>
                ) : (
                  <ImageIcon width={24} height={24} />
                )}
              </div>
              <CldUploadWidget
                uploadPreset="gitnote"
                // @ts-expect-error eslint-disable-next-line
                onSuccess={(results: UploadResultImage) => {
                  if (results?.info?.secure_url)
                    setImageUrl(results?.info.secure_url);
                  setImagePreview(results?.info.public_id);
                }}
              >
                {({ open }) => {
                  return (
                    <Button
                      type="button"
                      variant={"dark"}
                      className="gap-2"
                      onClick={() => open()}
                    >
                      <CloudUploadIcon />
                      Update Profile Picture
                    </Button>
                  );
                }}
              </CldUploadWidget>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-light-300">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-dark-700 bg-dark-700"
                      placeholder="Your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-light-300">Portfolio</FormLabel>
                  <FormControl>
                    <Input
                      className="border-dark-700 bg-dark-700"
                      placeholder="Your portfolio url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={handleNextStep} variant={"default"}>
              Next
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="h2-bold text-light-300">Add your learning goals</h2>
            <div className="flex flex-col gap-4">
              {!!form.formState.errors.goals?.message && (
                <span className="p3-bold px-2 text-red-500">
                  {form.formState.errors.goals.message}
                </span>
              )}
              {goalFields.fields.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center  justify-start gap-2"
                  >
                    <div className="flex w-full items-center justify-start gap-2 rounded-md bg-dark-700 px-2">
                      <FormField
                        control={form.control}
                        name={`goals.${index}.checked`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox
                                className="size-5 border-light-300 bg-dark-600 p-0 placeholder:text-light-300 focus-visible:outline-none"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`goals.${index}.text`}
                        render={({ field }) => (
                          <FormItem className="w-full focus-visible:border-none">
                            <FormControl>
                              <Input
                                className="placeholder:p3-regular w-full border-none bg-transparent 
                                outline-none focus:outline-none focus-visible:border-none focus-visible:ring-0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <CloseIcon onClick={() => goalFields.remove(index)} />
                    </div>
                  </div>
                );
              })}
              <Button
                type="button"
                onClick={() => goalFields.append({ checked: false, text: "" })}
                variant={"secondary"}
                className="flex w-full items-center justify-center gap-2"
              >
                <PlusIcon />
                Add new goal checkbox
              </Button>
            </div>

            <Button type="button" onClick={handleNextStep} variant={"default"}>
              Next
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="h2-bold p-0 text-light-300">
              Add your knowledge level
            </h2>

            {levelFields.fields.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-start gap-2 rounded-md border-dark-700 bg-dark-700 px-2 "
                >
                  <CheckBoxIcon />
                  <FormField
                    control={form.control}
                    name={`levels.${index}.text`}
                    render={({ field }) => (
                      <FormItem className="w-full focus-visible:border-none">
                        <FormControl>
                          <Input
                            className="placeholder:p3-regular w-full border-none bg-transparent "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <CloseIcon onClick={() => handleRemove("level", index)} />
                </div>
              );
            })}

            <Button
              type="button"
              onClick={() => levelFields.append({ text: "" })}
              variant={"secondary"}
              className="flex w-full items-center justify-center gap-2"
            >
              <PlusIcon />
              Add knowledge checkmark
            </Button>

            <FormField
              control={form.control}
              name="stack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-light-300">Tech stack</FormLabel>
                  <FormControl>
                    <Input
                      className="p3-bold border-dark-700 bg-dark-700 placeholder:text-light-300"
                      placeholder="Enter different technologies you know."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="button" onClick={handleNextStep} variant={"default"}>
              Next
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="h2-bold p-0 text-light-300">
              Schedule & availability
            </h2>
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-start gap-2">
                    <FormControl>
                      <Checkbox
                        onCheckedChange={field.onChange}
                        checked={field.value}
                      />
                    </FormControl>
                    <FormLabel className="text-light-300">
                      Are you available for a new project?
                    </FormLabel>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date & Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal gap-2",
                              !field.value && "text-muted-foreground",
                            )}
                            variant={"dark"}
                          >
                            <CalendarIcon />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          className="rounded bg-dark-700"
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The time is in your local timezone
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date & Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal gap-2",
                              !field.value && "text-muted-foreground",
                            )}
                            variant={"dark"}
                          >
                            <CalendarIcon />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          className="rounded bg-dark-700"
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The time is in your local timezone
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" variant={"default"}>
              {isLoading ? <Spinner /> : <p>Submit</p>}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
};

export default BoardingForm;
