"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createSpecialty } from "@/services/admin/specialitiesManagement";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ISpecialitiesFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SpecialitiesFormDialog = ({
  open,
  onClose,
  onSuccess,
}: ISpecialitiesFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, pending] = useActionState(createSpecialty, null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const hasShownToast = useRef(false);
  
  const handleClose = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setSelectedFile(null);
    formRef.current?.reset();
    onClose();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };
  useEffect(() => {
    if (open) {
      hasShownToast.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (!state || hasShownToast.current) return;

    hasShownToast.current = true;

    if (state.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else {
      toast.error(state.message);

      // restore file input on validation error
      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state, onSuccess, onClose, selectedFile]);


  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Specialty</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              name="title"
              placeholder="Cardiology"
              defaultValue={state?.formData?.title || ""}
            />
            <InputFieldError field="title" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="file">Upload Icon</FieldLabel>

            <Input
              ref={fileInputRef}
              onChange={handleFileChange}
              id="file"
              name="file"
              type="file"
              accept="image/*"
            />
            <InputFieldError field="icon" state={state} />
          </Field>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save Specialty"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialitiesFormDialog;
