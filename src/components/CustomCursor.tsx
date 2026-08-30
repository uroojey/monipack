'use client';

import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;
    const speed = 0.2;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    };

    const animateCursor = () => {
      circleX += (mouseX - circleX) * speed;
      circleY += (mouseY - circleY) * speed;
      const offset = circle.offsetWidth / 2;
      circle.style.transform = `translate(${circleX - offset}px, ${circleY - offset}px)`;
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animateCursor);

    const handleMouseEnter = () => {
      circle.style.width = '36px';
      circle.style.height = '36px';
      circle.style.backgroundColor = 'rgba(225, 34, 41, 0.12)';
      dot.style.opacity = '0';
    };

    const handleMouseLeave = () => {
      circle.style.width = '24px';
      circle.style.height = '24px';
      circle.style.backgroundColor = 'transparent';
      dot.style.opacity = '1';
    };

    const bindCursorInteractions = () => {
      const interactiveElements = document.querySelectorAll<HTMLElement>(
        'a, button, input, select, textarea, label, .cat-card, .product-card, .csv-drop, [data-interactive]'
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    bindCursorInteractions();
    const observer = new MutationObserver(() => {
      bindCursorInteractions();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-circle" ref={circleRef} />
    </>
  );
}
