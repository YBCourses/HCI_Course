import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  BookOpen,
  Layers,
  Clock,
  Sparkles,
  Eye,
  EyeOff,
  Monitor,
  Smartphone,
  Scaling,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  Tv,
  SlidersHorizontal,
  X,
  LayoutGrid,
  GraduationCap,
} from 'lucide-react';
import { SLIDES_DATA, ACTS_METADATA } from '../../data/slides';
import { SLIDES_DATA_SESSION_2, ACTS_METADATA_SESSION_2 } from '../../data/slidesSession2';
import { SlideRenderer } from '../slides/SlideRenderer';
import { SlideRendererSession2 } from '../slides/SlideRendererSession2';
import { SlideRendererSession3 } from '../slides/SlideRendererSession3';
import { SlideRendererSession4 } from '../slides/SlideRendererSession4';
import { SLIDES_DATA_SESSION_4, ACTS_METADATA_SESSION_4 } from '../../data/slidesSession4';
import { SLIDES_DATA_SESSION_3, ACTS_METADATA_SESSION_3 } from '../../data/slidesSession3';
import { SlideDemoControlSample, DEMO_SLIDES, DEMO_SLIDE_COUNT } from '../slides/SlideDemoControlSample';
import { PresenterNotes } from './PresenterNotes';
import { SlideNavigator } from './SlideNavigator';
import { ClassroomTimer } from './ClassroomTimer';
import { canOpenSession, useReleases, useReleasesReady } from '../../lib/releases';
import { BUILT_SESSIONS } from '../../lib/releases';
import { ComingSoon } from './ComingSoon';
import { ErrorGuard } from './ErrorGuard';
import { SlideTransition } from '../transitions/SlideTransition';
import { UM6PLogo } from '../brand/UM6PLogo';
import { CurriculumModal } from './CurriculumModal';
import { TeacherGate, useTeacherAuthed } from '../teacher/TeacherGate';

const ProjectsHub = lazy(() => import('../projects/ProjectsHub'));
const TeacherPanel = lazy(() => import('../teacher/TeacherPanel'));

/** Teacher mode needs ?teacher in the URL AND a verified sign-in (e-mail one-time code); students never see it. */
const IS_TEACHER = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('teacher');

/** Parses #/projects and #/projects/<id>. Returns null when the hash is not a projects link. */
const parseProjectsHash = (hash: string): { id: number | null } | null => {
  const m = hash.match(/^#\/projects(?:\/(\d+))?\/?$/);
  if (!m) return null;
  return { id: m[1] ? Number(m[1]) : null };
};

export const SlideDeck: React.FC = () => {
  const [activeSessionId, setActiveSessionId] = useState<number>(2); // Default to Session 2
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPresenterNotesOpen, setIsPresenterNotesOpen] = useState<boolean>(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState<boolean>(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState<boolean>(false);
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number>(120);
  const [timerLabel, setTimerLabel] = useState<string>('Classroom Activity');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isFooterHidden, setIsFooterHidden] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false); // Phase 1 demo is validated; open on the active session (demo stays reachable via DEMO STD)
  const [demoSlideIndex, setDemoSlideIndex] = useState<number>(0); // 0 .. DEMO_SLIDE_COUNT - 1

  // Projects hub (gallery + interface viewer), driven by the URL hash so every project has a shareable link
  const [locationHash, setLocationHash] = useState<string>(typeof window !== 'undefined' ? window.location.hash : '');
  const projectsRoute = parseProjectsHash(locationHash);
  const projectsOpenRef = useRef<boolean>(false);
  projectsOpenRef.current = projectsRoute !== null;
  useEffect(() => {
    const onHash = () => setLocationHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const openProjects = (id: number | null = null) => {
    window.location.hash = id ? `#/projects/${id}` : '#/projects';
  };
  const closeProjects = () => {
    window.history.pushState(null, '', window.location.pathname + window.location.search);
    setLocationHash('');
  };

  // Teacher mode: ?teacher plus a verified sign-in
  const teacherAuthed = useTeacherAuthed();
  const showTeacher = IS_TEACHER && teacherAuthed;
  const releases = useReleases();
  const releasesReady = useReleasesReady();
  const canOpen = (id: number) => canOpenSession(id, releases, showTeacher);
  const nothingOpen = !BUILT_SESSIONS.some((id) => canOpen(id));
  const showTeacherRef = useRef<boolean>(false);
  showTeacherRef.current = showTeacher;
  const [isClassOpen, setIsClassOpen] = useState<boolean>(false);

  // Active session data source
  const activeSlides = activeSessionId === 4 ? SLIDES_DATA_SESSION_4 : activeSessionId === 3 ? SLIDES_DATA_SESSION_3 : activeSessionId === 2 ? SLIDES_DATA_SESSION_2 : SLIDES_DATA;
  const activeActs = activeSessionId === 4 ? ACTS_METADATA_SESSION_4 : activeSessionId === 3 ? ACTS_METADATA_SESSION_3 : activeSessionId === 2 ? ACTS_METADATA_SESSION_2 : ACTS_METADATA;

  // --------------------------------------------------------------------------
  // ADAPTIVE UNIVERSAL DISPLAY & PROJECTION STATE
  // --------------------------------------------------------------------------
  const [displayMode, setDisplayMode] = useState<'auto' | 'scale' | 'scroll'>('auto');
  const [aspectRatio, setAspectRatio] = useState<'auto' | '16:9' | '16:10' | '4:3'>('auto');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isDisplayMenuOpen, setIsDisplayMenuOpen] = useState<boolean>(false);

  // Available container bounds measured via ResizeObserver
  const [viewportSize, setViewportSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  const mainAreaRef = useRef<HTMLDivElement>(null);
  const displayMenuRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];
  const currentAct = activeActs.find(a => a.id === currentSlide.act);
  const progressPercent = ((currentIndex + 1) / activeSlides.length) * 100;

  const switchSession = (sessionId: number) => {
    setActiveSessionId(sessionId);
    setCurrentIndex(0);
  };

  // If the session on screen is not open to students (yet, or any more), move to the latest open one.
  useEffect(() => {
    if (!canOpenSession(activeSessionId, releases, showTeacher)) {
      const open = [4, 3, 2, 1].find((id) => canOpenSession(id, releases, showTeacher));
      if (open && open !== activeSessionId) {
        setIsDemoMode(false);
        setActiveSessionId(open);
        setCurrentIndex(0);
      }
    }
  }, [releases, showTeacher, activeSessionId]);

  // --------------------------------------------------------------------------
  // RESIZE OBSERVER: Live container measurement for any projector or window
  // --------------------------------------------------------------------------
  useEffect(() => {
    const updateSize = () => {
      if (mainAreaRef.current) {
        const rect = mainAreaRef.current.getBoundingClientRect();
        setViewportSize({
          width: Math.max(300, Math.round(rect.width)),
          height: Math.max(200, Math.round(rect.height)),
        });
      } else {
        setViewportSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && mainAreaRef.current) {
      ro = new ResizeObserver(updateSize);
      ro.observe(mainAreaRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      if (ro) ro.disconnect();
    };
  }, [isFullscreen, isFooterHidden]);

  // Click outside to dismiss display settings menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isDisplayMenuOpen &&
        displayMenuRef.current &&
        !displayMenuRef.current.contains(e.target as Node)
      ) {
        setIsDisplayMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDisplayMenuOpen]);

  // Sync fullscreen state with native browser events (F11, Esc, button)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      if (isFs) {
        setIsFooterHidden(true); // default to clean full-screen projection
      } else {
        setIsFooterHidden(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Slide navigation methods
  const goToNextSlide = useCallback(() => {
    if (isDemoMode) {
      setDemoSlideIndex(prev => Math.min(DEMO_SLIDE_COUNT - 1, prev + 1));
      setDirection(1);
      return;
    }
    setCurrentIndex(prev => {
      if (prev < activeSlides.length - 1) {
        setDirection(1);
        return prev + 1;
      }
      return prev;
    });
  }, [isDemoMode, activeSlides.length]);

  const goToPrevSlide = useCallback(() => {
    if (isDemoMode) {
      setDemoSlideIndex(prev => Math.max(0, prev - 1));
      setDirection(-1);
      return;
    }
    setCurrentIndex(prev => {
      if (prev > 0) {
        setDirection(-1);
        return prev - 1;
      }
      return prev;
    });
  }, [isDemoMode]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < activeSlides.length) {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    }
  }, [currentIndex, activeSlides.length]);

  const openTimerWithSettings = (seconds: number, label: string) => {
    setTimerDuration(seconds);
    setTimerLabel(label);
    setIsTimerOpen(true);
  };

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Keyboard navigation handler (with safety check for text input typing)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing inside an input or textarea, don't hijack slide keys
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        if (e.key === 'Escape') {
          (document.activeElement as HTMLElement)?.blur();
        }
        return;
      }

      // While the projects hub is open it handles its own keys (Esc)
      if (projectsOpenRef.current) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          goToNextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          goToPrevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(SLIDES_DATA.length - 1);
          break;
        case 'j':
        case 'J':
          e.preventDefault();
          openProjects();
          break;
        case 'p':
        case 'P':
          if (!showTeacherRef.current) break;
          e.preventDefault();
          setIsPresenterNotesOpen(prev => !prev);
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          setIsCurriculumOpen(prev => !prev);
          break;
        case 'g':
        case 'G':
        case 'o':
        case 'O':
          e.preventDefault();
          setIsNavigatorOpen(prev => !prev);
          break;
        case 't':
        case 'T':
          e.preventDefault();
          setIsTimerOpen(prev => !prev);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          setIsFooterHidden(prev => !prev);
          break;
        case 's':
        case 'S':
          e.preventDefault();
          setIsDisplayMenuOpen(prev => !prev);
          break;
        case 'Escape':
          setIsPresenterNotesOpen(false);
          setIsNavigatorOpen(false);
          setIsCurriculumOpen(false);
          setIsDisplayMenuOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, goToSlide]);

  // Touch swipe support for smartphone and tablet users
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

    // Horizontal swipe threshold: 50px, horizontal movement must exceed vertical
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // --------------------------------------------------------------------------
  // ADAPTIVE SCALE MATHEMATICS
  // --------------------------------------------------------------------------
  // Detect if screen is small mobile phone or portrait tablet
  const isCompactDevice = viewportSize.width < 768 || viewportSize.width < viewportSize.height;
  const isScaleMode = displayMode === 'auto' ? !isCompactDevice : displayMode === 'scale';

  // Base canvas coordinate dimensions according to selected aspect ratio
  let baseWidth = 1920;
  let baseHeight = 1080;

  if (aspectRatio === '16:10') {
    baseWidth = 1920;
    baseHeight = 1200;
  } else if (aspectRatio === '4:3') {
    baseWidth = 1440;
    baseHeight = 1080;
  } else if (aspectRatio === 'auto') {
    const currentRatio = viewportSize.width / Math.max(1, viewportSize.height);
    if (currentRatio < 1.42) {
      baseWidth = 1440;
      baseHeight = 1080; // 4:3 for traditional podium projectors or iPads
    } else if (currentRatio < 1.68) {
      baseWidth = 1920;
      baseHeight = 1200; // 16:10 for MacBooks & 16:10 projectors
    } else {
      baseWidth = 1920;
      baseHeight = 1080; // 16:9 for modern widescreen displays
    }
  }

  // Maximize available canvas space by eliminating artificial margins
  const marginX = 0;
  const marginY = 0;
  const availW = Math.max(300, viewportSize.width);
  const availH = Math.max(200, viewportSize.height);

  // Exact scale factor guaranteeing ZERO CUTOFF on any projector or screen
  const autoScale = Math.min(availW / baseWidth, availH / baseHeight);
  const finalScale = Number((autoScale * (zoomLevel / 100)).toFixed(4));
  const scaledWidth = Math.round(baseWidth * finalScale);
  const scaledHeight = Math.round(baseHeight * finalScale);

  return (
    <div
      className="relative w-screen h-screen bg-[#F4F1EA] text-[#222222] overflow-hidden flex flex-col justify-between select-text"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Thin UM6P Official Vermilion Progress Bar */}
      <div className="h-1.5 w-full bg-[#E8E2D9] overflow-hidden relative z-50 flex-shrink-0">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: '#E5391C',
          }}
        />
      </div>

      {/* Main Slide Canvas Container: Edge-to-Edge Adaptive Viewport (Zero Wasted Margins) */}
      <main
        ref={mainAreaRef}
        className={`flex-1 w-full h-full flex items-center justify-center overflow-hidden relative p-0 ${
          isFullscreen ? (isFooterHidden ? 'bg-white' : 'pb-12 bg-white') : 'bg-[#FAF8F5]'
        }`}
      >
        {isScaleMode ? (
          /* ========================================================================= */
          /* 1. PROJECTOR / DESKTOP FIT-TO-SCREEN AUTO-SCALE ENGINE (Zero Cutoff)      */
          /* ========================================================================= */
          <div className="flex items-center justify-center w-full h-full overflow-hidden p-0">
            {/* Outer layout container occupying the exact scaled footprint */}
            <div
              style={{
                width: `${scaledWidth}px`,
                height: `${scaledHeight}px`,
                position: 'relative',
                flexShrink: 0,
              }}
              className={`transition-all duration-200 ${
                isFullscreen
                  ? 'rounded-none shadow-none'
                  : 'rounded-none sm:rounded-xl shadow-md border border-[#E8E2D9]'
              }`}
            >
              {/* Scaled virtual canvas at 1920×1080 (or chosen aspect ratio) */}
              <div
                style={{
                  width: `${baseWidth}px`,
                  height: `${baseHeight}px`,
                  transform: `scale(${finalScale})`,
                  transformOrigin: 'top left',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                className="bg-white overflow-hidden flex flex-col justify-between"
              >
                <ErrorGuard resetKey={`${isDemoMode ? 'd' + demoSlideIndex : activeSessionId + '-' + currentIndex}`}>
                <SlideTransition slideKey={isDemoMode ? `demo-standard-slide-${demoSlideIndex}` : `${activeSessionId}-${currentIndex}`} direction={direction}>
                  {isDemoMode ? (
                    <SlideDemoControlSample
                      currentSlideIndex={demoSlideIndex}
                      totalSlides={DEMO_SLIDE_COUNT}
                      onNext={goToNextSlide}
                      onPrev={goToPrevSlide}
                      onSelect={setDemoSlideIndex}
                    />
                  ) : activeSessionId === 4 ? (
                    <SlideRendererSession4
                      slide={currentSlide}
                      onNextSlide={goToNextSlide}
                      onOpenTimer={openTimerWithSettings}
                    />
                  ) : activeSessionId === 3 ? (
                    <SlideRendererSession3
                      slide={currentSlide}
                      onNextSlide={goToNextSlide}
                      onOpenTimer={openTimerWithSettings}
                    />
                  ) : activeSessionId === 2 ? (
                    <SlideRendererSession2
                      slide={currentSlide}
                      onNextSlide={goToNextSlide}
                      onOpenTimer={openTimerWithSettings}
                    />
                  ) : (
                    <SlideRenderer
                      slide={currentSlide}
                      onNextSlide={goToNextSlide}
                      onOpenTimer={openTimerWithSettings}
                    />
                  )}
                </SlideTransition>
</ErrorGuard>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* 2. MOBILE / RESPONSIVE SCROLL FLOW ENGINE (Smartphones & Portrait iPads)   */
          /* ========================================================================= */
          <div className="w-full h-full flex flex-col items-center overflow-y-auto p-2 sm:p-4 bg-[#F8F6F2]">
            <div className="w-full max-w-4xl bg-white rounded-2xl um6p-canvas-shadow border border-[#E8E2D9] min-h-full flex flex-col justify-between overflow-x-hidden my-auto">
              <ErrorGuard resetKey={`${isDemoMode ? 'd' + demoSlideIndex : activeSessionId + '-' + currentIndex}`}>
              <SlideTransition slideKey={isDemoMode ? `demo-standard-slide-${demoSlideIndex}` : `${activeSessionId}-${currentIndex}`} direction={direction}>
                <div className="w-full min-h-full flex flex-col justify-between">
                  {isDemoMode ? (
                    <SlideDemoControlSample
                      currentSlideIndex={demoSlideIndex}
                      totalSlides={DEMO_SLIDE_COUNT}
                      onNext={goToNextSlide}
                      onPrev={goToPrevSlide}
                      onSelect={setDemoSlideIndex}
                    />
                  ) : activeSessionId === 4 ? (
                    <SlideRendererSession4
                      slide={currentSlide}
                      onNextSlide={goToNextSlide}
                      onOpenTimer={openTimerWithSettings}
                    />
                  ) : activeSessionId === 3 ? (
                    <SlideRendererSession3
                      slide={currentSlide}
                      onNextSlide={goToNextSlide}
                      onOpenTimer={openTimerWithSettings}
                    />
                  ) : activeSessionId === 2 ? (
                    <SlideRendererSession2
                      slide={currentSlide}
                      onNextSlide={goToNextSlide}
                      onOpenTimer={openTimerWithSettings}
                    />
                  ) : (
                    <SlideRenderer
                      slide={currentSlide}
                      onNextSlide={goToNextSlide}
                      onOpenTimer={openTimerWithSettings}
                    />
                  )}
                </div>
              </SlideTransition>
</ErrorGuard>
            </div>
          </div>
        )}
      </main>

      {/* Floating HUD toggle button in Fullscreen mode when bar is hidden */}
      {isFullscreen && isFooterHidden && (
        <button
          onClick={() => setIsFooterHidden(false)}
          className="fixed bottom-3 right-4 z-50 p-2.5 rounded-full bg-white/95 hover:bg-white shadow-xl border border-[#E8E2D9] text-[#222222] opacity-60 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-2 text-xs font-mono"
          title="Show Presentation Controls (Key: H)"
        >
          <Eye className="w-4 h-4 text-[#E5391C]" />
          <span>Show Bar</span>
        </button>
      )}

      {/* Bottom Master Presentation Control Bar (Official UM6P Light Identity) */}
      {(!isFullscreen || !isFooterHidden) && (
        <footer
          className={`bg-white/95 border-t border-[#E8E2D9] px-3 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono relative z-40 backdrop-blur-md shadow-xs transition-all flex-shrink-0 ${
            isFullscreen
              ? 'fixed bottom-0 left-0 right-0 h-12 bg-white/95 shadow-2xl'
              : 'h-12'
          }`}
        >
          {/* Left: UM6P Official Logo, Session Selector, Act Pill & Slide Counter */}
          <div className="flex items-center gap-2 sm:gap-4">
            <UM6PLogo variant="compact" theme="color" className="h-6 hidden md:inline-flex" />

            <div className="h-4 w-[1px] bg-[#E8E2D9] hidden md:block" />

            {/* Session Switcher Pills & Phase 1 Demo Control Sample */}
            <div className="flex items-center bg-[#FAF9F6] p-0.5 rounded-lg border border-[#E8E2D9]">
              {showTeacher && (
                <button
                  onClick={() => {
                    setIsDemoMode(true);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    isDemoMode
                      ? 'bg-[#E5391C] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Phase 1: Comprehensive Presentation Design Standard Demo Slide"
                >
                  🔬 DEMO STD
                </button>
              )}
              {canOpen(1) && <button
                onClick={() => {
                  setIsDemoMode(false);
                  switchSession(1);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  !isDemoMode && activeSessionId === 1
                    ? 'bg-[#E5391C] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Switch to Session 1: Foundations (Protected Reference)"
              >
                S01
              </button>}
              {canOpen(2) && <button
                onClick={() => {
                  setIsDemoMode(false);
                  switchSession(2);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  !isDemoMode && activeSessionId === 2
                    ? 'bg-[#E5391C] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Switch to Session 2: Cognitive & Motor Mechanics"
              >
                S02
              </button>}
              {canOpen(3) && <button
                onClick={() => {
                  setIsDemoMode(false);
                  switchSession(3);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  !isDemoMode && activeSessionId === 3
                    ? 'bg-[#E5391C] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Switch to Session 3: The User"
              >
                S03
              </button>}
              {canOpen(4) && <button
                onClick={() => {
                  setIsDemoMode(false);
                  switchSession(4);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  !isDemoMode && activeSessionId === 4
                    ? 'bg-[#E5391C] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Switch to Session 4: The Need"
              >
                S04
              </button>}
            </div>

            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: isDemoMode ? '#E5391C' : currentAct?.color || '#E5391C' }}
              />
              <span className="font-bold text-[#222222] uppercase tracking-wider text-[11px] hidden sm:inline">
                {isDemoMode ? 'PHASE 1 VALIDATION' : currentAct?.title || 'ACT 1'}
              </span>
            </div>

            <div className="text-[#5F5E61] text-xs">
              <strong className="text-[#222222] font-bold">
                {isDemoMode ? demoSlideIndex + 1 : currentIndex + 1}
              </strong>
              <span className="text-[#C5BFB7] mx-1">/</span>
              <span>{isDemoMode ? DEMO_SLIDE_COUNT : activeSlides.length}</span>
            </div>

            {currentSlide.experimentId && !isDemoMode && (
              <span className="hidden xl:inline-flex items-center gap-1 text-[11px] text-[#E5391C] bg-[#FDF5F3] px-2.5 py-0.5 rounded-full border border-[#FAD6CF] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Live Interactive Lab
              </span>
            )}
          </div>

          {/* Center: Slide Title Hint */}
          <div className="hidden lg:block text-[#5F5E61] text-xs font-medium max-w-sm truncate text-center">
            {isDemoMode
              ? `Demo ${DEMO_SLIDES[demoSlideIndex].id}: ${DEMO_SLIDES[demoSlideIndex].title}`
              : currentSlide.title}
          </div>

          {/* Right: Presentation Tools, Universal Display Settings & Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Fullscreen Hide/Show HUD toggle */}
            {isFullscreen && (
              <button
                onClick={() => setIsFooterHidden(true)}
                className="p-1.5 rounded-lg bg-[#FAF9F6] border border-[#E8E2D9] text-[#5F5E61] hover:text-[#222222] hover:bg-[#F5F2ED] transition-colors"
                title="Hide Bottom Bar for Fullscreen (Key: H)"
              >
                <EyeOff className="w-3.5 h-3.5" />
              </button>
            )}

            {/* ADAPTIVE UNIVERSAL DISPLAY SETTINGS TOGGLE (NEW) */}
            <div className="relative">
              <button
                onClick={() => setIsDisplayMenuOpen(!isDisplayMenuOpen)}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
                  isDisplayMenuOpen
                    ? 'bg-[#FDF5F3] border-[#E5391C] text-[#E5391C]'
                    : 'bg-[#FAF9F6] border-[#E8E2D9] text-[#222222] hover:bg-[#F5F2ED]'
                }`}
                title="Universal Display & Projector Adapter (Key: S)"
              >
                <Scaling className="w-3.5 h-3.5 text-[#E5391C]" />
                <span className="hidden sm:inline">
                  {isScaleMode ? `${Math.round(finalScale * 100)}% Fit` : 'Mobile'}
                </span>
              </button>

              {/* Display & Projector Adapter Settings Popover */}
              {isDisplayMenuOpen && (
                <div
                  ref={displayMenuRef}
                  className="absolute bottom-12 right-0 w-80 sm:w-96 bg-white border-2 border-[#E8E2D9] rounded-2xl shadow-2xl p-4 sm:p-5 text-xs text-[#222222] space-y-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#E5391C]" />
                      <strong className="text-sm font-bold font-serif-display">Universal Screen Adapter</strong>
                    </div>
                    <button
                      onClick={() => setIsDisplayMenuOpen(false)}
                      className="p-1 hover:bg-stone-100 rounded-lg text-stone-500 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Mode Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-[#6E6D70] uppercase">
                      Display Engine Mode
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E2D9]">
                      <button
                        onClick={() => setDisplayMode('auto')}
                        className={`py-1.5 px-2 rounded-lg font-bold transition-all text-center cursor-pointer ${
                          displayMode === 'auto'
                            ? 'bg-[#E5391C] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        ⚡ Auto-Fit
                      </button>
                      <button
                        onClick={() => setDisplayMode('scale')}
                        className={`py-1.5 px-2 rounded-lg font-bold transition-all text-center cursor-pointer ${
                          displayMode === 'scale'
                            ? 'bg-[#E5391C] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        🖥️ Projector
                      </button>
                      <button
                        onClick={() => setDisplayMode('scroll')}
                        className={`py-1.5 px-2 rounded-lg font-bold transition-all text-center cursor-pointer ${
                          displayMode === 'scroll'
                            ? 'bg-[#E5391C] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        📱 Mobile Flow
                      </button>
                    </div>
                  </div>

                  {/* Projector Aspect Ratio Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-[#6E6D70] uppercase">
                      Screen / Projector Aspect Ratio
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { id: 'auto', label: 'Auto Ratio' },
                        { id: '16:9', label: '16:9 (HD)' },
                        { id: '16:10', label: '16:10 (Mac)' },
                        { id: '4:3', label: '4:3 (Hall)' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setAspectRatio(item.id as any)}
                          className={`py-1.5 px-1 rounded-xl font-bold border text-center transition-all cursor-pointer ${
                            aspectRatio === item.id
                              ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                              : 'bg-white border-[#E8E2D9] text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual Zoom Adjuster */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="font-bold text-[#6E6D70] uppercase">Scale / Zoom Tuning</span>
                      <span className="text-[#E5391C] font-bold">{zoomLevel}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setZoomLevel(prev => Math.max(70, prev - 5))}
                        className="px-2.5 py-1.5 bg-[#FAF9F6] border border-[#E8E2D9] hover:bg-[#F5F2ED] rounded-xl font-bold flex items-center gap-1 cursor-pointer"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                        <span>-5%</span>
                      </button>
                      <button
                        onClick={() => setZoomLevel(100)}
                        className="flex-1 py-1.5 bg-[#FAF9F6] border border-[#E8E2D9] hover:bg-[#F5F2ED] rounded-xl font-bold text-center cursor-pointer"
                        title="Reset to 100%"
                      >
                        Reset (100%)
                      </button>
                      <button
                        onClick={() => setZoomLevel(prev => Math.min(130, prev + 5))}
                        className="px-2.5 py-1.5 bg-[#FAF9F6] border border-[#E8E2D9] hover:bg-[#F5F2ED] rounded-xl font-bold flex items-center gap-1 cursor-pointer"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>+5%</span>
                      </button>
                    </div>
                  </div>

                  {/* Real-time Hardware Telemetry Diagnostic */}
                  <div className="p-3 bg-[#FAF9F6] border border-[#E8E2D9] rounded-xl space-y-1 font-mono text-[10px] text-stone-600">
                    <div className="flex justify-between">
                      <span>Detected Viewport:</span>
                      <strong className="text-stone-900">{viewportSize.width} × {viewportSize.height} px</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Virtual Canvas:</span>
                      <strong className="text-stone-900">{baseWidth} × {baseHeight} px</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Applied Scale:</span>
                      <strong className="text-[#E5391C]">{Math.round(finalScale * 100)}% ({finalScale}x)</strong>
                    </div>
                    <div className="flex justify-between border-t border-stone-200 pt-1 text-emerald-700 font-bold">
                      <span>Clipping Guard:</span>
                      <span>✓ 100% Guaranteed Fit</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {showTeacher && (
              <button
                onClick={() => setIsClassOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#222222] text-white hover:bg-black transition-colors cursor-pointer"
                title="Class: teams, projects and progress (teacher)"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">Class</span>
              </button>
            )}

            {/* Course projects: ten bad interfaces to improve over the semester */}
            <button
              onClick={() => openProjects()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FDF5F3] border border-[#FAD6CF] text-[#E5391C] hover:bg-[#FBE9E4] transition-colors cursor-pointer"
              title="Course Projects (Key: J)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Projects (J)</span>
            </button>

            {/* 12 Sessions Curriculum Modal Toggle */}
            <button
              onClick={() => setIsCurriculumOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E8E2D9] text-[#222222] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
              title="12-Session Curriculum (Key: C)"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5391C]" />
              <span className="hidden md:inline text-[11px] font-semibold">12 Sessions (C)</span>
            </button>

            {/* Navigator Toggle Button (O or G) */}
            <button
              onClick={() => setIsNavigatorOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E8E2D9] text-[#222222] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
              title="Slide Navigator (Key: G or O)"
            >
              <Layers className="w-3.5 h-3.5 text-[#E5391C]" />
              <span className="hidden md:inline text-[11px] font-semibold">Navigator (G)</span>
            </button>

            {showTeacher && (
              <>
                {/* Presenter Teleprompter Toggle (P) */}
                <button
                  onClick={() => setIsPresenterNotesOpen(prev => !prev)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
                    isPresenterNotesOpen
                      ? 'bg-[#FDF5F3] border-[#E5391C] text-[#E5391C]'
                      : 'bg-[#FAF9F6] border-[#E8E2D9] text-[#222222] hover:bg-[#F5F2ED]'
                  }`}
                  title="Presenter Notes (Key: P)"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Notes (P)</span>
                </button>
              </>
            )}

            {/* Classroom Timer Toggle (T) */}
            <button
              onClick={() => setIsTimerOpen(prev => !prev)}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
                isTimerOpen
                  ? 'bg-[#FDF5F3] border-[#E5391C] text-[#E5391C]'
                  : 'bg-[#FAF9F6] border-[#E8E2D9] text-[#222222] hover:bg-[#F5F2ED]'
              }`}
              title="Classroom Timer (Key: T)"
            >
              <Clock className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Timer (T)</span>
            </button>

            {/* Fullscreen Toggle (F) */}
            <button
              onClick={toggleFullscreen}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isFullscreen
                  ? 'bg-[#FDF5F3] border-[#E5391C] text-[#E5391C]'
                  : 'bg-[#FAF9F6] border-[#E8E2D9] text-[#5F5E61] hover:text-[#222222] hover:bg-[#F5F2ED]'
              }`}
              title="Fullscreen Projector Mode (Key: F)"
            >
              {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            </button>

            {/* Previous Slide Button */}
            <button
              onClick={goToPrevSlide}
              disabled={isDemoMode ? demoSlideIndex === 0 : currentIndex === 0}
              className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E8E2D9] text-[#222222] hover:bg-[#F5F2ED] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Previous Slide (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Slide Button (Official UM6P Red-Orange) */}
            <button
              onClick={goToNextSlide}
              disabled={isDemoMode ? demoSlideIndex === DEMO_SLIDE_COUNT - 1 : currentIndex === activeSlides.length - 1}
              className="px-3 sm:px-4 py-1.5 rounded-lg bg-[#E5391C] hover:bg-[#C92B10] text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
              title="Next Slide (Right Arrow or Space)"
            >
              <span className="text-[11px]">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      )}

      {/* Presenter Teleprompter Drawer Overlay */}
      {showTeacher && (
        <PresenterNotes
          slide={currentSlide}
          isOpen={isPresenterNotesOpen}
          onClose={() => setIsPresenterNotesOpen(false)}
          currentSlideIndex={currentIndex}
          totalSlides={activeSlides.length}
        />
      )}

      {/* Students see "Coming soon" while no session is open (and a blank page until we know) */}
      {(!releasesReady || nothingOpen) && !showTeacher && (releasesReady ? <ComingSoon /> : <div className="fixed inset-0 z-[70] bg-[#FAF9F6]" />)}

      {/* Teacher sign-in (only with ?teacher and no verified session) */}
      {IS_TEACHER && !teacherAuthed && (
        <ErrorGuard>
          <TeacherGate />
        </ErrorGuard>
      )}

      {/* Teacher: class, teams, projects, progress */}
      {showTeacher && isClassOpen && (
        <ErrorGuard onFail={() => setIsClassOpen(false)}>
          <Suspense fallback={null}>
            <TeacherPanel onClose={() => setIsClassOpen(false)} />
          </Suspense>
        </ErrorGuard>
      )}

      {/* Course projects hub (gallery + interface viewer) */}
      {projectsRoute && (
        <ErrorGuard onFail={closeProjects}>
        <Suspense fallback={null}>
          <ProjectsHub
            projectId={projectsRoute.id}
            onSelect={(id) => openProjects(id)}
            onClose={closeProjects}
          />
        </Suspense>
        </ErrorGuard>
      )}

      {/* Slide Navigator Modal Overlay */}
      <SlideNavigator
        slides={activeSlides}
        actsMetadata={activeActs}
        sessionTitle={`Session ${activeSessionId} Master Slide Index`}
        currentIndex={currentIndex}
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
        onSelectSlide={goToSlide}
      />

      {/* Floating Classroom Timer Widget */}
      <ClassroomTimer
        initialSeconds={timerDuration}
        label={timerLabel}
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />

      {/* 12-Session Curriculum Architecture Modal */}
      <CurriculumModal
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
        currentSessionId={activeSessionId}
        onSelectSession={switchSession}
        canOpen={canOpen}
        teacher={showTeacher}
      />
    </div>
  );
};
