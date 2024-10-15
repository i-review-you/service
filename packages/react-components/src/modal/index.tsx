import React, { useState } from 'react';
import {
  useFloating,
  autoUpdate,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
} from '@floating-ui/react';

interface ModalProps {
  buttonChildren: React.ReactNode;
  modalChildren: React.ReactNode;
  size?: string;
}

export function Modal({
  buttonChildren,
  modalChildren,
  size = '100px',
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = useId();

  return (
    <div className="relative inline">
      <div ref={refs.setReference} {...getReferenceProps()} className="inline">
        {buttonChildren}
      </div>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="border border-gay-200 rounded-lg p-2 bg-white absolute right-0"
            style={{ width: size }}
            ref={refs.setFloating}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            {modalChildren}
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
}
