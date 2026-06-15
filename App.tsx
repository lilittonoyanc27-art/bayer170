import { useState, useEffect } from "react";
import { 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Award, 
  Search, 
  Sparkles, 
  Volume2, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  Trophy, 
  Flame,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { STUDY_QUESTIONS, StudyQuestion } from "./data";

export default function App() {
  // --- State Setup ---
  const [activeId, setActiveId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Translation visibility (per-item toggles)
  const [showQuestionTrans, setShowQuestionTrans] = useState<boolean>(false);
  const [showAnswerTrans, setShowAnswerTrans] = useState<boolean>(false);
  const [autoRevealTrans, setAutoRevealTrans] = useState<boolean>(false);

  // Quiz state
  const [quizOptions, setQuizOptions] = useState<StudyQuestion[]>([]);
  const [selectedQuizOption, setSelectedQuizOption] = useState<StudyQuestion | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [revealedQuizTranslations, setRevealedQuizTranslations] = useState<Record<number, boolean>>({});

  // Custom written state
  const [userWrittenAnswer, setUserWrittenAnswer] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<{
    correct: boolean;
    score: number;
    explanationAm: string;
    suggestedCorrections: string;
  } | null>(null);

  // Tracking scores & achievements in LocalStorage
  const [masteredQuizzes, setMasteredQuizzes] = useState<number[]>(() => {
    const saved = localStorage.getItem("mastered_quizzes");
    return saved ? JSON.parse(saved) : [];
  });
  const [masteredWritten, setMasteredWritten] = useState<number[]>(() => {
    const saved = localStorage.getItem("mastered_written");
    return saved ? JSON.parse(saved) : [];
  });
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem("study_streak");
    return saved ? Number(saved) : 1;
  });

  // Active Practice tab: "quiz" | "write"
  const [practiceMode, setPracticeMode] = useState<"quiz" | "write">("quiz");
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Get active question
  const activeQuestion = STUDY_QUESTIONS.find(q => q.id === activeId) || STUDY_QUESTIONS[0];

  // Get list of unique categories
  const categories = ["All", ...Array.from(new Set(STUDY_QUESTIONS.map(q => q.category)))];

  // Filtered list of questions
  const filteredQuestions = STUDY_QUESTIONS.filter(q => {
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
    const matchesSearch = 
      q.questionEs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.questionAm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answerEs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answerAm.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Triggered whenever the active question changes
  useEffect(() => {
    setShowQuestionTrans(autoRevealTrans);
    setShowAnswerTrans(autoRevealTrans);
    setSelectedQuizOption(null);
    setIsQuizSubmitted(false);
    setUserWrittenAnswer("");
    setVerificationResult(null);
    setRevealedQuizTranslations({});

    // Generate 4 randomized multiple choice options: the correct answer + 3 random ones
    const correctAns = activeQuestion;
    const pool = STUDY_QUESTIONS
      .filter(q => q.id !== activeQuestion.id);
    
    // Shuffle pool and select 3
    const incorrects = [...pool].sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [correctAns, ...incorrects].sort(() => 0.5 - Math.random());
    setQuizOptions(combined);
  }, [activeId, autoRevealTrans, activeQuestion]);

  // Save progress changes to LocalStorage
  useEffect(() => {
    localStorage.setItem("mastered_quizzes", JSON.stringify(masteredQuizzes));
  }, [masteredQuizzes]);

  useEffect(() => {
    localStorage.setItem("mastered_written", JSON.stringify(masteredWritten));
  }, [masteredWritten]);

  // Spanish TTS (Speech Synthesis) Pronunciation Helper
  const speakSpanish = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES";
      utterance.rate = 0.9; // slightly slower for educational purposes
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Ձեր բրաուզերը չի աջակցում ձայնային արտասանություն:");
    }
  };

  // Submit Quiz Action
  const handleQuizSelect = (option: StudyQuestion) => {
    if (isQuizSubmitted) return;
    setSelectedQuizOption(option);
    setIsQuizSubmitted(true);

    if (option.id === activeQuestion.id) {
      if (!masteredQuizzes.includes(activeQuestion.id)) {
        const nextMastered = [...masteredQuizzes, activeQuestion.id];
        setMasteredQuizzes(nextMastered);
        // Increment streak occasionally
        setStreak(prev => {
          const next = prev + 1;
          localStorage.setItem("study_streak", String(next));
          return next;
        });
      }
    }
  };

  // Submit Written Answer to Server-side Gemini for verification
  const handleVerifyWritten = async () => {
    if (!userWrittenAnswer.trim()) return;
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const response = await fetch("/api/verify-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: activeQuestion.id,
          userAnswer: userWrittenAnswer
        })
      });

      if (!response.ok) {
        throw new Error("Սերվերի հետ կապի սխալ: Խնդրում ենք փորձել ավելի ուշ:");
      }

      const data = await response.json();
      setVerificationResult(data);

      if (data.correct) {
        if (!masteredWritten.includes(activeQuestion.id)) {
          setMasteredWritten(prev => [...prev, activeQuestion.id]);
        }
      }
    } catch (err: any) {
      console.error(err);
      setVerificationResult({
        correct: false,
        score: 0,
        explanationAm: "⚠️ Կապի խափանում կամ AI ստուգման ժամանակավոր սխալ: Խնդրում ենք ստուգել ինտերնետ կապը կամ կրկին փորձել:",
        suggestedCorrections: ""
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Progression calculation
  const totalQuestions = STUDY_QUESTIONS.length;
  const masteredQuizCount = masteredQuizzes.length;
  const masteredWrittenCount = masteredWritten.length;
  const overallMasteryPercent = Math.round(
    ((masteredQuizCount + masteredWrittenCount) / (totalQuestions * 2)) * 100
  );

  // Quick navigation helpers
  const handleNext = () => {
    const currentIndex = STUDY_QUESTIONS.findIndex(q => q.id === activeId);
    if (currentIndex < STUDY_QUESTIONS.length - 1) {
      setActiveId(STUDY_QUESTIONS[currentIndex + 1].id);
    } else {
      setActiveId(STUDY_QUESTIONS[0].id); // loop back
    }
  };

  const handlePrev = () => {
    const currentIndex = STUDY_QUESTIONS.findIndex(q => q.id === activeId);
    if (currentIndex > 0) {
      setActiveId(STUDY_QUESTIONS[currentIndex - 1].id);
    } else {
      setActiveId(STUDY_QUESTIONS[STUDY_QUESTIONS.length - 1].id); // loop to end
    }
  };

  // Reset progress stats helper
  const handleResetProgress = () => {
    setMasteredQuizzes([]);
    setMasteredWritten([]);
    setStreak(1);
    localStorage.removeItem("mastered_quizzes");
    localStorage.removeItem("mastered_written");
    localStorage.setItem("study_streak", "1");

    // Also reset current active question visual/interactive states
    setSelectedQuizOption(null);
    setIsQuizSubmitted(false);
    setUserWrittenAnswer("");
    setVerificationResult(null);
    setRevealedQuizTranslations({});
    setShowQuestionTrans(autoRevealTrans);
    setShowAnswerTrans(autoRevealTrans);
    setShowResetConfirm(false);
    
    // Pick first question to offer fresh start
    if (STUDY_QUESTIONS.length > 0) {
      setActiveId(STUDY_QUESTIONS[0].id);
    }
  };

  return (
    <div id="app_root" className="min-h-screen bg-slate-50 text-slate-850 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- Beautiful Aesthetic Header --- */}
      <header id="app_header" className="bg-white border-b border-slate-205 sticky top-0 z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl font-display shadow-md shadow-indigo-600/20">
              E
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3 font-display">
                Español Maestro
                <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 uppercase tracking-wider">
                  41 Ինտերակտիվ Թեմաներ
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide">Իսպաներենի Ուսուցում • Conversational Spanish with Armenian Explanations</p>
            </div>
          </div>

          {/* Achievement Stats Box */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-2.5 rounded-xl w-full md:w-auto justify-around shadow-inner">
            <div className="flex items-center gap-2 px-1">
              <Trophy className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Առաջադիմություն</p>
                <p className="text-sm font-extrabold text-slate-800">{overallMasteryPercent}%</p>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-slate-200"></div>

            <div className="flex items-center gap-2 px-1">
              <Flame className="h-5 w-5 text-orange-500 animate-pulse" />
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Օրերի Շարք</p>
                <p className="text-sm font-extrabold text-slate-800">{streak} Օր</p>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-slate-200"></div>

            <button 
              id="btn_reset_progress"
              onClick={() => setShowResetConfirm(true)}
              className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition-colors text-xs"
              title="Մաքրել առաջընթացը"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

        </div>

        {/* Global Progress Line Bar */}
        <div className="w-full bg-slate-100 h-1.5 relative overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500 ease-out" 
            style={{ width: `${overallMasteryPercent}%` }}
          />
        </div>
      </header>

      {/* --- Main Contents Area --- */}
      <main id="app_main" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ================= LEFT COLUMN: Questions List & Filters ================= */}
        <section id="sidebar_section" className="lg:col-span-4 flex flex-col gap-4 h-full max-h-[calc(100vh-140px)]">
          
          {/* Filtering Tools Panel */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input
                id="inp_search"
                type="text"
                placeholder="Որոնել (իսպաներեն կամ հայերեն)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-slate-800"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Select Dropdown/Pills */}
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Կարգեր (Categories)</p>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1 select-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    id={`cat_pill_${cat}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-indigo-650 text-white shadow-xs bg-indigo-600"
                        : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat === "All" ? "Բոլորը" : cat.split(" (")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto reveal controller */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-indigo-600" />
                Միշտ ցուցադրել հայերենը
              </span>
              <label id="toggle_auto_reveal" className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={autoRevealTrans}
                  onChange={(e) => setAutoRevealTrans(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

          </div>

          {/* Scrollable Questions Loop */}
          <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-xs p-2 space-y-1">
            <div className="px-3 py-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-xl mb-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Հարցերի Ցանկ ({filteredQuestions.length})
              </span>
              <span className="text-[10px] text-slate-400 font-bold bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                {masteredQuizCount + masteredWrittenCount} / {totalQuestions * 2} ավարտված
              </span>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <HelpCircle className="h-8 w-8 mx-auto stroke-1 text-slate-300" />
                <p className="text-sm">Հարցեր չեն գտնվել</p>
                <p className="text-xs text-slate-400">Փոխեք որոնման պայմանները</p>
              </div>
            ) : (
              filteredQuestions.map((q, idx) => {
                const isActive = q.id === activeId;
                const isQuizCompleted = masteredQuizzes.includes(q.id);
                const isWrittenCompleted = masteredWritten.includes(q.id);
                
                return (
                  <button
                    key={q.id}
                    id={`btn_question_item_${q.id}`}
                    onClick={() => setActiveId(q.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                      isActive 
                        ? "bg-indigo-50/60 border border-indigo-200/80 shadow-xs" 
                        : "hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    {/* Index or progress circle */}
                    <div className={`mt-0.5 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isActive 
                        ? "bg-indigo-600 text-white" 
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {q.id}
                    </div>

                    {/* Question representation */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${isActive ? "text-indigo-950" : "text-slate-800"}`}>
                        {q.questionEs}
                      </p>
                      <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                        {q.questionAm}
                      </p>
                      
                      {/* Completion badges */}
                      <div className="flex gap-1.5 mt-2">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase flex items-center gap-0.5 ${
                          isQuizCompleted 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                            : "bg-slate-100 text-slate-400"
                        }`}>
                          {isQuizCompleted ? <Check className="h-2 w-2 stroke-[3]" /> : null}
                          Վիկտորինա
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase flex items-center gap-0.5 ${
                          isWrittenCompleted 
                            ? "bg-sky-50 text-sky-700 border border-sky-100" 
                            : "bg-slate-100 text-slate-400"
                        }`}>
                          {isWrittenCompleted ? <Check className="h-2 w-2 stroke-[3]" /> : null}
                          Գրավոր
                        </span>
                      </div>
                    </div>

                    {/* Right tick icon */}
                    {(isQuizCompleted && isWrittenCompleted) && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 self-center" />
                    )}
                  </button>
                );
              })
            )}
          </div>

        </section>

        {/* ================= RIGHT COLUMN: Active Study Space ================= */}
        <section id="workspace_section" className="lg:col-span-8 flex flex-col gap-6">

          {/* Active Question Title & Study Tool */}
          <div className="bg-white rounded-[32px] border-2 border-slate-100 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointers-events-none"></div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointers-events-none"></div>

            {/* Top Row Category & ID */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeQuestion.category}
                </span>
                <p className="text-xs font-semibold text-slate-400">Հարց {activeQuestion.id}-ը 41-ից</p>
              </div>

              {/* Speech Pronunciation Action */}
              <button
                id="btn_pronounce_question"
                onClick={() => speakSpanish(activeQuestion.questionEs)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 active:scale-95 transition-all"
                title="Արտասանել հարցը"
              >
                <Volume2 className="h-4 w-4" />
                <span>Արտասանել (Audio)</span>
              </button>
            </div>

            {/* == INTERACTIVE "TRANSLATE ON CLICK" PRACTICE CARD == */}
            <div className="space-y-6">
              
              {/* Question Box */}
              <div id="card_question_es_trigger" className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Հարց (Իսպաներեն)</p>
                <div 
                  onClick={() => setShowQuestionTrans(!showQuestionTrans)}
                  className="bg-slate-50 border border-slate-200 hover:border-indigo-400 p-4 sm:p-5 rounded-2xl cursor-pointer transition-all group relative"
                  title="Կտտացրեք թարգմանելու համար"
                >
                  <p className="text-lg sm:text-2xl font-bold text-slate-900 pr-8 tracking-tight leading-relaxed font-display">
                    {activeQuestion.questionEs}
                  </p>
                  
                  {/* Eye Indicator */}
                  <div className="absolute right-4 top-4 hover:bg-slate-200 p-1.5 rounded-lg transition-colors">
                    {showQuestionTrans ? (
                      <EyeOff className="h-4 w-4 text-slate-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-indigo-600 animate-pulse" />
                    )}
                  </div>

                  {/* Toggle Explanation Banner on click */}
                  <AnimatePresence mode="wait">
                    {showQuestionTrans ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 pt-3 border-t border-slate-200/80 text-indigo-900 font-medium"
                      >
                        <p className="text-base font-medium text-indigo-600 italic font-display bg-indigo-50/50 px-3 py-2 rounded-xl border border-indigo-100/50 flex gap-2 items-start">
                          <span className="font-bold shrink-0 text-indigo-700 font-mono">ARM:</span>
                          <span>{activeQuestion.questionAm}</span>
                        </p>
                      </motion.div>
                    ) : (
                      <p className="text-[11px] text-slate-400 font-medium mt-2 flex items-center gap-1 group-hover:text-indigo-600 transition-colors">
                        💡 Կտտացրեք այստեղ՝ թարգմանությունը տեսնելու համար
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Reference Answer Box */}
              <div id="card_answer_es_trigger" className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Ուղեցույց Պատասխան (Reference Answer)</p>
                  <button
                    id="btn_pronounce_answer"
                    onClick={() => speakSpanish(activeQuestion.answerEs)}
                    className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold flex items-center gap-1 p-1 rounded-sm"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    Արտասանել պատասխանը
                  </button>
                </div>
                <div 
                  onClick={() => setShowAnswerTrans(!showAnswerTrans)}
                  className="bg-indigo-50/20 border border-indigo-200/30 hover:border-indigo-400 p-4 sm:p-5 rounded-2xl cursor-pointer transition-all group relative"
                  title="Կտտացրեք թարգմանելու համար"
                >
                  <p className="text-xl sm:text-2xl font-black text-slate-800 pr-8 italic font-display">
                    "{activeQuestion.answerEs}"
                  </p>

                  <div className="absolute right-4 top-4">
                    {showAnswerTrans ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-indigo-600" />
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {showAnswerTrans ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 pt-3 border-t border-indigo-200/40 text-emerald-900"
                      >
                        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex flex-col gap-1">
                          <p className="text-sm text-emerald-700 font-semibold flex gap-2 items-start">
                            <span className="font-extrabold shrink-0 text-emerald-800 font-mono">ARM:</span>
                            <span>{activeQuestion.answerAm}</span>
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <p className="text-[11px] text-slate-400 font-medium mt-2 flex items-center gap-1 group-hover:text-indigo-600 transition-colors">
                        💡 Կտտացրեք այստեղ՝ պատասխանի հայերեն թարգմանության համար
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

            {/* Quick Next/Prev arrows */}
            <div className="flex border-t border-slate-100 pt-5 items-center justify-between">
              <button
                id="btn_prev_question"
                onClick={handlePrev}
                className="w-12 h-12 sm:w-auto sm:px-4 bg-white border border-slate-200 rounded-full sm:rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Նախորդը</span>
              </button>
              
              <div className="text-xs text-slate-400 font-bold uppercase tracking-widest bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md font-display">
                Թեմա {activeQuestion.id} / 41
              </div>

              <button
                id="btn_next_question"
                onClick={handleNext}
                className="w-12 h-12 sm:w-auto sm:px-4 bg-indigo-600 text-white rounded-full sm:rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-600/15 hover:shadow-indigo-600/25 transition-all cursor-pointer"
              >
                <span className="hidden sm:inline">Հաջորդը</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* ================ CORE PRACTICE TABS: QUIZ & FREE-WRITE ================ */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            
            {/* Tabs Header */}
            <div className="flex border-b border-slate-200 bg-slate-55/80 bg-slate-50/50">
              
              {/* Quiz Mode Tab */}
              <button
                id="tab_mode_quiz"
                onClick={() => setPracticeMode("quiz")}
                className={`flex-1 py-4 text-center font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
                  practiceMode === "quiz"
                    ? "border-indigo-600 text-indigo-950 bg-white"
                    : "border-transparent text-slate-500 hover:text-indigo-600 hover:bg-slate-100/50"
                }`}
              >
                <Award className="h-4 w-4 text-indigo-500" />
                <span>🎯 Տարբերակներով Վիկտորինա</span>
              </button>

              {/* Free-Write Evaluation Tab */}
              <button
                id="tab_mode_write"
                onClick={() => setPracticeMode("write")}
                className={`flex-1 py-4 text-center font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
                  practiceMode === "write"
                    ? "border-indigo-600 text-indigo-950 bg-white"
                    : "border-transparent text-slate-500 hover:text-indigo-600 hover:bg-slate-100/50"
                }`}
              >
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span>✍️ Սեփական Պատասխան</span>
              </button>

            </div>

            {/* Tabs Body Container */}
            <div className="p-6">
              
              {/* TAB 1: MULTIPLE-CHOICE QUIZ */}
              {practiceMode === "quiz" && (
                <div id="quiz_practice_view" className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 font-display">Ընտրեք ճիշտ պատասխանը</h3>
                    <p className="text-xs text-slate-500">
                      Ստորև տրված տարբերակներից ընտրեք այն մեկը, որը լավագույնս համապատասխանում է տվյալ հարցին:
                    </p>
                  </div>

                  {/* Render Options Grid */}
                  <div className="grid grid-cols-1 gap-3">
                    {quizOptions.map((opt, oIdx) => {
                      const isSelected = selectedQuizOption?.id === opt.id;
                      const isCorrectAnswer = opt.id === activeQuestion.id;
                      const isTranslationRevealed = !!revealedQuizTranslations[opt.id];
                      
                      let optionStyle = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 bg-white";
                      let iconStatus = null;

                      if (isQuizSubmitted) {
                        if (isCorrectAnswer) {
                          optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs shadow-emerald-500/5";
                          iconStatus = <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />;
                        } else if (isSelected) {
                          optionStyle = "bg-rose-50 border-rose-550 text-red-950 shadow-xs border-red-500";
                          iconStatus = <XCircle className="h-5 w-5 text-red-600 shrink-0" />;
                        } else {
                          optionStyle = "opacity-50 bg-white border-slate-100";
                        }
                      } else if (isSelected) {
                        optionStyle = "border-indigo-500 bg-indigo-50/25";
                      }

                      return (
                        <div
                          key={opt.id || oIdx}
                          id={`quiz_option_btn_${oIdx}`}
                          onClick={() => {
                            if (!isQuizSubmitted) {
                              handleQuizSelect(opt);
                            }
                          }}
                          className={`w-full text-left p-4 rounded-xl font-semibold border text-sm transition-all flex flex-col gap-2 ${
                            !isQuizSubmitted ? "cursor-pointer active:scale-99" : "cursor-default"
                          } ${optionStyle}`}
                        >
                          <div className="flex items-center justify-between gap-3 w-full">
                            <div className="flex items-center gap-3">
                              <span className="h-6 w-6 flex items-center justify-center bg-slate-100 border border-slate-200 text-slate-500 text-xs rounded-full font-bold shrink-0">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span className="leading-snug">{opt.answerEs}</span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRevealedQuizTranslations(prev => ({
                                    ...prev,
                                    [opt.id]: !prev[opt.id]
                                  }));
                                }}
                                className="text-slate-400 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Թարգմանել / Translate"
                              >
                                {isTranslationRevealed ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4 text-indigo-550 text-indigo-600 animate-pulse" />
                                )}
                              </button>
                              {iconStatus}
                            </div>
                          </div>

                          <AnimatePresence mode="wait">
                            {isTranslationRevealed && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.15 }}
                                className="w-full text-left pt-2 border-t border-slate-205/30 border-slate-100 text-indigo-900/90 text-sm font-medium italic block"
                              >
                                <span className="font-bold mr-1.5 text-indigo-700/80">ARM:</span>
                                <span>{opt.answerAm}</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Show Feedback Footer */}
                  {isQuizSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border flex gap-3 items-start ${
                        selectedQuizOption?.id === activeQuestion.id
                          ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                          : "bg-red-50 border-red-200 text-red-900"
                      }`}
                    >
                      {selectedQuizOption?.id === activeQuestion.id ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-sm">Ճիշտ է: ¡Excelente trabajo!</p>
                            <p className="text-xs text-emerald-800 mt-1">Դուք հաջողությամբ վավերացրիք այս թեմայի վիկտորինան և ստացաք աստղ:</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-sm">Սխալ է: ¡Sigue intentando!</p>
                            <p className="text-xs text-red-800 mt-1">
                              Ճիշտ պատասխանն է՝ <strong className="font-extrabold">{activeQuestion.answerEs}</strong>.
                              Փորձեք անցնել հաջորդ հարցին կամ կրկին սովորել թարգմանությունը:
                            </p>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </div>
              )}

              {/* TAB 2: WRITE CUSTOM ANSWER WITH SERVER-SIDE AI EVALUATION */}
              {practiceMode === "write" && (
                <div id="write_practice_view" className="space-y-4 text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-slate-900 font-display">Մուտքագրեք ձեր սեփական պատասխանը</h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      Գրեք ձեր պատասխանը իսպաներենով:
                    </p>
                  </div>

                  {/* Input container */}
                  <div className="space-y-3">
                    <textarea
                      id="txa_user_written_answer"
                      value={userWrittenAnswer}
                      onChange={(e) => setUserWrittenAnswer(e.target.value)}
                      placeholder="E.g. La clase empieza a las nueve..."
                      disabled={isVerifying}
                      rows={3}
                      className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all font-semibold"
                    ></textarea>

                    <div className="flex justify-end p-2 rounded-xl border border-slate-200 bg-slate-50/55">
                      <button
                        id="btn_submit_written_verify"
                        onClick={handleVerifyWritten}
                        disabled={isVerifying || !userWrittenAnswer.trim()}
                        className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                          isVerifying || !userWrittenAnswer.trim()
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                            : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-600/15 active:scale-95"
                        }`}
                      >
                        {isVerifying ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                            Ստուգվում է...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3.5 w-3.5" />
                            Ստուգել Պատասխանը
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* AI Evaluation Output Banner */}
                  <AnimatePresence>
                    {verificationResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        id="ai_feedback_block"
                        className="p-5 border-2 border-slate-100 rounded-2xl bg-slate-50/50 space-y-4 shadow-xs"
                      >
                        {/* Header Status & Score */}
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <div className="flex items-center gap-2">
                            {verificationResult.correct ? (
                              <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full uppercase">
                                <CheckCircle className="h-3.5 w-3.5" />
                                Ճիշտ է
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 bg-rose-100 text-red-800 rounded-full uppercase">
                                <AlertCircle className="h-3.5 w-3.5" />
                                Սխալ կա
                              </span>
                            )}
                          </div>

                          <div className="text-right">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Միավոր (Score)</span>
                            <span className="text-lg font-extrabold text-slate-700">{verificationResult.score}/100</span>
                          </div>
                        </div>

                        {/* Explained output */}
                        <div className="space-y-1.5">
                          <p className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                            <span>Մեկնաբանություն և Բացատրություն (Armenian):</span>
                          </p>
                          <p className="text-sm text-slate-700 leading-relaxed font-semibold bg-white p-3 rounded-xl border border-slate-100 whitespace-pre-wrap">
                            {verificationResult.explanationAm}
                          </p>
                        </div>

                        {/* Suggested Correction */}
                        {verificationResult.suggestedCorrections && (
                          <div className="bg-indigo-600/5 border border-indigo-600/20 p-3.5 rounded-xl space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-800">
                              Առաջարկվող իսպաներեն տարբերակը:
                            </p>
                            <p className="text-sm font-bold text-slate-800 italic">
                              "{verificationResult.suggestedCorrections}"
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              )}

            </div>

          </div>

        </section>

      </main>

      {/* --- Footer notes --- */}
      <footer id="app_footer" className="mt-auto py-6 border-t border-slate-250 bg-white text-center border-slate-200">
        <p className="text-xs text-slate-400">
          © 2026 Español Maestro | Evaluation powered by Google Gemini 3.5 Flash
        </p>
      </footer>

      {/* Custom Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div id="reset_confirm_modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl space-y-4 border border-slate-200 text-center"
            >
              <div className="mx-auto w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-slate-900 text-lg">Ջնջե՞լ առաջադիմությունը</h3>
                <p className="text-xs text-slate-500">
                  Սա կմաքրի ձեր բոլոր պատասխանները, ճիշտ տարբերակներն ու օրերի շարքը: Ցանկանու՞մ եք անցնել նորից:
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  id="btn_cancel_reset"
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 rounded-xl text-slate-600 font-bold text-xs bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"
                >
                  Չեղարկել
                </button>
                <button
                  id="btn_confirm_reset"
                  onClick={handleResetProgress}
                  className="flex-1 py-2 rounded-xl text-white font-bold text-xs bg-rose-600 hover:bg-rose-700 cursor-pointer shadow-md shadow-rose-650/10 transition-colors"
                >
                  Ջնջել ամբողջը
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );

}
