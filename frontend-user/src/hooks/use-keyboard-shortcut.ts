import { useEffect, useCallback } from 'react';

type KeyCombo = string[];
type KeyHandler = (event: KeyboardEvent) => void;

interface ShortcutOptions {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  targetKey?: string;
  enabled?: boolean;
}

export function useKeyboardShortcut(
  keyCombo: KeyCombo,
  callback: KeyHandler,
  options: ShortcutOptions = {}
) {
  const {
    preventDefault = true,
    stopPropagation = true,
    targetKey = 'keydown',
    enabled = true,
  } = options;

  const handleKeyEvent = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    const pressedKeys = new Set<string>();
    
    // Add modifier keys if pressed
    if (event.ctrlKey) pressedKeys.add('Control');
    if (event.shiftKey) pressedKeys.add('Shift');
    if (event.altKey) pressedKeys.add('Alt');
    if (event.metaKey) pressedKeys.add('Meta');
    
    // Add the main key
    pressedKeys.add(event.key.toUpperCase());

    // Check if all required keys are pressed
    const isMatch = keyCombo.every(key => 
      pressedKeys.has(key.toUpperCase())
    );

    if (isMatch) {
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
      callback(event);
    }
  }, [keyCombo, callback, preventDefault, stopPropagation, enabled]);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener(targetKey, handleKeyEvent);
    return () => window.removeEventListener(targetKey, handleKeyEvent);
  }, [handleKeyEvent, targetKey, enabled]);
}

// Common keyboard shortcuts
export function useEscapeKey(callback: KeyHandler, options?: ShortcutOptions) {
  useKeyboardShortcut(['Escape'], callback, options);
}

export function useEnterKey(callback: KeyHandler, options?: ShortcutOptions) {
  useKeyboardShortcut(['Enter'], callback, options);
}

export function useSpaceKey(callback: KeyHandler, options?: ShortcutOptions) {
  useKeyboardShortcut([' '], callback, options);
}

export function useCopyShortcut(callback: KeyHandler, options?: ShortcutOptions) {
  useKeyboardShortcut(['Control', 'C'], callback, options);
}

export function usePasteShortcut(callback: KeyHandler, options?: ShortcutOptions) {
  useKeyboardShortcut(['Control', 'V'], callback, options);
}

export function useCutShortcut(callback: KeyHandler, options?: ShortcutOptions) {
  useKeyboardShortcut(['Control', 'X'], callback, options);
}

export function useSaveShortcut(callback: KeyHandler, options?: ShortcutOptions) {
  useKeyboardShortcut(['Control', 'S'], callback, options);
}

export function useUndoShortcut(callback: KeyHandler, options?: ShortcutOptions) {
  useKeyboardShortcut(['Control', 'Z'], callback, options);
}

export function useRedoShortcut(callback: KeyHandler, options?: ShortcutOptions) {
  useKeyboardShortcut(['Control', 'Y'], callback, options);
} 