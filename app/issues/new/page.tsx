"use client";

import "easymde/dist/easymde.min.css";
import { useState } from "react";
import axios from "axios";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { SimpleMdeReact } from "react-simplemde-editor";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";

type IssueProps = z.infer<typeof createIssueSchema>;

const NewIssuesPage = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueProps>({
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
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMdeReact {...field} />}
        />
        <Button disabled={isSubmitting}>
          Create Issue{isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuesPage;
