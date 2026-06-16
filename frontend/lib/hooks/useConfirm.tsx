"use client";

import { useState, useCallback, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
}

export function useConfirm() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    title: "",
    message: "",
  });
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback(
    (opts: ConfirmOptions): Promise<boolean> => {
      setOptions(opts);
      setOpen(true);
      return new Promise((resolve) => {
        resolveRef.current = resolve;
      });
    },
    []
  );

  const handleConfirm = useCallback(() => {
    setOpen(false);
    resolveRef.current?.(true);
  }, []);

  const handleCancel = useCallback(() => {
    setOpen(false);
    resolveRef.current?.(false);
  }, []);

  const ConfirmDialog = (
    <Dialog open={open} onOpenChange={(open) => {
      setOpen(open);
      if (!open) resolveRef.current?.(false);
    }}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{options.title}</DialogTitle>
          <DialogDescription className="font-body text-sm text-zinc-500">
            {options.message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <button
            onClick={handleCancel}
            className="btn-secondary text-sm px-4 py-2 hover:bg-indigo-50 hover:border-indigo-500"
          >
            {options.cancelLabel || "Batal"}
          </button>
          <button
            onClick={handleConfirm}
            className="btn-primary text-sm px-4 py-2 hover:opacity-90 hover:-translate-y-px"
          >
            {options.confirmLabel || "Ya, Hapus"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return { confirm, ConfirmDialog };
}
