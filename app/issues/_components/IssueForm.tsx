"use client";

import { ErrorMessage } from "@/app/components/index";
import Spinner from "@/app/components/Spinner";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssuesForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.group(error);
      setError("Something went wrong");
      setIsSubmitting(false);
    }
  });

  return (
    <div className="max-w-lg">
      <form onSubmit={onSubmit} className="space-y-3">
        {error && (
          <Callout.Root color="red">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => <SimpleMDE {...field} />}
        />
        <Button disabled={isSubmitting}>
          Create Issue{isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssuesForm;
