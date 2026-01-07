'use client'

import { useState } from 'react'
import { Shield, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the primary purpose of IDOR (Insecure Direct Object Reference) vulnerability?',
    options: [
      'To bypass authentication',
      'To access unauthorized resources by manipulating object references',
      'To inject malicious code',
      'To perform denial of service attacks'
    ],
    correct: 1,
    explanation: 'IDOR allows attackers to access resources they shouldn\'t have permission to view by manipulating predictable object references (like user IDs) without proper authorization checks.'
  },
  {
    id: 2,
    question: 'Which OWASP Top 10 category does IDOR fall under?',
    options: [
      'Injection',
      'Broken Authentication',
      'Broken Access Control',
      'Security Misconfiguration'
    ],
    correct: 2,
    explanation: 'IDOR is classified under Broken Access Control (A01:2021) in the OWASP Top 10, as it represents a failure to properly enforce authorization.'
  },
  {
    id: 3,
    question: 'What is the best defense against IDOR vulnerabilities?',
    options: [
      'Using HTTPS',
      'Input validation',
      'Proper authorization checks and unpredictable identifiers',
      'Rate limiting'
    ],
    correct: 2,
    explanation: 'The best defense combines proper authorization checks (verifying user permissions) with unpredictable identifiers (like UUIDs) instead of sequential IDs.'
  },
  {
    id: 4,
    question: 'What does CWE-639 refer to?',
    options: [
      'SQL Injection',
      'Cross-Site Scripting',
      'Authorization Bypass Through User-Controlled Key',
      'Buffer Overflow'
    ],
    correct: 2,
    explanation: 'CWE-639 specifically describes Authorization Bypass Through User-Controlled Key, which is the technical classification for IDOR vulnerabilities.'
  },
  {
    id: 5,
    question: 'In social engineering attacks, what is the primary target?',
    options: [
      'Network infrastructure',
      'Human psychology and trust',
      'Application code',
      'Database systems'
    ],
    correct: 1,
    explanation: 'Social engineering attacks exploit human psychology, trust, and social manipulation rather than technical vulnerabilities.'
  }
]

export default function SecurityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  const question = quizQuestions[currentQuestion]

  const handleAnswer = (answerIndex: number) => {
    if (answered) return

    setSelectedAnswer(answerIndex)
    setAnswered(true)

    if (answerIndex === question.correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setAnswered(false)
    setQuizStarted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage === 100) return { message: 'Perfect Score!', color: 'text-hacker-green' }
    if (percentage >= 80) return { message: 'Excellent!', color: 'text-hacker-cyan' }
    if (percentage >= 60) return { message: 'Good Job!', color: 'text-hacker-purple' }
    return { message: 'Keep Learning!', color: 'text-hacker-pink' }
  }

  if (!quizStarted) {
    return (
      <section id="security-quiz" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
              <span className="text-hacker-green">{'>'}</span>{' '}
              <span className="text-white">Security Quiz</span>
            </h2>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
          </div>

          <ScrollAnimation delay={0}>
            <div className="terminal-window rounded-lg p-8 md:p-12 text-center">
              <Shield className="text-hacker-green mx-auto mb-6" size={64} />
              <h3 className="text-2xl font-bold text-white font-mono mb-4">
                Test Your Security Knowledge
              </h3>
              <p className="text-gray-400 font-mono mb-6 max-w-2xl mx-auto">
                Challenge yourself with {quizQuestions.length} questions about web security, vulnerabilities, and best practices.
              </p>
              <button
                onClick={() => setQuizStarted(true)}
                className="px-8 py-3 bg-hacker-green/10 border-2 border-hacker-green text-hacker-green font-mono rounded-lg hover:bg-hacker-green/20 transition-colors"
              >
                Start Quiz
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    )
  }

  if (showResult) {
    const scoreData = getScoreMessage()
    return (
      <section id="security-quiz" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation delay={0}>
            <div className="terminal-window rounded-lg p-8 md:p-12 text-center">
              <Trophy className={`${scoreData.color} mx-auto mb-6`} size={64} />
              <h3 className="text-3xl font-bold text-white font-mono mb-4">
                {scoreData.message}
              </h3>
              <div className="text-4xl font-bold text-hacker-green font-mono mb-6">
                {score} / {quizQuestions.length}
              </div>
              <p className="text-gray-400 font-mono mb-8">
                You scored {Math.round((score / quizQuestions.length) * 100)}%
              </p>
              <button
                onClick={handleRestart}
                className="px-8 py-3 bg-hacker-green/10 border-2 border-hacker-green text-hacker-green font-mono rounded-lg hover:bg-hacker-green/20 transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw size={20} />
                Try Again
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    )
  }

  return (
    <section id="security-quiz" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm text-gray-400 font-mono mb-4">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>
          <div className="w-full bg-terminal-bg/50 rounded-full h-2 mb-6">
            <div
              className="bg-hacker-green h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <ScrollAnimation delay={0}>
          <div className="terminal-window rounded-lg p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-white font-mono mb-8">
              {question.question}
            </h3>

            <div className="space-y-3 mb-8">
              {question.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx
                const isCorrect = idx === question.correct
                const showFeedback = answered

                let buttonClass = 'w-full text-left p-4 rounded-lg border-2 font-mono transition-all '
                if (showFeedback) {
                  if (isCorrect) {
                    buttonClass += 'bg-hacker-green/20 border-hacker-green text-hacker-green'
                  } else if (isSelected && !isCorrect) {
                    buttonClass += 'bg-hacker-pink/20 border-hacker-pink text-hacker-pink'
                  } else {
                    buttonClass += 'bg-terminal-bg/50 border-hacker-green/20 text-gray-400'
                  }
                } else {
                  buttonClass += 'bg-terminal-bg/50 border-hacker-green/30 text-gray-200 hover:border-hacker-green hover:bg-hacker-green/10 cursor-pointer'
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={answered}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showFeedback && (
                        <>
                          {isCorrect && <CheckCircle className="text-hacker-green" size={20} />}
                          {isSelected && !isCorrect && <XCircle className="text-hacker-pink" size={20} />}
                        </>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {answered && (
              <div className="mb-6 p-4 rounded-lg bg-terminal-bg/50 border border-hacker-green/30">
                <div className="text-sm text-gray-400 font-mono mb-2">Explanation:</div>
                <div className="text-gray-200 font-mono">{question.explanation}</div>
              </div>
            )}

            {answered && (
              <button
                onClick={handleNext}
                className="w-full px-6 py-3 bg-hacker-green/10 border-2 border-hacker-green text-hacker-green font-mono rounded-lg hover:bg-hacker-green/20 transition-colors"
              >
                {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
              </button>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
