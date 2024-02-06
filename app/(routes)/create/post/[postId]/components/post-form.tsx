"use client";

import { Button, Divider, Textarea, User } from "@nextui-org/react";
import { Image, Post, Tag } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  images: z.object({ url: z.string() }).array(),
  body: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

type PostFormValues = z.infer<typeof formSchema>;

interface PostFormProps {
  initialData:
    | (Post & {
        images: Image[];
        tags: Tag[];
      })
    | null;
}

function PostForm({ initialData }: PostFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<PostFormValues>({
    defaultValues: {
      images: initialData?.images ?? [],
      body: initialData?.body ?? "",
      tags: initialData?.tags?.map((tag) => tag.body) ?? [],
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: PostFormValues) => {
    setLoading(true);
    console.log(values);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-screen md:px-5">
        <div className="h-full w-full flex flex-col lg:px-20 justify-center">
          <div className="flex items-center p-2 bg-white">
            <User
              name="Jane Doe"
              description="Product Designer"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
            <div className="ml-auto block">
              <Button
                size="sm"
                color="primary"
                variant="flat"
                className="px-5 font-semibold"
                type="submit"
              >
                Publicar
              </Button>
            </div>
          </div>
          <Divider />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FormField for the body of the post */}
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={loading}
                    placeholder="Escribe tu publicación"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FormField for the tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={loading}
                    placeholder="Escribe tu publicación"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}

export default PostForm;
