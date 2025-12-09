import { useState, useEffect, useCallback, useRef } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const intensityDecayRef = useRef<NodeJS.Timeout | null>(null);

    // Handle wheel scroll - progress based on scroll intensity
    const handleWheel = useCallback((e: WheelEvent) => {
        if (isExiting) return;
        e.preventDefault();

        const scrollDelta = Math.abs(e.deltaY);
        const progressIncrement = Math.max(0.5, scrollDelta * 0.1);

        setProgress(prev => {
            const newProgress = Math.min(100, prev + progressIncrement);

            if (newProgress >= 100 && !isExiting) {
                setIsExiting(true);
                setTimeout(onComplete, 500);
            }

            return newProgress;
        });
    }, [isExiting, onComplete]);

    // Handle touch for mobile
    const [touchStart, setTouchStart] = useState(0);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        setTouchStart(e.touches[0].clientY);
    }, []);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (isExiting) return;
        e.preventDefault();

        const touchDelta = Math.abs(touchStart - e.touches[0].clientY);
        const progressIncrement = Math.max(0.5, touchDelta * 0.2);

        setProgress(prev => {
            const newProgress = Math.min(100, prev + progressIncrement);

            if (newProgress >= 100 && !isExiting) {
                setIsExiting(true);
                setTimeout(onComplete, 500);
            }

            return newProgress;
        });

        setTouchStart(e.touches[0].clientY);
    }, [isExiting, touchStart, onComplete]);

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            if (intensityDecayRef.current) {
                clearTimeout(intensityDecayRef.current);
            }
        };
    }, [handleWheel, handleTouchStart, handleTouchMove]);

    return (
        <div
            className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'
                }`}
        >
            {/* Logo / Brand */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
                <span className="text-foreground">PARTH </span>
                <span className="text-green-500">AGROTECH</span>
            </h1>

            {/* Progress Bar Container */}
            <div className="w-64 md:w-80">
                {/* Percentage */}
                <div className="text-right mb-2 font-mono text-sm text-green-500">
                    {Math.round(progress)}%
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-border rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-75 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Hint */}
                <div className="text-center mt-4 text-xs text-muted-foreground font-mono uppercase tracking-wider">
                    Scroll to continue
                </div>
            </div>
        </div>
    );
}
