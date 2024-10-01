import React from 'react';
import {
    FloatingPortal,
    FloatingOverlay,
    FloatingFocusManager,
    useFloating,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    useId,
} from '@floating-ui/react';

export function Dialog({isOpen, setIsOpen, children}) {
    const {refs, context} = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context, {
        outsidePressEvent: 'mousedown',
    });
    const role = useRole(context);

    // Merge all the interactions into prop getters
    const {getReferenceProps, getFloatingProps} = useInteractions([
        click,
        dismiss,
        role,
    ]);

    // Set up label and description ids
    const labelId = useId();
    const descriptionId = useId();
    return isOpen && (
        <FloatingPortal>
            <FloatingOverlay
                lockScroll
                className="flex items-center justify-center bg-black/50"
            >
                <FloatingFocusManager context={context}>
                    <div
                        className="min-w-[320px] p-3 bg-white rounded-[10px]"
                        ref={refs.setFloating}
                        aria-labelledby={labelId}
                        aria-describedby={descriptionId}
                        {...getFloatingProps()}
                    >
                        {children}
                    </div>
                </FloatingFocusManager>
            </FloatingOverlay>
        </FloatingPortal>
    )
}
