"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Music, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useModalStore } from "~/app/_providers/modal-store-provider";
import { Button } from "~/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/components/ui/form";
import { Input } from "~/shared/components/ui/input";
import { getPublicImageUrl } from "~/shared/lib/storage/utils";
import { useTRPC } from "~/shared/lib/trpc/client";
import { usePlaylistView } from "../context/playlist-view-context";
import { uploadPlaylistImage } from "../procedures/actions/upload-playlist-image";

const formSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  image: z.string().nullable(),
  extractedColor: z.string().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

export function EditPlaylistModal() {
  const modalStore = useModalStore((state) => state);
  const { playlistId } = usePlaylistView();
  const isModalOpen = modalStore.isOpen && modalStore.type === "edit-playlist";
  const onCloseModal = modalStore.close;

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: playlist } = useSuspenseQuery(
    trpc.playlist.getById.queryOptions({ id: playlistId }),
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(playlist.image ?? null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const { mutateAsync: updatePlaylist } = useMutation(
    trpc.playlist.update.mutationOptions({
      onSuccess: async () => {
        onCloseModal();
        await queryClient.invalidateQueries({
          queryKey: trpc.playlist.getById.queryKey({ id: playlistId }),
        });
      },
    }),
  );

  const form = useForm<FormValues>({
    defaultValues: {
      title: playlist.title,
      image: image,
      extractedColor: playlist.extractedColor,
    },
    resolver: zodResolver(formSchema),
  });

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (data: FormValues) => {
    let imageUrl: string | null = null;
    let newExtractedColor: string | null = null;

    if (newImageFile) {
      const { success, uri, extractedColor } = await uploadPlaylistImage({
        file: newImageFile,
        ownerId: playlist.owner.id,
        playlistId: playlist.id,
      });

      if (!success || !uri) {
        return;
      }
      imageUrl = uri;
      newExtractedColor = extractedColor;
    } else {
      newExtractedColor = data.extractedColor;
      imageUrl = data.image;
    }

    await updatePlaylist({
      id: playlist.id,
      data: {
        title: data.title,
        image: imageUrl,
        extractedColor: newExtractedColor,
      },
    });
  };

  useEffect(() => {
    return () => {
      if (image?.startsWith("blob:")) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onCloseModal}>
      <DialogContent className="gap-0 p-0">
        <DialogHeader className="p-6">
          <DialogTitle>Изменение сведений</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`grid grid-cols-[180px_1fr] grid-rows-[32px_132px_32px_auto] gap-4 px-6 pb-6 [grid-template-areas:"image_title"_"image_description"_"._save-button"_"disclaimer_disclaimer"]`}
          >
            <input
              ref={fileInputRef}
              disabled={isPending}
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                if (!file) return;
                setImage(URL.createObjectURL(file));
                setNewImageFile(file);
              }}
              accept="image/*"
              type="file"
              className="hidden"
            />

            <div className="relative size-[180px] [grid-area:image]">
              <div className="relative size-full rounded-sm">
                {image ? (
                  <Image
                    src={
                      newImageFile === null ? getPublicImageUrl(image) : image
                    }
                    alt="Playlist image"
                    loading="eager"
                    fill
                    sizes="(max-width: 768px) 100vw, 180px"
                    className="rounded-sm object-cover object-center"
                  />
                ) : (
                  <div className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-sm shadow-[0_4px_60px_rgba(0,0,0,0.5)]">
                    <Music className="size-12" />
                  </div>
                )}
              </div>
              <div className="absolute inset-0">
                <div className="group size-full">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                    className="flex size-full flex-col items-center justify-center gap-2 rounded-sm opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Pencil className="mt-4 size-12" />
                    <span>Pick image</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="relative [grid-area:title]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название плейлиста</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Название плейлиста"
                        className="w-full"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-self-end [grid-area:save-button]">
              <Button
                type="submit"
                className="h-12 rounded-full text-base font-bold"
                disabled={isPending}
              >
                {isPending ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
